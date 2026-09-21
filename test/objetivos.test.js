import test from 'node:test';
import assert from 'node:assert/strict';
import { OBJETIVOS } from '../src/data/objetivos.js';
import { asignarObjetivos, evaluarObjetivos, ESTADO_OBJETIVO } from '../src/engine/objetivos.js';
import { crearRng } from '../src/engine/rng.js';
import { Juego } from '../src/engine/juego.js';
import { FASES, BALANCE, STATS } from '../src/engine/constantes.js';
import { TODAS_LAS_CARTAS } from '../src/data/cartas/index.js';
import { GABINETES } from '../src/data/gabinetes.js';
import { DECRETOS } from '../src/data/decretos.js';

const estadoBase = (extra = {}) => ({
  mes: 1,
  mandato: 1,
  stats: { pueblo: 50, rosca: 50, campo: 50, caja: 50 },
  inflacion: 30,
  flags: new Set(),
  decretos: [],
  ...extra
});

test('el catálogo de objetivos está bien formado', () => {
  const vistos = new Set();
  for (const o of OBJETIVOS) {
    assert.ok(!vistos.has(o.id), `objetivo duplicado: ${o.id}`);
    vistos.add(o.id);
    assert.ok(['corto', 'largo'].includes(o.plazo), `${o.id}: plazo inválido`);
    assert.ok(o.titulo?.length && o.desc?.length > 20, `${o.id}: le falta texto`);
    assert.equal(typeof o.logro, 'function', `${o.id}: sin condición de logro`);
    assert.ok(o.vence > 0 && o.vence < BALANCE.mesesPorMandato, `${o.id}: vence fuera del mandato`);
    assert.ok(o.premio, `${o.id}: cumplirlo no da nada`);
    if (o.falla) assert.equal(typeof o.falla, 'function');
  }
});

test('los plazos cortos vencen antes que los largos', () => {
  const corto = Math.max(...OBJETIVOS.filter((o) => o.plazo === 'corto').map((o) => o.vence));
  const largo = Math.min(...OBJETIVOS.filter((o) => o.plazo === 'largo').map((o) => o.vence));
  assert.ok(corto <= largo, `un objetivo corto vence en ${corto} y uno largo en ${largo}`);
});

test('toda flag que pide un objetivo la pone alguien en el juego', () => {
  const puestas = new Set();
  for (const c of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) (c[lado].pone || []).forEach((f) => puestas.add(f));
  }
  DECRETOS.forEach((d) => (d.pone || []).forEach((f) => puestas.add(f)));
  GABINETES.forEach((g) => (g.pone || []).forEach((f) => puestas.add(f)));

  const consultadas = new Set();
  const espia = estadoBase({
    flags: {
      has(f) {
        consultadas.add(f);
        return false;
      }
    }
  });
  OBJETIVOS.forEach((o) => {
    o.logro(espia);
    o.falla?.(espia);
  });
  for (const flag of consultadas) {
    assert.ok(puestas.has(flag), `un objetivo pide la flag "${flag}" que nadie pone`);
  }
});

test('se sortea uno de plazo corto y uno de plazo largo', () => {
  for (const semilla of ['A', 'B', 'C', 'D']) {
    const objetivos = asignarObjetivos(crearRng(semilla));
    assert.equal(objetivos.length, 2);
    assert.deepEqual(objetivos.map((o) => o.plazo).sort(), ['corto', 'largo']);
    assert.ok(objetivos.every((o) => o.resultado === ESTADO_OBJETIVO.ACTIVO));
  }
});

test('el sorteo es determinístico por semilla', () => {
  const ids = (s) => asignarObjetivos(crearRng(s)).map((o) => o.id);
  assert.deepEqual(ids('MISMA'), ids('MISMA'));
  assert.notDeepEqual(ids('UNA'), ids('OTRA'));
});

