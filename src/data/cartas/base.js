// Mazo base: gobernabilidad cotidiana.
export const CARTAS_BASE = [
  {
    id: 'asuncion',
    forma: 'dilema',
    personaje: 'interna',
    texto: 'Falta una hora. Hay dos borradores: el que emociona y el que no miente. ¿Cuál subo al teleprompter?',
    peso: 0,
    soloEncadenada: true, // el motor la pone siempre en el mes 1
    irrepetible: true,
    izq: {
      texto: 'El que emociona',
      efectos: { pueblo: 12, rosca: -4, caja: -3, inflacion: 2 },
      pone: ['prometio_todo'],
      replica: 'La plaza cantó veinte minutos. En el palco, tres personas anotaron cada promesa en una libreta.'
    },
    der: {
      texto: 'El que no miente',
      efectos: { pueblo: -8, rosca: 6, campo: 8, caja: 4, inflacion: -2 },
      pone: ['sinceramiento'],
      replica: '"Al menos avisó", tituló un diario. Los otros once titularon otra cosa.'
    }
  },
  {
    id: 'foto_oficial',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'La foto oficial del gabinete: escritorio de roble o galpón con casco puesto. Las dos mienten parecido.',
    peso: 1,
    izq: { texto: 'De traje, en el despacho', efectos: { rosca: 4, campo: 3, pueblo: -3 }, replica: 'Salió solemne. En redes le pusieron la cortina de una serie de abogados.' },
    der: { texto: 'Con casco, en la planta', efectos: { pueblo: 6, campo: -2, rosca: -2 }, replica: 'El casco te quedaba grande. Fue lo único que se comentó.' }
  },
  {
    id: 'vice_sonrisa',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Me enteré del nombramiento por la radio, manejando. Tuve que frenar en la banquina para escuchar bien.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Los nombro yo',
      efectos: { rosca: -8, pueblo: 3 },
      pone: ['vice_ofendida'],
      replica: 'No contestó nada. A la semana, dos ministros empezaron a mirarla a ella antes de hablar.'
    },
    der: {
      acepta: true,
      texto: 'El próximo lo elegís vos',
      efectos: { rosca: 7, pueblo: -3, caja: -2 },
      replica: 'Eligió tres. Dijo que venían en combo.'
    }
  },
  {
    id: 'vice_carpeta',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'En esta carpeta están los votos del Senado. En esta otra está por qué me los van a dar.',
    peso: 1.4,
    requiere: { flags: ['vice_ofendida'] },
    izq: {
      rechaza: true,
      texto: 'Abrime la segunda',
      efectos: { rosca: -10, pueblo: 4 },
      pone: ['guerra_interna'],
      replica: 'Adentro había fotocopias de tu propia plataforma de campaña, subrayada con resaltador.'
    },
    der: {
      acepta: true,
      texto: 'Decime qué querés',
      efectos: { rosca: 10, caja: -6, pueblo: -4 },
      saca: ['vice_ofendida'],
      replica: 'Tres ministerios y una embajada. Visto desde marzo, salió barato.'
    }
  },
  {
    id: 'vieja_llama',
    forma: 'dilema',
    personaje: 'abuela',
    texto: 'Nene, ¿comiste? Y otra cosa: fui a la carnicería con lo de siempre y me volví con dos tomates.',
    peso: 1,
    izq: {
      texto: 'Está todo bien, ma',
      efectos: { pueblo: -2, rosca: 2 },
      replica: 'No te creyó. Nunca te creyó, ni a los nueve años con el jarrón.'
    },
    der: {
      texto: 'Está bravo, ma',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Se lo contó a todo el barrio antes del mediodía. Fue tu mejor operación de prensa del año.'
    }
  },
  {
    id: 'tachero',
    forma: 'propuesta',
    personaje: 'taxista',
    texto: '¿Sabe qué pasa, jefe? Falta decisión. Yo esto se lo arreglo en dos semanas. Dos semanas le digo.',
    peso: 1,
    izq: { rechaza: true, texto: 'Dejame trabajar a mí', efectos: { pueblo: -3, rosca: 3 }, replica: 'Te bajaste sin dar propina. La anécdota la contó ochenta veces, cada vez peor.' },
    der: { acepta: true, texto: 'A ver, contame', efectos: { pueblo: 4, campo: -2 }, replica: 'El plan tenía dos puntos. El segundo era ilegal. El primero no era tan malo.' }
  },
  {
    id: 'asesor_encuesta',
    forma: 'dilema',
    personaje: 'chanta',
    texto: 'Tengo la encuesta acá sin abrir. Antes de abrirla decime qué te gustaría que diga, así la abro bien.',
    peso: 1.1,
    izq: {
      texto: 'Leémela como vino',
      efectos: { pueblo: -2, rosca: 4, caja: -1 },
      replica: 'Era peor de lo que pensabas. Siempre es peor de lo que pensás.'
    },
    der: {
      texto: 'Decime algo lindo',
      efectos: { pueblo: 3, rosca: -2 },
      pone: ['vive_en_burbuja'],
      replica: 'Dormiste ocho horas seguidas. Hacía meses que no te pasaba.'
    }
  },
  {
    id: 'burbuja',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Una sola pregunta, presidente: ¿cuánto sale el kilo de asado? El número. No me explique, el número.',
    peso: 1.5,
    requiere: { flags: ['vive_en_burbuja'] },
    izq: {
      rechaza: true,
      texto: 'No lo sé, señora',
      efectos: { pueblo: -5, rosca: 2 },
      saca: ['vive_en_burbuja'],
      replica: 'Se dio vuelta y siguió caminando sin decir nada más. Alcanzó.'
    },
    der: {
      acepta: true,
      texto: 'Tiro un número',
      efectos: { pueblo: -10, campo: 2 },
      replica: 'Erraste por el triple. La señora lo repitió en cuatro canales distintos.'
    }
  },
  {
    id: 'feriado_puente',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Movemos el feriado al lunes y tenés tres días de gente en la ruta sin pensar en vos. Sale gratis.',
    peso: 1,
    izq: { rechaza: true, texto: 'Que se trabaje', efectos: { pueblo: -4, campo: 5, caja: 2 }, replica: 'Sacaron comunicado los gremios y sacaron comunicado los hoteleros. Los dos contra vos.' },
    der: { acepta: true, texto: 'Dale, movelo', efectos: { pueblo: 6, campo: -4, caja: -2 }, replica: 'Se llenó la costa. La industria perdió un día de producción y lo puso en un informe que no leyó nadie.' }
  },
  {
    id: 'obra_inaugurada',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'El puente está al sesenta por ciento, pero la cinta ya está comprada y la banda confirmada. ¿Cortamos?',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Cuando esté terminado',
      efectos: { pueblo: -3, rosca: -4, caja: 2 },
      replica: 'El intendente inauguró una plaza él solo el domingo. En esa foto no estás.'
    },
    der: {
      acepta: true,
      texto: 'Que suene la banda',
      efectos: { pueblo: 6, rosca: 5, campo: -3 },
      pone: ['obra_trucha'],
      replica: 'Quedó hermosa la foto. El puente todavía no cruza a ningún lado.'
    }
  },
  {
    id: 'obra_derrumbe',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'El puente que inauguraron se cayó anoche. No hubo heridos. Hubo tres cámaras. ¿Alguna palabra?',
    peso: 1.6,
    requiere: { flags: ['obra_trucha'], mesMin: 8 },
    izq: {
      texto: 'Fue un temporal',
      efectos: { pueblo: -8, rosca: -4, campo: -2 },
      replica: 'Esa noche no llovió en trescientos kilómetros a la redonda, y el servicio meteorológico es público.'
    },
    der: {
      texto: 'Me hago cargo',
      efectos: { pueblo: -3, rosca: -8, caja: -4 },
      saca: ['obra_trucha'],
      replica: 'Renunció un secretario de obras que justo había firmado en contra de inaugurar.'
    }
  },
  {
    id: 'pareja_agenda',
    forma: 'propuesta',
    personaje: 'primera_dama',
    texto: 'Hace once días que la última que apaga la luz soy yo. No te estoy reclamando nada: te estoy avisando.',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'Es lo que hay, es el cargo',
      efectos: { rosca: 3, pueblo: -2 },
      pone: ['distancia_casa'],
      replica: 'Asintió y se fue a dormir. Al otro día te dejó el café hecho igual.'
    },
    der: {
      acepta: true,
      texto: 'Mañana ceno en casa',
      efectos: { pueblo: 4, rosca: -3 },
      replica: 'Llegaste a los postres. Contó igual.'
    }
  },
  {
    id: 'cientifica',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'Con el dos por ciento de lo que gastan en publicidad oficial, el laboratorio queda andando en un año.',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'El año que viene lo vemos',
      efectos: { caja: 3, pueblo: -4 },
      replica: 'Se fue a un instituto en Alemania. Mandó una carta de agradecimiento impecablemente redactada.'
    },
    der: {
      siembra: { carta: 'ciencia_rinde', meses: [14,20] },
      acepta: true,
      texto: 'Firmalo y arrancá',
      efectos: { caja: -5, pueblo: 4, campo: 3 },
      pone: ['ciencia_bancada'],
      replica: 'El laboratorio abrió sin acto, sin cinta y sin prensa. Ella lo prefirió así.'
    }
  },
  {
    id: 'ciencia_paga',
    forma: 'dilema',
    personaje: 'cientifico',
    texto: 'La patente salió y es nuestra. Hay tres países ofreciendo por ella. También podríamos fabricarla acá.',
    peso: 1.3,
    requiere: { flags: ['ciencia_bancada'], mesMin: 18 },
    izq: { texto: 'Vendemos la patente', efectos: { caja: 14, campo: 6, pueblo: -3 }, replica: 'Entró la plata de golpe. La planta la levantaron en Rotterdam.' },
    der: { texto: 'Se fabrica acá', efectos: { pueblo: 10, campo: 4, caja: -6 }, pone: ['orgullo_nacional'], replica: 'Tardó dieciocho meses más de lo previsto. Sale en los libros de la escuela.' }
  },
  {
    id: 'militar_presupuesto',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'Señor presidente, los aviones no vuelan. No es una figura retórica. No despegan. Están en tierra.',
    peso: 0.9,
    izq: { rechaza: true, texto: 'Que sigan en tierra', efectos: { caja: 4, rosca: -4, pueblo: 2 }, replica: 'Un sanitario no pudo salir a buscar a alguien en el sur. Los diarios del sur lo pusieron en tapa.' },
    der: { acepta: true, texto: 'Que vuelvan a volar', efectos: { caja: -7, rosca: 4, pueblo: -2 }, replica: 'Volaron. Tres semanas después pidieron presupuesto para los helicópteros.' }
  },
  {
    id: 'maestra',
    forma: 'propuesta',
    personaje: 'gremio_docente',
    texto: 'Cuarenta escuelas sin gas y estamos en junio. Los chicos toman la leche con la campera puesta.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Que se dé clase igual',
      efectos: { pueblo: -10, caja: 3 },
      pone: ['paro_docente'],
      replica: 'El paro arrancó al otro día y duró tres semanas. Julio ya eran vacaciones.'
    },
    der: {
      siembra: { carta: 'escuelas_gas', meses: [10,14] },
      acepta: true,
      texto: 'Se resuelve esta semana',
      efectos: { caja: -8, pueblo: 8, rosca: -2 },
      replica: 'Se conectaron treinta y una. Las otras nueve estaban en zonas sin red de gas y nadie lo sabía.'
    }
  },
  {
    id: 'pibe_pregunta',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Mi viejo laburó cuarenta y un años en la misma fábrica. ¿Con la jubilación le alcanza para algo?',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'No te voy a mentir',
      efectos: { pueblo: -4, rosca: 4, campo: 3 },
      replica: 'El video del pibe escuchando la respuesta tuvo nueve millones de vistas. Vos ni aparecías.'
    },
    der: {
      acepta: true,
      texto: 'La vamos a mejorar',
      efectos: { pueblo: 7, caja: -8, inflacion: 1.5 },
      pone: ['prometio_jubilados'],
      replica: 'Se lo dijiste mirándolo a los ojos. Eso también quedó grabado.'
    }
  },
  {
    id: 'jubilados_promesa',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Usted dijo "con la mínima se llega". Lo tengo recortado del diario, acá en la cartera. ¿Se lo leo?',
    peso: 1.4,
    requiere: { flags: ['prometio_jubilados'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'No se puede, señora',
      efectos: { pueblo: -12, rosca: 2, caja: 4 },
      saca: ['prometio_jubilados'],
      pone: ['incumplidor'],
      replica: 'Guardó el recorte de nuevo en la cartera. Dijo que lo iba a necesitar.'
    },
    der: {
      acepta: true,
      texto: 'Lo dije y lo cumplo',
      efectos: { caja: -14, pueblo: 12, inflacion: 3 },
      saca: ['prometio_jubilados'],
      replica: 'Se cumplió. La partida salió de otro lado, y ese otro lado se enteró en marzo.'
    }
  },
  {
    id: 'cura_comedor',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'En enero dábamos doscientos platos. Hoy damos seiscientos. No vengo a pedirte plata: vengo a contarte.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Hacé lo que puedas',
      efectos: { pueblo: -6, caja: 2 },
      replica: 'No insistió. Se tomó el café, agradeció y se fue. Eso fue peor que si hubiera insistido.'
    },
    der: {
      acepta: true,
      texto: '¿Qué necesitás?',
      efectos: { pueblo: 6, caja: -4, rosca: -1 },
      replica: 'Pidió camiones, no plata. Llegaron los camiones. Fue de las pocas cosas que salieron como estaban planeadas.'
    }
  },
  {
    id: 'empresario_favor',
    forma: 'propuesta',
    personaje: 'empresario',
    texto: 'Un decreto de dos carillas, presidente. No lo lee nadie, no lo publica nadie, y yo tengo buena memoria.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Ni loco',
      efectos: { campo: -6, pueblo: 4, rosca: -2 },
      replica: 'A las tres semanas su canal descubrió que no sabés gobernar. Habrá sido casualidad.'
    },
    der: {
      acepta: true,
      texto: 'Traémelo y lo firmo',
      efectos: { caja: 10, campo: 6, pueblo: -5 },
      pone: ['favor_debido'],
      replica: 'No lo leyó nadie. No lo publicó nadie. Alguien lo archivó.'
    }
  },
  {
    id: 'favor_cobrado',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Tengo un decreto con su firma y una empresa que en dos años facturó ochenta veces más. ¿Le suena?',
    peso: 1.5,
    requiere: { flags: ['favor_debido'], mesMin: 14 },
    izq: {
      rechaza: true,
      texto: 'Esto se cierra acá',
      efectos: { rosca: 4, pueblo: -9, caja: -6 },
      pone: ['encubrimiento'],
      replica: 'Se cerró. La carpeta quedó en un cajón que alguien más sabe abrir.'
    },
    der: {
      acepta: true,
      texto: 'Que investiguen todo',
      efectos: { rosca: -8, pueblo: 5, campo: -4 },
      saca: ['favor_debido'],
      pone: ['causa_abierta'],
      replica: 'Investigaron. El primer citado fue alguien que te acompañó el día de la asunción.'
    }
  },
  {
    id: 'tuitero_viral',
    forma: 'dilema',
    personaje: 'tuitero',
    texto: 'Hay un video tuyo comiendo un sándwich. No hiciste nada mal. Van cuatro horas de ser lo más visto del país.',
    peso: 0.9,
    izq: { texto: 'Me río y listo', efectos: { pueblo: 5, rosca: -2 }, replica: 'Fuiste a un programa de humor. Por una noche fuiste una persona.' },
    der: { texto: 'No existe, no pasó', efectos: { pueblo: -2, rosca: 2 }, replica: 'Duró seis días más. El silencio le puso nafta.' }
  },
  {
    id: 'barra_pibes',
    forma: 'propuesta',
    personaje: 'barra',
    texto: 'Venimos por los pibes del barrio: hay doce sin laburo desde que cerró el frigorífico. Después hablamos de micros.',
    peso: 1,
    izq: { rechaza: true, texto: 'Con ustedes no negocio', efectos: { pueblo: -4, rosca: -3, campo: 3 }, replica: 'Se levantaron sin dar la mano. El domingo apareció un trapo con tu apellido en la popular.' },
    der: {
      acepta: true,
      texto: 'Vemos qué se puede hacer',
      efectos: { pueblo: 5, caja: -4, rosca: 3 },
      pone: ['deuda_barra'],
      replica: 'De los tres temas, el del laburo para los pibes fue el que quedó para más adelante.'
    }
  },
  {
    id: 'puntero_padron',
    forma: 'propuesta',
    personaje: 'puntero',
    texto: 'Jefe, en mis doce manzanas hay cuatro mil personas que salen si yo digo que salen. ¿Digo que salgan?',
    peso: 1,
    izq: { rechaza: true, texto: 'Guardalos para después', efectos: { rosca: -2, caja: 2, campo: 2 }, replica: 'Los guardó. Te lo recordó cada vez que vino a pedir algo, durante dos años.' },
    der: {
      siembra: { carta: 'cuenta_micros', meses: [6,10] },
      acepta: true,
      texto: 'Que salgan el jueves',
      efectos: { pueblo: 6, rosca: 4, caja: -5 },
      pone: ['calle_movilizada'],
      replica: 'Salieron los cuatro mil. Los micros los pagó alguien, y ese alguien fue el Estado.'
    }
  },
  {
    id: 'hincha_seleccion',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: 'Juega la selección un martes a las cuatro. Nadie va a laburar igual. La pregunta es si lo decís vos.',
    peso: 1,
    izq: { rechaza: true, texto: 'Se labura igual', efectos: { pueblo: -6, campo: 4, caja: 2 }, replica: 'No laburó nadie. Quedaste como el que no entendió en qué país vive.' },
    der: {
      acepta: true,
      texto: 'Asueto y se acabó',
      efectos: { pueblo: 8, campo: -5, caja: -3 },
      pone: ['fiebre_mundial'],
      replica: 'Ganamos dos a cero. Por una tarde fuiste el mejor presidente de la historia.'
    }
  },
  {
    id: 'copa_final',
    forma: 'propuesta',
    personaje: 'hincha',
    texto: '¡Es la final! ¿Se va para allá o la mira acá? Porque si va, va con cuarenta millones mirándolo a usted.',
    peso: 1.4,
    requiere: { flags: ['fiebre_mundial'], mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'La miro acá',
      efectos: { pueblo: 4, rosca: 2 },
      pone: ['copa_ganada'],
      replica: 'Ganamos. Saliste al balcón con la camiseta puesta y alcanzó.'
    },
    der: {
      acepta: true,
      texto: 'Me subo al avión',
      efectos: { pueblo: 6, caja: -6, rosca: -4 },
      pone: ['copa_ganada'],
      replica: 'Ganamos. Te sacaron de la cancha en andas y todavía no sabés cómo volviste al hotel.'
    }
  },
  {
    id: 'jueza_independencia',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Su ministro llamó tres veces a mi juzgado esta semana. Las llamadas al juzgado quedan registradas.',
    peso: 1.2,
    izq: {
      texto: 'Yo no mandé a nadie',
      efectos: { rosca: -4, pueblo: 2 },
      replica: 'Te creyó a medias, que es todo lo que esa mujer concede.'
    },
    der: {
      texto: 'Lo mandé yo',
      efectos: { rosca: 6, pueblo: -6, campo: -4 },
      pone: ['presion_judicial'],
      replica: 'Anotó algo en una libreta y cerró la libreta. No dijo qué anotó.'
    }
  },
  {
    id: 'chanta_cargo',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Che, duda boba: ¿yo qué cargo tengo? Porque cobro hace ocho meses y en los formularios no sé qué poner.',
    peso: 0.8,
    izq: { rechaza: true, texto: 'Ninguno. Andate', efectos: { caja: 3, pueblo: 3, rosca: -4 }, replica: 'Se fue. A los dos meses apareció asesorando a la oposición, con el mismo traje.' },
    der: { acepta: true, texto: 'Ponete "coordinador"', efectos: { rosca: 3, caja: -3, pueblo: -2 }, replica: 'Se hizo tarjetas al día siguiente. Con el escudo en relieve.' }
  },
  {
    id: 'periodista_100dias',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Cien días de gestión. Le pido un logro concreto. Uno. Tengo la cámara encendida y tengo todo el tiempo.',
    peso: 1.3,
    requiere: { mesMin: 3, mesMax: 8 },
    izq: {
      rechaza: true,
      texto: 'Cien días no es nada',
      efectos: { pueblo: -4, rosca: -2, campo: 2 },
      replica: '"CIEN DÍAS NO ES NADA", a ocho columnas, con tu cara al lado del título.'
    },
    der: {
      acepta: true,
      texto: 'Le nombro uno',
      efectos: { pueblo: 3, rosca: 2 },
      replica: 'Nombraste una obra que había empezado el gobierno anterior. En vivo no se notó.'
    }
  },
  {
    id: 'censo',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'Los datos del censo están peor de lo que esperábamos. Salen el martes, salvo que usted diga otra cosa.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Revisémoslos otra vez',
      efectos: { pueblo: 3, rosca: 3, campo: -6, caja: -3 },
      pone: ['datos_dibujados'],
      replica: 'Salieron prolijos. Ningún privado volvió a usar una estadística oficial para nada.'
    },
    der: {
      acepta: true,
      texto: 'Que salgan como están',
      efectos: { pueblo: -6, campo: 3, rosca: -3, caja: 3 },
      pone: ['datos_creibles'],
      replica: 'Dolió tres días. Por primera vez en años, los números eran los números.'
    }
  }
];
