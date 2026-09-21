// Mazo de crisis: se activa cuando las cosas se ponen feas de verdad.
export const CARTAS_CRISIS = [
  {
    id: 'crisis_confianza',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Nadie cree en el programa. No lo creen afuera, no lo creen adentro, y hace dos semanas que no lo creo yo.',
    peso: 0.8,
    urgeSi: { caja: { max: 30 } },
    urgeMult: 5,
    requiere: { mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Sostenemos el rumbo',
      efectos: { caja: -6, campo: -5, pueblo: 4, inflacion: 3 },
      replica: 'Se sostuvo. El rumbo estaba bien; el problema era que ya no lo seguía nadie.'
    },
    der: {
      acepta: true,
      texto: 'Anunciamos un plan nuevo',
      efectos: { caja: 6, campo: 6, pueblo: -5, inflacion: -3 },
      pone: ['plan_refundacional'],
      replica: 'Se anunció con nombre propio y conferencia. Los mercados aplaudieron seis días.'
    }
  },
  {
    id: 'crisis_plan_fracaso',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'El plan nuevo cumplió dos meses. Todos los indicadores están peor que antes de anunciarlo. Todos.',
    peso: 1.5,
    requiere: { flags: ['plan_refundacional'], mesMin: 12 },
    izq: {
      texto: 'Doblamos la apuesta',
      efectos: { caja: [-12, 12], inflacion: [-6, 8], pueblo: -5 },
      replica: 'A esta altura ya no era un plan: era una apuesta, y todos en la sala lo sabían.'
    },
    der: {
      texto: 'Cambio todo el equipo',
      efectos: { rosca: -8, campo: -5, pueblo: 5, caja: -4 },
      saca: ['plan_refundacional'],
      pone: ['crisis_gabinete'],
      replica: 'Se fueron los siete. El octavo, que quería irse, fue el único al que le pediste que se quede.'
    }
  },
  {
    id: 'crisis_desborde',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'La situación excede a las fuerzas provinciales. Se lo digo con todas las letras porque no hay tiempo.',
    peso: 1.8,
    requiere: { flags: ['desborde'], mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Abro todas las cajas',
      efectos: { caja: -18, pueblo: 12, inflacion: 6 },
      saca: ['desborde'],
      replica: 'Se abrió todo. Se contuvo. La cuenta llegó en abril y no había con qué pagarla.'
    },
    der: {
      acepta: true,
      texto: 'Que salgan los militares',
      efectos: { pueblo: -13, rosca: 6, campo: 7 },
      pone: ['estado_de_sitio'],
      replica: 'Salieron. Las imágenes dieron la vuelta al mundo y en este país tienen un significado propio.'
    }
  },
  {
    id: 'crisis_renuncia',
    forma: 'dilema',
    personaje: 'interna',
    texto: 'Hay gente de tu propio espacio pidiendo que des un paso al costado. Gente que te puso ahí.',
    peso: 1.6,
    urgeSi: { rosca: { max: 20 } },
    urgeMult: 6,
    requiere: { mesMin: 12 },
    izq: {
      texto: 'Convoco a un plebiscito',
      efectos: { pueblo: 8, rosca: -6, campo: -5 },
      pone: ['plebiscito_calle'],
      replica: 'Convocaste. Poner el cargo en juego es la jugada de alguien que ya no tiene otra.'
    },
    der: {
      texto: 'Reunir a los barones',
      efectos: { caja: -12, rosca: 12, pueblo: -5 },
      replica: 'Vinieron los quince. Salieron a las seis de la mañana y ninguno dio declaraciones.'
    }
  },
  {
    id: 'crisis_plebiscito',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Convocó a la gente a la plaza para medir fuerzas. Le hago la pregunta incómoda: ¿y si no va nadie?',
    peso: 1.7,
    requiere: { flags: ['plebiscito_calle'], mesMin: 4 },
    izq: {
      texto: 'Suspendo la convocatoria',
      efectos: { pueblo: [-8, 14], rosca: [-8, 8] },
      saca: ['plebiscito_calle'],
      replica: 'Suspendiste. El que suspende una plaza ya sabe qué habría pasado en esa plaza.'
    },
    der: {
      texto: 'Se convoca igual',
      efectos: { pueblo: -8, rosca: 4 },
      saca: ['plebiscito_calle'],
      replica: 'La plaza decide. Siempre decidió, y decide sola.'
    }
  },
  {
    id: 'crisis_fuga',
    forma: 'dilema',
    personaje: 'empresario',
    texto: 'Mis socios están sacando todo del país. Yo también, dicho sea de paso. Se lo aviso por respeto.',
    peso: 1.2,
    urgeSi: { inflacion: { min: 70 } },
    izq: {
      texto: 'Cierro todo',
      efectos: { caja: 8, campo: -11, pueblo: 4, inflacion: 3 },
      pone: ['cepo_duro'],
      replica: 'Se cerró. Los que quedaron adentro dejaron de invertir y se dedicaron a esperar.'
    },
    der: {
      texto: 'Que se vayan',
      efectos: { caja: -11, campo: 4, pueblo: -3 },
      replica: 'Se fueron. Tres de ellos habían estado en la foto de tu asunción, adelante.'
    }
  },
  {
    id: 'crisis_bancos',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Hay cola en los bancos desde las seis de la mañana. Todavía no corrieron. Todavía están en fila.',
    peso: 0.7,
    urgeSi: { caja: { max: 18 } },
    urgeMult: 9,
    requiere: { mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Que cada uno saque lo suyo',
      efectos: { caja: -16, pueblo: 7, inflacion: 5 },
      replica: 'Sacaron. Para el jueves el sistema tenía menos depósitos que obligaciones y no era un problema teórico.'
    },
    der: {
      acepta: true,
      texto: 'Limitamos los retiros',
      efectos: { caja: 12, pueblo: -16, campo: -6 },
      pone: ['corralito'],
      replica: 'Le pusiste un nombre técnico a la medida. La gente le puso otro, y ese fue el que quedó.'
    }
  },
  {
    id: 'crisis_corralito',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Tengo los ahorros de toda mi vida adentro de un banco que no me los da. Trabajé treinta y ocho años.',
    peso: 1.9,
    requiere: { flags: ['corralito'], mesMin: 3 },
    izq: {
      rechaza: true,
      texto: 'La medida se sostiene',
      efectos: { pueblo: -14, campo: 4, caja: 6 },
      pone: ['desborde'],
      replica: 'Se sostuvo. Esa señora apareció en televisión llorando y esa imagen te sobrevivió.'
    },
    der: {
      acepta: true,
      texto: 'Devolvemos en cuotas',
      efectos: { caja: -14, pueblo: 8, inflacion: 4 },
      saca: ['corralito'],
      replica: 'Se devolvió en doce cuotas. Con la inflación de esos doce meses, se devolvió la mitad.'
    }
  },
  {
    id: 'crisis_adelanto',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Si adelantás las elecciones, capaz salís por la puerta de adelante. Te lo digo como amiga, aunque no lo sea.',
    peso: 1.4,
    requiere: { mesMin: 20, stats: { pueblo: { max: 30 }, rosca: { max: 35 } } },
    izq: {
      rechaza: true,
      texto: 'Termino mi mandato',
      efectos: { rosca: -6, pueblo: 3 },
      pone: ['se_planta'],
      replica: 'Te plantaste. A veces plantarse es coraje y a veces es no tener a dónde ir.'
    },
    der: {
      acepta: true,
      texto: 'Adelanto las elecciones',
      efectos: { rosca: 10, pueblo: 4, campo: 5, caja: -6 },
      pone: ['elecciones_adelantadas'],
      replica: 'Se adelantaron. Desde el anuncio, gobernaste ocho meses que nadie vino a preguntarte nada.'
    }
  },
  {
    id: 'crisis_ultimo_recurso',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'Vine a decirte una sola cosa y me voy. Todavía estás a tiempo de hacer bien una cosa. Una.',
    peso: 1,
    requiere: { mesMin: 16, stats: { pueblo: { max: 25 } } },
    izq: {
      rechaza: true,
      texto: 'Ya es tarde, padre',
      efectos: { pueblo: -5, rosca: 2 },
      replica: 'No discutió. Te dio la mano, dijo que igual iba a rezar, y se fue caminando.'
    },
    der: {
      acepta: true,
      texto: 'Decime cuál',
      efectos: { pueblo: 7, rosca: -3, caja: -5 },
      pone: ['ultima_chance'],
      replica: 'Te dijo cuál. Era más chica de lo que esperabas y más difícil de lo que parecía.'
    }
  }
];
