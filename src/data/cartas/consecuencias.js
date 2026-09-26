// CONSECUENCIAS — cartas que no salen del mazo: las sembraste vos.
//
// Cuando una decisión tiene `siembra`, el motor agenda una de estas para dentro
// de N meses. A diferencia de las flags —que sólo habilitan una carta y dejan
// que el azar decida si aparece— acá la llegada está garantizada y tiene fecha.
// Por eso todas arrancan nombrando la decisión que las trajo: el punto es que
// el jugador ate el cabo cuando ya se había olvidado.
//
// Todas son `soloEncadenada`: nunca aparecen por sorteo.
export const CARTAS_CONSECUENCIAS = [
  {
    id: 'factura_emision',
    forma: 'dilema',
    personaje: 'ministro',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Aquel turno extra de la máquina, el de hace medio año. Acá está el dato del mes con eso ya adentro.',
    izq: {
      texto: 'No lo anuncio',
      efectos: { inflacion: 6, pueblo: -4, rosca: 2 },
      replica: 'El dato salió igual, publicado por el organismo de estadística a las cuatro de la tarde de un viernes.'
    },
    der: {
      texto: 'Lo explico en cadena',
      efectos: { inflacion: 5, pueblo: -6, campo: 4, rosca: -2 },
      replica: 'Explicar la emisión en cadena nacional fue valiente y fue inútil: quedó el número, no la explicación.'
    }
  },
  {
    id: 'escuelas_gas',
    forma: 'dilema',
    personaje: 'gremio_docente',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Las escuelas que conectaste al gas el año pasado pasaron este invierno con calefacción. Vengo a decirte eso nada más.',
    izq: {
      texto: 'Que salga en los diarios',
      efectos: { pueblo: 6, rosca: 3, campo: -2 },
      replica: 'Salió en dos diarios, abajo, en una columna. Las maestras lo recortaron igual y lo pegaron en la sala.'
    },
    der: {
      texto: 'Me alcanza con saberlo',
      efectos: { pueblo: 8, rosca: -2 },
      replica: 'No lo anunció nadie. Cuarenta directoras lo contaron por su cuenta, que llega más lejos que un anuncio.'
    }
  },
  {
    id: 'cloacas_listas',
    forma: 'propuesta',
    personaje: 'cura',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Las cloacas que aprobaste el año pasado están andando. La manzana ocho no se inundó en toda la temporada.',
    izq: {
      rechaza: true,
      texto: 'No voy a ir',
      efectos: { pueblo: 5, rosca: 2 },
      replica: 'No fuiste. El barrio igual sabe quién firmó, porque en el barrio esas cosas se saben.'
    },
    der: {
      acepta: true,
      texto: 'Voy sin prensa',
      efectos: { pueblo: 9, caja: -2, rosca: -2 },
      replica: 'Fuiste un sábado, sin cámaras. Se enteró todo el mundo igual y eso lo hizo valer el doble.'
    }
  },
  {
    id: 'ciencia_rinde',
    forma: 'dilema',
    personaje: 'cientifico',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El laboratorio que bancaste hace dos años desarrolló algo que tres países quieren. Esta vez vengo con buenas.',
    izq: {
      texto: 'Lo licenciamos afuera',
      efectos: { caja: 14, campo: 6, pueblo: 2 },
      replica: 'Entraron los dólares. En el paper figura el instituto argentino y eso, en ese mundo, vale bastante.'
    },
    der: {
      texto: 'Producción nacional',
      efectos: { pueblo: 11, campo: 5, caja: -4 },
      pone: ['orgullo_nacional'],
      replica: 'Se fabricó acá. Tardó más, salió más caro y dio trabajo a cuatrocientas personas en una provincia chica.'
    }
  },
  {
    id: 'letra_chica',
    forma: 'propuesta',
    personaje: 'organismo',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El acuerdo que firmamos tiene una cláusula de revisión automática. Se activó anoche. No hace falta que firme nada.',
    izq: {
      rechaza: true,
      texto: 'Esa cláusula no la firmé',
      efectos: { campo: -9, caja: -7, pueblo: 5, rosca: -3 },
      replica: 'La firmaste. Está en la página cuarenta y uno del anexo, con tu inicial al margen de cada carilla.'
    },
    der: {
      acepta: true,
      texto: 'Cumplimos lo que firmamos',
      efectos: { caja: 7, pueblo: -9, campo: 6 },
      replica: 'Cumpliste. El ajuste que disparó la cláusula lo había escrito alguien que no vive en este país.'
    }
  },
  {
    id: 'cosecha_record',
    forma: 'dilema',
    personaje: 'productor',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Sembramos todo, como dijimos. Cosecha récord, camiones haciendo cola en el puerto desde las cuatro de la mañana.',
    izq: {
      texto: 'Nos quedamos con una parte',
      efectos: { caja: 13, campo: -10, pueblo: 4 },
      replica: 'Retuviste una parte del récord. Al año siguiente sembraron exactamente lo que habían sembrado antes.'
    },
    der: {
      texto: 'Que entre todo',
      efectos: { caja: 9, campo: 10, pueblo: -3 },
      replica: 'Entraron los dólares de la cosecha entera. El campo se acordó de esto durante los tres años siguientes.'
    }
  },
  {
    id: 'siembra_caida',
    forma: 'dilema',
    personaje: 'productor',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Le dijimos que si tocaban las retenciones no sembrábamos. Se sembró un dieciocho por ciento menos. Acá está.',
    izq: {
      texto: 'Era el precio a pagar',
      efectos: { caja: -11, campo: -5, pueblo: 3 },
      replica: 'Era el precio. Lo pagó la balanza comercial en marzo y lo pagaste vos en junio.'
    },
    der: {
      texto: 'Revisamos el esquema',
      efectos: { campo: 9, caja: -6, pueblo: -4 },
      replica: 'Revisaste. Volvieron a sembrar, y quedó claro para siempre que la amenaza no había sido un bluff.'
    }
  },
  {
    id: 'factura_luz',
    forma: 'dilema',
    personaje: 'vecina',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Llegó la primera factura con el aumento que usted sinceró. La tengo acá. ¿Quiere que le lea el total?',
    izq: {
      texto: 'Era necesario, señora',
      efectos: { pueblo: -8, caja: 5, campo: 4 },
      replica: 'Fotografió la factura y la subió. Esa foto se compartió más que cualquier cosa que hayas dicho ese mes.'
    },
    der: {
      texto: 'Hay tarifa social',
      efectos: { pueblo: -3, caja: -4, campo: -2 },
      replica: 'La tarifa social existía. El formulario para pedirla tenía catorce campos y pedía una constancia que ella no tenía.'
    }
  },
  {
    id: 'fondo_llega',
    forma: 'propuesta',
    personaje: 'empresario',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El fondo al que le garantizaste treinta años ya puso la plata. Ahora quiere el terreno de al lado, también.',
    izq: {
      rechaza: true,
      texto: 'Hasta acá llegamos',
      efectos: { caja: 8, campo: -6, pueblo: 5 },
      replica: 'Se quedaron con lo que ya habían invertido, que era mucho, y dejaron de devolverte las llamadas.'
    },
    der: {
      acepta: true,
      texto: 'Que se lo queden',
      efectos: { caja: 12, campo: 9, pueblo: -9, rosca: -3 },
      pone: ['blindaje_juridico'],
      replica: 'Se lo quedaron. El terreno de al lado era una laguna con nombre y la laguna tenía gente alrededor.'
    }
  },
  {
    id: 'favor_legislativo',
    forma: 'propuesta',
    personaje: 'gobernadora',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Los tres votos que compraste para tu ley estrella vienen a cobrar. No querían plata: querían esto.',
    izq: {
      rechaza: true,
      texto: 'Ya les pagué',
      efectos: { rosca: -11, pueblo: 4 },
      replica: 'Les pagaste una vez. En esta actividad eso no cancela la deuda: la renueva con otro vencimiento.'
    },
    der: {
      acepta: true,
      texto: 'Se les da',
      efectos: { rosca: 8, caja: -9, pueblo: -5 },
      replica: 'Se les dio. Ahora hay tres personas que saben exactamente cuánto vale tu firma cuando estás apurado.'
    }
  },
  {
    id: 'satelite_arriba',
    forma: 'dilema',
    personaje: 'cientifico',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El satélite que mandaste a lanzar lleva un año en órbita. Está mandando datos que nadie más tiene.',
    izq: {
      texto: 'Los vendemos',
      efectos: { caja: 12, campo: 7 },
      replica: 'Se vendieron a cuatro países. Los compró también el que había dicho que el satélite no iba a funcionar.'
    },
    der: {
      texto: 'Los abrimos a todos',
      efectos: { pueblo: 9, campo: 8, rosca: -3 },
      pone: ['orgullo_nacional'],
      replica: 'Se publicaron abiertos. Los usaron doce universidades y una cooperativa de productores de Mendoza.'
    }
  },
  {
    id: 'demanda_importador',
    forma: 'propuesta',
    personaje: 'jueza',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El importador al que le pasaste por encima en el brote de dengue demandó al Estado. Y va ganando.',
    izq: {
      rechaza: true,
      texto: 'Vamos a juicio',
      efectos: { caja: -8, pueblo: 6, campo: -5 },
      replica: 'Fuiste a juicio. Se perdió en segunda instancia y la sentencia llegó con intereses de tres años.'
    },
    der: {
      acepta: true,
      texto: 'Arreglamos fuera del juzgado',
      efectos: { caja: -11, campo: 4, rosca: 2 },
      replica: 'Se arregló por la mitad. Nadie festejó, que suele ser la señal de que el arreglo estuvo bien.'
    }
  },
  {
    id: 'cuenta_micros',
    forma: 'propuesta',
    personaje: 'periodista',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'Los micros de aquella movilización los pagó una partida de asistencia social. Tengo las facturas escaneadas.',
    izq: {
      rechaza: true,
      texto: 'Publique lo que quiera',
      efectos: { pueblo: -7, rosca: -4, campo: -3 },
      pone: ['causa_abierta'],
      replica: 'Publicó las facturas con el sello y todo. Eran cuarenta y un micros y una firma que se leía perfecto.'
    },
    der: {
      acepta: true,
      texto: 'Lo devolvemos y se audita',
      efectos: { caja: -6, pueblo: 3, rosca: -6 },
      replica: 'Se devolvió la plata. El puntero que había armado la movida dejó de atenderte durante siete meses.'
    }
  },
  {
    id: 'puerto_rinde',
    forma: 'dilema',
    personaje: 'productor',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'El canal que mandaste a dragar está operativo. Las barcazas cargan completo por primera vez en tres años.',
    izq: {
      texto: 'Cobramos por usarlo',
      efectos: { caja: 11, campo: -5 },
      replica: 'Se cobró peaje. Recaudó bien y cada barcaza que pasó lo anotó en una planilla que un día se iba a usar.'
    },
    der: {
      texto: 'Que sea gratis',
      efectos: { campo: 11, caja: -3, pueblo: 2 },
      replica: 'Gratis. Las exportaciones del semestre fueron las mejores de la década y no fue del todo casualidad.'
    }
  },
  {
    id: 'juicio_contenedor',
    forma: 'dilema',
    personaje: 'jueza',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'La causa del contenedor tiene imputados. Dos son de gobiernos anteriores. El tercero desayuna con usted.',
    izq: {
      texto: 'Que renuncie hoy',
      efectos: { rosca: -8, pueblo: 9, campo: 3 },
      replica: 'Renunció esa misma tarde, en dos líneas. Lo que sabía se lo llevó puesto y nadie fue a preguntarle.'
    },
    der: {
      texto: 'Que la justicia decida',
      efectos: { pueblo: -7, rosca: 4 },
      pone: ['encubrimiento'],
      replica: 'La justicia decidió catorce meses después. Para entonces la pregunta ya era por qué no lo echaste antes.'
    }
  },
  {
    id: 'plaga_vuelve',
    forma: 'propuesta',
    personaje: 'productor',
    soloEncadenada: true,
    irrepetible: true,
    texto: 'La plaga que no atacamos se comió dos valles más. Ahora son cuatro mil productores y dos países cerrados.',
    izq: {
      rechaza: true,
      texto: 'Ya no hay con qué',
      efectos: { campo: -12, caja: -5, pueblo: -4 },
      replica: 'No había con qué. La zona frutícola tardó seis años en volver a exportar el volumen que exportaba.'
    },
    der: {
      acepta: true,
      texto: 'Ahora sí, plan completo',
      efectos: { caja: -14, campo: 8 },
      replica: 'Se hizo el plan, tarde y al triple de precio. Es lo que suele costar el plan que no se hizo a tiempo.'
    }
  }
];
