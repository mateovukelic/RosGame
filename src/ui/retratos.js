// RETRATOS — ilustraciones vectoriales paramétricas para los personajes.
//
// No son dibujos sueltos: es un sistema de partes (cara, corte, barba, ojos,
// cejas, boca, prenda, accesorio) que se combinan. Agregar un personaje nuevo
// es escribir una receta en src/data/personajes.js, no dibujar un SVG.
//
// El módulo es puro: devuelve un string. Se puede testear en Node sin DOM.

// ---------------------------------------------------------------- paletas
export const PIELES = {
  clara: '#f0cba6',
  media: '#dfa97d',
  trigue: '#c78a5f',
  morena: '#a56b45',
  oscura: '#7d4e33',
  palida: '#f5d9bd'
};

export const PELOS = {
  negro: '#241c16',
  castano: '#4a3324',
  castanoClaro: '#7a5636',
  rubio: '#b98f4e',
  rojizo: '#8d4426',
  canoso: '#b3aca0',
  blanco: '#ddd6c8'
};

// ---------------------------------------------------------------- color utils
function aRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}
function aHex([r, g, b]) {
  return '#' + [r, g, b].map((n) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0')).join('');
}
export function mezclar(hexA, hexB, peso = 0.5) {
  const a = aRgb(hexA);
  const b = aRgb(hexB);
  return aHex(a.map((v, i) => v * (1 - peso) + b[i] * peso));
}
export const oscurecer = (hex, f = 0.25) => mezclar(hex, '#000000', f);
export const aclarar = (hex, f = 0.25) => mezclar(hex, '#ffffff', f);

// ---------------------------------------------------------------- geometría
const CX = 50;
const CY = 45;

export const CARAS = {
  ovalada: { rx: 21, ry: 25.5 },
  redonda: { rx: 23.5, ry: 23 },
  cuadrada: { rx: 22, ry: 24.5, esquina: 9 },
  angosta: { rx: 18.5, ry: 26 }
};

function formaCabeza(cara, piel) {
  const f = CARAS[cara];
  if (f.esquina) {
    return `<rect x="${CX - f.rx}" y="${CY - f.ry}" width="${f.rx * 2}" height="${f.ry * 2}" rx="${f.esquina}" fill="${piel}"/>`;
  }
  return `<ellipse cx="${CX}" cy="${CY}" rx="${f.rx}" ry="${f.ry}" fill="${piel}"/>`;
}

// ---------------------------------------------------------------- pelo
// Casquete que cubre desde la coronilla hasta la línea del pelo.
function casquete(rx, ry, altura = 6, hairline = 8) {
  const x0 = CX - rx - 1;
  const x1 = CX + rx + 1;
  const yBase = CY - 5;
  const yTope = CY - ry - altura;
  return (
    `M${x0},${yBase} C${x0},${yTope} ${x1},${yTope} ${x1},${yBase}` +
    ` L${x1 - 3},${yBase - 5} C${CX + 9},${CY - ry + hairline} ${CX - 9},${CY - ry + hairline} ${x0 + 3},${yBase - 5} Z`
  );
}

export const CORTES = {
  calvo: () => '',
  corto: ({ rx, ry, pelo }) => `<path d="${casquete(rx, ry, 4, 7)}" fill="${pelo}"/>`,
  raya: ({ rx, ry, pelo }) =>
    `<path d="${casquete(rx, ry, 5, 7)}" fill="${pelo}"/>` +
    `<path d="M${CX - rx + 2},${CY - ry + 6} C${CX - 6},${CY - ry - 2} ${CX + 12},${CY - ry + 1} ${CX + rx - 1},${CY - ry + 9}` +
    ` L${CX + rx - 1},${CY - ry + 3} C${CX + 8},${CY - ry - 6} ${CX - 8},${CY - ry - 5} ${CX - rx + 2},${CY - ry + 2} Z" fill="${oscurecer('#ffffff', 0)}" opacity="0"/>`,
  entradas: ({ rx, ry, pelo }) =>
    `<path d="M${CX - rx - 1},${CY - 4} C${CX - rx - 1},${CY - ry - 3} ${CX + rx + 1},${CY - ry - 3} ${CX + rx + 1},${CY - 4}` +
    ` L${CX + rx - 2},${CY - 8} C${CX + rx - 4},${CY - ry + 2} ${CX + 7},${CY - ry - 1} ${CX},${CY - ry - 1}` +
    ` C${CX - 7},${CY - ry - 1} ${CX - rx + 4},${CY - ry + 2} ${CX - rx + 2},${CY - 8} Z" fill="${pelo}"/>`,
  jopo: ({ rx, ry, pelo }) =>
    `<path d="${casquete(rx, ry, 5, 8)}" fill="${pelo}"/>` +
    `<path d="M${CX - 12},${CY - ry - 2} C${CX - 6},${CY - ry - 15} ${CX + 16},${CY - ry - 13} ${CX + 13},${CY - ry + 2}` +
    ` C${CX + 8},${CY - ry - 5} ${CX - 2},${CY - ry - 6} ${CX - 12},${CY - ry - 2} Z" fill="${pelo}"/>`,
  rulos: ({ rx, ry, pelo }) => {
    let bolas = '';
    for (let i = 0; i <= 8; i++) {
      const a = Math.PI + (Math.PI * i) / 8;
      const x = CX + Math.cos(a) * (rx + 1);
      const y = CY + Math.sin(a) * (ry + 1);
      bolas += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.5" fill="${pelo}"/>`;
    }
    return bolas + `<path d="${casquete(rx, ry, 3, 9)}" fill="${pelo}"/>`;
  },
  media: ({ rx, ry, pelo }) =>
    `<path d="M${CX - rx - 3},${CY + 14} C${CX - rx - 5},${CY - ry - 6} ${CX + rx + 5},${CY - ry - 6} ${CX + rx + 3},${CY + 14}` +
    ` L${CX + rx - 1},${CY + 12} C${CX + rx + 1},${CY - ry + 4} ${CX + 10},${CY - ry + 7} ${CX},${CY - ry + 7}` +
    ` C${CX - 10},${CY - ry + 7} ${CX - rx - 1},${CY - ry + 4} ${CX - rx + 1},${CY + 12} Z" fill="${pelo}"/>`,
  largo: ({ rx, ry, pelo }) =>
    `<path d="${casquete(rx, ry, 5, 9)}" fill="${pelo}"/>` +
    `<path d="M${CX - rx - 2},${CY - 6} C${CX - rx - 6},${CY + 16} ${CX - rx - 4},${CY + 24} ${CX - rx - 1},${CY + 30}` +
    ` L${CX - rx + 6},${CY + 28} C${CX - rx + 2},${CY + 14} ${CX - rx + 2},${CY + 4} ${CX - rx + 2},${CY - 6} Z" fill="${pelo}"/>` +
    `<path d="M${CX + rx + 2},${CY - 6} C${CX + rx + 6},${CY + 16} ${CX + rx + 4},${CY + 24} ${CX + rx + 1},${CY + 30}` +
    ` L${CX + rx - 6},${CY + 28} C${CX + rx - 2},${CY + 14} ${CX + rx - 2},${CY + 4} ${CX + rx - 2},${CY - 6} Z" fill="${pelo}"/>`,
  recogido: ({ rx, ry, pelo }) =>
    `<circle cx="${CX}" cy="${CY - ry - 6}" r="9" fill="${oscurecer(pelo, 0.12)}"/>` +
    `<path d="${casquete(rx, ry, 4, 8)}" fill="${pelo}"/>`,
  cola: ({ rx, ry, pelo }) => `<path d="${casquete(rx, ry, 4, 7)}" fill="${pelo}"/>`
};

// Parte del pelo que va DETRÁS de la cabeza y los hombros.
export const CORTES_TRASEROS = {
  largo: ({ rx, ry, pelo }) =>
    `<path d="M${CX},${CY - ry - 4} C${CX - rx - 12},${CY - ry} ${CX - rx - 9},${CY + 30} ${CX - rx - 5},${CY + 36}` +
    ` L${CX + rx + 5},${CY + 36} C${CX + rx + 9},${CY + 30} ${CX + rx + 12},${CY - ry} ${CX},${CY - ry - 4} Z" fill="${oscurecer(pelo, 0.15)}"/>`,
  media: ({ rx, ry, pelo }) =>
    `<path d="M${CX},${CY - ry - 3} C${CX - rx - 8},${CY - ry} ${CX - rx - 6},${CY + 12} ${CX - rx - 4},${CY + 18}` +
    ` L${CX + rx + 4},${CY + 18} C${CX + rx + 6},${CY + 12} ${CX + rx + 8},${CY - ry} ${CX},${CY - ry - 3} Z" fill="${oscurecer(pelo, 0.15)}"/>`,
  rulos: ({ rx, ry, pelo }) =>
    `<circle cx="${CX}" cy="${CY - 4}" r="${rx + 7}" fill="${oscurecer(pelo, 0.15)}"/>`,
  cola: ({ rx, pelo }) =>
    // Se dibuja detrás de la cabeza: el rodete asoma por fuera de la silueta.
    `<circle cx="${CX + rx + 4}" cy="${CY - 6}" r="7.5" fill="${oscurecer(pelo, 0.12)}"/>` +
    `<path d="M${CX + rx - 1},${CY - 1} C${CX + rx + 13},${CY + 3} ${CX + rx + 11},${CY + 15} ${CX + rx + 5},${CY + 21}` +
    ` L${CX + rx - 2},${CY + 16} C${CX + rx + 4},${CY + 10} ${CX + rx + 4},${CY + 4} ${CX + rx - 4},${CY + 2} Z" fill="${oscurecer(pelo, 0.12)}"/>`
};

// ---------------------------------------------------------------- barba
export const BARBAS = {
  no: () => '',
  sombra: ({ rx, ry, pelo }) =>
    `<path d="M${CX - rx + 1},${CY + 2} C${CX - rx + 1},${CY + ry} ${CX + rx - 1},${CY + ry} ${CX + rx - 1},${CY + 2}` +
    ` C${CX + rx - 1},${CY + ry - 2} ${CX - rx + 1},${CY + ry - 2} ${CX - rx + 1},${CY + 2} Z" fill="${pelo}" opacity=".28"/>`,
  bigote: ({ pelo }) =>
    `<path d="M${CX - 9},${CY + 9} C${CX - 5},${CY + 6} ${CX + 5},${CY + 6} ${CX + 9},${CY + 9}` +
    ` C${CX + 5},${CY + 12.5} ${CX - 5},${CY + 12.5} ${CX - 9},${CY + 9} Z" fill="${pelo}"/>`,
  chivo: ({ pelo }) =>
    `<path d="M${CX - 4.5},${CY + 15} h9 v5 q-4.5,3 -9,0 z" fill="${pelo}"/>`,
  candado: ({ pelo, piel }) =>
    `<path d="M${CX - 10},${CY + 9} C${CX - 6},${CY + 6} ${CX + 6},${CY + 6} ${CX + 10},${CY + 9}` +
    ` C${CX + 11},${CY + 17} ${CX + 7},${CY + 22} ${CX},${CY + 22}` +
    ` C${CX - 7},${CY + 22} ${CX - 11},${CY + 17} ${CX - 10},${CY + 9} Z" fill="${pelo}"/>` +
    `<ellipse cx="${CX}" cy="${CY + 14}" rx="6.6" ry="4.4" fill="${piel}"/>`,
  tupida: ({ rx, ry, pelo, piel }) =>
    `<path d="M${CX - rx - 1},${CY + 1} C${CX - rx - 2},${CY + ry + 6} ${CX + rx + 2},${CY + ry + 6} ${CX + rx + 1},${CY + 1}` +
    ` C${CX + rx + 1},${CY + 9} ${CX - rx - 1},${CY + 9} ${CX - rx - 1},${CY + 1} Z" fill="${pelo}"/>` +
    `<ellipse cx="${CX}" cy="${CY + 14}" rx="7" ry="4.6" fill="${piel}"/>`
};

// ---------------------------------------------------------------- rasgos
const OJO_Y = CY + 1;
const OJO_DX = 8.5;

export const OJOS = {
  normal: ({ tinta }) =>
    [-1, 1]
      .map(
        (s) =>
          `<ellipse cx="${CX + s * OJO_DX}" cy="${OJO_Y}" rx="2.7" ry="3.1" fill="${tinta}"/>` +
          `<circle cx="${CX + s * OJO_DX + 0.9}" cy="${OJO_Y - 1}" r=".9" fill="#ffffff" opacity=".8"/>`
      )
      .join(''),
  grande: ({ tinta }) =>
    [-1, 1]
      .map(
        (s) =>
          `<ellipse cx="${CX + s * OJO_DX}" cy="${OJO_Y}" rx="3.6" ry="4" fill="#ffffff"/>` +
          `<circle cx="${CX + s * OJO_DX}" cy="${OJO_Y + 0.3}" r="2.2" fill="${tinta}"/>` +
          `<circle cx="${CX + s * OJO_DX + 1}" cy="${OJO_Y - 1}" r=".9" fill="#ffffff"/>`
      )
      .join(''),
  entrecerrado: ({ tinta }) =>
    [-1, 1]
      .map(
        (s) =>
          `<path d="M${CX + s * OJO_DX - 3.2},${OJO_Y + 0.6} a3.2,3.2 0 0 0 6.4,0 z" fill="${tinta}"/>` +
          `<path d="M${CX + s * OJO_DX - 3.8},${OJO_Y + 0.4} q3.8,-3.4 7.6,0" fill="none" stroke="${tinta}" stroke-width="1.7" stroke-linecap="round"/>`
      )
      .join(''),
  cansado: ({ tinta }) =>
    [-1, 1]
      .map(
        (s) =>
          `<ellipse cx="${CX + s * OJO_DX}" cy="${OJO_Y}" rx="2.5" ry="2.7" fill="${tinta}"/>` +
          `<path d="M${CX + s * OJO_DX - 3.4},${OJO_Y + 4.2} q3.4,2 6.8,0" fill="none" stroke="${tinta}" stroke-width="1" opacity=".45" stroke-linecap="round"/>`
      )
      .join('')
};

export const CEJAS = {
  neutra: ({ pelo }) =>
    [-1, 1]
      .map(
        (s) =>
          `<path d="M${CX + s * OJO_DX - 4.5},${OJO_Y - 7} q4.5,-2.2 9,0" fill="none" stroke="${pelo}" stroke-width="2.1" stroke-linecap="round"/>`
      )
      .join(''),
  enojada: ({ pelo }) =>
    [-1, 1]
      .map(
        (s) =>
          `<path d="M${CX + s * OJO_DX - s * 4.5},${OJO_Y - 8.6} L${CX + s * OJO_DX + s * 4.5},${OJO_Y - 5.6}" fill="none" stroke="${pelo}" stroke-width="2.3" stroke-linecap="round"/>`
      )
      .join(''),
  alta: ({ pelo }) =>
    [-1, 1]
      .map(
        (s) =>
          `<path d="M${CX + s * OJO_DX - 4.5},${OJO_Y - 9.5} q4.5,-3 9,-.5" fill="none" stroke="${pelo}" stroke-width="2" stroke-linecap="round"/>`
      )
      .join(''),
  cansada: ({ pelo }) =>
    [-1, 1]
      .map(
        (s) =>
          `<path d="M${CX + s * OJO_DX - s * 4.5},${OJO_Y - 6.2} L${CX + s * OJO_DX + s * 4.5},${OJO_Y - 8.4}" fill="none" stroke="${pelo}" stroke-width="2" stroke-linecap="round"/>`
      )
      .join('')
};

export const BOCAS = {
  neutra: ({ tinta }) =>
    `<path d="M${CX - 5.5},${CY + 14} q5.5,1.6 11,0" fill="none" stroke="${tinta}" stroke-width="1.9" stroke-linecap="round"/>`,
  seria: ({ tinta }) =>
    `<path d="M${CX - 6},${CY + 14} h12" fill="none" stroke="${tinta}" stroke-width="1.9" stroke-linecap="round"/>`,
  sonrisa: ({ tinta }) =>
    `<path d="M${CX - 7},${CY + 12.5} q7,6.5 14,0" fill="none" stroke="${tinta}" stroke-width="2" stroke-linecap="round"/>`,
  mueca: ({ tinta }) =>
    `<path d="M${CX - 6.5},${CY + 15.5} q6.5,-4.5 13,-1" fill="none" stroke="${tinta}" stroke-width="1.9" stroke-linecap="round"/>`,
  abierta: ({ tinta }) =>
    `<ellipse cx="${CX}" cy="${CY + 14.5}" rx="4.6" ry="3.6" fill="${tinta}"/>` +
    `<path d="M${CX - 3.2},${CY + 13.2} q3.2,-1.6 6.4,0" fill="#ffffff" opacity=".85"/>`
};

function nariz(piel) {
  return `<path d="M${CX - 1.5},${CY + 4} q1.5,4 3,0" fill="none" stroke="${oscurecer(piel, 0.3)}" stroke-width="1.7" stroke-linecap="round"/>`;
}

// ---------------------------------------------------------------- prendas
const HOMBROS = `M2,100 C2,80 24,70 50,70 C76,70 98,80 98,100 Z`;

function cuelloV(tela) {
  return `<path d="M${CX - 10},${CY + 26} L${CX},${CY + 40} L${CX + 10},${CY + 26} C${CX + 4},${CY + 30} ${CX - 4},${CY + 30} ${CX - 10},${CY + 26} Z" fill="${tela}"/>`;
}

export const PRENDAS = {
  traje: ({ tela, piel }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 11},${CY + 25} L${CX},${CY + 55} L${CX + 11},${CY + 25} C${CX + 5},${CY + 30} ${CX - 5},${CY + 30} ${CX - 11},${CY + 25} Z" fill="#f2efe6"/>` +
    `<path d="M${CX - 12},${CY + 25} L${CX - 3},${CY + 55} L${CX - 16},${CY + 55} C${CX - 20},${CY + 40} ${CX - 18},${CY + 30} ${CX - 12},${CY + 25} Z" fill="${oscurecer(tela, 0.22)}"/>` +
    `<path d="M${CX + 12},${CY + 25} L${CX + 3},${CY + 55} L${CX + 16},${CY + 55} C${CX + 20},${CY + 40} ${CX + 18},${CY + 30} ${CX + 12},${CY + 25} Z" fill="${oscurecer(tela, 0.22)}"/>` +
    `<path d="M${CX - 3},${CY + 33} L${CX + 3},${CY + 33} L${CX + 4.5},${CY + 55} L${CX - 4.5},${CY + 55} Z" fill="${oscurecer('#8d2f2f', 0)}"/>`,
  camisa: ({ tela }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 10},${CY + 25} L${CX},${CY + 38} L${CX + 10},${CY + 25} C${CX + 4},${CY + 29} ${CX - 4},${CY + 29} ${CX - 10},${CY + 25} Z" fill="${oscurecer(tela, 0.18)}"/>` +
    `<path d="M${CX - 1},${CY + 38} h2 v${CY + 55 - (CY + 38)} h-2 z" fill="${oscurecer(tela, 0.18)}"/>`,
  chomba: ({ tela }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 9},${CY + 25} L${CX - 2},${CY + 36} L${CX - 11},${CY + 33} Z" fill="${oscurecer(tela, 0.2)}"/>` +
    `<path d="M${CX + 9},${CY + 25} L${CX + 2},${CY + 36} L${CX + 11},${CY + 33} Z" fill="${oscurecer(tela, 0.2)}"/>`,
  remera: ({ tela }) => `<path d="${HOMBROS}" fill="${tela}"/>` + cuelloV(oscurecer(tela, 0.2)),
  sweater: ({ tela }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 11},${CY + 25} q11,10 22,0 q-11,16 -22,0 z" fill="${oscurecer(tela, 0.22)}"/>` +
    `<path d="M14,86 h72" stroke="${oscurecer(tela, 0.14)}" stroke-width="2.4" fill="none"/>`,
  campera: ({ tela }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 2},${CY + 26} h4 v29 h-4 z" fill="${aclarar(tela, 0.35)}"/>` +
    `<path d="M${CX - 12},${CY + 25} L${CX - 3},${CY + 32} L${CX - 3},${CY + 55} L${CX - 17},${CY + 55} Z" fill="${oscurecer(tela, 0.16)}"/>` +
    `<path d="M${CX + 12},${CY + 25} L${CX + 3},${CY + 32} L${CX + 3},${CY + 55} L${CX + 17},${CY + 55} Z" fill="${oscurecer(tela, 0.16)}"/>`,
  buzo: ({ tela }) =>
    `<path d="M${CX - 30},${CY + 22} C${CX - 22},${CY + 4} ${CX + 22},${CY + 4} ${CX + 30},${CY + 22} L${CX + 24},${CY + 30} L${CX - 24},${CY + 30} Z" fill="${oscurecer(tela, 0.18)}"/>` +
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 11},${CY + 25} q11,9 22,0 q-11,15 -22,0 z" fill="${oscurecer(tela, 0.25)}"/>` +
    `<circle cx="${CX - 5}" cy="${CY + 40}" r="1.8" fill="${aclarar(tela, 0.5)}"/>` +
    `<circle cx="${CX + 5}" cy="${CY + 40}" r="1.8" fill="${aclarar(tela, 0.5)}"/>`,
  guardapolvo: () =>
    `<path d="${HOMBROS}" fill="#f3f1ea"/>` +
    `<path d="M${CX - 11},${CY + 25} L${CX},${CY + 42} L${CX + 11},${CY + 25} C${CX + 5},${CY + 29} ${CX - 5},${CY + 29} ${CX - 11},${CY + 25} Z" fill="#dedbd1"/>` +
    `<path d="M${CX - 1},${CY + 42} h2 v13 h-2 z" fill="#c9c6bb"/>` +
    `<circle cx="${CX}" cy="${CY + 47}" r="1.5" fill="#b5b2a7"/>`,
  sotana: () =>
    `<path d="${HOMBROS}" fill="#25262b"/>` +
    `<path d="M${CX - 9},${CY + 25} q9,7 18,0 q-9,12 -18,0 z" fill="#17181c"/>` +
    `<rect x="${CX - 5}" y="${CY + 26}" width="10" height="6" rx="1.5" fill="#f2efe6"/>`,
  toga: () =>
    `<path d="${HOMBROS}" fill="#1d1e23"/>` +
    `<path d="M${CX - 11},${CY + 24} L${CX - 6},${CY + 55} L${CX + 6},${CY + 55} L${CX + 11},${CY + 24}` +
    ` C${CX + 5},${CY + 29} ${CX - 5},${CY + 29} ${CX - 11},${CY + 24} Z" fill="#f2efe6"/>` +
    `<path d="M${CX - 1},${CY + 30} h2 v25 h-2 z" fill="#d6d3c8"/>`,
  uniforme: ({ tela }) =>
    `<path d="${HOMBROS}" fill="${tela}"/>` +
    `<path d="M${CX - 11},${CY + 25} L${CX},${CY + 42} L${CX + 11},${CY + 25} C${CX + 5},${CY + 29} ${CX - 5},${CY + 29} ${CX - 11},${CY + 25} Z" fill="${oscurecer(tela, 0.25)}"/>` +
    `<rect x="12" y="76" width="18" height="6" rx="2" fill="${aclarar(tela, 0.3)}"/>` +
    `<rect x="70" y="76" width="18" height="6" rx="2" fill="${aclarar(tela, 0.3)}"/>` +
    `<circle cx="${CX + 14}" cy="${CY + 38}" r="2.2" fill="#d8a657"/>` +
    `<circle cx="${CX + 14}" cy="${CY + 46}" r="2.2" fill="#d8a657"/>`,
  camiseta: ({ tela, uid }) => {
    const franjas = [-18, -6, 6].map((x) => `<rect x="${CX + x}" y="62" width="6" height="40" fill="${tela}"/>`).join('');
    return (
      `<path d="${HOMBROS}" fill="#f2efe6"/>` +
      `<g clip-path="url(#${uid}-hombros)">${franjas}</g>` +
      cuelloV('#d9d5c9')
    );
  }
};

