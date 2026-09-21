// Evaluación de finales sobre el estado actual.
import { FINALES } from '../data/finales.js';

export function resolverFinal(estado, finales = FINALES) {
  const candidatos = finales
    .filter((f) => {
      try {
        return f.condicion(estado);
      } catch {
        return false;
      }
    })
    .sort((a, b) => b.prioridad - a.prioridad);
  return candidatos[0] || null;
}
