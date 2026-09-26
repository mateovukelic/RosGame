// Parámetros de balance del juego. Tocar acá antes que en el código.

export const STATS = ['pueblo', 'rosca', 'campo', 'caja'];

// Las claves internas (`rosca`, `caja`…) son identificadores y no cambian: lo
// que ve el jugador es `nombre`. `corto` existe para el rótulo del medidor,
// donde hay ancho para una palabra y no para dos.
export const META_STATS = {
  pueblo: {
    nombre: 'Pueblo',
    icono: '✊',
    desc: 'La calle, los sindicatos, el aguante. Sin pueblo no hay gobernabilidad.'
  },
  rosca: {
    nombre: 'Círculo Rojo',
    corto: 'Círculo',
    icono: '🎩',
    desc: 'La interna, los gobernadores, el Congreso. Los que te ponen y los que te sacan.'
  },
  campo: {
    nombre: 'Campo',
    icono: '🌾',
    desc: 'El agro, los exportadores, los que traen los dólares de verdad.'
  },
  caja: {
    nombre: 'Caja',
    icono: '💵',
    desc: 'Reservas, tesoro, la plata que hay (o la que no).'
  }
};

export const META_INFLACION = {
  nombre: 'Inflación',
  icono: '🔥',
  desc: 'El termómetro nacional. Sube sola, baja a los golpes.'
};

export const BALANCE = {
  statInicial: 50,
  statMax: 100,
  statMin: 0,
  inflacionInicial: 30,
  inflacionMax: 100,
  inflacionMin: 0,

  // Meses de mandato. 48 = cuatro años.
  mesesPorMandato: 48,

  // Cada cuántos meses se ofrece elegir un Decreto (los "relics" del roguelike)
  mesesPorDecreto: 12,
  opcionesDeDecreto: 3,

  // Deriva inflacionaria base por mes (la inflación nunca duerme)
  inflacionDerivaBase: 0.9,
  // Emitir (perder caja bajo cero está prohibido: se emite y sube la inflación)
  inflacionPorEmision: 0.6,

  // El Estado recauda todos los meses, pase lo que pase
  recaudacionMensual: 0.75,

  // Daño que la inflación alta le hace al país, por mes
  umbralInflacionDolor: 55,
  dolorInflacionPueblo: 0.14,
  dolorInflacionCaja: 0.08,

  // Cortes para clasificar el impacto de una opción en leve / medio / fuerte.
  // El jugador ve la fuerza, nunca el signo: para saber si sube o baja hay que
  // leer la carta.
  impactoMedio: 5,
  impactoFuerte: 10,

  // Una carta anclada a una época del año sólo compite en su ventana, así que
  // ahí tiene que pesar mucho o casi nunca sale: el Tedeum tiene un mes por año.
  pesoEstacional: 30,

  // Cuántas cartas recientes no se pueden repetir (anti-loop)
  memoriaAntiRepeticion: 14,

  // Cuántos mandatos consecutivos se pueden encadenar antes del final "prócer"
  mandatosParaLeyenda: 3
};

export const FASES = {
  MENU: 'menu',
  CARTA: 'carta',
  RESULTADO: 'resultado',
  DECRETO: 'decreto',
  FINAL: 'final'
};

export const LADOS = { IZQ: 'izq', DER: 'der' };
