import test from 'node:test';
import assert from 'node:assert/strict';
import { Juego } from '../src/engine/juego.js';
import { Mazo } from '../src/engine/mazo.js';
import { crearRng } from '../src/engine/rng.js';
import { TODAS_LAS_CARTAS, PAQUETES } from '../src/data/cartas/index.js';
import { FASES, STATS } from '../src/engine/constantes.js';

test('sembrar agenda una carta y cosechar sólo la entrega cuando vence', () => {
  const mazo = new Mazo([{ id: 'a', soloEncadenada: true }, { id: 'b' }], crearRng('S'));
  mazo.sembrar('a', 7);
  assert.equal(mazo.pendientes().length, 1);
  assert.equal(mazo.cosechar(6), null, 'todavía no vence');
  assert.equal(mazo.cosechar(7).id, 'a');
  assert.equal(mazo.pendientes().length, 0, 'se entrega una sola vez');
});

test('la misma consecuencia no se siembra dos veces', () => {
  const mazo = new Mazo([{ id: 'a', soloEncadenada: true }], crearRng('S'));
  mazo.sembrar('a', 5);
  mazo.sembrar('a', 20);
  assert.equal(mazo.pendientes().length, 1);
  assert.equal(mazo.pendientes()[0].mes, 5, 'queda la primera fecha');
});

test('sembrar una carta inexistente no rompe nada', () => {
  const mazo = new Mazo([{ id: 'a' }], crearRng('S'));
  mazo.sembrar('no_existe', 3);
  assert.equal(mazo.pendientes().length, 0);
});

test('lo sembrado tiene prioridad sobre la cola y sobre el sorteo', () => {
  const estado = {
    mes: 9, mesesTotales: 9, mandato: 1,
    stats: { pueblo: 50, rosca: 50, campo: 50, caja: 50 },
    inflacion: 30, flags: new Set(), decretos: []
  };
  const mazo = new Mazo(
    [{ id: 'sembrada', soloEncadenada: true }, { id: 'encolada', soloEncadenada: true }, { id: 'suelta' }],
    crearRng('S')
  );
  mazo.encolar('encolada');
  mazo.sembrar('sembrada', 8);
  assert.equal(mazo.robar(estado).id, 'sembrada');
  assert.equal(mazo.robar(estado).id, 'encolada');
});

test('elegir una opción con siembra agenda su consecuencia', () => {
  const j = new Juego({ semilla: 'SIEMBRA-1' });
  j.estado.carta = {
    id: 'falsa', forma: 'dilema', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: {}, siembra: { carta: 'factura_emision', meses: [6, 6] } },
    der: { texto: 'b', efectos: {} }
  };
  assert.equal(j.mazo.pendientes().length, 0);
  j.elegir('izq');
  const pendientes = j.mazo.pendientes();
  assert.equal(pendientes.length, 1);
  assert.equal(pendientes[0].id, 'factura_emision');
  // Se agenda contra el mes en que se tomó la decisión: "en seis meses" son
  // seis turnos desde acá, no siete.
  assert.equal(pendientes[0].mes, 6);
  assert.equal(pendientes[0].origen, 'falsa', 'la consecuencia recuerda de dónde vino');
});

test('la consecuencia sembrada llega, y llega en la ventana prometida', () => {
  const j = new Juego({ semilla: 'SIEMBRA-2' });
  j.estado.carta = {
    id: 'falsa', forma: 'dilema', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: {}, siembra: { carta: 'cosecha_record', meses: [4, 6] } },
    der: { texto: 'b', efectos: {} }
  };
  j.elegir('izq');
  const agendado = j.mazo.pendientes()[0].mes;
  assert.ok(agendado >= 4 && agendado <= 6, `agendada para el mes ${agendado}`);

  let llego = null;
  for (let i = 0; i < 12 && !llego && !j.terminado; i++) {
    if (j.estado.fase === FASES.DECRETO) { j.tomarDecreto(j.estado.ofertaDecretos[0].id); continue; }
    if (j.carta?.id === 'cosecha_record') { llego = j.estado.mesesTotales; break; }
    j.elegir('der');
  }
  assert.equal(llego, agendado, `la factura tenía que llegar en el mes ${agendado}`);
});

test('las consecuencias nunca salen por sorteo', () => {
  for (const carta of PAQUETES.consecuencias) {
    assert.equal(carta.soloEncadenada, true, `${carta.id}: podría salir sin que nadie la haya sembrado`);
    assert.equal(carta.irrepetible, true, `${carta.id}: una factura se cobra una vez`);
  }
});

test('toda siembra apunta a una carta que existe y ninguna consecuencia queda huérfana', () => {
  const ids = new Set(TODAS_LAS_CARTAS.map((c) => c.id));
  const sembradas = new Set();

  for (const carta of TODAS_LAS_CARTAS) {
    for (const lado of ['izq', 'der']) {
      for (const semilla of [].concat(carta[lado].siembra || [])) {
        assert.ok(ids.has(semilla.carta), `${carta.id}.${lado}: siembra "${semilla.carta}", que no existe`);
        const [min, max] = semilla.meses;
        assert.ok(min > 0 && min <= max, `${carta.id}.${lado}: ventana de meses inválida`);
        assert.ok(max <= 24, `${carta.id}.${lado}: la factura llega tan tarde que nadie la va a atar al origen`);
        sembradas.add(semilla.carta);
      }
    }
  }

  for (const carta of PAQUETES.consecuencias) {
    assert.ok(sembradas.has(carta.id), `${carta.id}: nadie la siembra, no puede salir nunca`);
  }
  assert.ok(sembradas.size >= 12, `sólo ${sembradas.size} decisiones tienen consecuencia con fecha`);
});

test('cada facción tiene su carta de aviso antes del final por exceso', () => {
  for (const stat of STATS) {
    const aviso = TODAS_LAS_CARTAS.find((c) => c.id === `aviso_${stat}`);
    assert.ok(aviso, `falta el aviso de zona alta para ${stat}`);
    assert.ok(aviso.urgeSi?.[stat]?.min >= 80, `aviso_${stat}: no se dispara en zona de riesgo`);
    const salida = [aviso.izq, aviso.der].find((o) => (o.efectos?.[stat] ?? 0) < -8);
    assert.ok(salida, `aviso_${stat}: no ofrece una salida real del borde`);
  }
});

test('el aviso aparece de verdad cuando una facción se va al techo', () => {
  const j = new Juego({ semilla: 'AVISO-1' });
  j.estado.mes = 12;
  j.estado.mesesTotales = 12;
  j.estado.stats.pueblo = 92;

  let aparecio = false;
  for (let i = 0; i < 25 && !aparecio; i++) {
    const carta = j.mazo.robar(j.estado);
    if (!carta) break;
    if (carta.id === 'aviso_pueblo') aparecio = true;
  }
  assert.ok(aparecio, 'con el Pueblo en 92 el aviso tiene que salir en las primeras cartas');
});

test('el resumen informa cuántas facturas quedaron sin llegar', () => {
  const j = new Juego({ semilla: 'SIEMBRA-3' });
  j.estado.carta = {
    id: 'falsa', forma: 'dilema', personaje: 'chanta', texto: 'x',
    izq: { texto: 'a', efectos: {}, siembra: { carta: 'ciencia_rinde', meses: [20, 20] } },
    der: { texto: 'b', efectos: {} }
  };
  j.elegir('izq');
  assert.equal(j.resumen().facturasPendientes, 1);
});
