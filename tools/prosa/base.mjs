import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/base.js', import.meta.url).pathname, {
  asuncion: {
    texto: 'Falta una hora. Hay dos borradores: el que emociona y el que no miente. ¿Cuál subo al teleprompter?',
    izq: { texto: 'El que emociona', replica: 'La plaza cantó veinte minutos. En el palco, tres personas anotaron cada promesa en una libreta.' },
    der: { texto: 'El que no miente', replica: '"Al menos avisó", tituló un diario. Los otros once titularon otra cosa.' }
  },
  foto_oficial: {
    texto: 'La foto oficial del gabinete: escritorio de roble o galpón con casco puesto. Las dos mienten parecido.',
    izq: { texto: 'De traje, en el despacho', replica: 'Salió solemne. En redes le pusieron la cortina de una serie de abogados.' },
    der: { texto: 'Con casco, en la planta', replica: 'El casco te quedaba grande. Fue lo único que se comentó.' }
  },
  vice_sonrisa: {
    texto: 'Me enteré del nombramiento por la radio, manejando. Tuve que frenar en la banquina para escuchar bien.',
    izq: { texto: 'Los nombro yo', replica: 'No contestó nada. A la semana, dos ministros empezaron a mirarla a ella antes de hablar.' },
    der: { texto: 'El próximo lo elegís vos', replica: 'Eligió tres. Dijo que venían en combo.' }
  },
  vice_carpeta: {
    texto: 'En esta carpeta están los votos del Senado. En esta otra está por qué me los van a dar.',
    izq: { texto: 'Abrime la segunda', replica: 'Adentro había fotocopias de tu propia plataforma de campaña, subrayada con resaltador.' },
    der: { texto: 'Decime qué querés', replica: 'Tres ministerios y una embajada. Visto desde marzo, salió barato.' }
  },
  vieja_llama: {
    texto: 'Nene, ¿comiste? Y otra cosa: fui a la carnicería con lo de siempre y me volví con dos tomates.',
    izq: { texto: 'Está todo bien, ma', replica: 'No te creyó. Nunca te creyó, ni a los nueve años con el jarrón.' },
    der: { texto: 'Está bravo, ma', replica: 'Se lo contó a todo el barrio antes del mediodía. Fue tu mejor operación de prensa del año.' }
  },
  tachero: {
    texto: '¿Sabe qué pasa, jefe? Falta decisión. Yo esto se lo arreglo en dos semanas. Dos semanas le digo.',
    izq: { texto: 'Dejame trabajar a mí', replica: 'Te bajaste sin dar propina. La anécdota la contó ochenta veces, cada vez peor.' },
    der: { texto: 'A ver, contame', replica: 'El plan tenía dos puntos. El segundo era ilegal. El primero no era tan malo.' }
  },
  asesor_encuesta: {
    texto: 'Tengo la encuesta acá sin abrir. Antes de abrirla decime qué te gustaría que diga, así la abro bien.',
    izq: { texto: 'Leémela como vino', replica: 'Era peor de lo que pensabas. Siempre es peor de lo que pensás.' },
    der: { texto: 'Decime algo lindo', replica: 'Dormiste ocho horas seguidas. Hacía meses que no te pasaba.' }
  },
  burbuja: {
    texto: 'Una sola pregunta, presidente: ¿cuánto sale el kilo de asado? El número. No me explique, el número.',
    izq: { texto: 'No lo sé, señora', replica: 'Se dio vuelta y siguió caminando sin decir nada más. Alcanzó.' },
    der: { texto: 'Tiro un número', replica: 'Erraste por el triple. La señora lo repitió en cuatro canales distintos.' }
  },
  feriado_puente: {
    texto: 'Movemos el feriado al lunes y tenés tres días de gente en la ruta sin pensar en vos. Sale gratis.',
    izq: { texto: 'Que se trabaje', replica: 'Sacaron comunicado los gremios y sacaron comunicado los hoteleros. Los dos contra vos.' },
    der: { texto: 'Dale, movelo', replica: 'Se llenó la costa. La industria perdió un día de producción y lo puso en un informe que no leyó nadie.' }
  },
  obra_inaugurada: {
    texto: 'El puente está al sesenta por ciento, pero la cinta ya está comprada y la banda confirmada. ¿Cortamos?',
    izq: { texto: 'Cuando esté terminado', replica: 'El intendente inauguró una plaza él solo el domingo. En esa foto no estás.' },
    der: { texto: 'Que suene la banda', replica: 'Quedó hermosa la foto. El puente todavía no cruza a ningún lado.' }
  },
  obra_derrumbe: {
    texto: 'El puente que inauguraron se cayó anoche. No hubo heridos. Hubo tres cámaras. ¿Alguna palabra?',
    izq: { texto: 'Fue un temporal', replica: 'Esa noche no llovió en trescientos kilómetros a la redonda, y el servicio meteorológico es público.' },
    der: { texto: 'Me hago cargo', replica: 'Renunció un secretario de obras que justo había firmado en contra de inaugurar.' }
  },
  pareja_agenda: {
    texto: 'Hace once días que la última que apaga la luz soy yo. No te estoy reclamando nada: te estoy avisando.',
    izq: { texto: 'Es lo que hay, es el cargo', replica: 'Asintió y se fue a dormir. Al otro día te dejó el café hecho igual.' },
    der: { texto: 'Mañana ceno en casa', replica: 'Llegaste a los postres. Contó igual.' }
  },
  cientifica: {
    texto: 'Con el dos por ciento de lo que gastan en publicidad oficial, el laboratorio queda andando en un año.',
    izq: { texto: 'El año que viene lo vemos', replica: 'Se fue a un instituto en Alemania. Mandó una carta de agradecimiento impecablemente redactada.' },
    der: { texto: 'Firmalo y arrancá', replica: 'El laboratorio abrió sin acto, sin cinta y sin prensa. Ella lo prefirió así.' }
  },
  ciencia_paga: {
    texto: 'La patente salió y es nuestra. Hay tres países ofreciendo por ella. También podríamos fabricarla acá.',
    izq: { texto: 'Vendemos la patente', replica: 'Entró la plata de golpe. La planta la levantaron en Rotterdam.' },
    der: { texto: 'Se fabrica acá', replica: 'Tardó dieciocho meses más de lo previsto. Sale en los libros de la escuela.' }
  },
  militar_presupuesto: {
    texto: 'Señor presidente, los aviones no vuelan. No es una figura retórica. No despegan. Están en tierra.',
    izq: { texto: 'Que sigan en tierra', replica: 'Un sanitario no pudo salir a buscar a alguien en el sur. Los diarios del sur lo pusieron en tapa.' },
    der: { texto: 'Que vuelvan a volar', replica: 'Volaron. Tres semanas después pidieron presupuesto para los helicópteros.' }
  },
  maestra: {
    texto: 'Cuarenta escuelas sin gas y estamos en junio. Los chicos toman la leche con la campera puesta.',
    izq: { texto: 'Que se dé clase igual', replica: 'El paro arrancó al otro día y duró tres semanas. Julio ya eran vacaciones.' },
    der: { texto: 'Se resuelve esta semana', replica: 'Se conectaron treinta y una. Las otras nueve estaban en zonas sin red de gas y nadie lo sabía.' }
  },
  pibe_pregunta: {
    texto: 'Mi viejo laburó cuarenta y un años en la misma fábrica. ¿Con la jubilación le alcanza para algo?',
    izq: { texto: 'No te voy a mentir', replica: 'El video del pibe escuchando la respuesta tuvo nueve millones de vistas. Vos ni aparecías.' },
    der: { texto: 'La vamos a mejorar', replica: 'Se lo dijiste mirándolo a los ojos. Eso también quedó grabado.' }
  },
  jubilados_promesa: {
    texto: 'Usted dijo "con la mínima se llega". Lo tengo recortado del diario, acá en la cartera. ¿Se lo leo?',
    izq: { texto: 'No se puede, señora', replica: 'Guardó el recorte de nuevo en la cartera. Dijo que lo iba a necesitar.' },
    der: { texto: 'Lo dije y lo cumplo', replica: 'Se cumplió. La partida salió de otro lado, y ese otro lado se enteró en marzo.' }
  },
  cura_comedor: {
    texto: 'En enero dábamos doscientos platos. Hoy damos seiscientos. No vengo a pedirte plata: vengo a contarte.',
    izq: { texto: 'Hacé lo que puedas', replica: 'No insistió. Se tomó el café, agradeció y se fue. Eso fue peor que si hubiera insistido.' },
    der: { texto: '¿Qué necesitás?', replica: 'Pidió camiones, no plata. Llegaron los camiones. Fue de las pocas cosas que salieron como estaban planeadas.' }
  },
  empresario_favor: {
    texto: 'Un decreto de dos carillas, presidente. No lo lee nadie, no lo publica nadie, y yo tengo buena memoria.',
    izq: { texto: 'Ni loco', replica: 'A las tres semanas su canal descubrió que no sabés gobernar. Habrá sido casualidad.' },
    der: { texto: 'Traémelo y lo firmo', replica: 'No lo leyó nadie. No lo publicó nadie. Alguien lo archivó.' }
  },
  favor_cobrado: {
    texto: 'Tengo un decreto con su firma y una empresa que en dos años facturó ochenta veces más. ¿Le suena?',
    izq: { texto: 'Esto se cierra acá', replica: 'Se cerró. La carpeta quedó en un cajón que alguien más sabe abrir.' },
    der: { texto: 'Que investiguen todo', replica: 'Investigaron. El primer citado fue alguien que te acompañó el día de la asunción.' }
  },
  tuitero_viral: {
    texto: 'Hay un video tuyo comiendo un sándwich. No hiciste nada mal. Van cuatro horas de ser lo más visto del país.',
    izq: { texto: 'Me río y listo', replica: 'Fuiste a un programa de humor. Por una noche fuiste una persona.' },
    der: { texto: 'No existe, no pasó', replica: 'Duró seis días más. El silencio le puso nafta.' }
  },
  barra_pibes: {
    texto: 'Venimos a hablar de laburo para los pibes. Después hablamos de las entradas. Y de los micros.',
    izq: { texto: 'Con ustedes no negocio', replica: 'Se levantaron sin dar la mano. El domingo apareció un trapo con tu apellido en la popular.' },
    der: { texto: 'Vemos qué se puede hacer', replica: 'De los tres temas, el del laburo para los pibes fue el que quedó para más adelante.' }
  },
  puntero_padron: {
    texto: 'Jefe, en mis doce manzanas hay cuatro mil personas que salen si yo digo que salen. ¿Digo que salgan?',
    izq: { texto: 'Guardalos para después', replica: 'Los guardó. Te lo recordó cada vez que vino a pedir algo, durante dos años.' },
    der: { texto: 'Que salgan el jueves', replica: 'Salieron los cuatro mil. Los micros los pagó alguien, y ese alguien fue el Estado.' }
  },
  hincha_seleccion: {
    texto: 'Juega la selección un martes a las cuatro. Nadie va a laburar igual. La pregunta es si lo decís vos.',
    izq: { texto: 'Se labura igual', replica: 'No laburó nadie. Quedaste como el que no entendió en qué país vive.' },
    der: { texto: 'Asueto y se acabó', replica: 'Ganamos dos a cero. Por una tarde fuiste el mejor presidente de la historia.' }
  },
  copa_final: {
    texto: '¡Es la final! ¿Se va para allá o la mira acá? Porque si va, va con cuarenta millones mirándolo a usted.',
    izq: { texto: 'La miro acá', replica: 'Ganamos. Saliste al balcón con la camiseta puesta y alcanzó.' },
    der: { texto: 'Me subo al avión', replica: 'Ganamos. Te sacaron de la cancha en andas y todavía no sabés cómo volviste al hotel.' }
  },
  jueza_independencia: {
    texto: 'Su ministro llamó tres veces a mi juzgado esta semana. Las llamadas al juzgado quedan registradas.',
    izq: { texto: 'Yo no mandé a nadie', replica: 'Te creyó a medias, que es todo lo que esa mujer concede.' },
    der: { texto: 'Lo mandé yo', replica: 'Anotó algo en una libreta y cerró la libreta. No dijo qué anotó.' }
  },
  chanta_cargo: {
    texto: 'Che, duda boba: ¿yo qué cargo tengo? Porque cobro hace ocho meses y en los formularios no sé qué poner.',
    izq: { texto: 'Ninguno. Andate', replica: 'Se fue. A los dos meses apareció asesorando a la oposición, con el mismo traje.' },
    der: { texto: 'Ponete "coordinador"', replica: 'Se hizo tarjetas al día siguiente. Con el escudo en relieve.' }
  },
  periodista_100dias: {
    texto: 'Cien días de gestión. Le pido un logro concreto. Uno. Tengo la cámara encendida y tengo todo el tiempo.',
    izq: { texto: 'Cien días no es nada', replica: '"CIEN DÍAS NO ES NADA", a ocho columnas, con tu cara al lado del título.' },
    der: { texto: 'Le nombro uno', replica: 'Nombraste una obra que había empezado el gobierno anterior. En vivo no se notó.' }
  },
  censo: {
    texto: 'Los datos del censo están peor de lo que esperábamos. Salen el martes, salvo que usted diga otra cosa.',
    izq: { texto: 'Revisémoslos otra vez', replica: 'Salieron prolijos. Ningún privado volvió a usar una estadística oficial para nada.' },
    der: { texto: 'Que salgan como están', replica: 'Dolió tres días. Por primera vez en años, los números eran los números.' }
  }
});
