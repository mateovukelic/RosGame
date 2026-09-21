#!/usr/bin/env node
// Arma dist/demo.html a partir del juego real: misma marcación, mismos módulos.
// Se genera en vez de mantenerse a mano para que la demo publicada no se
// desincronice del repo. `npm run demo`.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (p) => readFileSync(join(raiz, p), 'utf8');

const html = leer('index.html');
const css = leer('styles/main.css');

const titulo = html.match(/<title>([^<]*)<\/title>/)?.[1];
const cuerpo = html.match(/<body>([\s\S]*?)<\/body>/)?.[1];
if (!titulo || !cuerpo) throw new Error('index.html cambió de forma: no encuentro el título o el body');

// La página publicada llega sin <html>/<head>/<body>: el host pone el esqueleto.
const salida = [
  `<title>${titulo}</title>`,
  '<style>',
  css.trim(),
  '</style>',
  cuerpo.replace(/\s*<script[\s\S]*?<\/script>\s*/g, '\n').trimEnd(),
  '<script type="module" src="src/main.js"></script>',
  ''
].join('\n');

mkdirSync(join(raiz, 'dist'), { recursive: true });
writeFileSync(join(raiz, 'dist/demo.html'), salida);

const kb = (Buffer.byteLength(salida) / 1024).toFixed(1);
console.log(`dist/demo.html — ${kb} kB (título: "${titulo}")`);
// Ojo con <header>: hay que mirar el nombre de etiqueta completo, no el prefijo.
for (const etiqueta of ['!doctype', 'html', 'head', 'body']) {
  if (new RegExp(`<${etiqueta}[\\s>]`, 'i').test(salida)) {
    throw new Error(`la demo no debe traer su propio <${etiqueta}>`);
  }
}
if (/(src|href)="(https?:)?\/\//.test(salida)) throw new Error('la demo no debe pedir recursos externos');
console.log('sin esqueleto propio ✓  sin recursos externos ✓');
