// Motor del juego. No sabe nada de DOM: se puede correr entero desde Node.
import { crearRng, semillaAlAzar } from './rng.js';
import { BALANCE, FASES, STATS, LADOS } from './constantes.js';
import {
  calcularEfectos, aplicarDeltas, aplicarFlags, cumpleCondicion, limitar, efectosEsperados
} from './efectos.js';
import { Mazo } from './mazo.js';
import { resolverFinal } from './finales.js';
import { TODAS_LAS_CARTAS } from '../data/cartas/index.js';
import { DECRETOS } from '../data/decretos.js';
import { GABINETES, gabinetePorId } from '../data/gabinetes.js';
import { FINALES } from '../data/finales.js';
import { OBJETIVOS } from '../data/objetivos.js';
import {
  asignarObjetivos, evaluarObjetivos, objetivosActivos, contarCumplidos, ESTADO_OBJETIVO
} from './objetivos.js';

export class Juego {
  constructor(opciones = {}) {
    const {
      semilla = semillaAlAzar(),
      gabinete = 'tecnico',
      cartas = TODAS_LAS_CARTAS,
      decretos = DECRETOS,
      finales = FINALES,
      objetivos = OBJETIVOS,
      cartasDesbloqueadas = null
    } = opciones;

    this.semilla = String(semilla);
    this.rng = crearRng(this.semilla);
    this.catalogoDecretos = decretos;
    this.catalogoFinales = finales;
    this.catalogoObjetivos = objetivos;
    this.gabinete = gabinetePorId(gabinete) || GABINETES[0];

    this.mazo = new Mazo(cartas, this.rng, { desbloqueadas: cartasDesbloqueadas });

    this.estado = {
      semilla: this.semilla,
      gabineteId: this.gabinete.id,
      mandato: 1,
      mes: 1,
      mesesTotales: 0,
      stats: { ...this.gabinete.stats },
      inflacion: this.gabinete.inflacion ?? BALANCE.inflacionInicial,
      flags: new Set(this.gabinete.pone || []),
      decretos: (this.gabinete.decretos || [])
        .map((id) => decretos.find((d) => d.id === id))
        .filter(Boolean),
      fase: FASES.CARTA,
      objetivos: [],
      carta: null,
      ultimo: null,
      final: null,
      ofertaDecretos: [],
      historia: []
    };

    for (const decreto of this.estado.decretos) {
      (decreto.pone || []).forEach((f) => this.estado.flags.add(f));
    }

    this.estado.objetivos = asignarObjetivos(this.rng, this.catalogoObjetivos);
    this.mazo.encolar('asuncion');
    this.estado.carta = this.mazo.robar(this.estado);
  }

  // ---------- Lecturas ----------
  get carta() {
    return this.estado.carta;
  }

  get terminado() {
    return this.estado.fase === FASES.FINAL;
  }

  statsVisibles() {
    const visibles = {};
    for (const stat of STATS) visibles[stat] = Math.round(this.estado.stats[stat]);
    visibles.inflacion = Math.round(this.estado.inflacion);
    return visibles;
  }

  anioMes() {
    const anio = Math.floor((this.estado.mes - 1) / 12) + 1;
    const mesDelAnio = ((this.estado.mes - 1) % 12) + 1;
    return { anio, mesDelAnio };
  }

  /**
   * Lo ÚNICO que ve el jugador al arrastrar: qué facción se toca y cuán fuerte.
   * Deliberadamente sin signo. Si la interfaz supiera la dirección, se podría
   * jugar mirando las barras en vez de leyendo la carta, y el texto —que es
   * la mitad del juego— pasaría a ser decoración.
   */
  pistaDeImpacto(lado) {
    return this.previsualizar(lado).map(({ clave, delta, incierto }) => {
      const magnitud = Math.abs(delta);
      return {
        clave,
        incierto,
        fuerza: magnitud >= BALANCE.impactoFuerte ? 'fuerte' : magnitud >= BALANCE.impactoMedio ? 'medio' : 'leve'
      };
    });
  }

  // Proyección completa, CON dirección. Es de uso interno (tests, balance y un
  // eventual modo asistido): la interfaz de juego no la consume.
  // Impacto estimado de una opción: qué medidor se mueve, en qué dirección,
  // cuánto (aproximado, ya modulado por los decretos activos) y si además
  // deja el país en zona de final. Se usa para el arrastre de la carta.
  previsualizar(lado) {
    const opcion = this.estado.carta?.[lado];
    if (!opcion?.efectos) return [];
    return efectosEsperados(opcion.efectos, this.estado.decretos).map((e) => {
      const actual = e.clave === 'inflacion' ? this.estado.inflacion : this.estado.stats[e.clave];
      const proyectado = limitar(actual + e.delta, BALANCE.statMin, BALANCE.statMax);
      return {
        ...e,
        actual,
        proyectado,
        // La caja no muere en cero: se emite. Por eso no avisa en el borde de abajo.
        letal:
          e.clave === 'inflacion'
            ? proyectado >= BALANCE.inflacionMax
            : proyectado >= BALANCE.statMax || (proyectado <= BALANCE.statMin && e.clave !== 'caja')
      };
    });
  }

