// Mazo de crisis: se activa cuando las cosas se ponen feas de verdad.
export const CARTAS_CRISIS = [
  {
    id: 'crisis_confianza',
    personaje: 'ministro',
    texto: 'Nadie cree en el programa. Ni afuera, ni adentro, ni yo del todo.',
    peso: 0.8,
    urgeSi: { caja: { max: 30 } },
    urgeMult: 5,
    requiere: { mesMin: 8 },
    izq: {
      texto: 'Anunciar un plan nuevo',
      efectos: { caja: 6, campo: 6, pueblo: -5, inflacion: -3 },
      pone: ['plan_refundacional']
    },
    der: {
      texto: 'Sostener el rumbo',
      efectos: { caja: -6, campo: -5, pueblo: 4, inflacion: 3 }
    }
  },
  {
    id: 'crisis_plan_fracaso',
    personaje: 'periodista',
    texto: 'El plan nuevo cumplió dos meses. Todos los indicadores empeoraron.',
    peso: 1.5,
    requiere: { flags: ['plan_refundacional'], mesMin: 12 },
    izq: {
      texto: 'Doblar la apuesta',
      efectos: { caja: [-12, 12], inflacion: [-6, 8], pueblo: -5 },
      replica: 'A esta altura ya era una apuesta, no un plan.'
    },
    der: {
      texto: 'Cambiar todo el equipo',
      efectos: { rosca: -8, campo: -5, pueblo: 5, caja: -4 },
      saca: ['plan_refundacional'],
      pone: ['crisis_gabinete']
    }
  },
  {
    id: 'crisis_desborde',
    personaje: 'militar',
    texto: 'La situación excede a las fuerzas de seguridad provinciales.',
    peso: 1.8,
    requiere: { flags: ['desborde'], mesMin: 6 },
    izq: {
      texto: 'Militarizar',
      efectos: { pueblo: -13, rosca: 6, campo: 7 },
      pone: ['estado_de_sitio']
    },
    der: {
      texto: 'Abrir todas las cajas',
      efectos: { caja: -18, pueblo: 12, inflacion: 6 },
      saca: ['desborde']
    }
  },
  {
    id: 'crisis_renuncia',
    personaje: 'interna',
    texto: 'Hay gente del propio espacio pidiendo que des un paso al costado.',
    peso: 1.6,
    urgeSi: { rosca: { max: 20 } },
    urgeMult: 6,
    requiere: { mesMin: 12 },
    izq: {
      texto: 'Ofrecer un plebiscito',
      efectos: { pueblo: 8, rosca: -6, campo: -5 },
      pone: ['plebiscito_calle']
    },
    der: {
      texto: 'Reunir a los barones',
      efectos: { caja: -12, rosca: 12, pueblo: -5 }
    }
  },
  {
    id: 'crisis_plebiscito',
    personaje: 'periodista',
    texto: 'Convocó a la gente a la plaza para medir fuerzas. ¿Y si no va nadie?',
    peso: 1.7,
    requiere: { flags: ['plebiscito_calle'], mesMin: 4 },
    izq: {
      texto: 'Convocar igual',
      efectos: { pueblo: [-8, 14], rosca: [-8, 8] },
      saca: ['plebiscito_calle'],
      replica: 'La plaza decide. Siempre decidió.'
    },
    der: {
      texto: 'Suspender la convocatoria',
      efectos: { pueblo: -8, rosca: 4 },
      saca: ['plebiscito_calle']
    }
  },
  {
    id: 'crisis_fuga',
    personaje: 'empresario',
    texto: 'Mis socios están sacando todo del país. Yo también. Se lo aviso por respeto.',
    peso: 1.2,
    urgeSi: { inflacion: { min: 70 } },
    izq: {
      texto: 'Cerrar todo',
      efectos: { caja: 8, campo: -11, pueblo: 4, inflacion: 3 },
      pone: ['cepo_duro']
    },
    der: {
      texto: 'Que se vayan',
      efectos: { caja: -11, campo: 4, pueblo: -3 }
    }
  },
  {
    id: 'crisis_bancos',
    personaje: 'ministro',
    texto: 'Hay cola en los bancos desde las seis de la mañana. Se está yendo todo.',
    peso: 0.7,
    urgeSi: { caja: { max: 18 } },
    urgeMult: 9,
    requiere: { mesMin: 10 },
    izq: {
      texto: 'Limitar retiros',
      efectos: { caja: 12, pueblo: -16, campo: -6 },
      pone: ['corralito'],
      replica: 'Le pusiste un nombre técnico. La gente le puso otro y ese quedó.'
    },
    der: {
      texto: 'Que cada uno saque lo suyo',
      efectos: { caja: -16, pueblo: 7, inflacion: 5 }
    }
  },
  {
    id: 'crisis_corralito',
    personaje: 'vecina',
    texto: 'Tengo los ahorros de toda mi vida adentro de un banco que no me los da.',
    peso: 1.9,
    requiere: { flags: ['corralito'], mesMin: 3 },
    izq: {
      texto: 'Devolver en cuotas',
      efectos: { caja: -14, pueblo: 8, inflacion: 4 },
      saca: ['corralito']
    },
    der: {
      texto: 'Sostener la medida',
      efectos: { pueblo: -14, campo: 4, caja: 6 },
      pone: ['desborde']
    }
  },
  {
    id: 'crisis_adelanto',
    personaje: 'gobernadora',
    texto: 'Si adelantás las elecciones, quizá salís por la puerta y no por la ventana.',
    peso: 1.4,
    requiere: { mesMin: 20, stats: { pueblo: { max: 30 }, rosca: { max: 35 } } },
    izq: {
      texto: 'Adelantar',
      efectos: { rosca: 10, pueblo: 4, campo: 5, caja: -6 },
      pone: ['elecciones_adelantadas']
    },
    der: {
      texto: 'Termino mi mandato',
      efectos: { rosca: -6, pueblo: 3 },
      pone: ['se_planta']
    }
  },
  {
    id: 'crisis_ultimo_recurso',
    personaje: 'cura',
    texto: 'Vine a decirte una sola cosa: todavía estás a tiempo de hacer una cosa bien.',
    peso: 1,
    requiere: { mesMin: 16, stats: { pueblo: { max: 25 } } },
    izq: {
      texto: 'Escucharlo',
      efectos: { pueblo: 7, rosca: -3, caja: -5 },
      pone: ['ultima_chance']
    },
    der: {
      texto: 'Ya es tarde',
      efectos: { pueblo: -5, rosca: 2 }
    }
  }
];
