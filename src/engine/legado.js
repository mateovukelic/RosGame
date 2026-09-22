// LEGADO — la progresión que sobrevive a las partidas.
// Se guarda en localStorage, pero acepta cualquier storage (para tests).

import { GABINETES } from '../data/gabinetes.js';
import { FINALES } from '../data/finales.js';

const CLAVE = 'larosca.legado.v1';

// OJO: siempre devolver una copia nueva. Si se comparte el objeto, se comparten
// los arrays y dos legados distintos terminan pisándose.
function legadoVacio() {
  return {
    version: 1,
    mandatosJugados: 0,
    mejorMes: 0,
    mejorMandato: 0,
    finalesVistos: [],
    decretosUsados: [],
    gabinetesUsados: [],
    victorias: 0,
    semillaFavorita: null
  };
}

function storagePorDefecto() {
  try {
    if (typeof localStorage !== 'undefined') return localStorage;
  } catch {
    /* entorno sin storage */
  }
  const memoria = new Map();
  return {
    getItem: (k) => (memoria.has(k) ? memoria.get(k) : null),
    setItem: (k, v) => memoria.set(k, v),
    removeItem: (k) => memoria.delete(k)
  };
}

export class Legado {
  constructor(storage = storagePorDefecto()) {
    this.storage = storage;
    this.datos = this.cargar();
  }

  cargar() {
    try {
      const crudo = this.storage.getItem(CLAVE);
      if (!crudo) return legadoVacio();
      const datos = JSON.parse(crudo);
      return { ...legadoVacio(), ...datos };
    } catch {
      return legadoVacio();
    }
  }

  guardar() {
    try {
      this.storage.setItem(CLAVE, JSON.stringify(this.datos));
    } catch {
      /* sin storage: la partida sigue, el legado no persiste */
    }
    return this.datos;
  }

  borrar() {
    this.datos = legadoVacio();
    try {
      this.storage.removeItem(CLAVE);
    } catch {
      /* noop */
    }
    return this.datos;
  }

  // Se llama al terminar una partida con el resumen de Juego.resumen()
  registrarPartida(resumen) {
    const d = this.datos;
    d.mandatosJugados += 1;
    d.mejorMes = Math.max(d.mejorMes, resumen.mesesTotales);
    d.mejorMandato = Math.max(d.mejorMandato, resumen.mandato);
    if (resumen.final && !d.finalesVistos.includes(resumen.final)) {
      d.finalesVistos.push(resumen.final);
    }
    if (resumen.tipoFinal === 'gloria') d.victorias += 1;
    for (const id of resumen.decretos || []) {
      if (!d.decretosUsados.includes(id)) d.decretosUsados.push(id);
    }
    if (resumen.gabinete && !d.gabinetesUsados.includes(resumen.gabinete)) {
      d.gabinetesUsados.push(resumen.gabinete);
    }
    if (resumen.mesesTotales >= d.mejorMes) d.semillaFavorita = resumen.semilla;
    return this.guardar();
  }

  cumpleRequisito(req) {
    if (!req) return true;
    const d = this.datos;
    if (req.mandatosJugados != null && d.mandatosJugados < req.mandatosJugados) return false;
    if (req.mejorMes != null && d.mejorMes < req.mejorMes) return false;
    if (req.finalesVistos != null && d.finalesVistos.length < req.finalesVistos) return false;
    if (req.victorias != null && d.victorias < req.victorias) return false;
    return true;
  }

  gabinetes(catalogo = GABINETES) {
    return catalogo.map((g) => ({
      ...g,
      disponible: g.desbloqueado || this.cumpleRequisito(g.requiereLegado),
      pista: this.pistaDesbloqueo(g.requiereLegado)
    }));
  }

  pistaDesbloqueo(req) {
    if (!req) return null;
    const partes = [];
    if (req.mandatosJugados) partes.push(`jugá ${req.mandatosJugados} mandatos`);
    if (req.mejorMes) partes.push(`sobreviví ${req.mejorMes} meses en una partida`);
    if (req.finalesVistos) partes.push(`descubrí ${req.finalesVistos} finales distintos`);
    if (req.victorias) partes.push(`ganá ${req.victorias} vez/veces`);
    return partes.length ? `Se desbloquea si ${partes.join(' y ')}.` : null;
  }

  archivoFinales(catalogo = FINALES) {
    return catalogo.map((f) => ({
      id: f.id,
      tipo: f.tipo,
      visto: this.datos.finalesVistos.includes(f.id),
      titulo: this.datos.finalesVistos.includes(f.id) ? f.titulo : '???',
      epigrafe: this.datos.finalesVistos.includes(f.id) ? f.epigrafe : 'Todavía no lo viviste.'
    }));
  }

  progreso(catalogoFinales = FINALES) {
    return {
      finales: `${this.datos.finalesVistos.length}/${catalogoFinales.length}`,
      mandatos: this.datos.mandatosJugados,
      mejorMes: this.datos.mejorMes,
      victorias: this.datos.victorias
    };
  }
}
