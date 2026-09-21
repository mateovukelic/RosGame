// GABINETES — el "loadout" con el que arrancás la corrida.
// Se desbloquean jugando (ver src/engine/legado.js).

export const GABINETES = [
  {
    id: 'tecnico',
    nombre: 'Gabinete Técnico',
    icono: '📊',
    desc: 'Economistas con posgrado y power point. Nadie los votó.',
    detalle: 'Arranque equilibrado, inflación baja, la calle no te conoce.',
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
    detalle: 'Pueblo y Rosca altos. El Campo te mira de reojo y la Caja está flaca.',
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
    detalle: 'El Pueblo te ama y la Rosca te odia. No tenés a quién llamar.',
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
    detalle: 'La Rosca te sostiene mientras seas obediente.',
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