test('el objetivo se resuelve recién al vencer', () => {
  const objetivo = {
    id: 'x', plazo: 'corto', titulo: 'T', desc: 'D'.repeat(25),
    vence: 10, logro: (e) => e.stats.pueblo >= 60, premio: { rosca: 5 }
  };
  const estado = estadoBase({ objetivos: [{ ...objetivo, resultado: ESTADO_OBJETIVO.ACTIVO }] });

  estado.mes = 9;
  estado.stats.pueblo = 80;
  assert.deepEqual(evaluarObjetivos(estado), [], 'todavía no vence');
  assert.equal(estado.objetivos[0].resultado, ESTADO_OBJETIVO.ACTIVO);

  estado.mes = 10;
  const novedades = evaluarObjetivos(estado);
  assert.equal(novedades.length, 1);
  assert.equal(estado.objetivos[0].resultado, ESTADO_OBJETIVO.CUMPLIDO);

  assert.deepEqual(evaluarObjetivos(estado), [], 'no se vuelve a avisar');
});

test('no cumplir la condición al vencer lo da por perdido', () => {
  const estado = estadoBase({
    mes: 10,
    objetivos: [{
      id: 'x', vence: 10, logro: () => false, premio: {}, resultado: ESTADO_OBJETIVO.ACTIVO
    }]
  });
  evaluarObjetivos(estado);
  assert.equal(estado.objetivos[0].resultado, ESTADO_OBJETIVO.FALLIDO);
});

test('falla() lo pierde de entrada, sin esperar al vencimiento', () => {
  const estado = estadoBase({
    mes: 3,
    stats: { pueblo: 15, rosca: 50, campo: 50, caja: 50 },
    objetivos: [{
      id: 'x', vence: 30, logro: () => true, falla: (e) => e.stats.pueblo <= 22,
      premio: {}, resultado: ESTADO_OBJETIVO.ACTIVO
    }]
  });
  evaluarObjetivos(estado);
  assert.equal(estado.objetivos[0].resultado, ESTADO_OBJETIVO.FALLIDO, 'ya no tiene salvación');
});

test('cumplir paga el premio y fallar cobra el castigo', () => {
  const catalogo = [
    {
      id: 'facil', plazo: 'corto', titulo: 'Fácil', desc: 'x'.repeat(25),
      vence: 2, logro: () => true, premio: { rosca: 10 }
    },
    {
      id: 'imposible', plazo: 'largo', titulo: 'Imposible', desc: 'x'.repeat(25),
      vence: 2, logro: () => false, premio: { rosca: 10 }, castigo: { pueblo: -7 }
    }
  ];
  const j = new Juego({ semilla: 'PREMIO-1', objetivos: catalogo });
  const rosca = j.estado.stats.rosca;
  const pueblo = j.estado.stats.pueblo;

  j.elegir('der');
  assert.equal(j.estado.objetivos.find((o) => o.id === 'facil').resultado, ESTADO_OBJETIVO.CUMPLIDO);
  assert.equal(j.estado.objetivos.find((o) => o.id === 'imposible').resultado, ESTADO_OBJETIVO.FALLIDO);
  assert.ok(j.estado.stats.rosca > rosca, 'se pagó el premio');
  assert.ok(j.estado.stats.pueblo < pueblo, 'se cobró el castigo');
});

test('un objetivo con decretoExtra abre la elección de decreto fuera de horario', () => {
  const catalogo = [
    {
      id: 'regalo', plazo: 'corto', titulo: 'Regalo', desc: 'x'.repeat(25),
      vence: 2, logro: () => true, premio: { decretoExtra: true }
    },
    { id: 'nada', plazo: 'largo', titulo: 'Nada', desc: 'x'.repeat(25), vence: 40, logro: () => true, premio: {} }
  ];
  const j = new Juego({ semilla: 'EXTRA-1', objetivos: catalogo });
  const antes = j.estado.decretos.length;
  j.elegir('der');
  assert.equal(j.estado.fase, FASES.DECRETO, 'el premio abre la pantalla de decreto');
  j.tomarDecreto(j.estado.ofertaDecretos[0].id);
  assert.equal(j.estado.decretos.length, antes + 1);
  assert.equal(j.estado.fase, FASES.CARTA);
  assert.equal(j.estado.decretoPendiente, false, 'el premio no se cobra dos veces');
});

test('cada mandato nuevo trae objetivos nuevos', () => {
  const j = new Juego({ semilla: 'MANDATO-1' });
  const primeros = j.estado.objetivos.map((o) => o.id);
  let turnos = 0;
  while (!j.terminado && turnos < 400) {
    if (j.estado.fase === FASES.DECRETO) { j.tomarDecreto(j.estado.ofertaDecretos[0].id); continue; }
    j.elegir('der'); turnos++;
  }
  if (j.puedeContinuar()) {
    j.continuarMandato();
    assert.equal(j.estado.objetivos.length, 2);
    assert.ok(j.estado.objetivos.every((o) => o.resultado === ESTADO_OBJETIVO.ACTIVO));
    assert.ok(primeros.length === 2);
  }
});

