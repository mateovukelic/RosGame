import test from 'node:test';
import assert from 'node:assert/strict';
import { TODAS_LAS_CARTAS, PAQUETES } from '../src/data/cartas/index.js';
import { PERSONAJES } from '../src/data/personajes.js';
import { DECRETOS } from '../src/data/decretos.js';
import { GABINETES } from '../src/data/gabinetes.js';
import { FINALES } from '../src/data/finales.js';
import { STATS } from '../src/engine/constantes.js';

const CLAVES_EFECTO = new Set([...STATS, 'inflacion']);

test('los ids de carta son únicos', () => {
  const vistos = new Set();
  for (const carta of TODAS_LAS_CARTAS) {
    assert.ok(!vistos.has(carta.id), `id duplicado: ${carta.id}`);
    vistos.add(carta.id);
  }
});

test('toda carta tiene personaje válido, texto y dos opciones', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    assert.ok(PERSONAJES[carta.personaje], `${carta.id}: personaje desconocido "${carta.personaje}"`);
    assert.ok(carta.texto?.length > 10, `${carta.id}: texto muy corto`);
    for (const lado of ['izq', 'der']) {
      const opcion = carta[lado];
      assert.ok(opcion, `${carta.id}: falta la opción ${lado}`);
      assert.ok(opcion.texto?.length > 0, `${carta.id}.${lado}: falta el texto de la respuesta`);
      assert.ok(opcion.texto.length <= 34, `${carta.id}.${lado}: respuesta demasiado larga`);
    }
  }
});

test('los efectos usan sólo claves conocidas y magnitudes razonables', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      const efectos = carta[lado].efectos || {};
      for (const [clave, valor] of Object.entries(efectos)) {
        assert.ok(CLAVES_EFECTO.has(clave), `${carta.id}.${lado}: clave de efecto inválida "${clave}"`);
        const numeros = Array.isArray(valor) ? valor : [valor];
        for (const n of numeros) {
          assert.equal(typeof n, 'number', `${carta.id}.${lado}.${clave}: valor no numérico`);
          assert.ok(Math.abs(n) <= 40, `${carta.id}.${lado}.${clave}: magnitud excesiva (${n})`);
        }
      }
    }
  }
});

test('las dos opciones de una carta son distintas entre sí', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    assert.notEqual(
      carta.izq.texto.toLowerCase(),
      carta.der.texto.toLowerCase(),
      `${carta.id}: las dos respuestas dicen lo mismo`
    );
  }
});

test('toda carta encadenada apunta a una carta existente', () => {
  const ids = new Set(TODAS_LAS_CARTAS.map((c) => c.id));
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      const encadena = carta[lado].encadena;
      if (!encadena) continue;
      for (const id of [].concat(encadena)) {
        assert.ok(ids.has(id), `${carta.id}.${lado}: encadena a una carta inexistente "${id}"`);
      }
    }
  }
});

test('toda flag requerida por una carta la pone alguien', () => {
  const puestas = new Set();
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) (carta[lado].pone || []).forEach((f) => puestas.add(f));
  }
  DECRETOS.forEach((d) => (d.pone || []).forEach((f) => puestas.add(f)));
  GABINETES.forEach((g) => (g.pone || []).forEach((f) => puestas.add(f)));
  // flags que fija el motor
  ['mandato_1', 'mandato_2', 'mandato_3'].forEach((f) => puestas.add(f));

  const requeridas = new Set();
  for (const carta of TODAS_LAS_CARTAS) {
    const req = carta.requiere || {};
    [...(req.flags || []), ...(req.algunaFlag || []), ...(req.sinFlags || [])].forEach((f) =>
      requeridas.add(f)
    );
  }
  for (const flag of requeridas) {
    assert.ok(puestas.has(flag), `nadie pone nunca la flag "${flag}"`);
  }
});

test('toda flag usada por un final se puede conseguir jugando', () => {
  const puestas = new Set();
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) (carta[lado].pone || []).forEach((f) => puestas.add(f));
  }
  DECRETOS.forEach((d) => (d.pone || []).forEach((f) => puestas.add(f)));
  GABINETES.forEach((g) => (g.pone || []).forEach((f) => puestas.add(f)));

  const estadoEspia = {
    mes: 1,
    mandato: 1,
    stats: { pueblo: 50, rosca: 50, campo: 50, caja: 50 },
    inflacion: 30,
    decretos: [],
    flags: {
      has(flag) {
        estadoEspia.consultadas.add(flag);
        return false;
      }
    },
    consultadas: new Set()
  };
  FINALES.forEach((f) => f.condicion(estadoEspia));

  for (const flag of estadoEspia.consultadas) {
    assert.ok(puestas.has(flag), `el final usa la flag "${flag}" que nadie pone`);
  }
});

test('los decretos de los gabinetes existen en el catálogo', () => {
  const ids = new Set(DECRETOS.map((d) => d.id));
  for (const g of GABINETES) {
    for (const id of g.decretos || []) {
      assert.ok(ids.has(id), `gabinete ${g.id}: decreto inexistente "${id}"`);
    }
    for (const stat of STATS) {
      assert.ok(
        g.stats[stat] > 0 && g.stats[stat] < 100,
        `gabinete ${g.id}: ${stat} arranca en un valor que ya es final`
      );
    }
  }
});

test('los finales tienen id único y prioridad numérica', () => {
  const vistos = new Set();
  for (const final of FINALES) {
    assert.ok(!vistos.has(final.id), `final duplicado: ${final.id}`);
    vistos.add(final.id);
    assert.equal(typeof final.prioridad, 'number', `${final.id}: prioridad inválida`);
    assert.ok(['caida', 'gloria', 'rareza'].includes(final.tipo), `${final.id}: tipo inválido`);
    assert.ok(final.texto.length > 40, `${final.id}: texto muy corto`);
  }
});

