// Generador pseudoaleatorio determinístico (mulberry32).
// Misma semilla => misma partida. Indispensable para un roguelike con "seeds".

function hashSemilla(texto) {
  let h = 1779033703 ^ String(texto).length;
  for (let i = 0; i < String(texto).length; i++) {
    h = Math.imul(h ^ String(texto).charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

export function crearRng(semilla) {
  let a = typeof semilla === 'number' ? semilla >>> 0 : hashSemilla(semilla);
  const rng = () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  rng.entero = (min, max) => min + Math.floor(rng() * (max - min + 1));
  rng.elegir = (lista) => lista[Math.floor(rng() * lista.length)];
  rng.chance = (p) => rng() < p;
  rng.estado = () => a;
  rng.mezclar = (lista) => {
    const copia = lista.slice();
    for (let i = copia.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    return copia;
  };
  // Elección ponderada: recibe items con .peso (default 1)
  rng.ponderado = (items, peso = (x) => x.peso ?? 1) => {
    const total = items.reduce((s, x) => s + Math.max(0, peso(x)), 0);
    if (total <= 0) return items[Math.floor(rng() * items.length)];
    let tirada = rng() * total;
    for (const item of items) {
      tirada -= Math.max(0, peso(item));
      if (tirada <= 0) return item;
    }
    return items[items.length - 1];
  };
  return rng;
}

// Semillas legibles, tipo "MATE-7741"
const PALABRAS = [
  'MATE', 'ASADO', 'ROSCA', 'FACTURA', 'COLECTIVO', 'CHORI', 'PIQUETE', 'DOLAR',
  'FERNET', 'MILANESA', 'SIFON', 'TANGO', 'QUINIELA', 'ANDANDO', 'BONDI', 'CHAMUYO'
];

export function semillaAlAzar() {
  const palabra = PALABRAS[Math.floor(Math.random() * PALABRAS.length)];
  return `${palabra}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}
