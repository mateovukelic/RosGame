import test from 'node:test';
import assert from 'node:assert/strict';
import { simularLote, ESTRATEGIAS } from '../src/engine/simulador.js';
import { BALANCE } from '../src/engine/constantes.js';

// Estos tests no buscan un número exacto: buscan que el juego no sea
// ni imposible ni un paseo. Si tocás el balance, van a avisarte.

test('jugando al azar se sobrevive un rato pero no un mandato entero', () => {
  const r = simularLote({ partidas: 200, estrategia: 'azar' });
  assert.ok(r.mediana >= 10, `muere demasiado rápido (mediana ${r.mediana} meses)`);
  assert.ok(r.mediana <= 40, `sobrevive demasiado al azar (mediana ${r.mediana} meses)`);
  assert.ok(r.victorias / r.partidas < 0.25, `gana demasiado al azar (${r.victorias}/${r.partidas})`);
});

test('jugar con criterio rinde claramente más que jugar al azar', () => {
  const azar = simularLote({ partidas: 200, estrategia: 'azar' });
  const prudente = simularLote({ partidas: 200, estrategia: 'prudente' });
  assert.ok(
    prudente.mediana > azar.mediana,
    `la habilidad no paga: prudente ${prudente.mediana} vs azar ${azar.mediana}`
  );
});

test('ni siquiera jugando bien se gana siempre', () => {
  const r = simularLote({ partidas: 200, estrategia: 'prudente' });
  assert.ok(r.victorias / r.partidas < 0.95, 'jugando prudente se gana siempre: falta tensión');
});

test('apretar siempre el mismo botón no es una estrategia viable', () => {
  for (const estrategia of ['siempreIzq', 'siempreDer']) {
    const r = simularLote({ partidas: 120, estrategia });
    assert.ok(
      r.mesesTotales !== BALANCE.mesesPorMandato,
      'no debería completarse el mandato mecánicamente'
    );
    assert.ok(r.mediana < BALANCE.mesesPorMandato, `"${estrategia}" completa mandatos (mediana ${r.mediana})`);
  }
});

// La convención "aceptar a la derecha" hace predecible el LADO. El riesgo que
// introduce es que vuelva predecible la DECISIÓN: si decirle que sí a todo el
// mundo fuera una estrategia razonable, el juego se resolvería sin pensar.
test('decir que sí a todo y decir que no a todo son peores que jugar al azar', () => {
  const azar = simularLote({ partidas: 250, estrategia: 'azar' });
  const siempreSi = simularLote({ partidas: 250, estrategia: 'siempreDer' });
  const siempreNo = simularLote({ partidas: 250, estrategia: 'siempreIzq' });

  assert.ok(
    siempreSi.mediana < azar.mediana,
    `aceptar todo rinde ${siempreSi.mediana} meses contra ${azar.mediana} al azar: es una estrategia`
  );
  assert.ok(
    siempreNo.mediana < azar.mediana,
    `rechazar todo rinde ${siempreNo.mediana} meses contra ${azar.mediana} al azar: es una estrategia`
  );
});

test('aceptar todo y rechazar todo fallan por motivos distintos', () => {
  // Si los dos murieran igual, el mazo estaría empujando a un solo lado.
  const masComun = (r) => Object.entries(r.finales).sort((a, b) => b[1] - a[1])[0][0];
  const si = masComun(simularLote({ partidas: 250, estrategia: 'siempreDer' }));
  const no = masComun(simularLote({ partidas: 250, estrategia: 'siempreIzq' }));
  assert.notEqual(si, no, `aceptar y rechazar todo terminan igual (${si}): falta tensión`);
});

test('las partidas llegan a finales variados, no siempre al mismo', () => {
  const r = simularLote({ partidas: 250, estrategia: 'azar' });
  assert.ok(r.finalesDistintos >= 4, `sólo se alcanzan ${r.finalesDistintos} finales distintos`);
  const masComun = Math.max(...Object.values(r.finales));
  assert.ok(masComun / r.partidas < 0.75, 'un solo final se come todas las partidas');
});

test('todos los gabinetes son jugables', () => {
  for (const gabinete of ['tecnico', 'aparato', 'outsider', 'heredero', 'liberal', 'emergencia']) {
    const r = simularLote({ partidas: 60, estrategia: 'prudente', gabinete });
    assert.ok(r.mediana >= 5, `el gabinete "${gabinete}" muere de entrada (mediana ${r.mediana})`);
    assert.ok(r.minimo >= 1, `el gabinete "${gabinete}" tiene partidas de cero meses`);
  }
});

test('la estrategia prudente devuelve siempre un lado válido', () => {
  const juegoFalso = {
    estado: { stats: { pueblo: 25, rosca: 50, campo: 50, caja: 50 }, inflacion: 30, mesesTotales: 0 },
    carta: { izq: { efectos: { pueblo: -5 } }, der: { efectos: { pueblo: 5 } } }
  };
  assert.equal(ESTRATEGIAS.prudente(juegoFalso), 'der');
});
