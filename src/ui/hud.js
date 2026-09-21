import { STATS, META_STATS, META_INFLACION } from '../engine/constantes.js';
import { crear, $ } from './dom.js';

export class Hud {
  constructor(contenedor) {
    this.contenedor = contenedor;
    this.medidores = {};
    for (const stat of STATS) {
      const meta = META_STATS[stat];
      const relleno = crear('div', { clase: 'medidor-relleno' });
      const delta = crear('div', { clase: 'medidor-delta' });
      const medidor = crear('div', { clase: 'medidor', title: `${meta.nombre}: ${meta.desc}` }, [
        crear('div', { clase: 'medidor-icono', texto: meta.icono }),
        delta,
        crear('div', { clase: 'medidor-barra' }, [relleno]),
        crear('div', { clase: 'medidor-nombre', texto: meta.nombre })
      ]);
      this.medidores[stat] = { raiz: medidor, relleno, delta };
      contenedor.append(medidor);
    }
  }

  pintar(valores) {
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
  pistas(claves) {
    return claves
      .map((k) => (k === 'inflacion' ? META_INFLACION.icono : META_STATS[k]?.icono))
      .filter(Boolean);
  }
}

export function pintarInflacion(valor) {
  const nodo = $('#inflacion-texto');
  nodo.textContent = `${META_INFLACION.icono} ${valor}%`;
  nodo.classList.toggle('alta', valor >= 70);
  nodo.title = `${META_INFLACION.nombre}: ${valor}/100 — ${META_INFLACION.desc}`;
}
