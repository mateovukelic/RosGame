import test from 'node:test';
import assert from 'node:assert/strict';
import { Juego } from '../src/engine/juego.js';
import { crearRng } from '../src/engine/rng.js';
import { aplicarDeltas, calcularEfectos, cumpleCondicion } from '../src/engine/efectos.js';
import { resolverFinal } from '../src/engine/finales.js';
import { BALANCE, FASES } from '../src/engine/constantes.js';

function jugarHasta(juego, elegir, maxTurnos = 400) {
  let turnos = 0;
  while (!juego.terminado && turnos < maxTurnos) {
    if (juego.estado.fase === FASES.DECRETO) {
      juego.tomarDecreto(juego.estado.ofertaDecretos[0].id);
      continue;
    }
    juego.elegir(elegir(juego, turnos));
    turnos++;
  }
  return turnos;
}

test('la misma semilla produce exactamente la misma partida', () => {
  const correr = () => {
    const j = new Juego({ semilla: 'FERNET-1234', gabinete: 'tecnico' });
    jugarHasta(j, (_, t) => (t % 3 === 0 ? 'izq' : 'der'));
    return j.resumen();
  };
  assert.deepEqual(correr(), correr());
});

test('semillas distintas producen partidas distintas', () => {
  const correr = (semilla) => {
    const j = new Juego({ semilla, gabinete: 'tecnico' });
    jugarHasta(j, () => 'der');
    return j.estado.historia.map((h) => h.carta).join(',');
  };
  assert.notEqual(correr('UNO-1111'), correr('DOS-2222'));
});

test('la primera carta siempre es la asunción', () => {
  for (const semilla of ['A-1', 'B-2', 'C-3']) {
    assert.equal(new Juego({ semilla }).carta.id, 'asuncion');
  }
});

test('los stats nunca se salen del rango 0-100', () => {
  for (const semilla of ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']) {
    const j = new Juego({ semilla });
    jugarHasta(j, (_, t) => (t % 2 ? 'izq' : 'der'));
    for (const [nombre, valor] of Object.entries(j.statsVisibles())) {
      assert.ok(valor >= 0 && valor <= 100, `${semilla}: ${nombre} fuera de rango (${valor})`);
    }
  }
});

test('toda partida termina en un final y nunca se queda sin cartas', () => {
  for (let i = 0; i < 40; i++) {
    const j = new Juego({ semilla: `LOOP-${i}` });
    const turnos = jugarHasta(j, (_, t) => ((i + t) % 2 ? 'izq' : 'der'));
    assert.ok(j.terminado, `semilla LOOP-${i}: la partida no terminó en ${turnos} turnos`);
    assert.ok(j.estado.final, `semilla LOOP-${i}: terminó sin final asignado`);
    assert.ok(j.carta || j.terminado, 'se quedó sin cartas para robar');
  }
});

test('quedarse sin caja emite y la emisión dispara inflación', () => {
  const estado = {
    stats: { pueblo: 50, rosca: 50, campo: 50, caja: 4 },
    inflacion: 30
  };
  const aplicado = aplicarDeltas(estado, { pueblo: 0, rosca: 0, campo: 0, caja: -20, inflacion: 0 });
  assert.equal(estado.stats.caja, 0, 'la caja se clava en cero');
  assert.ok(aplicado.emision > 0, 'se registró emisión');
  assert.ok(estado.inflacion > 30, 'la emisión empujó la inflación');
});

test('los decretos amortiguan el daño y potencian lo bueno', () => {
  const rng = crearRng('FIJA');
  const sinDecreto = calcularEfectos({ pueblo: -10, caja: 10 }, [], rng);
  const conDecreto = calcularEfectos(
    { pueblo: -10, caja: 10 },
    [{ id: 'x', efecto: { amortigua: { pueblo: 0.5 }, potencia: { caja: 2 } } }],
    rng
  );
  assert.equal(sinDecreto.pueblo, -10);
  assert.equal(conDecreto.pueblo, -5);
  assert.equal(conDecreto.caja, 20);
});

