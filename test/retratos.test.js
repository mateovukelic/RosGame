import test from 'node:test';
import assert from 'node:assert/strict';
import { PERSONAJES } from '../src/data/personajes.js';
import { retratoSvg, CATALOGOS, mezclar, oscurecer, aclarar } from '../src/ui/retratos.js';
import { TODAS_LAS_CARTAS } from '../src/data/cartas/index.js';

const PARTES = ['cara', 'piel', 'pelo', 'corte', 'barba', 'ojos', 'ceja', 'boca', 'prenda', 'accesorio'];

function svgDeTodos() {
  return Object.entries(PERSONAJES).map(([id, p]) => [id, retratoSvg(p.retrato, { fondo: p.color, uid: id })]);
}

test('todo personaje tiene receta de retrato', () => {
  for (const [id, p] of Object.entries(PERSONAJES)) {
    assert.ok(p.retrato, `${id}: no tiene retrato`);
    assert.ok(p.color?.startsWith('#'), `${id}: color inválido`);
    assert.ok(p.nombre?.length, `${id}: sin nombre`);
  }
});

test('las recetas sólo usan partes que existen en el catálogo', () => {
  for (const [id, p] of Object.entries(PERSONAJES)) {
    for (const parte of PARTES) {
      const valor = p.retrato[parte];
      if (valor == null) continue;
      if ((parte === 'piel' || parte === 'pelo') && valor.startsWith('#')) continue;
      assert.ok(
        Object.hasOwn(CATALOGOS[parte], valor),
        `${id}: "${valor}" no existe en el catálogo de ${parte}`
      );
    }
  }
});

test('ningún retrato sale con coordenadas rotas', () => {
  for (const [id, svg] of svgDeTodos()) {
    assert.ok(!svg.includes('NaN'), `${id}: el SVG tiene NaN`);
    assert.ok(!svg.includes('undefined'), `${id}: el SVG tiene undefined`);
    assert.ok(!svg.includes('Infinity'), `${id}: el SVG tiene Infinity`);
    assert.ok(!/#(?![0-9a-fA-F]{6}\b)/.test(svg.replace(/url\(#[^)]+\)/g, '')), `${id}: color mal formado`);
  }
});

test('los retratos son SVG con las etiquetas balanceadas', () => {
  for (const [id, svg] of svgDeTodos()) {
    assert.ok(svg.startsWith('<svg '), `${id}: no empieza con <svg`);
    assert.ok(svg.endsWith('</svg>'), `${id}: no cierra el <svg>`);
    for (const tag of ['g', 'clipPath', 'defs', 'svg']) {
      const abre = (svg.match(new RegExp(`<${tag}[\\s>]`, 'g')) || []).length;
      const cierra = (svg.match(new RegExp(`</${tag}>`, 'g')) || []).length;
      assert.equal(abre, cierra, `${id}: <${tag}> desbalanceado (${abre} abre, ${cierra} cierra)`);
    }
    const autocierre = (svg.match(/<(circle|ellipse|rect|path)\b[^>]*>/g) || []);
    for (const etiqueta of autocierre) {
      assert.ok(etiqueta.endsWith('/>'), `${id}: etiqueta sin autocerrar → ${etiqueta.slice(0, 40)}`);
    }
  }
});

test('el mismo personaje siempre da el mismo SVG', () => {
  for (const [id, p] of Object.entries(PERSONAJES)) {
    const a = retratoSvg(p.retrato, { fondo: p.color, uid: id });
    const b = retratoSvg(p.retrato, { fondo: p.color, uid: id });
    assert.equal(a, b, `${id}: el retrato no es determinístico`);
  }
});

test('los ids internos dependen del uid, así no chocan en la misma página', () => {
  const receta = PERSONAJES.hincha.retrato; // usa clipPath para las franjas
  const a = retratoSvg(receta, { uid: 'uno' });
  const b = retratoSvg(receta, { uid: 'dos' });
  assert.ok(a.includes('id="uno-circulo"') && a.includes('url(#uno-circulo)'));
  assert.ok(b.includes('id="dos-circulo"') && b.includes('url(#dos-circulo)'));
  assert.ok(!a.includes('dos-'), 'se filtró el uid de otro retrato');
});

test('cualquier combinación de partes se dibuja sin romperse', () => {
  const caras = Object.keys(CATALOGOS.cara);
  let combinaciones = 0;
  for (const grupo of ['corte', 'barba', 'ojos', 'ceja', 'boca', 'prenda', 'accesorio']) {
    for (const valor of Object.keys(CATALOGOS[grupo])) {
      for (const cara of caras) {
        const svg = retratoSvg({ cara, [grupo]: valor, tela: '#445566' }, { fondo: '#334455', uid: 'x' });
        assert.ok(!svg.includes('NaN'), `${grupo}=${valor} con cara ${cara}: NaN`);
        assert.ok(!svg.includes('undefined'), `${grupo}=${valor} con cara ${cara}: undefined`);
        assert.ok(svg.length > 600, `${grupo}=${valor} con cara ${cara}: SVG sospechosamente corto`);
        combinaciones++;
      }
    }
  }
  assert.ok(combinaciones > 100, 'el banco de pruebas quedó corto');
});

test('una parte desconocida no rompe el retrato, simplemente no se dibuja', () => {
  const svg = retratoSvg({ corte: 'inventado', accesorio: 'galera_magica' }, { uid: 'z' });
  assert.ok(svg.startsWith('<svg '));
  assert.ok(!svg.includes('undefined'));
});

test('sin receta se dibuja igual un retrato genérico', () => {
  const svg = retratoSvg();
  assert.ok(svg.startsWith('<svg ') && svg.endsWith('</svg>'));
  assert.ok(!svg.includes('undefined'));
});

test('los helpers de color devuelven hex de seis dígitos', () => {
  assert.equal(mezclar('#000000', '#ffffff', 0.5), '#808080');
  assert.equal(oscurecer('#ffffff', 1), '#000000');
  assert.equal(aclarar('#000000', 1), '#ffffff');
  for (const hex of [oscurecer('#74acdf'), aclarar('#74acdf'), mezclar('#c0524a', '#6a9955', 0.3)]) {
    assert.match(hex, /^#[0-9a-f]{6}$/);
  }
});

test('todo personaje usado por una carta tiene retrato dibujable', () => {
  const usados = new Set(TODAS_LAS_CARTAS.map((c) => c.personaje));
  for (const id of usados) {
    const p = PERSONAJES[id];
    assert.ok(p, `la carta usa el personaje "${id}" que no existe`);
    const svg = retratoSvg(p.retrato, { fondo: p.color, uid: id });
    assert.ok(svg.length > 1000, `${id}: el retrato salió vacío`);
  }
});