// ---------------------------------------------------------------- accesorios
export const ACCESORIOS = {
  no: () => '',
  anteojos: ({ tinta }) =>
    `<g fill="none" stroke="${tinta}" stroke-width="1.9">` +
    `<rect x="${CX - OJO_DX - 5.5}" y="${OJO_Y - 4.6}" width="11" height="9.4" rx="2.2" fill="#ffffff" fill-opacity=".14"/>` +
    `<rect x="${CX + OJO_DX - 5.5}" y="${OJO_Y - 4.6}" width="11" height="9.4" rx="2.2" fill="#ffffff" fill-opacity=".14"/>` +
    `<path d="M${CX - 3},${OJO_Y} h6"/></g>`,
  anteojos_redondos: ({ tinta }) =>
    `<g fill="none" stroke="${tinta}" stroke-width="1.8">` +
    `<circle cx="${CX - OJO_DX}" cy="${OJO_Y}" r="5.4" fill="#ffffff" fill-opacity=".14"/>` +
    `<circle cx="${CX + OJO_DX}" cy="${OJO_Y}" r="5.4" fill="#ffffff" fill-opacity=".14"/>` +
    `<path d="M${CX - 3.1},${OJO_Y} h6.2"/></g>`,
  anteojos_oscuros: ({ tinta }) =>
    `<path d="M${CX - OJO_DX - 6},${OJO_Y - 4.5} h12.5 v6 q0,4.5 -6.2,4.5 q-6.3,0 -6.3,-5 z" fill="${tinta}"/>` +
    `<path d="M${CX + OJO_DX - 6.5},${OJO_Y - 4.5} h12.5 v5.5 q0,5 -6.3,5 q-6.2,0 -6.2,-4.5 z" fill="${tinta}"/>` +
    `<path d="M${CX - 3},${OJO_Y - 3} h6" stroke="${tinta}" stroke-width="2"/>`,
  gorra: ({ rx, ry, tela }) =>
    `<path d="M${CX - rx - 2},${CY - ry + 6} C${CX - rx - 2},${CY - ry - 12} ${CX + rx + 2},${CY - ry - 12} ${CX + rx + 2},${CY - ry + 6} Z" fill="${tela}"/>` +
    `<path d="M${CX - rx - 1},${CY - ry + 3} C${CX - rx - 19},${CY - ry + 3} ${CX - rx - 18},${CY - ry + 12} ${CX - rx - 1},${CY - ry + 10} Z" fill="${oscurecer(tela, 0.3)}"/>` +
    `<rect x="${CX - rx - 3}" y="${CY - ry + 2}" width="${rx * 2 + 6}" height="5" rx="2.2" fill="${oscurecer(tela, 0.18)}"/>` +
    `<circle cx="${CX}" cy="${CY - ry - 9}" r="2.2" fill="${oscurecer(tela, 0.28)}"/>`,
  boina: ({ rx, ry, tela }) =>
    `<path d="M${CX - rx - 4},${CY - ry + 5} C${CX - rx - 4},${CY - ry - 13} ${CX + rx + 6},${CY - ry - 11} ${CX + rx},${CY - ry + 4} Z" fill="${tela}"/>` +
    `<circle cx="${CX + 2}" cy="${CY - ry - 9}" r="2.4" fill="${oscurecer(tela, 0.3)}"/>`,
  sombrero: ({ rx, ry, tela }) =>
    `<ellipse cx="${CX}" cy="${CY - ry + 3}" rx="${rx + 12}" ry="5.5" fill="${oscurecer(tela, 0.18)}"/>` +
    `<path d="M${CX - rx + 1},${CY - ry + 3} C${CX - rx + 1},${CY - ry - 15} ${CX + rx - 1},${CY - ry - 15} ${CX + rx - 1},${CY - ry + 3} Z" fill="${tela}"/>` +
    `<rect x="${CX - rx + 1}" y="${CY - ry - 3}" width="${rx * 2 - 2}" height="4.5" fill="${oscurecer(tela, 0.35)}"/>`,
  gorro_lana: ({ rx, ry, tela }) =>
    `<path d="M${CX - rx - 2},${CY - ry + 6} C${CX - rx - 2},${CY - ry - 14} ${CX + rx + 2},${CY - ry - 14} ${CX + rx + 2},${CY - ry + 6} Z" fill="${tela}"/>` +
    `<rect x="${CX - rx - 3}" y="${CY - ry + 2}" width="${rx * 2 + 6}" height="6" rx="3" fill="${aclarar(tela, 0.25)}"/>`,
  vincha: ({ rx, ry, tela }) =>
    `<path d="M${CX - rx - 1},${CY - ry + 9} C${CX - rx},${CY - ry + 1} ${CX + rx},${CY - ry + 1} ${CX + rx + 1},${CY - ry + 9}` +
    ` C${CX + rx},${CY - ry + 4} ${CX - rx},${CY - ry + 4} ${CX - rx - 1},${CY - ry + 9} Z" fill="${tela}"/>`,
  auriculares: ({ rx, ry, tinta }) =>
    `<path d="M${CX - rx - 2},${CY + 1} C${CX - rx - 2},${CY - ry - 8} ${CX + rx + 2},${CY - ry - 8} ${CX + rx + 2},${CY + 1}" fill="none" stroke="${tinta}" stroke-width="3"/>` +
    `<rect x="${CX - rx - 6}" y="${CY - 4}" width="7" height="12" rx="3" fill="${tinta}"/>` +
    `<rect x="${CX + rx - 1}" y="${CY - 4}" width="7" height="12" rx="3" fill="${tinta}"/>` +
    `<path d="M${CX - rx - 3},${CY + 6} q-4,10 6,12" fill="none" stroke="${tinta}" stroke-width="2"/>` +
    `<circle cx="${CX - rx + 5}" cy="${CY + 19}" r="2.4" fill="${tinta}"/>`,
  // Solideo morado y cruz pectoral: el obispo, no el cura del barrio.
  solideo: ({ ry, tela }) =>
    `<path d="M${CX - 10},${CY - ry + 3} C${CX - 10},${CY - ry - 6} ${CX + 10},${CY - ry - 6} ${CX + 10},${CY - ry + 3} Z" fill="${tela}"/>` +
    `<path d="M${CX},${CY + 35} v10 M${CX - 4},${CY + 39} h8" fill="none" stroke="#d8a657" stroke-width="2.4" stroke-linecap="round"/>`,
  aros: ({ rx }) =>
    [-1, 1]
      .map((s) => `<circle cx="${CX + s * (rx + 1)}" cy="${CY + 9}" r="2.6" fill="#d8a657"/>`)
      .join('')
};

