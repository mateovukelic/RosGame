import { STATS, META_STATS, META_INFLACION } from '../engine/constantes.js';
import { crear, $ } from './dom.js';

// La pista va en una burbuja DEBAJO de la barra, no sobre ella. Dibujada sobre
// la barra, cualquier forma se lee como un aumento: la parte que cae sobre el
// relleno se confunde con el relleno y sólo se ve la que sobresale a la derecha.
// Una burbuja aparte no tiene lado, así que sólo puede decir cuánto.
const DIAMETRO = { leve: 7, medio: 11, fuerte: 16 };

export class Hud {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.valores = {};
    this.medidores = {};
    for (const stat of STATS) {
      const meta = META_STATS[stat];
      const relleno = crear('div', { clase: 'medidor-relleno' });
      const delta = crear('div', { clase: 'medidor-delta' });
      const burbuja = crear('div', { clase: 'medidor-burbuja' });
      const medidor = crear('div', { clase: 'medidor', title: `${meta.nombre}: ${meta.desc}` }, [
        crear('div', { clase: 'medidor-icono', texto: meta.icono }),
        delta,
        crear('div', { clase: 'medidor-barra' }, [relleno]),
        crear('div', { clase: 'medidor-nombre', texto: meta.nombre }),
        crear('div', { clase: 'medidor-pista' }, [burbuja])
      ]);
      this.medidores[stat] = { raiz: medidor, relleno, burbuja, delta };
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
   * Una burbuja debajo de cada medidor: más grande, más fuerte el impacto.
   * No toca la barra a propósito. Cualquier marca puesta sobre la barra tiene
   * una posición, y una posición se lee como una dirección. La burbuja no
   * tiene lado: sólo puede decir cuánto. Para saber si sube o baja hay que
   * leer lo que dice el personaje.
   *
   * @param {Array}  pistas  lo que devuelve Juego.pistaDeImpacto(lado)
   * @param {number} avance  0..1 — qué tan cerca está el arrastre del umbral
   */
  previsualizar(pistas, avance = 1) {
    const porClave = new Map((pistas || []).map((p) => [p.clave, p]));

    for (const stat of STATS) {
      const { raiz, burbuja } = this.medidores[stat];
      const pista = porClave.get(stat);

      raiz.classList.remove('toca', 'leve', 'medio', 'fuerte', 'incierto');
      if (!pista || avance <= 0) {
        burbuja.style.width = '0px';
        burbuja.style.height = '0px';
        burbuja.style.opacity = '0';
        continue;
      }

      const d = DIAMETRO[pista.fuerza];
      burbuja.style.width = `${d}px`;
      burbuja.style.height = `${d}px`;
      burbuja.style.opacity = String(0.35 + 0.65 * avance);
      raiz.classList.add('toca', pista.fuerza);
      if (pista.incierto) raiz.classList.add('incierto');
    }

    pintarPistaInflacion(porClave.get('inflacion'), avance);
  }

  limpiarPrevisualizacion() {
    this.previsualizar([], 0);
  }
}

function pintarPistaInflacion(pista, avance) {
  const nodo = $('#inflacion-burbuja');
  if (!nodo) return;
  if (!pista || avance <= 0) {
    nodo.style.width = '0px';
    nodo.style.height = '0px';
    nodo.style.opacity = '0';
    nodo.className = 'burbuja-inflacion';
    return;
  }
  const d = DIAMETRO[pista.fuerza];
  nodo.style.width = `${d}px`;
  nodo.style.height = `${d}px`;
  nodo.style.opacity = String(0.4 + 0.6 * avance);
  nodo.className = `burbuja-inflacion ${pista.fuerza}${pista.incierto ? ' incierto' : ''}`;
}

export function pintarInflacion(valor) {
  const nodo = $('#inflacion-texto');
  nodo.textContent = `${META_INFLACION.icono} ${valor}%`;
  nodo.classList.toggle('alta', valor >= 70);
  nodo.title = `${META_INFLACION.nombre}: ${valor}/100 — ${META_INFLACION.desc}`;
}