  // ---------- Acción principal ----------
  elegir(lado) {
    if (this.estado.fase !== FASES.CARTA) {
      throw new Error(`No se puede elegir en la fase "${this.estado.fase}"`);
    }
    if (lado !== LADOS.IZQ && lado !== LADOS.DER) {
      throw new Error(`Lado inválido: ${lado}`);
    }

    const carta = this.estado.carta;
    const opcion = carta[lado];

    const deltasCarta = calcularEfectos(opcion.efectos, this.estado.decretos, this.rng);
    const aplicados = aplicarDeltas(this.estado, deltasCarta);
    aplicarFlags(this.estado, opcion);
    if (opcion.encadena) {
      (Array.isArray(opcion.encadena) ? opcion.encadena : [opcion.encadena]).forEach((id) =>
        this.mazo.encolar(id)
      );
    }

    // Consecuencias con fecha: esta decisión mete una carta en el mazo que va a
    // llegar dentro de N meses, cuando ya no te acuerdes de haberla tomado.
    for (const semilla of [].concat(opcion.siembra || [])) {
      const [min, max] = semilla.meses || [6, 10];
      const enMeses = this.rng.entero(min, max);
      this.mazo.sembrar(semilla.carta, this.estado.mesesTotales + enMeses, carta.id);
    }

    this.estado.historia.push({
      mes: this.estado.mes,
      mandato: this.estado.mandato,
      carta: carta.id,
      lado,
      deltas: aplicados
    });

    const resultado = {
      cartaId: carta.id,
      lado,
      opcion,
      deltas: aplicados,
      replica: opcion.replica || null,
      eventos: []
    };

    // --- avanza el calendario ---
    this.estado.mes += 1;
    this.estado.mesesTotales += 1;

    const eventosMes = this.tickMensual();
    resultado.eventos.push(...eventosMes);

    // --- objetivos del mandato ---
    resultado.objetivos = this.resolverObjetivos();

    // --- fin de mandato ---
    if (this.estado.mes > BALANCE.mesesPorMandato) {
      this.estado.mandato += 1;
      this.estado.mes = 1;
      resultado.eventos.push({ tipo: 'mandato', texto: 'Se terminó el mandato.' });
    }

    // --- finales ---
    const final = resolverFinal(this.estado, this.catalogoFinales);
    if (final) {
      this.estado.final = final;
      this.estado.fase = FASES.FINAL;
      resultado.final = final;
      this.estado.ultimo = resultado;
      return resultado;
    }

    // --- elección de decreto ---
    if (this.tocaDecreto()) {
      this.estado.ofertaDecretos = this.ofrecerDecretos();
      if (this.estado.ofertaDecretos.length) {
        this.estado.fase = FASES.DECRETO;
        resultado.decretos = this.estado.ofertaDecretos;
        this.estado.ultimo = resultado;
        return resultado;
      }
    }

    this.estado.carta = this.mazo.robar(this.estado);
    resultado.siguiente = this.estado.carta;
    this.estado.ultimo = resultado;
    return resultado;
  }

  // ---------- Objetivos ----------
  resolverObjetivos() {
    const novedades = evaluarObjetivos(this.estado);
    let decretoExtra = false;

    for (const objetivo of novedades) {
      const premio =
        objetivo.resultado === ESTADO_OBJETIVO.CUMPLIDO ? objetivo.premio : objetivo.castigo;
      if (!premio) continue;
      if (premio.decretoExtra) decretoExtra = true;
      const deltas = calcularEfectos(premio, [], this.rng);
      aplicarDeltas(this.estado, deltas);
    }

    if (decretoExtra) this.estado.decretoPendiente = true;
    return novedades;
  }

  objetivosActivos() {
    return objetivosActivos(this.estado);
  }

  // ---------- Paso mensual: inflación y decretos ----------
  tickMensual() {
    const eventos = [];
    const antes = { ...this.estado.stats, inflacion: this.estado.inflacion };

    // Recaudación: entra algo todos los meses, aunque nadie lo agradezca.
    this.estado.stats.caja += BALANCE.recaudacionMensual;

    // La inflación tiene inercia: cuanto más alta, más rápido sube sola.
    const deriva = BALANCE.inflacionDerivaBase + (this.estado.inflacion / 100) * 0.8;
    this.estado.inflacion += deriva;

    // Decretos activos
    for (const decreto of this.estado.decretos) {
      const efecto = decreto.efecto || {};
      this.aplicarPorMes(efecto.porMes);
      if (efecto.porMesCondicional && cumpleCondicion(efecto.porMesCondicional.requiere, this.estado)) {
        this.aplicarPorMes(efecto.porMesCondicional.efectos);
      }
    }

    // Dolor inflacionario
    if (this.estado.inflacion > BALANCE.umbralInflacionDolor) {
      const exceso = this.estado.inflacion - BALANCE.umbralInflacionDolor;
      this.estado.stats.pueblo -= exceso * BALANCE.dolorInflacionPueblo;
      this.estado.stats.caja -= exceso * BALANCE.dolorInflacionCaja;
      if (exceso > 20) {
        eventos.push({ tipo: 'inflacion', texto: 'Los precios vuelven a remarcarse.' });
      }
    }

    this.normalizar();

    const dInflacion = this.estado.inflacion - antes.inflacion;
    if (Math.abs(dInflacion) >= 0.05) {
      eventos.push({ tipo: 'deriva', inflacion: Math.round(dInflacion * 10) / 10 });
    }
    return eventos;
  }

