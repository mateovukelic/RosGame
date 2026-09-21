// Mazo de color local: lo que hace que esto sea acá y no en otro lado.
export const CARTAS_FOLKLORE = [
  {
    id: 'asado_quincho',
    personaje: 'puntero',
    texto: 'Asado en el quincho con los muchachos. ¿Vas o mandás saludos?',
    peso: 1,
    izq: {
      texto: 'Voy y hago el fuego',
      efectos: { rosca: 6, pueblo: 3, campo: 2, caja: -2 },
      replica: 'Hiciste el fuego. Salió bien. Eso pesa más de lo que parece.'
    },
    der: {
      texto: 'Mando saludos',
      efectos: { rosca: -5, caja: 1 },
      replica: 'Hablaron de vos toda la noche. No bien.'
    }
  },
  {
    id: 'mate_cumbre',
    personaje: 'gobernadora',
    texto: '¿Cebás vos o cebo yo? En esta mesa eso define quién manda.',
    peso: 0.9,
    izq: { texto: 'Cebo yo', efectos: { rosca: 4, pueblo: 2 } },
    der: { texto: 'Cebá vos', efectos: { rosca: -3, campo: 3, pueblo: -1 } }
  },
  {
    id: 'precio_asado',
    personaje: 'vecina',
    texto: 'El kilo de asado está impagable. Ya comemos pollo. Pollo, presidente.',
    peso: 1.3,
    urgeSi: { inflacion: { min: 55 } },
    izq: {
      texto: 'Cortes populares',
      efectos: { caja: -7, pueblo: 8, campo: -8, inflacion: -1 },
      pone: ['cortes_populares']
    },
    der: {
      texto: 'Que el mercado acomode',
      efectos: { pueblo: -8, campo: 8, caja: 3 }
    }
  },
  {
    id: 'carne_exportacion',
    personaje: 'productor',
    texto: 'Hay demanda récord afuera. Si nos dejan exportar entran dólares de verdad.',
    peso: 1.2,
    izq: {
      texto: 'Abrir la exportación',
      efectos: { caja: 11, campo: 12, pueblo: -8, inflacion: 3 }
    },
    der: {
      texto: 'Primero la mesa de los argentinos',
      efectos: { campo: -11, pueblo: 8, caja: -5 },
      pone: ['cierre_exportacion']
    }
  },
  {
    id: 'quiniela',
    personaje: 'taxista',
    texto: 'Soñé con un muerto que hablaba. Eso es el cero. ¿Le juego algo, jefe?',
    peso: 0.7,
    izq: { texto: 'Jugale', efectos: { pueblo: 3, rosca: -1 } },
    der: { texto: 'Andá a trabajar', efectos: { pueblo: -2, campo: 2 } }
  },
  {
    id: 'fernet',
    personaje: 'pibe',
    texto: 'Se disparó el precio del fernet. Los pibes están indignados. En serio.',
    peso: 0.8,
    izq: { texto: 'Bajarle impuestos', efectos: { pueblo: 5, caja: -4 } },
    der: { texto: 'No es prioridad', efectos: { pueblo: -4, caja: 2 } }
  },
  {
    id: 'peaje_ruta',
    personaje: 'productor',
    texto: 'La ruta que saca la cosecha tiene más pozos que asfalto.',
    peso: 1,
    izq: { texto: 'Repavimentar', efectos: { caja: -9, campo: 10, pueblo: 3 } },
    der: { texto: 'Está en el plan', efectos: { campo: -7, caja: 3 } }
  },
  {
    id: 'aguinaldo',
    personaje: 'sindicalista',
    texto: 'Viene el medio aguinaldo. Un bono encima y nos quedamos tranquilos hasta marzo.',
    peso: 1.2,
    izq: {
      texto: 'Bono para todos',
      efectos: { caja: -12, pueblo: 11, inflacion: 4 },
      pone: ['bono_pagado']
    },
    der: {
      texto: 'Solo el aguinaldo',
      efectos: { pueblo: -6, caja: 4, inflacion: -1 }
    }
  },
  {
    id: 'verano_costa',
    personaje: 'intendente',
    texto: 'Temporada de verano. Si la gente no puede veranear, se nota en las encuestas.',
    peso: 1,
    requiere: { mesMin: 10 },
    izq: {
      texto: 'Plan de turismo subsidiado',
      efectos: { caja: -8, pueblo: 8, rosca: 3 }
    },
    der: {
      texto: 'Que cada uno haga lo que pueda',
      efectos: { pueblo: -5, caja: 4 }
    }
  },
  {
    id: 'empanadas',
    personaje: 'primera_dama',
    texto: 'La cumbre con los gobernadores: ¿catering de hotel o empanadas de la provincia?',
    peso: 0.8,
    izq: { texto: 'Empanadas', efectos: { rosca: 5, pueblo: 3, caja: 1 } },
    der: { texto: 'Catering de hotel', efectos: { rosca: -2, pueblo: -4, campo: 2, caja: -2 } }
  },
  {
    id: 'cumbia_acto',
    personaje: 'puntero',
    texto: 'Para el acto conseguí una banda de cumbia que llena plazas. Sale una fortuna.',
    peso: 0.9,
    izq: { texto: 'Contratala', efectos: { caja: -6, pueblo: 7, campo: -3 } },
    der: { texto: 'Con el himno alcanza', efectos: { pueblo: -3, caja: 2 } }
  },
  {
    id: 'mundial_clasificacion',
    personaje: 'hincha',
    texto: 'Clasificamos. El país está insoportablemente feliz por primera vez en años.',
    peso: 1,
    requiere: { mesMin: 6 },
    izq: {
      texto: 'Aprovechar el envión',
      efectos: { pueblo: 7, rosca: 2 },
      pone: ['fiebre_mundial']
    },
    der: {
      texto: 'No mezclar fútbol con política',
      efectos: { pueblo: -3, campo: 3, rosca: 3 }
    }
  },
  {
    id: 'diez',
    personaje: 'hincha',
    texto: 'Se murió un ídolo. Hay tres días de duelo y medio país en la calle.',
    peso: 0.9,
    requiere: { mesMin: 8 },
    izq: {
      texto: 'Velatorio en la Rosada',
      efectos: { pueblo: 8, rosca: -4, campo: -3 },
      pone: ['velatorio_rosada'],
      replica: 'Fue una marea humana. Se desbordó todo. Valió la pena igual.'
    },
    der: {
      texto: 'Duelo nacional y nada más',
      efectos: { pueblo: -5, rosca: 3 }
    }
  },
  {
    id: 'billete_nuevo',
    personaje: 'ministro',
    texto: 'Hay que sacar un billete de mayor denominación. ¿Qué cara le ponemos?',
    peso: 1,
    requiere: { inflacionMin: 55 },
    izq: {
      texto: 'Un prócer',
      efectos: { pueblo: 2, campo: 2, inflacion: 1 }
    },
    der: {
      texto: 'Un animal autóctono',
      efectos: { pueblo: -2, campo: 4, inflacion: 1 },
      replica: 'Le decían "el carpincho" y valía menos que un café.'
    }
  },
  {
    id: 'monedas',
    personaje: 'taxista',
    texto: 'Ya no hay monedas. Te dan un caramelo de vuelto. ¿Eso es legal?',
    peso: 0.8,
    requiere: { inflacionMin: 50 },
    izq: { texto: 'Acuñar más', efectos: { caja: -5, pueblo: 4, inflacion: 1 } },
    der: { texto: 'Todo digital', efectos: { caja: 4, pueblo: -3, campo: 3 } }
  },
  {
    id: 'yerba',
    personaje: 'productor',
    texto: 'El precio de la yerba se fue al doble. Esto es más sensible que el dólar.',
    peso: 0.9,
    izq: { texto: 'Precio máximo a la yerba', efectos: { pueblo: 6, campo: -6, inflacion: -1 } },
    der: { texto: 'Libre', efectos: { pueblo: -6, campo: 6 } }
  },
  {
    id: 'vieja_consejo',
    personaje: 'abuela',
    texto: 'Nene, acordate: al que traiciona una vez, le sale fácil la segunda.',
    peso: 0.8,
    requiere: { mesMin: 18 },
    izq: {
      texto: 'Tenés razón, ma',
      efectos: { rosca: -3, pueblo: 4 },
      pone: ['consejo_materno']
    },
    der: {
      texto: 'Esto es distinto',
      efectos: { rosca: 4, pueblo: -3 }
    }
  },
  {
    id: 'homenaje',
    personaje: 'periodista',
    texto: 'Quieren ponerle su nombre a una autopista. Usted sigue vivo y en el cargo.',
    peso: 0.7,
    requiere: { mesMin: 24, stats: { pueblo: { min: 60 } } },
    izq: {
      texto: 'Aceptar',
      efectos: { pueblo: 4, rosca: -5, campo: -3 },
      pone: ['culto_personalidad']
    },
    der: {
      texto: 'Que lleve otro nombre',
      efectos: { pueblo: 5, rosca: 3 }
    }
  }
];
