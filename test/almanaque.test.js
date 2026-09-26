import test from 'node:test';
import assert from 'node:assert/strict';
import { Juego } from '../src/engine/juego.js';
import { calendario, fecha, fechaCorta, MESES } from '../src/engine/calendario.js';
import { cumpleCondicion } from '../src/engine/efectos.js';
import { AGENDA } from '../src/data/almanaque.js';
import { TODAS_LAS_CARTAS } from '../src/data/cartas/index.js';
import { OBJETIVOS } from '../src/data/objetivos.js';
import { FASES } from '../src/engine/constantes.js';
import { ESTRATEGIAS } from '../src/engine/simulador.js';

const porId = new Map(TODAS_LAS_CARTAS.map((c) => [c.id, c]));

// Juega una partida entera y anota qué carta salió en cada mes del calendario.
function registrarPartida(semilla, estrategia = 'prudente') {
  const j = new Juego({ semilla });
  const decidir = ESTRATEGIAS[estrategia];
  const registro = [];
  let turnos = 0;
  let s = 7;
  const rng = () => ((s = (s * 1103515245 + 12345) & 0x7fffffff) / 0x7fffffff);
  while (!j.terminado && turnos < 60) {
    if (j.estado.fase === FASES.DECRETO) {
      j.tomarDecreto(j.estado.ofertaDecretos[0].id);
      continue;
    }
    const { clave, anio } = j.calendario();
    registro.push({ mes: j.estado.mes, clave, anio, id: j.carta.id });
    j.elegir(decidir(j, rng));
    turnos++;
  }
  return registro;
}

test('el mes 1 es diciembre y cada año de gestión va de diciembre a noviembre', () => {
  const casos = [
    [1, 'dic', 1], [2, 'ene', 1], [4, 'mar', 1], [12, 'nov', 1],
    [13, 'dic', 2], [21, 'ago', 2], [23, 'oct', 2],
    [37, 'dic', 4], [47, 'oct', 4], [48, 'nov', 4]
  ];
  for (const [mes, clave, anio] of casos) {
    const c = calendario(mes);
    assert.equal(c.clave, clave, `el mes ${mes} tendría que ser ${clave}`);
    assert.equal(c.anio, anio, `el mes ${mes} tendría que ser del año ${anio}`);
  }
  assert.equal(fecha(7), 'Junio · Año 1');
  assert.equal(fechaCorta(16), 'mar · año 2');
});

test('las condiciones entienden el mes del calendario y el año de gestión', () => {
  const estado = (mes) => ({
    mes, mandato: 1, stats: { pueblo: 50, rosca: 50, campo: 50, caja: 50 },
    inflacion: 30, flags: new Set(), decretos: []
  });
  assert.ok(cumpleCondicion({ mesCalendario: 'jun' }, estado(7)));
  assert.ok(!cumpleCondicion({ mesCalendario: 'jun' }, estado(8)));
  assert.ok(cumpleCondicion({ mesCalendario: ['jul', 'ago'] }, estado(9)));
  assert.ok(cumpleCondicion({ anio: 2 }, estado(20)));
  assert.ok(!cumpleCondicion({ anio: [3, 4] }, estado(20)));
  assert.ok(cumpleCondicion({ mesCalendario: 'oct', anio: 2 }, estado(23)), 'el medio término');
});

test('la agenda está bien armada', () => {
  const ocupados = new Set();
  for (const entrada of AGENDA) {
    assert.ok(MESES.includes(entrada.mes), `mes inválido: ${entrada.mes}`);
    assert.notEqual(entrada.mes, 'dic', 'diciembre del año 1 es de la asunción');
    for (const anio of entrada.anios || [1, 2, 3, 4]) {
      const clave = `${entrada.mes}-${anio}`;
      assert.ok(!ocupados.has(clave), `dos entradas de agenda pisan ${clave}`);
      ocupados.add(clave);
    }
    assert.ok(entrada.cartas.length >= 1);
    for (const id of entrada.cartas) {
      const carta = porId.get(id);
      assert.ok(carta, `la agenda nombra "${id}", que no existe`);
      assert.equal(carta.soloEncadenada, true, `${id}: si no es soloEncadenada, sale también por sorteo`);
    }
  }
});

test('ningún mes queda con más de medio año fijo', () => {
  // Si el almanaque ocupara casi todo, el sorteo desaparecería.
  for (const anio of [1, 2, 3, 4]) {
    const fijos = AGENDA.filter((e) => !e.anios || e.anios.includes(anio)).length;
    assert.ok(fijos <= 6, `el año ${anio} tiene ${fijos} meses fijos: el sorteo se queda sin aire`);
  }
});

