// Armado y robo del mazo. Decide qué carta sale cada mes.
import { cumpleCondicion } from './efectos.js';
import { BALANCE } from './constantes.js';
import { claveAnio } from './calendario.js';

export class Mazo {
  constructor(cartas, rng, { desbloqueadas = null } = {}) {
    this.todas = cartas;
    this.rng = rng;
    this.porId = new Map(cartas.map((c) => [c.id, c]));
    this.desbloqueadas = desbloqueadas; // Set de ids, o null = todo disponible
    this.usadas = new Set();
    this.recientes = [];
    this.cola = []; // cartas encadenadas, salen en el turno siguiente
    // Cartas sembradas: una decisión de hoy agenda una carta para dentro de N
    // meses. A diferencia de las flags, que sólo habilitan, esto GARANTIZA que
    // la consecuencia llegue y llegue con fecha. La factura siempre vuelve.
    this.sembradas = [];
    // La carta que el almanaque pone este mes. Tiene prioridad sobre todo:
    // el 1° de marzo no se corre porque haya una factura pendiente.
    this.forzada = null;
    // Cartas `anual`: vuelven cada año de gestión, pero una sola vez por año.
    this.usoAnual = new Map();
  }

  forzar(id) {
    if (this.porId.has(id)) this.forzada = id;
  }

  carta(id) {
    return this.porId.get(id);
  }

  encolar(id) {
    if (this.porId.has(id)) this.cola.push(id);
  }

  /** Agenda una carta para un mes futuro (absoluto, en meses totales jugados). */
  sembrar(id, mes, origen = null) {
    if (!this.porId.has(id)) return;
    if (this.sembradas.some((s) => s.id === id)) return; // no se siembra dos veces
    this.sembradas.push({ id, mes, origen });
  }

  /** La sembrada más vencida, si hay alguna cuya fecha ya llegó. */
  cosechar(mesActual) {
    const vencidas = this.sembradas
      .filter((s) => s.mes <= mesActual)
      .sort((a, b) => a.mes - b.mes);
    if (!vencidas.length) return null;
    const elegida = vencidas[0];
    this.sembradas = this.sembradas.filter((s) => s !== elegida);
    return elegida;
  }

  pendientes() {
    return this.sembradas.slice();
  }

  estaDisponible(carta, estado) {
    if (carta.soloEncadenada) return false;
    if (carta.anual) {
      // Una carta anual se mide por año de gestión, no por la memoria de
      // recientes: la paritaria del año pasado no impide la de este año.
      if (this.usoAnual.get(carta.id) === claveAnio(estado)) return false;
    } else {
      if (carta.unaVez !== false && this.usadas.has(carta.id)) return false;
      if (this.recientes.includes(carta.id)) return false;
    }
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
    // Si llegó hasta acá, está dentro de su ventana del calendario.
    if (carta.requiere?.mesCalendario) peso *= BALANCE.pesoEstacional;
    return peso;
  }

  robar(estado) {
    // Primero el almanaque: la fecha manda. Una consecuencia que vence en un
    // mes ocupado llega el primer mes libre, que para eso tiene una ventana.
    if (this.forzada) {
      const carta = this.porId.get(this.forzada);
      this.forzada = null;
      if (carta) {
        this.marcar(carta, estado);
        return carta;
      }
    }

    // Después lo sembrado: una consecuencia con fecha no espera al sorteo.
    const cosecha = this.cosechar(estado.mesesTotales);
    if (cosecha) {
      const carta = this.porId.get(cosecha.id);
      if (carta) {
        this.marcar(carta, estado);
        return carta;
      }
    }

    while (this.cola.length) {
      const id = this.cola.shift();
      const carta = this.porId.get(id);
      if (carta && cumpleCondicion(carta.requiereEncadenada, estado)) {
        this.marcar(carta, estado);
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
    this.marcar(elegida, estado);
    return elegida;
  }

  marcar(carta, estado = null) {
    if (carta.anual && estado) this.usoAnual.set(carta.id, claveAnio(estado));
    this.usadas.add(carta.id);
    this.recientes.push(carta.id);
    if (this.recientes.length > BALANCE.memoriaAntiRepeticion) this.recientes.shift();
  }
}