test('el resumen final cuenta los objetivos y arma la crónica', () => {
  const j = new Juego({ semilla: 'CRONICA-1' });
  let turnos = 0;
  while (!j.terminado && turnos < 400) {
    if (j.estado.fase === FASES.DECRETO) { j.tomarDecreto(j.estado.ofertaDecretos[0].id); continue; }
    j.elegir(turnos % 2 ? 'izq' : 'der'); turnos++;
  }
  const r = j.resumen();
  assert.equal(r.objetivos.length, 2);
  assert.ok(r.objetivosCumplidos <= 2);
  assert.ok(r.cronica.length > 0 && r.cronica.length <= 3);
  for (const c of r.cronica) {
    assert.ok(c.mes >= 1 && c.eleccion !== '—', 'la crónica cita una elección real');
    assert.equal(typeof c.personaje, 'string');
  }
  // Viene en orden cronológico, no por importancia
  const orden = r.cronica.map((c) => c.mandato * 100 + c.mes);
  assert.deepEqual(orden, [...orden].sort((a, b) => a - b));
});

test('todo gabinete tiene prólogo', () => {
  for (const g of GABINETES) {
    assert.ok(g.prologo?.length > 80, `${g.id}: prólogo ausente o muy corto`);
  }
});

// ---- La invariante de diseño ----
test('la pista de impacto no filtra la dirección por ningún lado', () => {
  const j = new Juego({ semilla: 'PISTA-1' });
  const carta = (delta) => ({
    id: 'falsa', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { pueblo: delta } },
    der: { texto: 'b', efectos: { pueblo: delta } }
  });

  j.estado.carta = carta(9);
  const subiendo = j.pistaDeImpacto('izq');
  j.estado.carta = carta(-9);
  const bajando = j.pistaDeImpacto('izq');

  assert.deepEqual(subiendo, bajando, 'subir 9 y bajar 9 tienen que verse idénticos');

  const serializado = JSON.stringify(subiendo);
  assert.ok(!/-\d/.test(serializado), 'se coló un número negativo');
  assert.ok(!/delta|signo|sube|baja|proyectado|letal/.test(serializado), 'se coló un campo con dirección');
  assert.deepEqual(Object.keys(subiendo[0]).sort(), ['clave', 'fuerza', 'incierto']);
});

test('la fuerza de la pista clasifica bien leve, medio y fuerte', () => {
  const j = new Juego({ semilla: 'PISTA-2' });
  const fuerzaDe = (delta) => {
    j.estado.carta = {
      id: 'f', personaje: 'chanta', texto: 'x',
      izq: { texto: 'a', efectos: { campo: delta } },
      der: { texto: 'b', efectos: {} }
    };
    return j.pistaDeImpacto('izq')[0].fuerza;
  };
  assert.equal(fuerzaDe(3), 'leve');
  assert.equal(fuerzaDe(-3), 'leve');
  assert.equal(fuerzaDe(BALANCE.impactoMedio), 'medio');
  assert.equal(fuerzaDe(-BALANCE.impactoFuerte), 'fuerte');
  assert.equal(fuerzaDe(25), 'fuerte');
});

test('los efectos con rango se marcan como inciertos', () => {
  const j = new Juego({ semilla: 'PISTA-3' });
  j.estado.carta = {
    id: 'f', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { caja: [-30, 35] } },
    der: { texto: 'b', efectos: { caja: 5 } }
  };
  assert.equal(j.pistaDeImpacto('izq')[0].incierto, true);
  assert.equal(j.pistaDeImpacto('der')[0].incierto, false);
});

test('la pista no nombra medidores que la opción no toca', () => {
  const j = new Juego({ semilla: 'PISTA-4' });
  j.estado.carta = {
    id: 'f', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: { pueblo: 6, campo: 0 } },
    der: { texto: 'b', efectos: {} }
  };
  assert.deepEqual(j.pistaDeImpacto('izq').map((p) => p.clave), ['pueblo']);
  assert.deepEqual(j.pistaDeImpacto('der'), []);
  assert.ok(STATS.includes('pueblo'));
});
