#!/usr/bin/env node
// Arma dist/la-rosca.html: UN SOLO archivo, sin dependencias, sin servidor.
// Se abre con doble clic desde el escritorio o el celular y anda offline.
//
// El juego usa módulos ES, y los módulos no cargan desde file:// por CORS, así
// que acá se empaquetan todos en un script inline. `npm run exportar`.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const leer = (p) => readFileSync(join(raiz, p), 'utf8');
const tmp = join(raiz, 'dist', '.bundle.js');
mkdirSync(join(raiz, 'dist'), { recursive: true });

// 1. Empaquetar el grafo de módulos en un archivo plano
execFileSync(
  'npx',
  ['--yes', 'esbuild@0.24.0', 'src/main.js', '--bundle', '--format=iife',
   '--target=es2022', '--minify', '--legal-comments=none', `--outfile=${tmp}`],
  { cwd: raiz, stdio: ['ignore', 'ignore', 'inherit'] }
);
const js = readFileSync(tmp, 'utf8');
rmSync(tmp);

// 2. Tomar la marcación real del juego, no una copia
const html = leer('index.html');
const cuerpo = html.match(/<body>([\s\S]*?)<\/body>/)[1].replace(/\s*<script[\s\S]*?<\/script>\s*/g, '\n');
const titulo = html.match(/<title>([^<]*)<\/title>/)[1];
const css = leer('styles/main.css');

const salida = `<!DOCTYPE html>
<html lang="es-AR">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=1" />
<meta name="description" content="LA ROSCA — juego de gestión política con toques roguelike. Cuatro años, un país, dos opciones por vez." />
<meta name="theme-color" content="#14161b" />
<meta name="apple-mobile-web-app-capable" content="yes" />
<title>${titulo}</title>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎩</text></svg>" />
<style>
${css.trim()}
</style>
</head>
<body>
${cuerpo.trim()}
<script>
${js.trim()}
</script>
</body>
</html>
`;

const destino = join(raiz, 'dist', 'la-rosca.html');
writeFileSync(destino, salida);

const kb = (Buffer.byteLength(salida) / 1024).toFixed(0);
console.log(`dist/la-rosca.html — ${kb} kB, un solo archivo`);

for (const [que, mal] of [
  ['recursos externos', /(src|href)="(?!data:)[a-z]+:\/\//],
  ['referencias a src/', /["']src\/[a-z]/],
  ['imports sin resolver', /\bimport\s+[{*]/]
]) {
  if (mal.test(salida)) throw new Error(`el export quedó con ${que}`);
}
console.log('sin recursos externos ✓  sin módulos sueltos ✓  funciona offline ✓');
