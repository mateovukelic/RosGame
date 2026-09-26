// Mazo de color local: lo que hace que esto sea acá y no en otro lado.
export const CARTAS_FOLKLORE = [
  {
    id: 'asado_quincho',
    forma: 'propuesta',
    personaje: 'puntero',
    texto: 'Asado en el quincho el sábado. Van todos los que importan. La pregunta no es si venís: es si venís temprano.',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'Mandales saludos',
      efectos: { rosca: -5, caja: 1 },
      replica: 'Hablaron de vos toda la noche. No bien. A las dos de la mañana ya era otra cosa.'
    },
    der: {
      acepta: true,
      texto: 'Voy y hago el fuego',
      efectos: { rosca: 6, pueblo: 3, campo: 2, caja: -2 },
      replica: 'Hiciste el fuego y salió bien. En esa mesa, eso pesa más de lo que cualquiera va a admitir.'
    }
  },
  {
    id: 'mate_cumbre',
    forma: 'dilema',
    personaje: 'gobernadora',
    texto: 'Antes de empezar: ¿cebás vos o cebo yo? Porque en esta mesa eso define bastante más que el mate.',
    peso: 0.9,
    izq: { texto: 'Cebo yo', efectos: { rosca: 4, pueblo: 2 }, replica: 'Cebaste vos tres horas. Nadie dijo nada y todos entendieron.' },
    der: { texto: 'Cebá vos', efectos: { rosca: -3, campo: 3, pueblo: -1 }, replica: 'Cebó él. Te pasó el primero lavado, que es un mensaje que en el campo se entiende.' }
  },
  {
    id: 'precio_asado',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'El asado ya no se compra, se mira. En casa comemos pollo y a los chicos les dije que es por la salud.',
    peso: 1.3,
    urgeSi: { inflacion: { min: 55 } },
    izq: {
      rechaza: true,
      texto: 'Que lo acomode el mercado',
      efectos: { pueblo: -8, campo: 8, caja: 3 },
      replica: 'El mercado lo acomodó. Hacia arriba, y después se quedó ahí tranquilo.'
    },
    der: {
      acepta: true,
      texto: 'Sacamos cortes populares',
      efectos: { caja: -7, pueblo: 8, campo: -8, inflacion: -1 },
      pone: ['cortes_populares'],
      replica: 'Salieron los cortes. Duraban dos horas en la góndola y el resto del día no había nada.'
    }
  },
  {
    id: 'carne_exportacion',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Hay demanda récord afuera y los barcos están esperando. Si nos dejan salir, entran dólares de verdad.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Primero comemos nosotros',
      efectos: { campo: -11, pueblo: 8, caja: -5 },
      pone: ['cierre_exportacion'],
      replica: 'El asado bajó un doce por ciento. Los dólares que no entraron los buscaste en otro lado, más caro.'
    },
    der: {
      acepta: true,
      texto: 'Abrimos la exportación',
      efectos: { caja: 11, campo: 12, pueblo: -8, inflacion: 3 },
      replica: 'Salieron los barcos y entraron los dólares. El asado subió antes de que el primer barco llegara.'
    }
  },
  {
    id: 'quiniela',
    forma: 'propuesta',
    personaje: 'taxista',
    texto: 'Soñé con un muerto que hablaba, jefe. Eso es el cero, todo el mundo lo sabe. ¿Le juego algo?',
    peso: 0.7,
    izq: { rechaza: true, texto: 'Andá a trabajar', efectos: { pueblo: -2, campo: 2 }, replica: 'Salió el cero. Te lo recordó cada viaje durante un año y medio.' },
    der: { acepta: true, texto: 'Jugale algo', efectos: { pueblo: 3, rosca: -1 }, replica: 'No salió. Igual seguiste preguntándole si había soñado algo, cada vez que te subías.' }
  },
  {
    id: 'fernet',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Se disparó el precio del fernet y en Córdoba están indignados de verdad. Esto no es un chiste, presidente.',
    peso: 0.8,
    izq: { rechaza: true, texto: 'No es prioridad', efectos: { pueblo: -4, caja: 2 }, replica: 'Fue tendencia dos días. Al tercero, alguien hizo la cuenta de cuánto había subido el vino.' },
    der: { acepta: true, texto: 'Le bajamos impuestos', efectos: { pueblo: 5, caja: -4 }, replica: 'Bajó un veinte por ciento. Fue la medida más popular del trimestre y la más barata.' }
  },
  {
    id: 'peaje_ruta',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'La ruta por la que sale la cosecha tiene más pozos que asfalto. Van tres camiones rotos este mes.',
    peso: 1,
    izq: { rechaza: true, texto: 'Está en el plan de obras', efectos: { campo: -7, caja: 3 }, replica: 'Estaba en el plan. También estaba en el plan anterior y en el anterior a ese.' },
    der: { acepta: true, texto: 'Se repavimenta', efectos: { caja: -9, campo: 10, pueblo: 3 }, replica: 'Se repavimentaron ochenta kilómetros. Los otros ciento veinte quedaron para el gobierno que viene.' }
  },
  {
    id: 'aguinaldo',
    forma: 'propuesta',
    personaje: 'sindicalista',
    soloEncadenada: true, // lo trae la agenda del almanaque en junio
    texto: 'Viene el medio aguinaldo. Si le ponés un bono encima, nos quedamos todos tranquilos hasta marzo.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Sólo el aguinaldo',
      efectos: { pueblo: -6, caja: 4, inflacion: -1 },
      replica: 'Enero fue largo. En febrero ya estaban pidiendo la reapertura de todo.'
    },
    der: {
      acepta: true,
      texto: 'Bono para todos',
      efectos: { caja: -12, pueblo: 11, inflacion: 4 },
      pone: ['bono_pagado'],
      replica: 'Cobraron el bono y se lo gastaron en dos semanas, que era exactamente lo que se esperaba.'
    }
  },
  {
    id: 'verano_costa',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Faltan tres semanas para enero y los hoteles de la costa tienen un quinto de las reservas de siempre.',
    peso: 1,
    anual: true,
    requiere: { mesMin: 10, mesCalendario: 'dic' },
    izq: {
      rechaza: true,
      texto: 'Que cada uno haga lo suyo',
      efectos: { pueblo: -5, caja: 4 },
      replica: 'La costa tuvo la peor temporada en una década. Los intendentes de la costa te lo hicieron saber.'
    },
    der: {
      acepta: true,
      texto: 'Turismo subsidiado',
      efectos: { caja: -8, pueblo: 8, rosca: 3 },
      replica: 'Se llenó todo. Salió carísimo y nadie va a recordar nunca que fue una decisión tuya.'
    }
  },
  {
    id: 'empanadas',
    forma: 'dilema',
    personaje: 'primera_dama',
    texto: 'Para la cumbre con los gobernadores: ¿catering de hotel cinco estrellas o empanadas de la provincia?',
    peso: 0.8,
    izq: { texto: 'Empanadas de la provincia', efectos: { rosca: 5, pueblo: 3, caja: 1 }, replica: 'Se comieron todo. El gobernador que las mandó lo contó en cada entrevista durante un mes.' },
    der: { texto: 'Catering de hotel', efectos: { rosca: -2, pueblo: -4, campo: 2, caja: -2 }, replica: 'Sobró la mitad. Salió una foto de las bandejas intactas y se usó mucho más de lo que merecía.' }
  },
  {
    id: 'cumbia_acto',
    forma: 'propuesta',
    personaje: 'puntero',
    texto: 'Para el acto conseguí una banda que llena plazas sola. Sale una fortuna, pero llena la plaza sola.',
    peso: 0.9,
    izq: { rechaza: true, texto: 'Con el himno alcanza', efectos: { pueblo: -3, caja: 2 }, replica: 'No alcanzó. Las tomas aéreas del acto se publicaron con mucho entusiasmo desde el otro lado.' },
    der: { acepta: true, texto: 'Contratala', efectos: { caja: -6, pueblo: 7, campo: -3 }, replica: 'Se llenó la plaza. En las tomas aéreas no se distingue quién fue por vos y quién fue por la banda.' }
  },
  {
    id: 'mundial_clasificacion',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: 'Clasificamos. Por primera vez en años el país está insoportablemente feliz y no es por nada tuyo.',
    peso: 1,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'No mezclo fútbol y política',
      efectos: { pueblo: -3, campo: 3, rosca: 3 },
      replica: 'No lo mezclaste. Otros tres dirigentes sí, y la foto con la camiseta la sacaron ellos.'
    },
    der: {
      acepta: true,
      texto: 'Aprovechamos el envión',
      efectos: { pueblo: 7, rosca: 2 },
      pone: ['fiebre_mundial'],
      replica: 'Aprovechaste. Funcionó tres semanas, que es exactamente lo que dura un envión.'
    }
  },
  {
    id: 'diez',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: 'Se murió el ídolo. Hay tres días de duelo y medio país en la calle sin saber bien qué hacer.',
    peso: 0.9,
    requiere: { mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Duelo nacional y nada más',
      efectos: { pueblo: -5, rosca: 3 },
      replica: 'La gente se juntó igual, sin organización y sin permiso. Quedó la sensación de que sobraste.'
    },
    der: {
      acepta: true,
      texto: 'Velatorio en la Rosada',
      efectos: { pueblo: 8, rosca: -4, campo: -3 },
      pone: ['velatorio_rosada'],
      replica: 'Fue una marea humana y se desbordó todo. Valió la pena igual, y eso lo sabe todo el mundo.'
    }
  },
  {
    id: 'billete_nuevo',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'Hay que sacar un billete de mayor denominación. La pregunta chica: ¿qué le ponemos en la cara?',
    peso: 1,
    requiere: { inflacionMin: 55 },
    izq: {
      texto: 'Un prócer',
      efectos: { pueblo: 2, campo: 2, inflacion: 1 },
      replica: 'Salió con un prócer. A los catorce meses ese billete ya no alcanzaba para un café.'
    },
    der: {
      texto: 'Un animal autóctono',
      efectos: { pueblo: -2, campo: 4, inflacion: 1 },
      replica: 'Le decían "el carpincho". Duró menos que el prócer y se rió más gente.'
    }
  },
  {
    id: 'monedas',
    forma: 'dilema',
    personaje: 'taxista',
    texto: 'Ya no hay monedas en ningún lado. En el kiosco te dan un caramelo de vuelto. ¿Eso es legal, presidente?',
    peso: 0.8,
    requiere: { inflacionMin: 50 },
    izq: { texto: 'Acuñamos más', efectos: { caja: -5, pueblo: 4, inflacion: 1 }, replica: 'Se acuñaron. Costaba más fabricar la moneda que lo que la moneda decía valer.' },
    der: { texto: 'Que sea todo digital', efectos: { caja: 4, pueblo: -3, campo: 3 }, replica: 'Funcionó en las ciudades. En los pueblos sin señal siguieron dando caramelos.' }
  },
  {
    id: 'yerba',
    forma: 'dilema',
    personaje: 'productor',
    texto: 'La yerba se fue al doble en cuatro meses. Créame que esto se siente más que el dólar, y en más casas.',
    peso: 0.9,
    izq: { texto: 'Precio máximo a la yerba', efectos: { pueblo: 6, campo: -6, inflacion: -1 }, replica: 'Se fijó el máximo. A la semana la yerba barata desapareció y quedó sólo la cara.' },
    der: { texto: 'Que quede libre', efectos: { pueblo: -6, campo: 6 }, replica: 'Quedó libre. La gente empezó a comprar de medio kilo, que es el termómetro que ningún índice mide.' }
  },
  {
    id: 'vieja_consejo',
    forma: 'propuesta',
    personaje: 'abuela',
    texto: 'Nene, una sola cosa y no te digo más nada: al que traiciona una vez, la segunda le sale mucho más fácil.',
    peso: 0.8,
    requiere: { mesMin: 18 },
    izq: {
      rechaza: true,
      texto: 'Esto es distinto, ma',
      efectos: { rosca: 4, pueblo: -3 },
      replica: 'No era distinto. Tardaste once meses en darte cuenta y ella nunca te lo dijo.'
    },
    der: {
      acepta: true,
      texto: 'Tenés razón, ma',
      efectos: { rosca: -3, pueblo: 4 },
      pone: ['consejo_materno'],
      replica: 'Le hiciste caso. No te sirvió para nada esa semana y te sirvió muchísimo al año siguiente.'
    }
  },
  {
    id: 'homenaje',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Quieren ponerle su nombre a una autopista. Le aclaro que usted está vivo y todavía en el cargo.',
    peso: 0.7,
    requiere: { mesMin: 24, stats: { pueblo: { min: 60 } } },
    izq: {
      rechaza: true,
      texto: 'Que lleve otro nombre',
      efectos: { pueblo: 5, rosca: 3 },
      replica: 'Le pusieron el nombre de una maestra rural. Fue la mejor decisión que tomaste en el trimestre.'
    },
    der: {
      acepta: true,
      texto: 'Acepto el homenaje',
      efectos: { pueblo: 4, rosca: -5, campo: -3 },
      pone: ['culto_personalidad'],
      replica: 'Se inauguró el cartel. En seis meses estaba con aerosol y no era un aerosol cariñoso.'
    }
  }
];
