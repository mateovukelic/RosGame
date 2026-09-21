#!/usr/bin/env node
// Reporte de salud del mazo y del balance. `npm run validar`
import { TODAS_LAS_CARTAS, PAQUETES } from '../src/data/cartas/index.js';
import { simularLote } from '../src/engine/simulador.js';
import { STATS } from '../src/engine/constantes.js';
import { FINALES } from '../src/data/finales.js';

const linea = (t = '') => console.log(t);

linea('╔══════════════════════════════════════════════╗');
linea('║  LA ROSCA — reporte de mazo y balance         ║');
linea('╚══════════════════════════════════════════════╝');
linea();

linea(`Cartas totales: ${TODAS_LAS_CARTAS.length}`);
for (const [nombre, cartas] of Object.entries(PAQUETES)) {
  linea(`  · ${nombre.padEnd(10)} ${String(cartas.length).padStart(3)} cartas`);
}
linea(`Finales: ${FINALES.length}`);
linea();

// Presión neta por stat: ¿el mazo empuja para arriba o para abajo?
linea('Presión neta del mazo por stat (promedio de ambas opciones):');
const suma = Object.fromEntries(STATS.concat('inflacion').map((s) => [s, 0]));
for (const carta of TODAS_LAS_CARTAS) {
  for (const lado of ['izq', 'der']) {
    for (const [k, v] of Object.entries(carta[lado].efectos || {})) {
      const n = Array.isArray(v) ? (v[0] + v[1]) / 2 : v;
      suma[k] += n / 2;
    }
  }
}
for (const [k, v] of Object.entries(suma)) {
  const media = v / TODAS_LAS_CARTAS.length;
  const barra = '█'.repeat(Math.min(24, Math.round(Math.abs(media) * 14)));
  linea(`  ${k.padEnd(10)} ${media >= 0 ? '+' : '-'}${Math.abs(media).toFixed(2).padStart(5)}  ${barra}`);
}
linea();

// Cartas sin salida: ambas opciones idénticas en signo y magnitud
const sospechosas = TODAS_LAS_CARTAS.filter((c) => {
  const peso = (o) => Object.values(o.efectos || {}).reduce((a, v) => a + Math.abs(Array.isArray(v) ? v[0] : v), 0);
  return Math.abs(peso(c.izq) - peso(c.der)) < 1 && peso(c.izq) > 0;
});
if (sospechosas.length) {
  linea(`Cartas con opciones de peso casi idéntico (${sospechosas.length}):`);
  sospechosas.forEach((c) => linea(`  · ${c.id}`));
  linea();
}

linea('Simulaciones (300 corridas por estrategia):');
for (const estrategia of ['azar', 'alternada', 'prudente']) {
  const r = simularLote({ corridas: 300, estrategia });
  linea(
    `  ${estrategia.padEnd(10)} mediana ${String(r.mediana).padStart(3)} meses` +
      ` · p10 ${String(r.p10).padStart(2)} · p90 ${String(r.p90).padStart(3)}` +
      ` · mandatos completos ${r.victorias}/${r.corridas} · finales distintos ${r.finalesDistintos}`
  );
}
linea();

linea('Finales alcanzados jugando al azar (400 corridas).');
linea('Nota: las corridas siguen después de una reelección, así que el final que');
linea('      queda registrado es siempre el último, no el del primer mandato.');
const lote = simularLote({ corridas: 400, estrategia: 'azar' });
const ordenados = Object.entries(lote.finales).sort((a, b) => b[1] - a[1]);
for (const [id, cantidad] of ordenados) {
  const pct = ((cantidad / lote.corridas) * 100).toFixed(1);
  linea(`  ${String(id).padEnd(16)} ${String(cantidad).padStart(4)}  ${pct.padStart(5)}%  ${'▍'.repeat(Math.round(cantidad / 4))}`);
}
const nuncaVistos = FINALES.filter((f) => !lote.finales[f.id]).map((f) => f.id);
if (nuncaVistos.length) {
  linea();
  linea(`Finales que no aparecen en esta muestra: ${nuncaVistos.join(', ')}`);
}
