// Mazo base: gobernabilidad cotidiana.
export const CARTAS_BASE = [
  {
    id: 'asuncion',
    forma: 'dilema',
    personaje: 'interna',
    texto: 'Presidente, el discurso de asunción. ¿Prometemos o bajamos expectativas?',
    peso: 0,
    soloEncadenada: true, // el motor la pone siempre en el mes 1
    irrepetible: true,
    izq: {
      texto: 'Prometo todo',
      efectos: { pueblo: 12, rosca: -4, caja: -3, inflacion: 2 },
      pone: ['prometio_todo'],
      replica: 'La plaza explotó. Los que toman nota, tomaron nota.'
    },
    der: {
      texto: 'Vamos a sufrir',
      efectos: { pueblo: -8, rosca: 6, campo: 8, caja: 4, inflacion: -2 },
      pone: ['sinceramiento'],
      replica: '"Al menos no nos mintió", dijo alguien. Uno solo.'
    }
  },
  {
    id: 'foto_oficial',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'La foto del gabinete. ¿Atrás de un escritorio o caminando por una fábrica?',
    peso: 1,
    izq: { texto: 'Escritorio', efectos: { rosca: 4, campo: 3, pueblo: -3 } },
    der: { texto: 'Fábrica', efectos: { pueblo: 6, campo: -2, rosca: -2 } }
  },
  {
    id: 'vice_sonrisa',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Me enteré por los diarios del nombramiento. ¿Hay algo que quieras contarme?',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Manejo yo',
      efectos: { rosca: -8, pueblo: 3 },
      pone: ['vice_ofendida'],
      replica: 'No dijo nada. Eso es lo preocupante.'
    },
    der: {
      acepta: true,
      texto: 'Elegí vos el próximo',
      efectos: { rosca: 7, pueblo: -3, caja: -2 },
      replica: 'Eligió tres, en realidad.'
    }
  },
  {
    id: 'vice_carpeta',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Tengo los votos del Senado en esta carpeta. También tengo otra carpeta.',
    peso: 1.4,
    requiere: { flags: ['vice_ofendida'] },
    izq: {
      rechaza: true,
      texto: 'Mostrame la otra',
      efectos: { rosca: -10, pueblo: 4 },
      pone: ['guerra_interna'],
      replica: 'La abrió. Era tu propio decreto de campaña.'
    },
    der: {
      acepta: true,
      texto: 'Arreglemos',
      efectos: { rosca: 10, caja: -6, pueblo: -4 },
      saca: ['vice_ofendida'],
      replica: 'Tres ministerios y listo. Barato, en perspectiva.'
    }
  },
  {
    id: 'vieja_llama',
    forma: 'dilema',
    personaje: 'abuela',
    texto: 'Nene, ¿vos comiste? Y otra cosa: en el barrio dicen que subieron todo.',
    peso: 1,
    izq: {
      texto: 'Está todo bien, ma',
      efectos: { pueblo: -2, rosca: 2 },
      replica: 'No te creyó. Nunca te creyó.'
    },
    der: {
      texto: 'Está difícil, ma',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Se lo contó a todo el barrio. Fue tu mejor operación de prensa del año.'
    }
  },
  {
    id: 'tachero',
    forma: 'propuesta',
    personaje: 'taxista',
    texto: '¿Sabe qué pasa? Acá falta mano dura. Yo lo arreglo en dos semanas, jefe.',
    peso: 1,
    izq: { rechaza: true, texto: 'Dejame trabajar', efectos: { pueblo: -3, rosca: 3 } },
    der: { acepta: true, texto: 'Contame tu plan', efectos: { pueblo: 4, campo: -2 } }
  },
  {
    id: 'asesor_encuesta',
    forma: 'dilema',
    personaje: 'chanta',
    texto: 'Tengo una encuesta. Pero antes decime qué te gustaría que diga.',
    peso: 1.1,
    izq: {
      texto: 'Decime la verdad',
      efectos: { pueblo: -2, rosca: 4, caja: -1 },
      replica: 'Era peor de lo que pensabas. Siempre lo es.'
    },
    der: {
      texto: 'Decime lo lindo',
      efectos: { pueblo: 3, rosca: -2 },
      pone: ['vive_en_burbuja'],
      replica: 'Dormiste bien esa noche.'
    }
  },
  {
    id: 'burbuja',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: '¿Usted sabe cuánto sale el kilo de asado? Dígame el número. El número.',
    peso: 1.5,
    requiere: { flags: ['vive_en_burbuja'] },
    izq: {
      rechaza: true,
      texto: 'No lo sé, señora',
      efectos: { pueblo: -5, rosca: 2 },
      saca: ['vive_en_burbuja'],
      replica: 'La honestidad duele menos que el ridículo.'
    },
    der: {
      acepta: true,
      texto: 'Arriesgar un número',
      efectos: { pueblo: -10, campo: 2 },
      replica: 'Erraste por el triple. Quedó grabado.'
    }
  },
  {
    id: 'feriado_puente',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Si movemos el feriado al lunes, tenés tres días de gente contenta.',
    peso: 1,
    izq: { rechaza: true, texto: 'Se trabaja', efectos: { pueblo: -4, campo: 5, caja: 2 } },
    der: { acepta: true, texto: 'Dale', efectos: { pueblo: 6, campo: -4, caja: -2 } }
  },
  {
    id: 'obra_inaugurada',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'La obra está al sesenta por ciento. ¿La inauguramos igual? Hay banda y todo.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Cuando esté',
      efectos: { pueblo: -3, rosca: -4, caja: 2 },
      replica: 'El intendente inauguró una plaza él solo, sin vos.'
    },
    der: {
      acepta: true,
      texto: 'Cortemos la cinta',
      efectos: { pueblo: 6, rosca: 5, campo: -3 },
      pone: ['obra_trucha'],
      replica: 'Quedó hermosa la foto. El puente no cruza a ningún lado todavía.'
    }
  },
  {
    id: 'obra_derrumbe',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'El puente que inauguraron se cayó. ¿Palabras?',
    peso: 1.6,
    requiere: { flags: ['obra_trucha'], mesMin: 8 },
    izq: {
      texto: 'Fue el clima',
      efectos: { pueblo: -8, rosca: -4, campo: -2 },
      replica: 'Ese día no llovió. Había registro.'
    },
    der: {
      texto: 'Asumo el error',
      efectos: { pueblo: -3, rosca: -8, caja: -4 },
      saca: ['obra_trucha'],
      replica: 'Renunció un secretario que no tenía nada que ver.'
    }
  },
  {
    id: 'pareja_agenda',
    forma: 'propuesta',
    personaje: 'primera_dama',
    texto: 'Hace once días que no cenás en casa. ¿Esto era lo que querías?',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'Es el cargo',
      efectos: { rosca: 3, pueblo: -2 },
      pone: ['distancia_casa']
    },
    der: {
      acepta: true,
      texto: 'Mañana voy',
      efectos: { pueblo: 4, rosca: -3 },
      replica: 'Fuiste. Llegaste a los postres, pero fuiste.'
    }
  },
  {
    id: 'cientifica',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'Con el dos por ciento de lo que gastaron en publicidad tenemos el laboratorio.',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'El año que viene',
      efectos: { caja: 3, pueblo: -4 },
      replica: 'Se fue a un instituto en Alemania. Mandó una carta muy educada.'
    },
    der: {
      acepta: true,
      texto: 'Firmado',
      efectos: { caja: -5, pueblo: 4, campo: 3 },
      pone: ['ciencia_bancada']
    }
  },
  {
    id: 'ciencia_paga',
    forma: 'dilema',
    personaje: 'cientifico',
    texto: 'La patente salió. Es nuestra. Hay tres países que la quieren comprar.',
    peso: 1.3,
    requiere: { flags: ['ciencia_bancada'], mesMin: 18 },
    izq: { texto: 'Vendemos', efectos: { caja: 14, campo: 6, pueblo: -3 } },
    der: { texto: 'Producimos acá', efectos: { pueblo: 10, campo: 4, caja: -6 }, pone: ['orgullo_nacional'] }
  },
  {
    id: 'militar_presupuesto',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'Los aviones no vuelan. No es una metáfora: no vuelan.',
    peso: 0.9,
    izq: { rechaza: true, texto: 'Que no vuelen', efectos: { caja: 4, rosca: -4, pueblo: 2 } },
    der: { acepta: true, texto: 'Se arreglan', efectos: { caja: -7, rosca: 4, pueblo: -2 } }
  },
  {
    id: 'maestra',
    forma: 'propuesta',
    personaje: 'gremio_docente',
    texto: 'Cuarenta escuelas sin gas y estamos en junio. ¿Arrancan las clases o no?',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Que den clase igual',
      efectos: { pueblo: -10, caja: 3 },
      pone: ['paro_docente'],
      replica: 'El paro arrancó al día siguiente y duró tres semanas.'
    },
    der: {
      acepta: true,
      texto: 'Se arregla ya',
      efectos: { caja: -8, pueblo: 8, rosca: -2 }
    }
  },
  {
    id: 'pibe_pregunta',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Mi viejo laburó cuarenta años. ¿Le alcanza para algo la jubilación?',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'No te puedo mentir',
      efectos: { pueblo: -4, rosca: 4, campo: 3 },
      replica: 'El video del pibe llorando tuvo nueve millones de vistas.'
    },
    der: {
      acepta: true,
      texto: 'Vamos a mejorarla',
      efectos: { pueblo: 7, caja: -8, inflacion: 1.5 },
      pone: ['prometio_jubilados']
    }
  },
  {
    id: 'jubilados_promesa',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Usted prometió la mínima. Yo tengo el recorte del diario acá.',
    peso: 1.4,
    requiere: { flags: ['prometio_jubilados'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'No se puede',
      efectos: { pueblo: -12, rosca: 2, caja: 4 },
      saca: ['prometio_jubilados'],
      pone: ['incumplidor']
    },
    der: {
      acepta: true,
      texto: 'Cumplo',
      efectos: { caja: -14, pueblo: 12, inflacion: 3 },
      saca: ['prometio_jubilados']
    }
  },
  {
    id: 'cura_comedor',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'En el comedor pasamos de doscientos a seiscientos platos. No vengo a pedir plata.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Hacé lo que puedas',
      efectos: { pueblo: -6, caja: 2 },
      replica: 'No insistió. Eso fue peor.'
    },
    der: {
      acepta: true,
      texto: '¿Qué necesitás?',
      efectos: { pueblo: 6, caja: -4, rosca: -1 },
      replica: 'Pidió camiones. Llegaron. Fue de las pocas cosas que salieron bien.'
    }
  },
  {
    id: 'empresario_favor',
    forma: 'propuesta',
    personaje: 'empresario',
    texto: 'Un decretito chico, presidente. Nadie se entera y yo soy muy agradecido.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Ni loco',
      efectos: { campo: -6, pueblo: 4, rosca: -2 },
      replica: 'Al mes siguiente su canal descubrió que sos un desastre.'
    },
    der: {
      acepta: true,
      texto: 'Firmo',
      efectos: { caja: 10, campo: 6, pueblo: -5 },
      pone: ['favor_debido'],
      replica: 'Nadie se enteró. Por ahora.'
    }
  },
  {
    id: 'favor_cobrado',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Hay un decreto con su firma y una empresa que facturó ochenta veces más.',
    peso: 1.5,
    requiere: { flags: ['favor_debido'], mesMin: 14 },
    izq: {
      rechaza: true,
      texto: 'Cerrar el tema',
      efectos: { rosca: 4, pueblo: -9, caja: -6 },
      pone: ['encubrimiento'],
      replica: 'Se cerró. La carpeta quedó en un cajón que alguien sabe abrir.'
    },
    der: {
      acepta: true,
      texto: 'Que investiguen',
      efectos: { rosca: -8, pueblo: 5, campo: -4 },
      saca: ['favor_debido'],
      pone: ['causa_abierta']
    }
  },
  {
    id: 'tuitero_viral',
    forma: 'dilema',
    personaje: 'tuitero',
    texto: 'Se hizo viral un video tuyo comiendo. No hiciste nada malo. Igual es tendencia.',
    peso: 0.9,
    izq: { texto: 'Reírme', efectos: { pueblo: 5, rosca: -2 } },
    der: { texto: 'Ignorarlo', efectos: { pueblo: -2, rosca: 2 } }
  },
  {
    id: 'barra_pibes',
    forma: 'propuesta',
    personaje: 'barra',
    texto: 'Necesitamos laburo para los pibes. Y micros. Y entradas. Pero sobre todo micros.',
    peso: 1,
    izq: { rechaza: true, texto: 'No negocio', efectos: { pueblo: -4, rosca: -3, campo: 3 } },
    der: {
      acepta: true,
      texto: 'Arreglar',
      efectos: { pueblo: 5, caja: -4, rosca: 3 },
      pone: ['deuda_barra']
    }
  },
  {
    id: 'puntero_padron',
    forma: 'propuesta',
    personaje: 'puntero',
    texto: 'Jefe, en mi barrio tengo cuatro mil. ¿Los movilizo o los guardo?',
    peso: 1,
    izq: { rechaza: true, texto: 'Guardalos', efectos: { rosca: -2, caja: 2, campo: 2 } },
    der: {
      acepta: true,
      texto: 'Movilizá',
      efectos: { pueblo: 6, rosca: 4, caja: -5 },
      pone: ['calle_movilizada']
    }
  },
  {
    id: 'hincha_seleccion',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: 'Juega la selección a las cuatro de la tarde de un martes. ¿Asueto?',
    peso: 1,
    izq: { rechaza: true, texto: 'Se labura', efectos: { pueblo: -6, campo: 4, caja: 2 } },
    der: {
      acepta: true,
      texto: 'Asueto nacional',
      efectos: { pueblo: 8, campo: -5, caja: -3 },
      pone: ['fiebre_mundial']
    }
  },
  {
    id: 'copa_final',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: '¡Estamos en la final! ¿Viajás a la cancha o la mirás en la Rosada?',
    peso: 1.4,
    requiere: { flags: ['fiebre_mundial'], mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'La miro acá',
      efectos: { pueblo: 4, rosca: 2 },
      pone: ['copa_ganada'],
      replica: 'Ganamos. Saliste al balcón. Alcanzó.'
    },
    der: {
      acepta: true,
      texto: 'Viajo',
      efectos: { pueblo: 6, caja: -6, rosca: -4 },
      pone: ['copa_ganada'],
      replica: 'Ganamos. Te sacaron de la cancha en andas y no sabés cómo volviste.'
    }
  },
  {
    id: 'jueza_independencia',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Su ministro llamó a mi juzgado tres veces esta semana. ¿Usted lo sabía?',
    peso: 1.2,
    izq: {
      texto: 'Yo no fui',
      efectos: { rosca: -4, pueblo: 2 },
      replica: 'Le creyó a medias, que es lo máximo que concede.'
    },
    der: {
      texto: 'Yo lo mandé',
      efectos: { rosca: 6, pueblo: -6, campo: -4 },
      pone: ['presion_judicial']
    }
  },
  {
    id: 'chanta_cargo',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Che, ¿yo qué cargo tengo? Porque cobro hace ocho meses y nadie me dijo.',
    peso: 0.8,
    izq: { rechaza: true, texto: 'Ninguno, andate', efectos: { caja: 3, pueblo: 3, rosca: -4 } },
    der: { acepta: true, texto: 'Inventale uno', efectos: { rosca: 3, caja: -3, pueblo: -2 } }
  },
  {
    id: 'periodista_100dias',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Cien días de gestión. ¿Qué logro concreto puede nombrar? Uno solo.',
    peso: 1.3,
    requiere: { mesMin: 3, mesMax: 8 },
    izq: {
      rechaza: true,
      texto: 'Recién arranco',
      efectos: { pueblo: -4, rosca: -2, campo: 2 },
      replica: '"RECIÉN ARRANCO", tapa a ocho columnas.'
    },
    der: {
      acepta: true,
      texto: 'Nombrar uno',
      efectos: { pueblo: 3, rosca: 2 },
      replica: 'Nombraste una obra del gobierno anterior. Nadie lo notó en vivo.'
    }
  },
  {
    id: 'censo',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'Los datos del censo salieron peor de lo esperado. ¿Los publicamos?',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Revisarlos un poco',
      efectos: { pueblo: 3, rosca: 3, campo: -6, caja: -3 },
      pone: ['datos_dibujados']
    },
    der: {
      acepta: true,
      texto: 'Publicar todo',
      efectos: { pueblo: -6, campo: 3, rosca: -3, caja: 3 },
      pone: ['datos_creibles'],
      replica: 'Dolió. Pero por primera vez en años, los números eran los números.'
    }
  }
];
