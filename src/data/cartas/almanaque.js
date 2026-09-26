// Mazo del almanaque: lo que pasa porque es la época en que pasa.
//
// Dos clases de carta:
// - Las de la AGENDA (src/data/almanaque.js) son `soloEncadenada`: el motor las
//   pone sí o sí en su mes. Son los rituales del año político: las clases, el
//   1° de marzo, la cosecha, el aguinaldo, el presupuesto.
// - Las ESTACIONALES tienen `requiere.mesCalendario` y `anual: true`: sólo
//   compiten en su época, pueden volver cada año, pero no están garantizadas.
export const CARTAS_ALMANAQUE = [
  // ---------------- Febrero: las clases ----------------
  {
    id: 'clases_a',
    forma: 'propuesta',
    personaje: 'gremio_docente',
    soloEncadenada: true,
    texto: 'Faltan dos semanas para el 1° de marzo. Sin un aumento que le gane a la inflación, las clases no empiezan.',
    izq: {
      rechaza: true,
      texto: 'Arrancan igual',
      efectos: { pueblo: -8, caja: 4, campo: 2 },
      replica: 'Arrancaron en la mitad de las provincias. En la otra mitad los chicos pasaron marzo en la plaza, en horario de clase.'
    },
    der: {
      acepta: true,
      texto: 'Aumento y que arranquen',
      efectos: { pueblo: 7, caja: -6, inflacion: 2 },
      replica: 'Sonó el timbre el 1° de marzo en todo el país. La foto del primer día salió en todos los diarios; el número, en ninguno.'
    }
  },
  {
    id: 'clases_b',
    forma: 'propuesta',
    personaje: 'gobernadora',
    soloEncadenada: true,
    texto: 'Otra vez febrero. Catorce provincias no pueden pagar la paritaria docente sin el fondo nacional. La mía es una.',
    izq: {
      rechaza: true,
      texto: 'Que paguen las provincias',
      efectos: { pueblo: -6, rosca: -5, caja: 5 },
      replica: 'Pagaron nueve. En las otras cinco hubo treinta días de paro, y en las encuestas la culpa fue tuya, no de ellas.'
    },
    der: {
      acepta: true,
      texto: 'Mandamos el fondo docente',
      efectos: { caja: -8, pueblo: 6, rosca: 3 },
      replica: 'Los gobernadores anunciaron el acuerdo en sus provincias como si fuera propio. Con tu plata, un poco lo era.'
    }
  },

  // ---------------- Marzo: la Asamblea y el 24 ----------------
  {
    id: 'sesiones_a',
    forma: 'dilema',
    personaje: 'interna',
    soloEncadenada: true,
    texto: '1° de marzo. Yo presido la Asamblea y usted habla. Media sala va a aplaudir y la otra media ya imprimió los carteles.',
    izq: {
      texto: 'Discurso de unidad',
      efectos: { rosca: 7, campo: 3, pueblo: -3 },
      replica: 'Te aplaudieron de pie en dos pasajes, y en los dos la oposición también. Afuera nadie se acordó de una sola frase.'
    },
    der: {
      texto: 'Discurso de combate',
      efectos: { pueblo: 7, rosca: -7, campo: -2 },
      replica: 'La frase más dura fue tendencia tres días. Desde el estrado, tu Vice aplaudió con la punta de los dedos.'
    }
  },
  {
    id: 'sesiones_b',
    forma: 'dilema',
    personaje: 'interna',
    soloEncadenada: true,
    texto: 'Otro 1° de marzo. La oposición avisó que si nombrás la herencia se levantan y se van del recinto en bloque.',
    izq: {
      texto: 'La nombro igual',
      efectos: { pueblo: 4, rosca: -6 },
      replica: 'Se levantaron cuarenta y se fueron. Las bancas vacías fueron la foto del día, y no era la foto que buscabas.'
    },
    der: {
      texto: 'Hablo de lo que viene',
      efectos: { rosca: 5, campo: 3, pueblo: -2 },
      replica: 'Se quedaron todos sentados. Uno se durmió, lo filmaron, y fue lo único que se comentó del discurso.'
    }
  },
  {
    // El 24 de marzo no es un chiste: la carta existe porque cómo se para un
    // gobierno ese día es una decisión política real, todos los años.
    id: 'marzo_memoria',
    forma: 'dilema',
    personaje: 'pibe',
    soloEncadenada: true,
    texto: 'Mañana es 24 de marzo. En el colegio la profe preguntó si el presidente va a la plaza. Yo dije que no sabía.',
    izq: {
      texto: 'Mando un mensaje oficial',
      efectos: { pueblo: -4, campo: 2, rosca: 1 },
      replica: 'El mensaje salió a las nueve y fue correcto. En la plaza lo leyeron como una ausencia, y eso también fue un mensaje.'
    },
    der: {
      texto: 'Voy a ir',
      efectos: { pueblo: 5, campo: -2, rosca: -2 },
      replica: 'Caminaste las últimas cuadras sin custodia a la vista. Nadie aplaudió ni silbó: era un día para otra cosa, y lo entendiste.'
    }
  },

  // ---------------- Abril: la cosecha gruesa ----------------
  {
    id: 'cosecha_a',
    forma: 'propuesta',
    personaje: 'productor',
    soloEncadenada: true,
    texto: 'Arrancó la cosecha gruesa. Hay silobolsas llenos en todo el campo esperando un dólar que valga la pena para vender.',
    izq: {
      rechaza: true,
      texto: 'Que liquiden al oficial',
      efectos: { campo: -8, caja: -5 },
      replica: 'Los silobolsas quedaron cerrados hasta julio. Los dólares que no entraron en abril se buscaron en otro lado, y más caros.'
    },
    der: {
      acepta: true,
      texto: 'Dólar diferencial por tres meses',
      efectos: { campo: 8, caja: 9, pueblo: -3, inflacion: 3 },
      replica: 'Entraron los dólares de la cosecha en noventa días. El día noventa y uno, todos los demás exportadores pidieron lo mismo.'
    }
  },
  {
    id: 'cosecha_b',
    forma: 'dilema',
    personaje: 'ministro',
    soloEncadenada: true,
    texto: 'Cosecha récord y precios internacionales por el piso: sobran toneladas y faltan dólares. ¿Cómo la acompañamos?',
    izq: {
      texto: 'Bajamos retenciones',
      efectos: { campo: 9, caja: -7 },
      replica: 'El campo vendió todo. La recaudación cayó casi lo mismo que subieron las exportaciones, y nadie hizo esa cuenta en voz alta.'
    },
    der: {
      texto: 'Retenciones firmes',
      efectos: { caja: 6, campo: -8, pueblo: 2 },
      replica: 'Las entidades del campo sacaron un comunicado con "confiscatorio" en el primer renglón. Vendieron igual, a desgano.'
    }
  },

  // ---------------- Junio: aguinaldo y frío ----------------
  // (el aguinaldo vive en folklore.js; la agenda lo trae en junio)
  {
    id: 'gas_invierno',
    forma: 'dilema',
    personaje: 'ministro',
    soloEncadenada: true,
    texto: 'Primera ola polar y el gas no alcanza. O traemos barcos a precio de oro o le cortamos el suministro a la industria.',
    izq: {
      texto: 'Se le corta a la industria',
      efectos: { campo: -8, caja: 4, pueblo: 2 },
      replica: 'Pararon cuarenta plantas una semana. Las casas tuvieron gas y las fábricas, unas vacaciones de invierno sin goce.'
    },
    der: {
      texto: 'Que vengan los barcos',
      efectos: { caja: -10, pueblo: 3, campo: 3, inflacion: 1 },
      replica: 'Llegaron seis barcos de gas licuado. Cada uno costó lo que una escuela, y en ninguna casa se supo que estuvo por faltar.'
    }
  },

  // ---------------- Septiembre: el presupuesto ----------------
  {
    id: 'presupuesto_a',
    forma: 'dilema',
    personaje: 'ministro',
    soloEncadenada: true,
    texto: 'El 15 de septiembre vence el plazo para mandar el presupuesto al Congreso. ¿Con qué inflación lo escribimos?',
    izq: {
      texto: 'Con la que va a haber',
      efectos: { campo: 5, rosca: -3, pueblo: -3, inflacion: -1 },
      replica: 'Lo escribiste con la inflación que iba a haber. En septiembre parecía pesimismo; en marzo, una profecía.'
    },
    der: {
      texto: 'Con la que queremos que haya',
      efectos: { rosca: 4, pueblo: 3, campo: -4, inflacion: 2 },
      replica: 'Salió con una inflación que no creyó nadie, y todo el año siguiente se gobernó a fuerza de ampliaciones por decreto.'
    }
  },
  {
    id: 'presupuesto_b',
    forma: 'propuesta',
    personaje: 'gobernadora',
    soloEncadenada: true,
    texto: 'El presupuesto se vota el jueves. Mis diputados lo votan si aparecen tres obras de mi provincia en la planilla.',
    izq: {
      rechaza: true,
      texto: 'Sin obras no hay trato',
      efectos: { rosca: -8, caja: 4 },
      replica: 'Salió sin sus diputados, por dos votos. Al año siguiente esos dos votos pidieron lo mismo que ella, y más caro.'
    },
    der: {
      acepta: true,
      texto: 'Que aparezcan las tres',
      efectos: { rosca: 7, caja: -7 },
      replica: 'Las tres obras aparecieron en la planilla. Aparecer en la planilla y aparecer en el terreno son dos trámites distintos.'
    }
  },

  // ---------------- Estacionales: vuelven cada año, sin garantía ----------------
  {
    id: 'vacaciones_enero',
    forma: 'dilema',
    personaje: 'primera_dama',
    anual: true,
    requiere: { mesCalendario: 'ene' },
    texto: 'Enero. Me prometiste diez días en el sur y te los voy a cobrar, aunque en el conurbano estén sin luz.',
    izq: {
      texto: 'Me quedo, perdoname',
      efectos: { pueblo: 4, rosca: -2 },
      replica: 'Te quedaste en Olivos. Al tercer día ya habías firmado tres decretos que en enero no hacía falta firmar.'
    },
    der: {
      texto: 'Nos vamos diez días',
      efectos: { pueblo: -6, rosca: 2 },
      replica: 'La foto de la lancha la sacó un vecino con el celular, y salió en todos lados antes de que volvieran al muelle.'
    }
  },
  {
    id: 'tedeum',
    forma: 'dilema',
    personaje: 'obispo',
    anual: true,
    requiere: { mesCalendario: 'may' },
    texto: 'Mañana, en el Tedeum del 25 de mayo, voy a hablar de la pobreza. Se lo aviso para que no se entere en la primera fila.',
    izq: {
      texto: 'Voy y escucho',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Escuchaste la homilía entera sin mover la cara. Las cámaras la buscaron durante once minutos y no encontraron nada.'
    },
    der: {
      texto: 'Tedeum en otra provincia',
      efectos: { rosca: 3, pueblo: -4 },
      replica: 'Fuiste a una catedral del interior, con un obispo más amable. La homilía de Buenos Aires se leyó igual, en todos los diarios.'
    }
  },
  {
    id: 'garrafa',
    forma: 'propuesta',
    personaje: 'intendente',
    anual: true,
    requiere: { mesCalendario: ['jul', 'ago'] },
    texto: 'Primera helada fuerte. En los barrios sin red de gas la garrafa se fue al triple y la gente volvió a cocinar con leña.',
    izq: {
      rechaza: true,
      texto: 'Que la pague cada uno',
      efectos: { pueblo: -8, caja: 3 },
      replica: 'En una semana hubo tres incendios por braseros en el conurbano. Nadie los relacionó con la garrafa, salvo los vecinos.'
    },
    der: {
      acepta: true,
      texto: 'Garrafa a precio fijo',
      efectos: { pueblo: 7, caja: -5, campo: -1 },
      replica: 'Salieron camiones con garrafas a precio fijo. Duraban hasta el mediodía y la fila empezaba a las cinco de la mañana.'
    }
  }
];
