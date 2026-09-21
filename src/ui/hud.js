import { STATS, META_STATS, META_INFLACION } from '../engine/constantes.js';
import { crear, $ } from './dom.js';

export class Hud {
  constructor(contenedor) {
    this.contenedor = contenedor;
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
   * Muestra sobre las barras a dónde iría cada medidor si se elige esta opción.
   * @param {Array}  impactos  lo que devuelve Juego.previsualizar(lado)
   * @param {number} fuerza    0..1 — qué tan cerca está el arrastre del umbral
   */
  previsualizar(impactos, fuerza = 1) {
    const porClave = new Map((impactos || []).map((i) => [i.clave, i]));

    for (const stat of STATS) {
      const { raiz, fantasma, delta } = this.medidores[stat];
      const impacto = porClave.get(stat);

      raiz.classList.remove('sube', 'baja', 'alerta');
      if (!impacto || fuerza <= 0) {
        fantasma.style.opacity = '0';
        fantasma.style.width = '0%';
        if (delta.dataset.modo === 'previo') {
          delta.textContent = '';
          delta.className = 'medidor-delta';
          delete delta.dataset.modo;
        }
        continue;
      }

      const desde = Math.min(impacto.actual, impacto.proyectado);
      const hasta = Math.max(impacto.actual, impacto.proyectado);
      fantasma.style.left = `${desde}%`;
      // Un cambio de 3 puntos son 3px de barra: sin un mínimo no se ve nada.
      fantasma.style.width = `${Math.max(2, hasta - desde)}%`;
      fantasma.style.opacity = String(0.35 + 0.65 * fuerza);
      raiz.classList.add(impacto.delta > 0 ? 'sube' : 'baja');
      if (impacto.letal) raiz.classList.add('alerta');

      // La flecha dice la dirección aunque el fantasma sea de dos píxeles.
      // El signo de interrogación marca los efectos que son un rango.
      delta.dataset.modo = 'previo';
      delta.textContent = (impacto.delta > 0 ? '▲' : '▼') + (impacto.incierto ? '?' : '');
      delta.className = `medidor-delta previo ${impacto.delta > 0 ? 'sube' : 'baja'}`;
      delta.style.opacity = String(0.45 + 0.55 * fuerza);
    }

    const inflacion = porClave.get('inflacion');
    pintarFlechaInflacion(inflacion, fuerza);
  }

  limpiarPrevisualizacion() {
    this.previsualizar([], 0);
  }
}

function pintarFlechaInflacion(impacto, fuerza) {
  const nodo = $('#inflacion-flecha');
  if (!nodo) return;
  if (!impacto || fuerza <= 0) {
    nodo.textContent = '';
    nodo.className = 'inflacion-flecha';
    return;
  }
  nodo.textContent = impacto.delta > 0 ? '▲' : '▼';
  nodo.className = `inflacion-flecha ${impacto.delta > 0 ? 'sube' : 'baja'}`;
  nodo.style.opacity = String(0.4 + 0.6 * fuerza);
}

export function pintarInflacion(valor) {
  const nodo = $('#inflacion-texto');
  nodo.textContent = `${META_INFLACION.icono} ${valor}%`;
  nodo.classList.toggle('alta', valor >= 70);
  nodo.title = `${META_INFLACION.nombre}: ${valor}/100 — ${META_INFLACION.desc}`;
}
