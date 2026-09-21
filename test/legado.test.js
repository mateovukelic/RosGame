import test from 'node:test';
import assert from 'node:assert/strict';
import { Legado } from '../src/engine/legado.js';

function storageDeMentira() {
  const m = new Map();
  return {
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, v),
    removeItem: (k) => m.delete(k),
    _m: m
  };
}

test('arranca vacío y persiste entre instancias', () => {
  const storage = storageDeMentira();
  const a = new Legado(storage);
  assert.equal(a.datos.mandatosJugados, 0);
  a.registrarCorrida({
    semilla: 'X-1', gabinete: 'tecnico', mandato: 1, mesesTotales: 20,
    decretos: ['cepo'], final: 'caja_cero', tipoFinal: 'caida', decisiones: 20
  });
  const b = new Legado(storage);
  assert.equal(b.datos.mandatosJugados, 1);
  assert.equal(b.datos.mejorMes, 20);
  assert.deepEqual(b.datos.finalesVistos, ['caja_cero']);
});

test('no duplica finales ni decretos ya registrados', () => {
  const l = new Legado(storageDeMentira());
  const corrida = {
    semilla: 'X', gabinete: 'tecnico', mandato: 1, mesesTotales: 10,
    decretos: ['cepo', 'cepo'], final: 'hiper', tipoFinal: 'caida', decisiones: 10
  };
  l.registrarCorrida(corrida);
  l.registrarCorrida(corrida);
  assert.deepEqual(l.datos.finalesVistos, ['hiper']);
  assert.deepEqual(l.datos.decretosUsados, ['cepo']);
  assert.equal(l.datos.mandatosJugados, 2);
});

test('mejorMes se queda con el récord, no con el último', () => {
  const l = new Legado(storageDeMentira());
  const base = { semilla: 'X', gabinete: 'tecnico', mandato: 1, decretos: [], tipoFinal: 'caida', decisiones: 0 };
  l.registrarCorrida({ ...base, mesesTotales: 30, final: 'a' });
  l.registrarCorrida({ ...base, mesesTotales: 12, final: 'b' });
  assert.equal(l.datos.mejorMes, 30);
});

test('los gabinetes se desbloquean al cumplir el requisito', () => {
  const l = new Legado(storageDeMentira());
  const bloqueado = () => l.gabinetes().find((g) => g.id === 'heredero');
  assert.equal(bloqueado().disponible, false);
  assert.match(bloqueado().pista, /3 mandatos/);

  for (let i = 0; i < 3; i++) {
    l.registrarCorrida({
      semilla: `S-${i}`, gabinete: 'tecnico', mandato: 1, mesesTotales: 5,
      decretos: [], final: `f${i}`, tipoFinal: 'caida', decisiones: 5
    });
  }
  assert.equal(bloqueado().disponible, true);
});

test('el archivo oculta los finales que no se vivieron', () => {
  const l = new Legado(storageDeMentira());
  const antes = l.archivoFinales();
  assert.ok(antes.every((f) => !f.visto && f.titulo === '???'));
  l.registrarCorrida({
    semilla: 'X', gabinete: 'tecnico', mandato: 1, mesesTotales: 5,
    decretos: [], final: 'hiper', tipoFinal: 'caida', decisiones: 5
  });
  const despues = l.archivoFinales().find((f) => f.id === 'hiper');
  assert.equal(despues.visto, true);
  assert.equal(despues.titulo, 'Hiperinflación');
});

test('borrar deja el legado como nuevo', () => {
  const storage = storageDeMentira();
  const l = new Legado(storage);
  l.registrarCorrida({
    semilla: 'X', gabinete: 'tecnico', mandato: 1, mesesTotales: 9,
    decretos: [], final: 'hiper', tipoFinal: 'caida', decisiones: 9
  });
  l.borrar();
  assert.equal(l.datos.mandatosJugados, 0);
  assert.equal(new Legado(storage).datos.mejorMes, 0);
});

test('un storage roto no rompe el juego', () => {
  const roto = {
    getItem: () => { throw new Error('sin permisos'); },
    setItem: () => { throw new Error('sin permisos'); },
    removeItem: () => { throw new Error('sin permisos'); }
  };
  const l = new Legado(roto);
  assert.equal(l.datos.mandatosJugados, 0);
  assert.doesNotThrow(() =>
    l.registrarCorrida({
      semilla: 'X', gabinete: 'tecnico', mandato: 1, mesesTotales: 3,
      decretos: [], final: 'hiper', tipoFinal: 'caida', decisiones: 3
    })
  );
  assert.equal(l.datos.mandatosJugados, 1);
});

test('un json corrupto en storage se ignora sin explotar', () => {
  const storage = storageDeMentira();
  storage.setItem('larosca.legado.v1', '{esto no es json');
  assert.equal(new Legado(storage).datos.mandatosJugados, 0);
});
