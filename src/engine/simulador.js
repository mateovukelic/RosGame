// Simulador para balancear el juego sin tener que jugarlo mil veces a mano.
import { Juego } from './juego.js';
import { FASES, STATS } from './constantes.js';
import { valorEsperado } from './efectos.js';

// Cuánto "duele" un stat: mucho cerca de los bordes, poco en el medio.
function riesgo(valor) {
  const distancia = Math.min(valor, 100 - valor);
  return Math.pow(Math.max(0, 40 - distancia), 2);
}

function puntuar(stats, inflacion) {
  let malo = STATS.reduce((s, k) => s + riesgo(stats[k]), 0);
  malo += Math.pow(Math.max(0, inflacion - 55), 2) * 1.4;
  return -malo;
}

export const ESTRATEGIAS = {
  azar: (juego, rng) => (rng() < 0.5 ? 'izq' : 'der'),
  siempreIzq: () => 'izq',
  siempreDer: () => 'der',
  alternada: (juego) => (juego.estado.mesesTotales % 2 ? 'izq' : 'der'),
  // Evalúa las dos opciones y elige la que deja el país menos cerca de un borde.
  prudente: (juego) => {
    const { stats, inflacion } = juego.estado;
    let mejor = null;
    let mejorPuntaje = -Infinity;
    for (const lado of ['izq', 'der']) {
      const efectos = juego.carta[lado].efectos || {};
      const proyectado = {};
      for (const k of STATS) {
        proyectado[k] = Math.max(0, Math.min(100, stats[k] + valorEsperado(efectos[k])));
      }
      const inflacionProyectada = Math.max(0, Math.min(100, inflacion + valorEsperado(efectos.inflacion)));
      const puntaje = puntuar(proyectado, inflacionProyectada);
      if (puntaje > mejorPuntaje) {
        mejorPuntaje = puntaje;
        mejor = lado;
      }
    }
    return mejor;
  }
};

export function simularPartida({ semilla, gabinete = 'tecnico', estrategia = 'azar', rng = Math.random, maxTurnos = 400 }) {
  const juego = new Juego({ semilla, gabinete });
  const decidir = typeof estrategia === 'function' ? estrategia : ESTRATEGIAS[estrategia];
  let turnos = 0;
  while (!juego.terminado && turnos < maxTurnos) {
    if (juego.estado.fase === FASES.DECRETO) {
      const oferta = juego.estado.ofertaDecretos;
      juego.tomarDecreto(oferta[Math.floor(rng() * oferta.length)].id);
      continue;
    }
    juego.elegir(decidir(juego, rng));
    turnos++;
  }
  // Si sobrevivió un mandato entero, seguimos hasta que caiga o llegue a prócer.
  let mandatosCompletados = juego.estado.final?.tipo === 'gloria' ? 1 : 0;
  while (juego.puedeContinuar() && turnos < maxTurnos) {
    juego.continuarMandato();
    while (!juego.terminado && turnos < maxTurnos) {
      if (juego.estado.fase === FASES.DECRETO) {
        const oferta = juego.estado.ofertaDecretos;
        juego.tomarDecreto(oferta[Math.floor(rng() * oferta.length)].id);
        continue;
      }
      juego.elegir(decidir(juego, rng));
      turnos++;
    }
    if (juego.estado.final?.tipo === 'gloria') mandatosCompletados++;
  }
  return { ...juego.resumen(), mandatosCompletados };
}

export function simularLote({ partidas = 300, gabinete = 'tecnico', estrategia = 'azar', semillaBase = 'SIM' } = {}) {
  const resultados = [];
  for (let i = 0; i < partidas; i++) {
    // rng propio para las decisiones, así el mazo y la estrategia no se pisan
    let s = i * 2654435761 + 12345;
    const rng = () => {
      s = (s * 1103515245 + 12345) & 0x7fffffff;
      return s / 0x7fffffff;
    };
    resultados.push(simularPartida({ semilla: `${semillaBase}-${i}`, gabinete, estrategia, rng }));
  }

  const meses = resultados.map((r) => r.mesesTotales).sort((a, b) => a - b);
  const finales = {};
  for (const r of resultados) finales[r.final] = (finales[r.final] || 0) + 1;

  return {
    partidas,
    gabinete,
    estrategia,
    mediana: meses[Math.floor(meses.length / 2)],
    promedio: Math.round((meses.reduce((a, b) => a + b, 0) / meses.length) * 10) / 10,
    minimo: meses[0],
    maximo: meses[meses.length - 1],
    p10: meses[Math.floor(meses.length * 0.1)],
    p90: meses[Math.floor(meses.length * 0.9)],
    victorias: resultados.filter((r) => r.mandatosCompletados > 0).length,
    mandatosCompletados: resultados.reduce((a, r) => a + r.mandatosCompletados, 0),
    finales,
    finalesDistintos: Object.keys(finales).length
  };
}
