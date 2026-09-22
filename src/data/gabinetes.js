// GABINETES — el "loadout" con el que arrancás la partida.
// `prologo` es la escena de apertura: se muestra antes de la primera carta.
// Se desbloquean jugando (ver src/engine/legado.js).

export const GABINETES = [
  {
    id: 'tecnico',
    nombre: 'Gabinete Técnico',
    icono: '📊',
    desc: 'Economistas con posgrado y power point. Nadie los votó.',
    detalle: 'Arranque equilibrado, inflación baja, la calle no te conoce.',
    prologo: `Asumís un 10 de diciembre con treinta grados y el traje pesado. En la primera reunión de gabinete alguien proyecta una curva que baja y todos aplauden la curva. Nadie pregunta de dónde salen los datos.

Afuera, en la plaza, hay bastante menos gente de la que esperaban.`,
    stats: { pueblo: 42, rosca: 52, campo: 60, caja: 56 },
    inflacion: 24,
    decretos: [],
    pone: [],
    desbloqueado: true
  },
  {
    id: 'aparato',
    nombre: 'El Aparato',
    icono: '🏟️',
    desc: 'Sindicatos, intendentes y micros. Se gobierna con territorio.',
    detalle: 'Pueblo y Círculo Rojo altos. El Campo te mira de reojo y la Caja está flaca.',
    prologo: `Te llevaron en andas hasta el balcón y desde ahí el país parece manejable. Abajo cantan tu nombre. Atrás, en el salón, catorce personas que no cantan nada ya están repartiendo cargos.

Les debés el cargo a los dos grupos. Uno solo te lo va a cobrar.`,
    stats: { pueblo: 66, rosca: 64, campo: 34, caja: 38 },
    inflacion: 38,
    decretos: ['aguante'],
    pone: [],
    desbloqueado: true
  },
  {
    id: 'outsider',
    nombre: 'El Outsider',
    icono: '📣',
    desc: 'Nunca militó, nunca roscó, pero llena estadios.',
    detalle: 'El Pueblo te ama y el Círculo Rojo te odia. No tenés a quién llamar.',
    prologo: `Nunca pisaste una unidad básica ni un comité. Llegaste porque la gente se cansó de los que sí, y ese enojo es todo el capital que tenés.

El primer día pedís los teléfonos de los gobernadores. Nadie del equipo los tiene. Ahí entendés que los vas a tener que conseguir vos.`,
    stats: { pueblo: 74, rosca: 24, campo: 55, caja: 45 },
    inflacion: 35,
    decretos: ['cadena_nacional'],
    pone: ['sin_experiencia'],
    desbloqueado: true
  },
  {
    id: 'heredero',
    nombre: 'El Heredero',
    icono: '👑',
    desc: 'Te pusieron. Todos saben que te pusieron. Vos también.',
    detalle: 'El Círculo Rojo te sostiene mientras seas obediente.',
    prologo: `La foto de la asunción sale con vos adelante y con quien te puso medio paso atrás, sonriendo. Los diarios eligen esa foto y no la otra.

Tenés los votos, el aparato y la estructura armada. Lo único que todavía no tenés es que te consideren el presidente.`,
    stats: { pueblo: 44, rosca: 76, campo: 46, caja: 48 },
    inflacion: 33,
    decretos: ['pacto_gobernadores'],
    pone: ['te_pusieron'],
    requiereLegado: { mandatosJugados: 3 },
    desbloqueado: false
  },
  {
    id: 'liberal',
    nombre: 'La Motosierra',
    icono: '🪚',
    desc: 'Vino a terminar con la casta y con varias otras cosas.',
    detalle: 'Campo y Caja de arranque. El Pueblo aguanta lo que aguante.',
    prologo: `Ganaste diciendo que ibas a cortar por lo sano, y la gente votó el corte. Ahora hay que hacerlo, y resulta que lo sano y lo enfermo están pegados.

El primer decreto sale a las tres de la mañana. Tiene ochenta páginas. No lo leyó nadie entero, vos tampoco.`,
    stats: { pueblo: 38, rosca: 30, campo: 78, caja: 62 },
    inflacion: 48,
    decretos: ['motosierra'],
    pone: ['shock'],
    requiereLegado: { finalesVistos: 4 },
    desbloqueado: false
  },
  {
    id: 'emergencia',
    nombre: 'Gobierno de Emergencia',
    icono: '🚨',
    desc: 'Asumiste un martes porque los otros cuatro renunciaron.',
    detalle: 'Todo mal desde el minuto cero. Sobrevivir ya es ganar.',
    prologo: `Asumiste un martes a la tarde porque los otros cuatro renunciaron en once días. No hubo palco, ni banda, ni discurso: hubo un acta y dos firmas.

No te votó nadie. No le debés nada a nadie. Es lo único bueno de todo esto, y no va a alcanzar.`,
    stats: { pueblo: 30, rosca: 30, campo: 30, caja: 22 },
    inflacion: 68,
    decretos: ['superpoderes'],
    pone: ['emergencia'],
    requiereLegado: { mejorMes: 24 },
    desbloqueado: false
  }
];

export function gabinetePorId(id) {
  return GABINETES.find((g) => g.id === id);
}