test('se ofrece un decreto cada 12 meses', () => {
  const j = new Juego({ semilla: 'DEC-1' });
  const mesesConOferta = [];
  let turnos = 0;
  while (!j.terminado && turnos < 60) {
    if (j.estado.fase === FASES.DECRETO) {
      mesesConOferta.push(j.estado.mes);
      assert.equal(j.estado.ofertaDecretos.length, BALANCE.opcionesDeDecreto);
      j.tomarDecreto(j.estado.ofertaDecretos[0].id);
      continue;
    }
    j.elegir('der');
    turnos++;
  }
  for (const mes of mesesConOferta) {
    assert.equal((mes - 1) % BALANCE.mesesPorDecreto, 0, `oferta en un mes raro: ${mes}`);
  }
});

test('no se puede elegir carta durante la fase de decreto', () => {
  const j = new Juego({ semilla: 'DEC-2' });
  while (j.estado.fase !== FASES.DECRETO && !j.terminado) j.elegir('der');
  if (!j.terminado) {
    assert.throws(() => j.elegir('izq'), /fase/);
    assert.throws(() => j.tomarDecreto('inexistente'), /no ofrecido/i);
  }
});

test('completar el mandato da un final de gloria y permite continuar', () => {
  const estado = {
    mandato: 2,
    mes: 1,
    stats: { pueblo: 50, rosca: 50, campo: 50, caja: 50 },
    inflacion: 40,
    flags: new Set()
  };
  const final = resolverFinal(estado);
  assert.equal(final.id, 'reeleccion');
  assert.equal(final.tipo, 'gloria');
});

test('la hiperinflación gana sobre cualquier otro final', () => {
  const estado = {
    mandato: 1,
    mes: 20,
    stats: { pueblo: 0, rosca: 0, campo: 0, caja: 0 },
    inflacion: 100,
    flags: new Set()
  };
  assert.equal(resolverFinal(estado).id, 'hiper');
});

test('las condiciones de carta respetan flags, meses y stats', () => {
  const estado = {
    mes: 10,
    mandato: 1,
    stats: { pueblo: 30, rosca: 70, campo: 50, caja: 50 },
    inflacion: 45,
    decretos: [{ id: 'cepo' }],
    flags: new Set(['paro_hecho'])
  };
  assert.ok(cumpleCondicion({ mesMin: 5, flags: ['paro_hecho'] }, estado));
  assert.ok(!cumpleCondicion({ mesMin: 20 }, estado));
  assert.ok(!cumpleCondicion({ sinFlags: ['paro_hecho'] }, estado));
  assert.ok(cumpleCondicion({ algunaFlag: ['paro_hecho', 'otra'] }, estado));
  assert.ok(cumpleCondicion({ stats: { pueblo: { max: 40 } } }, estado));
  assert.ok(!cumpleCondicion({ stats: { pueblo: { min: 40 } } }, estado));
  assert.ok(cumpleCondicion({ inflacionMin: 40, inflacionMax: 50 }, estado));
  assert.ok(cumpleCondicion({ decretos: ['cepo'] }, estado));
  assert.ok(!cumpleCondicion({ decretos: ['motosierra'] }, estado));
});

test('una carta no se repite mientras haya alternativas', () => {
  const j = new Juego({ semilla: 'REP-1' });
  const vistas = [];
  let turnos = 0;
  while (!j.terminado && turnos < 30) {
    if (j.estado.fase === FASES.DECRETO) {
      j.tomarDecreto(j.estado.ofertaDecretos[0].id);
      continue;
    }
    vistas.push(j.carta.id);
    j.elegir(turnos % 2 ? 'izq' : 'der');
    turnos++;
  }
  const repetibles = new Set(['emision', 'paritaria', 'inflacion_mensual']);
  const unicas = vistas.filter((id) => !repetibles.has(id));
  assert.equal(new Set(unicas).size, unicas.length, `se repitieron cartas: ${vistas.join(', ')}`);
});