  aplicarPorMes(porMes) {
    if (!porMes) return;
    for (const [clave, valor] of Object.entries(porMes)) {
      if (clave === 'inflacion') this.estado.inflacion += valor;
      else if (STATS.includes(clave)) this.estado.stats[clave] += valor;
    }
  }

  normalizar() {
    for (const stat of STATS) {
      this.estado.stats[stat] = limitar(this.estado.stats[stat], BALANCE.statMin, BALANCE.statMax);
    }
    this.estado.inflacion = limitar(
      this.estado.inflacion,
      BALANCE.inflacionMin,
      BALANCE.inflacionMax
    );
  }

  // ---------- Decretos ----------
  tocaDecreto() {
    if (this.estado.decretoPendiente) return true;
    return this.estado.mes > 1 && (this.estado.mes - 1) % BALANCE.mesesPorDecreto === 0;
  }

  ofrecerDecretos() {
    const tomados = new Set(this.estado.decretos.map((d) => d.id));
    const disponibles = this.catalogoDecretos.filter((d) => !tomados.has(d.id));
    return this.rng.mezclar(disponibles).slice(0, BALANCE.opcionesDeDecreto);
  }

  tomarDecreto(id) {
    if (this.estado.fase !== FASES.DECRETO) {
      throw new Error('No hay decretos para elegir en este momento');
    }
    const decreto = this.estado.ofertaDecretos.find((d) => d.id === id);
    if (!decreto) throw new Error(`Decreto no ofrecido: ${id}`);

    this.estado.decretos.push(decreto);
    (decreto.pone || []).forEach((f) => this.estado.flags.add(f));
    this.estado.ofertaDecretos = [];
    this.estado.decretoPendiente = false;
    this.estado.fase = FASES.CARTA;
    this.estado.carta = this.mazo.robar(this.estado);
    return decreto;
  }

  // ---------- Continuar tras un final glorioso ----------
  puedeContinuar() {
    return (
      this.estado.fase === FASES.FINAL &&
      this.estado.final?.tipo === 'gloria' &&
      this.estado.mandato <= BALANCE.mandatosParaLeyenda
    );
  }

  continuarMandato() {
    if (!this.puedeContinuar()) throw new Error('Esta corrida terminó');
    this.estado.final = null;
    this.estado.fase = FASES.CARTA;
    // Cada mandato nuevo arranca más caliente: el país no se resetea.
    this.estado.inflacion = limitar(this.estado.inflacion + 6, 0, BALANCE.inflacionMax);
    this.estado.flags.add(`mandato_${this.estado.mandato}`);
    this.estado.objetivos = asignarObjetivos(this.rng, this.catalogoObjetivos);
    this.estado.carta = this.mazo.robar(this.estado);
    return this.estado.carta;
  }

  // ---------- Resumen para la pantalla de final ----------
  resumen() {
    return {
      semilla: this.semilla,
      gabinete: this.gabinete.id,
      mandato: this.estado.mandato,
      mes: this.estado.mes,
      mesesTotales: this.estado.mesesTotales,
      stats: this.statsVisibles(),
      decretos: this.estado.decretos.map((d) => d.id),
      flags: [...this.estado.flags],
      final: this.estado.final?.id ?? null,
      tipoFinal: this.estado.final?.tipo ?? null,
      decisiones: this.estado.historia.length,
      facturasPendientes: this.mazo.pendientes().length,
      objetivos: this.estado.objetivos.map((o) => ({ id: o.id, titulo: o.titulo, resultado: o.resultado })),
      objetivosCumplidos: contarCumplidos(this.estado),
      cronica: this.cronica()
    };
  }

  /**
   * Las tres decisiones que más movieron el país, para contar el mandato al
   * final. Un mandato son cuarenta y ocho elecciones; sólo unas pocas se
   * recuerdan.
   */
  cronica(cuantas = 3) {
    const peso = (h) =>
      Object.entries(h.deltas)
        .filter(([k]) => k !== 'emision')
        .reduce((total, [, v]) => total + Math.abs(v || 0), 0);

    return this.estado.historia
      .map((h) => ({ ...h, peso: peso(h) }))
      .sort((a, b) => b.peso - a.peso)
      .slice(0, cuantas)
      .sort((a, b) => a.mandato - b.mandato || a.mes - b.mes)
      .map((h) => {
        const carta = this.mazo.carta(h.carta);
        return {
          mes: h.mes,
          mandato: h.mandato,
          personaje: carta?.personaje ?? null,
          eleccion: carta?.[h.lado]?.texto ?? '—'
        };
      });
  }
}