// ---------------------------------------------------------------- armado
const PREDETERMINADO = {
  cara: 'ovalada',
  piel: 'media',
  pelo: 'castano',
  corte: 'corto',
  barba: 'no',
  ojos: 'normal',
  ceja: 'neutra',
  boca: 'neutra',
  prenda: 'camisa',
  tela: '#4a5568',
  accesorio: 'no',
  accesorioColor: '#3a3f4b'
};

const TINTA = '#2a2620';

/**
 * Devuelve el SVG de un retrato como string.
 * @param {object} receta  partes del personaje (ver PREDETERMINADO)
 * @param {object} opciones  { fondo, uid }
 */
export function retratoSvg(receta = {}, { fondo = '#6b6b6b', uid = 'r' } = {}) {
  const r = { ...PREDETERMINADO, ...receta };
  const forma = CARAS[r.cara] || CARAS.ovalada;
  const piel = PIELES[r.piel] || r.piel;
  const pelo = PELOS[r.pelo] || r.pelo;

  const ctx = {
    rx: forma.rx,
    ry: forma.ry,
    piel,
    pelo,
    tinta: TINTA,
    tela: r.tela,
    fondo,
    uid
  };
  const ctxAccesorio = { ...ctx, tela: r.accesorioColor || oscurecer(r.tela, 0.3) };

  const parte = (catalogo, nombre, contexto = ctx) => {
    const fn = catalogo[nombre];
    return fn ? fn(contexto) : '';
  };

  const capas = [
    `<circle cx="50" cy="50" r="50" fill="${fondo}"/>`,
    `<circle cx="50" cy="52" r="46" fill="${aclarar(fondo, 0.12)}" opacity=".5"/>`,
    parte(CORTES_TRASEROS, r.corte),
    `<path d="M${CX - 8},${CY + 16} h16 v14 q-8,6 -16,0 z" fill="${oscurecer(piel, 0.18)}"/>`,
    parte(PRENDAS, r.prenda),
    formaCabeza(r.cara, piel),
    `<ellipse cx="${CX - forma.rx}" cy="${CY + 5}" rx="3" ry="4" fill="${oscurecer(piel, 0.1)}"/>`,
    `<ellipse cx="${CX + forma.rx}" cy="${CY + 5}" rx="3" ry="4" fill="${oscurecer(piel, 0.1)}"/>`,
    parte(CEJAS, r.ceja),
    parte(OJOS, r.ojos),
    nariz(piel),
    parte(BARBAS, r.barba),
    parte(BOCAS, r.boca),
    parte(CORTES, r.corte),
    parte(ACCESORIOS, r.accesorio, ctxAccesorio)
  ];

  return (
    `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" class="retrato">` +
    `<defs><clipPath id="${uid}-hombros"><path d="${HOMBROS}"/></clipPath>` +
    `<clipPath id="${uid}-circulo"><circle cx="50" cy="50" r="50"/></clipPath></defs>` +
    `<g clip-path="url(#${uid}-circulo)">${capas.join('')}</g>` +
    `</svg>`
  );
}

export const CATALOGOS = {
  cara: CARAS,
  piel: PIELES,
  pelo: PELOS,
  corte: CORTES,
  barba: BARBAS,
  ojos: OJOS,
  ceja: CEJAS,
  boca: BOCAS,
  prenda: PRENDAS,
  accesorio: ACCESORIOS
};