test('cada mes de agenda trae una carta de su pozo', () => {
  for (const semilla of ['ALM-1', 'ALM-2', 'ALM-3']) {
    for (const { clave, anio, id, mes } of registrarPartida(semilla)) {
      const entrada = AGENDA.find((e) => e.mes === clave && (!e.anios || e.anios.includes(anio)));
      if (!entrada) continue;
      assert.ok(
        entrada.cartas.includes(id),
        `${semilla}: en ${fecha(mes)} tenía que salir algo de [${entrada.cartas}] y salió ${id}`
      );
    }
  }
});

test('el primer año abre con la primera variante de cada golpe', () => {
  const registro = registrarPartida('ALM-4');
  const delAnio1 = (clave) => registro.find((r) => r.anio === 1 && r.clave === clave)?.id;
  assert.equal(delAnio1('feb'), 'clases_a');
  assert.equal(delAnio1('mar'), 'sesiones_a', 'el primer 1° de marzo es el discurso inaugural');
  assert.equal(delAnio1('abr'), 'cosecha_a');
});

test('el segundo año trae la otra variante, no la misma', () => {
  const registro = registrarPartida('ALM-5');
  const feb = registro.filter((r) => r.clave === 'feb').map((r) => r.id);
  if (feb.length >= 2) assert.notEqual(feb[0], feb[1], 'dos febreros seguidos con la misma carta');
});

test('las cartas estacionales sólo salen en su época', () => {
  const estacionales = TODAS_LAS_CARTAS.filter((c) => c.requiere?.mesCalendario);
  assert.ok(estacionales.length >= 8, 'el almanaque tiene pocas cartas estacionales');
  let vistas = 0;
  for (let i = 0; i < 40; i++) {
    for (const r of registrarPartida(`EST-${i}`, i % 2 ? 'azar' : 'prudente')) {
      const carta = porId.get(r.id);
      if (!carta?.requiere?.mesCalendario) continue;
      vistas++;
      assert.ok(
        [].concat(carta.requiere.mesCalendario).includes(r.clave),
        `${r.id} salió en ${r.clave}, fuera de su época`
      );
    }
  }
  assert.ok(vistas > 20, `en cuarenta partidas salieron sólo ${vistas} estacionales: pesan poco`);
});

test('una carta anual vuelve en otro año, pero nunca dos veces el mismo', () => {
  let volvio = false;
  for (let i = 0; i < 40; i++) {
    const registro = registrarPartida(`ANU-${i}`);
    const anuales = registro.filter((r) => porId.get(r.id)?.anual);
    const claves = anuales.map((r) => `${r.id}@${r.anio}`);
    assert.equal(new Set(claves).size, claves.length, `anual repetida en el mismo año: ${claves}`);
    const ids = anuales.map((r) => r.id);
    if (new Set(ids).size < ids.length) volvio = true;
  }
  assert.ok(volvio, 'ninguna carta anual volvió nunca en otro año: no son anuales');
});

test('el almanaque manda: una factura que vence en un mes fijo llega después', () => {
  const j = new Juego({ semilla: 'FACT-1' });
  // Llevar el juego a enero y sembrar una consecuencia que vence en febrero
  j.estado.carta = {
    id: 'falsa', forma: 'dilema', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: {}, siembra: { carta: 'factura_emision', meses: [2, 2] } },
    der: { texto: 'b', efectos: {} }
  };
  j.elegir('izq'); // mes 2 (enero); la factura vence en el mes 3 (febrero)
  j.elegir('der'); // entra febrero
  assert.equal(j.calendario().clave, 'feb');
  assert.ok(AGENDA.find((e) => e.mes === 'feb').cartas.includes(j.carta.id), 'en febrero manda la paritaria docente');
  j.elegir('der'); // entra marzo: también es de agenda
  j.elegir('der'); // entra abril: también
  j.elegir('der'); // entra mayo: libre
  assert.equal(j.carta.id, 'factura_emision', 'la factura llega el primer mes libre');
});

test('los objetivos hablan con fechas del calendario, no con números de mes', () => {
  for (const o of OBJETIVOS) {
    assert.ok(!/\bmes \d+/i.test(o.desc), `${o.id}: todavía dice "mes N" en la descripción`);
  }
});
