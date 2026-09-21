// Ata cada decisión con su consecuencia futura. Sólo agrega `siembra`.
import { readFileSync, writeFileSync } from 'node:fs';

const SIEMBRAS = {
  'calle.js': {
    villa_urbanizacion: { der: { carta: 'cloacas_listas', meses: [10, 16] } }
  },
  'base.js': {
    maestra: { der: { carta: 'escuelas_gas', meses: [10, 14] } },
    cientifica: { der: { carta: 'ciencia_rinde', meses: [14, 20] } },
    puntero_padron: { der: { carta: 'cuenta_micros', meses: [6, 10] } }
  },
  'rosca.js': {
    ley_estrella: { der: { carta: 'favor_legislativo', meses: [8, 14] } }
  },
  'eventos.js': {
    satelite: { der: { carta: 'satelite_arriba', meses: [16, 22] } },
    brote_dengue: { der: { carta: 'demanda_importador', meses: [12, 18] } },
    bajante: { izq: { carta: 'puerto_rinde', meses: [8, 12] } },
    contenedor: { izq: { carta: 'juicio_contenedor', meses: [10, 16] } },
    plaga_fruta: { izq: { carta: 'plaga_vuelve', meses: [10, 14] } }
  }
};

for (const [archivo, cartas] of Object.entries(SIEMBRAS)) {
  const ruta = new URL(`../../src/data/cartas/${archivo}`, import.meta.url).pathname;
  let txt = readFileSync(ruta, 'utf8');
  for (const [id, lados] of Object.entries(cartas)) {
    for (const [lado, semilla] of Object.entries(lados)) {
      if (txt.includes(`carta: '${semilla.carta}'`)) continue; // ya conectada
      const pos = txt.indexOf(`id: '${id}',`);
      if (pos < 0) throw new Error(`falta ${id} en ${archivo}`);
      const marca = txt.indexOf(`\n    ${lado}: {`, pos);
      const abre = txt.indexOf('{', marca + 1);
      const linea = `\n      siembra: { carta: '${semilla.carta}', meses: [${semilla.meses}] },`;
      txt = txt.slice(0, abre + 1) + linea + txt.slice(abre + 1);
    }
  }
  writeFileSync(ruta, txt);
  console.log(`${archivo}: siembras conectadas`);
}
