// Sorteo y evaluación de los objetivos del mandato.
import { OBJETIVOS } from '../data/objetivos.js';

export const ESTADO_OBJETIVO = { ACTIVO: 'activo', CUMPLIDO: 'cumplido', FALLIDO: 'fallido' };

/**
 * Uno de plazo corto y uno de plazo largo, para que el mandato tenga dos tiempos.
 */
export function asignarObjetivos(rng, catalogo = OBJETIVOS) {
  const elegidos = [];
  for (const plazo of ['corto', 'largo']) {
    const opciones = catalogo.filter((o) => o.plazo === plazo);
    if (opciones.length) elegidos.push(rng.elegir(opciones));
  }
  return elegidos.map((o) => ({ ...o, resultado: ESTADO_OBJETIVO.ACTIVO }));
}

/**
 * Resuelve los objetivos que vencieron o que ya no tienen salvación.
 * Muta `estado.objetivos` y devuelve sólo los que cambiaron este mes.
 */
export function evaluarObjetivos(estado) {
  const novedades = [];
  for (const objetivo of estado.objetivos || []) {
    if (objetivo.resultado !== ESTADO_OBJETIVO.ACTIVO) continue;

    if (typeof objetivo.falla === 'function' && objetivo.falla(estado)) {
      objetivo.resultado = ESTADO_OBJETIVO.FALLIDO;
      novedades.push(objetivo);
      continue;
    }
    if (estado.mes >= objetivo.vence) {
      objetivo.resultado = objetivo.logro(estado)
        ? ESTADO_OBJETIVO.CUMPLIDO
        : ESTADO_OBJETIVO.FALLIDO;
      novedades.push(objetivo);
    }
  }
  return novedades;
}

export function objetivosActivos(estado) {
  return (estado.objetivos || []).filter((o) => o.resultado === ESTADO_OBJETIVO.ACTIVO);
}

export function contarCumplidos(estado) {
  return (estado.objetivos || []).filter((o) => o.resultado === ESTADO_OBJETIVO.CUMPLIDO).length;
}
