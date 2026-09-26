// Resolución de efectos y condiciones de las cartas.
import { STATS, BALANCE } from './constantes.js';
import { calendario } from './calendario.js';

export function limitar(valor, min, max) {
  return Math.max(min, Math.min(max, valor));
}

// Valor medio de un efecto, sin tirar dados. Se usa para previsualizar el impacto
// antes de elegir, y para que el simulador pueda proyectar sin gastar el rng.
export function valorEsperado(valor) {
  if (valor == null) return 0;
  if (typeof valor === 'number') return valor;
  if (Array.isArray(valor)) return (valor[0] + valor[1]) / 2;
  if (typeof valor === 'object' && 'min' in valor && 'max' in valor) {
    return (valor.min + valor.max) / 2;
  }
  return 0;
}

export function esRango(valor) {
  return Array.isArray(valor) || (valor != null && typeof valor === 'object' && 'min' in valor);
}

// Impacto estimado de una opción, ya pasado por los decretos activos.
// Devuelve [{ clave, delta, incierto }] ordenado de mayor a menor impacto.
export function efectosEsperados(efectos = {}, decretos = []) {
  const claves = [...STATS, 'inflacion'];
  return claves
    .map((clave) => {
      const crudo = valorEsperado(efectos[clave]);
      if (!crudo) return null;
      return {
        clave,
        delta: modularDelta(clave, crudo, decretos),
        incierto: esRango(efectos[clave])
      };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
}

// Un efecto puede ser un número fijo (-8) o un rango ({ min: -12, max: -4 })
export function resolverValor(valor, rng) {
  if (valor == null) return 0;
  if (typeof valor === 'number') return valor;
  if (Array.isArray(valor)) return rng.entero(valor[0], valor[1]);
  if (typeof valor === 'object' && 'min' in valor && 'max' in valor) {
    return rng.entero(valor.min, valor.max);
  }
  return 0;
}

// Aplica los modificadores que aportan los decretos activos.
// - amortigua: multiplica los deltas NEGATIVOS de un stat (0.5 = la mitad de daño)
// - potencia:  multiplica los deltas POSITIVOS de un stat
export function modularDelta(stat, delta, decretos) {
  let resultado = delta;
  for (const decreto of decretos) {
    const efecto = decreto.efecto || {};
    if (delta < 0 && efecto.amortigua && efecto.amortigua[stat] != null) {
      resultado *= efecto.amortigua[stat];
    }
    if (delta > 0 && efecto.potencia && efecto.potencia[stat] != null) {
      resultado *= efecto.potencia[stat];
    }
  }
  return resultado;
}

// Calcula los deltas finales de una opción (sin mutar nada).
export function calcularEfectos(efectos = {}, decretos = [], rng) {
  const deltas = {};
  for (const stat of STATS) {
    const crudo = resolverValor(efectos[stat], rng);
    deltas[stat] = crudo === 0 ? 0 : Math.round(modularDelta(stat, crudo, decretos));
  }
  deltas.inflacion = Math.round(
    modularDelta('inflacion', resolverValor(efectos.inflacion, rng), decretos) * 10
  ) / 10;
  return deltas;
}

// Aplica deltas sobre el estado. Si la caja se iría a negativo, se emite:
// se clava en 0 y el faltante se convierte en inflación. Muy nacional.
export function aplicarDeltas(estado, deltas) {
  const aplicado = { ...deltas, emision: 0 };

  for (const stat of STATS) {
    const previo = estado.stats[stat];
    let siguiente = previo + (deltas[stat] || 0);

    if (stat === 'caja' && siguiente < BALANCE.statMin) {
      const faltante = BALANCE.statMin - siguiente;
      aplicado.emision = faltante;
      estado.inflacion = limitar(
        estado.inflacion + faltante * BALANCE.inflacionPorEmision,
        BALANCE.inflacionMin,
        BALANCE.inflacionMax
      );
      siguiente = BALANCE.statMin;
    }

    estado.stats[stat] = limitar(siguiente, BALANCE.statMin, BALANCE.statMax);
    aplicado[stat] = estado.stats[stat] - previo;
  }

  if (deltas.inflacion) {
    const previo = estado.inflacion;
    estado.inflacion = limitar(
      estado.inflacion + deltas.inflacion,
      BALANCE.inflacionMin,
      BALANCE.inflacionMax
    );
    aplicado.inflacion = Math.round((estado.inflacion - previo) * 10) / 10;
  }

  return aplicado;
}

// ---- Condiciones ----
// requiere: {
//   mesMin, mesMax, mandatoMin,
//   mesCalendario: 'jun' | ['may', 'jun'],   // sólo en esa época del año
//   anio: 2 | [2, 4],                        // sólo en ese año de gestión
//   flags: ['x'],        // todas presentes
//   algunaFlag: ['a','b'],
//   sinFlags: ['y'],     // ninguna presente
//   stats: { pueblo: { min: 20, max: 80 } },
//   inflacionMin, inflacionMax,
//   decretos: ['id'],
//   test: (estado) => boolean
// }
export function cumpleCondicion(requiere, estado) {
  if (!requiere) return true;

  if (requiere.mesMin != null && estado.mes < requiere.mesMin) return false;
  if (requiere.mesMax != null && estado.mes > requiere.mesMax) return false;
  if (requiere.mandatoMin != null && estado.mandato < requiere.mandatoMin) return false;

  if (requiere.mesCalendario != null || requiere.anio != null) {
    const { clave, anio } = calendario(estado.mes);
    if (requiere.mesCalendario != null && ![].concat(requiere.mesCalendario).includes(clave)) return false;
    if (requiere.anio != null && ![].concat(requiere.anio).includes(anio)) return false;
  }

  if (requiere.flags && !requiere.flags.every((f) => estado.flags.has(f))) return false;
  if (requiere.algunaFlag && !requiere.algunaFlag.some((f) => estado.flags.has(f))) return false;
  if (requiere.sinFlags && requiere.sinFlags.some((f) => estado.flags.has(f))) return false;

  if (requiere.stats) {
    for (const [stat, rango] of Object.entries(requiere.stats)) {
      const valor = estado.stats[stat];
      if (rango.min != null && valor < rango.min) return false;
      if (rango.max != null && valor > rango.max) return false;
    }
  }

  if (requiere.inflacionMin != null && estado.inflacion < requiere.inflacionMin) return false;
  if (requiere.inflacionMax != null && estado.inflacion > requiere.inflacionMax) return false;

  if (requiere.decretos) {
    const ids = new Set(estado.decretos.map((d) => d.id));
    if (!requiere.decretos.every((id) => ids.has(id))) return false;
  }

  if (typeof requiere.test === 'function' && !requiere.test(estado)) return false;

  return true;
}

// Aplica el bloque de flags de una opción: { pone: [], saca: [] }
export function aplicarFlags(estado, opcion) {
  if (opcion.pone) opcion.pone.forEach((f) => estado.flags.add(f));
  if (opcion.saca) opcion.saca.forEach((f) => estado.flags.delete(f));
}
