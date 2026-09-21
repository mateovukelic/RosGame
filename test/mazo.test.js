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

test('el mazo tiene volumen suficiente en cada paquete', () => {
  assert.ok(TODAS_LAS_CARTAS.length >= 100, 'el mazo es chico para una corrida de 48 meses');
  for (const [nombre, cartas] of Object.entries(PAQUETES)) {
    assert.ok(cartas.length >= 8, `el paquete "${nombre}" tiene muy pocas cartas`);
  }
});
