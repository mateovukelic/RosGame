import { STATS, META_STATS, META_INFLACION } from '../engine/constantes.js';
import { crear, $ } from './dom.js';

// Medio ancho de la banda, en puntos de barra. No es la magnitud real: es la
// categoría, para no filtrar el número exacto junto con el tamaño.
const ANCHO_PISTA = { leve: 3, medio: 7, fuerte: 13 };
const PUNTOS = { leve: '·', medio: '··', fuerte: '···' };

export class Hud {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.valores = {};
    this.medidores = {};
    for (const stat of STATS) {
      const meta = META_STATS[stat];
      const relleno = crear('div', { clase: 'medidor-relleno' });
      const fantasma = crear('div', { clase: 'medidor-fantasma' });
      const delta = crear('div', { clase: 'medidor-delta' });
      const medidor = crear('div', { clase: 'medidor', title: `${meta.nombre}: ${meta.desc}` }, [
        crear('div', { clase: 'medidor-icono', texto: meta.icono }),
        delta,
        crear('div', { clase: 'medidor-barra' }, [relleno, fantasma]),
        crear('div', { clase: 'medidor-nombre', texto: meta.nombre })
      ]);
      this.medidores[stat] = { raiz: medidor, relleno, fantasma, delta };
      contenedor.append(medidor);
    }
  }

  pintar(valores) {
    this.valores = valores;
    for (const stat of STATS) {
      const valor = valores[stat];
      const { raiz, relleno } = this.medidores[stat];
      relleno.style.width = `${valor}%`;
      raiz.classList.toggle('peligro', valor <= 20);
      raiz.classList.toggle('exceso', valor >= 82);
      raiz.title = `${META_STATS[stat].nombre}: ${valor}/100 — ${META_STATS[stat].desc}`;
    }
  }

  // Muestra los cambios del último turno con un golpe visual.
  golpear(deltas) {
    for (const stat of STATS) {
      const delta = Math.round(deltas?.[stat] ?? 0);
      const { raiz, delta: nodo } = this.medidores[stat];
      nodo.className = 'medidor-delta';
      nodo.textContent = '';
      nodo.style.opacity = '';
      delete nodo.dataset.modo;
      raiz.classList.remove('pulso');
      if (!delta) continue;
      void raiz.offsetWidth; // reinicia la animación
      nodo.textContent = delta > 0 ? `+${delta}` : `${delta}`;
      nodo.classList.add(delta > 0 ? 'sube' : 'baja');
      raiz.classList.add('pulso');
    }
    setTimeout(() => {
      for (const stat of STATS) {
        this.medidores[stat].raiz.classList.remove('pulso');
        this.medidores[stat].delta.className = 'medidor-delta';
      }
    }, 900);
  }

  // Pistas de qué stats toca cada opción, sin decir cuánto.
  pistas(impactos) {
    return impactos
      .map((i) => (i.clave === 'inflacion' ? META_INFLACION.icono : META_STATS[i.clave]?.icono))
      .filter(Boolean);
  }

  /**
   * Pinta la pista de impacto mientras se arrastra la carta.
   *
   * Muestra QUÉ facción se toca y CUÁNTO, nunca hacia dónde: la banda se
   * extiende hacia los dos lados desde el valor actual, así que se lee como
   * "acá va a haber movimiento de este tamaño". Para saber si es para arriba
   * o para abajo hay que leer lo que dice el personaje.
   *
   * @param {Array}  pistas  lo que devuelve Juego.pistaDeImpacto(lado)
   * @param {number} avance  0..1 — qué tan cerca está el arrastre del umbral
   */
  previsualizar(pistas, avance = 1) {
    const porClave = new Map((pistas || []).map((p) => [p.clave, p]));

    for (const stat of STATS) {
      const { raiz, fantasma, delta } = this.medidores[stat];
      const pista = porClave.get(stat);

      raiz.classList.remove('toca', 'leve', 'medio', 'fuerte');
      if (!pista || avance <= 0) {
        fantasma.style.opacity = '0';
        fantasma.style.width = '0%';
        if (delta.dataset.modo === 'previo') {
          delta.textContent = '';
          delta.className = 'medidor-delta';
          delete delta.dataset.modo;
        }
        continue;
      }

      const valor = this.valores[stat] ?? 50;
      const radio = ANCHO_PISTA[pista.fuerza];
      fantasma.style.left = `${Math.max(0, valor - radio)}%`;
      fantasma.style.width = `${Math.min(100, valor + radio) - Math.max(0, valor - radio)}%`;
      fantasma.style.opacity = String(0.3 + 0.7 * avance);
      raiz.classList.add('toca', pista.fuerza);

      delta.dataset.modo = 'previo';
      delta.textContent = PUNTOS[pista.fuerza] + (pista.incierto ? '?' : '');
      delta.className = `medidor-delta previo ${pista.fuerza}`;
      delta.style.opacity = String(0.45 + 0.55 * avance);
    }

    pintarPistaInflacion(porClave.get('inflacion'), avance);
  }

  limpiarPrevisualizacion() {
    this.previsualizar([], 0);
  }
}

function pintarPistaInflacion(pista, avance) {
  const nodo = $('#inflacion-flecha');
  if (!nodo) return;
  if (!pista || avance <= 0) {
    nodo.textContent = '';
    nodo.className = 'inflacion-flecha';
    return;
  }
  nodo.textContent = PUNTOS[pista.fuerza] + (pista.incierto ? '?' : '');
  nodo.className = `inflacion-flecha ${pista.fuerza}`;
  nodo.style.opacity = String(0.4 + 0.6 * avance);
}

export function pintarInflacion(valor) {
  const nodo = $('#inflacion-texto');
  nodo.textContent = `${META_INFLACION.icono} ${valor}%`;
  nodo.classList.toggle('alta', valor >= 70);
  nodo.title = `${META_INFLACION.nombre}: ${valor}/100 — ${META_INFLACION.desc}`;
}