test('previsualizar estima el impacto de cada opción antes de elegirla', () => {
  const j = new Juego({ semilla: 'PREV-1' });
  const impactos = j.previsualizar('izq');
  assert.ok(impactos.length > 0, 'la carta de asunción mueve algo');

  for (const i of impactos) {
    assert.ok(['pueblo', 'rosca', 'campo', 'caja', 'inflacion'].includes(i.clave));
    assert.notEqual(i.delta, 0, 'no se listan medidores que no se mueven');
    assert.equal(typeof i.proyectado, 'number');
    assert.ok(i.proyectado >= 0 && i.proyectado <= 100, 'el proyectado ya viene acotado');
    assert.equal(typeof i.letal, 'boolean');
  }

  // Viene ordenado por impacto, para que la pista más fuerte se lea primero
  const magnitudes = impactos.map((i) => Math.abs(i.delta));
  assert.deepEqual(magnitudes, [...magnitudes].sort((a, b) => b - a));
});

test('la previsualización coincide con lo que después pasa de verdad', () => {
  // Con efectos fijos (sin rangos) la estimación tiene que dar exacto.
  const j = new Juego({ semilla: 'PREV-2' });
  const antes = { ...j.estado.stats };
  const impactos = j.previsualizar('der');
  const esperado = Object.fromEntries(impactos.map((i) => [i.clave, i.delta]));
  const resultado = j.elegir('der');

  for (const [clave, delta] of Object.entries(esperado)) {
    if (clave === 'inflacion') continue; // la deriva mensual la mueve aparte
    assert.equal(
      resultado.deltas[clave],
      Math.round(delta),
      `${clave}: se previsualizó ${delta} y se aplicó ${resultado.deltas[clave]}`
    );
    assert.ok(antes[clave] != null);
  }
});

test('previsualizar avisa cuando la opción empuja a un medidor a un final', () => {
  const j = new Juego({ semilla: 'PREV-3' });
  j.estado.stats.campo = 97;
  j.estado.carta = {
    id: 'falsa', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { campo: 8 } },
    der: { texto: 'b', efectos: { campo: -8 } }
  };
  const [subeCampo] = j.previsualizar('izq');
  assert.equal(subeCampo.letal, true, 'llevar Campo a 100 es un final y hay que avisarlo');
  const [bajaCampo] = j.previsualizar('der');
  assert.equal(bajaCampo.letal, false);
});

test('la Caja en cero no se marca letal: se emite en vez de perder', () => {
  const j = new Juego({ semilla: 'PREV-4' });
  j.estado.stats.caja = 3;
  j.estado.carta = {
    id: 'falsa', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { caja: -20 } },
    der: { texto: 'b', efectos: { pueblo: -60 } }
  };
  assert.equal(j.previsualizar('izq')[0].letal, false);
  assert.equal(j.previsualizar('der')[0].letal, true);
});

test('la previsualización refleja los decretos activos', () => {
  const j = new Juego({ semilla: 'PREV-5' });
  j.estado.carta = {
    id: 'falsa', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { pueblo: -10 } },
    der: { texto: 'b', efectos: { pueblo: 10 } }
  };
  const sinDecreto = j.previsualizar('izq')[0].delta;
  j.estado.decretos.push({ id: 'escudo', efecto: { amortigua: { pueblo: 0.5 } } });
  const conDecreto = j.previsualizar('izq')[0].delta;
  assert.equal(sinDecreto, -10);
  assert.equal(conDecreto, -5, 'el jugador tiene que ver el efecto real, no el de la carta pelada');
});

test('el gabinete define el estado inicial', () => {
  const j = new Juego({ semilla: 'GAB-1', gabinete: 'aparato' });
  assert.equal(j.statsVisibles().pueblo, 66);
  assert.equal(j.estado.decretos[0].id, 'aguante');
});
