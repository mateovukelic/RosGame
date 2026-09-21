#!/usr/bin/env node
// Reescribe SÓLO la prosa de las cartas (texto, respuestas y réplicas) dejando
// intacta toda la mecánica: efectos, flags, pesos, condiciones y la convención
// de lados. Se usa desde tools/prosa/*.mjs. No es parte del juego.
import { readFileSync, writeFileSync } from 'node:fs';

const esc = (s) => String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'");

function cierre(txt, i) {
  let prof = 0, j = i, cadena = false, q = '';
  while (j < txt.length) {
    const c = txt[j];
    if (cadena) {
      if (c === '\\') { j += 2; continue; }
      if (c === q) cadena = false;
    } else if (c === "'" || c === '"' || c === '`') { cadena = true; q = c; }
    else if (c === '{') prof++;
    else if (c === '}') { prof--; if (prof === 0) return j; }
    j++;
  }
  throw new Error('llave sin cerrar');
}

// Reemplaza `clave: '...'` dentro de un bloque; si no existe, lo agrega al final.
function ponerCampo(bloque, clave, valor) {
  const re = new RegExp(`${clave}: '(?:[^'\\\\]|\\\\.)*'`);
  if (re.test(bloque)) return bloque.replace(re, `${clave}: '${esc(valor)}'`);

  const cuerpo = bloque.slice(1, -1);
  if (cuerpo.includes('\n')) {
    const sangria = (cuerpo.match(/\n(\s*)\S/) || [, '      '])[1];
    const limpio = cuerpo.replace(/,?\s*$/, '');
    return `{${limpio},\n${sangria}${clave}: '${esc(valor)}'\n${sangria.slice(0, -2)}}`;
  }
  return `{${cuerpo.replace(/\s*$/, '')}, ${clave}: '${esc(valor)}' }`;
}

export function reescribir(ruta, cambios) {
  let txt = readFileSync(ruta, 'utf8');
  const aplicados = new Set();

  for (const [id, nuevo] of Object.entries(cambios)) {
    const marca = `id: '${id}',`;
    const pos = txt.indexOf(marca);
    if (pos < 0) continue;

    const abre = txt.lastIndexOf('{', pos);
    const fin = cierre(txt, abre);
    let carta = txt.slice(abre, fin + 1);

    for (const lado of ['izq', 'der']) {
      if (!nuevo[lado]) continue;
      const m = carta.match(new RegExp(`\\n\\s*${lado}: \\{`));
      const a = carta.indexOf('{', m.index + 1);
      const b = cierre(carta, a);
      let bloque = carta.slice(a, b + 1);
      if (nuevo[lado].texto) bloque = ponerCampo(bloque, 'texto', nuevo[lado].texto);
      if (nuevo[lado].replica) bloque = ponerCampo(bloque, 'replica', nuevo[lado].replica);
      carta = carta.slice(0, a) + bloque + carta.slice(b + 1);
    }

    if (nuevo.texto) {
      // El texto de la carta es el primer `texto:` que no está dentro de izq/der
      const corte = carta.search(/\n\s*izq: \{/);
      const cabeza = ponerCampo(carta.slice(0, corte) + '}', 'texto', nuevo.texto).slice(0, -1);
      carta = cabeza + carta.slice(corte);
    }

    txt = txt.slice(0, abre) + carta + txt.slice(fin + 1);
    aplicados.add(id);
  }

  writeFileSync(ruta, txt);
  return aplicados;
}

export function aplicar(ruta, cambios) {
  const hechos = reescribir(ruta, cambios);
  const faltan = Object.keys(cambios).filter((id) => !hechos.has(id));
  if (faltan.length) throw new Error(`no se encontraron en ${ruta}: ${faltan.join(', ')}`);
  console.log(`${ruta.split('/').pop()}: ${hechos.size} cartas reescritas`);
}