// ---- El piso de calidad de la prosa ----
// Estas no son reglas de estilo: son el mínimo por debajo del cual una carta
// deja de ser una escena y vuelve a ser una planilla de efectos.
test('toda opción tiene réplica: elegir siempre tiene que devolver algo', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      assert.ok(
        carta[lado].replica?.length > 25,
        `${carta.id}.${lado}: sin réplica, el jugador elige y el juego se queda callado`
      );
    }
  }
});

test('las réplicas dicen algo nuevo, no repiten la respuesta', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      const opcion = carta[lado];
      assert.notEqual(
        opcion.replica.toLowerCase().trim(),
        opcion.texto.toLowerCase().trim(),
        `${carta.id}.${lado}: la réplica repite la respuesta`
      );
      assert.ok(
        opcion.replica.length > opcion.texto.length,
        `${carta.id}.${lado}: la réplica es más corta que la respuesta`
      );
    }
  }
});

test('las dos réplicas de una carta cuentan cosas distintas', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    assert.notEqual(
      carta.izq.replica,
      carta.der.replica,
      `${carta.id}: las dos opciones terminan igual`
    );
  }
});

test('el texto de la carta tiene lugar para un detalle concreto', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    assert.ok(carta.texto.length >= 60, `${carta.id}: el texto es demasiado escueto para tener escena`);
    assert.ok(carta.texto.length <= 125, `${carta.id}: el texto no entra en la carta`);
  }
});

test('las réplicas entran en el panel sin desbordarlo', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      assert.ok(
        carta[lado].replica.length <= 125,
        `${carta.id}.${lado}: la réplica es demasiado larga para leerla entre carta y carta`
      );
    }
  }
});

test('cada personaje tiene una regla de voz escrita', () => {
  for (const [id, p] of Object.entries(PERSONAJES)) {
    assert.ok(p.voz?.length > 40, `${id}: sin regla de voz, la próxima carta lo va a escribir cualquiera`);
  }
});

// ---- La convención de lados ----
// Cuando alguien viene a proponer algo, aceptar está SIEMPRE a la derecha y
// rechazar SIEMPRE a la izquierda. Que el lado sea predecible es lo que deja
// que la dificultad esté en decidir, y no en descifrar de qué lado quedó el sí.
test('toda carta declara si es una propuesta o un dilema', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    assert.ok(
      ['propuesta', 'dilema'].includes(carta.forma),
      `${carta.id}: forma inválida o ausente ("${carta.forma}")`
    );
  }
});

test('en una propuesta, aceptar va a la derecha y rechazar a la izquierda', () => {
  for (const carta of TODAS_LAS_CARTAS.filter((c) => c.forma === 'propuesta')) {
    assert.equal(carta.der.acepta, true, `${carta.id}: la derecha tiene que ser el sí`);
    assert.equal(carta.izq.rechaza, true, `${carta.id}: la izquierda tiene que ser el no`);
    assert.ok(!carta.izq.acepta, `${carta.id}: hay un "acepta" a la izquierda`);
    assert.ok(!carta.der.rechaza, `${carta.id}: hay un "rechaza" a la derecha`);
  }
});

test('un dilema no marca ningún lado como el sí', () => {
  for (const carta of TODAS_LAS_CARTAS.filter((c) => c.forma === 'dilema')) {
    for (const lado of ['izq', 'der']) {
      assert.ok(
        !carta[lado].acepta && !carta[lado].rechaza,
        `${carta.id}.${lado}: un dilema no tiene un lado "correcto"`
      );
    }
  }
});

test('ninguna carta marca acepta o rechaza sin declararse propuesta', () => {
  for (const carta of TODAS_LAS_CARTAS) {
    const marcada = carta.izq.acepta || carta.izq.rechaza || carta.der.acepta || carta.der.rechaza;
    if (marcada) assert.equal(carta.forma, 'propuesta', `${carta.id}: marca lados pero no es propuesta`);
  }
});

test('la mayoría del mazo son propuestas, no dilemas', () => {
  // Si los dilemas fueran mayoría, la convención no le serviría a nadie.
  const propuestas = TODAS_LAS_CARTAS.filter((c) => c.forma === 'propuesta').length;
  assert.ok(
    propuestas > TODAS_LAS_CARTAS.length / 2,
    `sólo ${propuestas} de ${TODAS_LAS_CARTAS.length} cartas son propuestas`
  );
});

test('una parte del mazo son hechos consumados, no peticiones', () => {
  // Si todo fuera "alguien entra y pide algo", gobernar sería atender un
  // mostrador. Una cuarta parte del mazo tiene que ser cosas que simplemente
  // pasan: la tormenta, el papelón, el apagón.
  const dilemas = TODAS_LAS_CARTAS.filter((c) => c.forma === 'dilema').length;
  assert.ok(
    dilemas >= TODAS_LAS_CARTAS.length * 0.25,
    `sólo ${dilemas} de ${TODAS_LAS_CARTAS.length} cartas son dilemas: el mazo es un mostrador`
  );
});

test('el mazo tiene volumen suficiente en cada paquete', () => {
  assert.ok(TODAS_LAS_CARTAS.length >= 100, 'el mazo es chico para una partida de 48 meses');
  for (const [nombre, cartas] of Object.entries(PAQUETES)) {
    assert.ok(cartas.length >= 8, `el paquete "${nombre}" tiene muy pocas cartas`);
  }
});
