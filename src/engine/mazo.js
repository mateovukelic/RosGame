// Armado y robo del mazo. Decide qué carta sale cada mes.
import { cumpleCondicion } from './efectos.js';
import { BALANCE } from './constantes.js';

export class Mazo {
  constructor(cartas, rng, { desbloqueadas = null } = {}) {
    this.todas = cartas;
    this.rng = rng;
    this.porId = new Map(cartas.map((c) => [c.id, c]));
    this.desbloqueadas = desbloqueadas; // Set de ids, o null = todo disponible
    this.usadas = new Set();
    this.recientes = [];
    this.cola = []; // cartas encadenadas, tienen prioridad absoluta
  }

  carta(id) {
    return this.porId.get(id);
  }

  encolar(id) {
    if (this.porId.has(id)) this.cola.push(id);
  }

  estaDisponible(carta, estado) {
    if (carta.soloEncadenada) return false;
    if (carta.unaVez !== false && this.usadas.has(carta.id)) return false;
    if (this.recientes.includes(carta.id)) return false;
    if (this.desbloqueadas && carta.bloqueada && !this.desbloqueadas.has(carta.id)) return false;
    return cumpleCondicion(carta.requiere, estado);
  }

  candidatas(estado) {
    return this.todas.filter((c) => this.estaDisponible(c, estado));
  }

  // Peso dinámico: las cartas "urgentes" pesan más cuando el país arde.
  peso(carta, estado) {
    let peso = carta.peso ?? 1;
    if (carta.urgeSi) {
      const dispara = Object.entries(carta.urgeSi).every(([clave, rango]) => {
        const valor = clave === 'inflacion' ? estado.inflacion : estado.stats[clave];
        if (valor == null) return false;
        if (rango.min != null && valor < rango.min) return false;
        if (rango.max != null && valor > rango.max) return false;
        return true;
      });
      if (dispara) peso *= carta.urgeMult ?? 4;
    }
    return peso;
  }

  robar(estado) {
    while (this.cola.length) {
      const id = this.cola.shift();
      const carta = this.porId.get(id);
      if (carta && cumpleCondicion(carta.requiereEncadenada, estado)) {
        this.marcar(carta);
        return carta;
      }
    }

    let opciones = this.candidatas(estado);

    if (!opciones.length) {
      // Si no hay nada, permitimos repetir: se limpia la memoria de usadas
      // salvo las cartas de cadena (que son irrepetibles por diseño).
      this.usadas = new Set(
        [...this.usadas].filter((id) => this.porId.get(id)?.irrepetible)
      );
      this.recientes = [];
      opciones = this.candidatas(estado);
    }

    if (!opciones.length) return null;

    const elegida = this.rng.ponderado(opciones, (c) => this.peso(c, estado));
    this.marcar(elegida);
    return elegida;
  }

  marcar(carta) {
    this.usadas.add(carta.id);
    this.recientes.push(carta.id);
    if (this.recientes.length > BALANCE.memoriaAntiRepeticion) this.recientes.shift();
  }
}
