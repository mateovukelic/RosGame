import test from 'node:test';
import assert from 'node:assert/strict';
import { simularLote, ESTRATEGIAS } from '../src/engine/simulador.js';
import { BALANCE } from '../src/engine/constantes.js';

// Estos tests no buscan un número exacto: buscan que el juego no sea
// ni imposible ni un paseo. Si tocás el balance, van a avisarte.

test('jugando al azar se sobrevive un rato pero no un mandato entero', () => {
  const r = simularLote({ corridas: 200, estrategia: 'azar' });
  assert.ok(r.mediana >= 10, `muere demasiado rápido (mediana ${r.mediana} meses)`);
  assert.ok(r.mediana <= 40, `sobrevive demasiado al azar (mediana ${r.mediana} meses)`);
  assert.ok(r.victorias / r.corridas < 0.25, `gana demasiado al azar (${r.victorias}/${r.corridas})`);
});

test('jugar con criterio rinde claramente más que jugar al azar', () => {
  const azar = simularLote({ corridas: 200, estrategia: 'azar' });
  const prudente = simularLote({ corridas: 200, estrategia: 'prudente' });
  assert.ok(
    prudente.mediana > azar.mediana,
    `la habilidad no paga: prudente ${prudente.mediana} vs azar ${azar.mediana}`
  );
});

test('ni siquiera jugando bien se gana siempre', () => {
  const r = simularLote({ corridas: 200, estrategia: 'prudente' });
  assert.ok(r.victorias / r.corridas < 0.95, 'jugando prudente se gana siempre: falta tensión');
});

test('apretar siempre el mismo botón no es una estrategia viable', () => {
  for (const estrategia of ['siempreIzq', 'siempreDer']) {
    const r = simularLote({ corridas: 120, estrategia });
    assert.ok(
      r.mesesTotales !== BALANCE.mesesPorMandato,
      'no debería completarse el mandato mecánicamente'
    );
    assert.ok(r.mediana < BALANCE.mesesPorMandato, `"${estrategia}" completa mandatos (mediana ${r.mediana})`);
  }
});

test('las corridas llegan a finales variados, no siempre al mismo', () => {
  const r = simularLote({ corridas: 250, estrategia: 'azar' });
  assert.ok(r.finalesDistintos >= 4, `sólo se alcanzan ${r.finalesDistintos} finales distintos`);
  const masComun = Math.max(...Object.values(r.finales));
  assert.ok(masComun / r.corridas < 0.75, 'un solo final se come todas las partidas');
});

test('todos los gabinetes son jugables', () => {
  for (const gabinete of ['tecnico', 'aparato', 'outsider', 'heredero', 'liberal', 'emergencia']) {
    const r = simularLote({ corridas: 60, estrategia: 'prudente', gabinete });
    assert.ok(r.mediana >= 5, `el gabinete "${gabinete}" muere de entrada (mediana ${r.mediana})`);
    assert.ok(r.minimo >= 1, `el gabinete "${gabinete}" tiene corridas de cero meses`);
  }
});

test('la estrategia prudente devuelve siempre un lado válido', () => {
  const juegoFalso = {
    estado: { stats: { pueblo: 25, rosca: 50, campo: 50, caja: 50 }, inflacion: 30, mesesTotales: 0 },
    carta: { izq: { efectos: { pueblo: -5 } }, der: { efectos: { pueblo: 5 } } }
  };
  assert.equal(ESTRATEGIAS.prudente(juegoFalso), 'der');
});
