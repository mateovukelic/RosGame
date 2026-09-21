// Mazo de la calle: sindicatos, protesta social, seguridad, barrio.
export const CARTAS_CALLE = [
  {
    id: 'paro_general',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'Si el lunes no hay respuesta, el martes no hay país. No lo digo de vivo: lo digo para que lo anote.',
    peso: 1.3,
    urgeSi: { pueblo: { max: 35 } },
    izq: {
      rechaza: true,
      texto: 'Que paren',
      efectos: { pueblo: -9, campo: 6, caja: 3 },
      pone: ['tension_gremial', 'paro_hecho'],
      replica: 'Pararon. No salió un colectivo, no abrió un banco, y el martes fue el día más silencioso del año.'
    },
    der: {
      acepta: true,
      texto: 'Sentémonos el lunes',
      efectos: { pueblo: 6, caja: -7, campo: -4, rosca: 2 },
      saca: ['tension_gremial'],
      replica: 'Se sentaron. Salieron a las tres de la mañana con un acta que no dejó contento a nadie, y con eso alcanzó.'
    }
  },
  {
    id: 'piquete_nueve_julio',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'Mañana a las diez cortamos la Nueve de Julio. Traemos once puntos y ninguno se negocia por separado.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Que despeje la policía',
      efectos: { pueblo: -8, campo: 7, rosca: 4 },
      pone: ['represion_leve'],
      replica: 'Hubo empujones, dieciocho demorados y una foto de una señora mayor sentada en el asfalto.'
    },
    der: {
      acepta: true,
      texto: 'Que pasen y hablamos',
      efectos: { pueblo: 5, caja: -6, campo: -5, rosca: -2 },
      pone: ['mesa_social'],
      replica: 'Entraron con los once puntos. Salieron con dos resueltos y la sensación de que podían volver.'
    }
  },
  {
    id: 'represion_escalada',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Hay un pibe con la cara lastimada en todas las portadas. Tiene diecisiete. ¿Lo conoce alguien de acá?',
    peso: 1.6,
    requiere: { flags: ['represion_leve'], mesMin: 3 },
    izq: {
      texto: 'Se va el jefe policial',
      efectos: { pueblo: 4, rosca: -6, campo: -3 },
      saca: ['represion_leve'],
      replica: 'Lo pasaron a disponibilidad. La fuerza entendió el mensaje y lo tomó como una traición.'
    },
    der: {
      texto: 'Banco a la fuerza',
      efectos: { pueblo: -11, rosca: 5, campo: 5 },
      pone: ['mano_dura'],
      replica: 'La marcha del jueves fue la más grande en veinte años, y no la convocó ningún partido.'
    }
  },
  {
    id: 'estado_sitio',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'Catorce comercios saqueados anoche, todos en el mismo cordón. Tenemos la herramienta legal lista.',
    peso: 0.8,
    urgeSi: { pueblo: { max: 22 } },
    urgeMult: 7,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Ni en pedo',
      efectos: { pueblo: 6, campo: -7, caja: -8, rosca: -4 },
      replica: 'Los saqueos siguieron tres noches y después pararon solos. Nadie supo nunca por qué pararon.'
    },
    der: {
      acepta: true,
      texto: 'Que se declare',
      efectos: { pueblo: -14, rosca: 6, campo: 8, caja: 3 },
      pone: ['estado_de_sitio'],
      replica: 'Se llenó la plaza veinte minutos después del anuncio. No hizo falta que nadie los convocara.'
    }
  },
  {
    id: 'cacerolazo',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Anoche golpeamos cacerolas ocho cuadras. En mi cuadra no hay un solo vecino que piense como yo.',
    peso: 1.2,
    urgeSi: { inflacion: { min: 65 } },
    izq: {
      rechaza: true,
      texto: 'Eso es la oposición',
      efectos: { pueblo: -7, rosca: 3 },
      pone: ['niega_la_calle'],
      replica: 'Esa noche volvieron a salir. Esta vez también salieron los de la cuadra de al lado.'
    },
    der: {
      acepta: true,
      texto: 'Voy y escucho',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Fuiste sin custodia. Alguien lo filmó desde un balcón. Fue tu mejor día en meses.'
    }
  },
  {
    id: 'inseguridad',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Entraron a tres casas en mi cuadra este mes. Ya nadie llama al 911 porque el patrullero no viene.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Es sensación, señora',
      efectos: { pueblo: -9, campo: -2 },
      pone: ['niega_la_calle'],
      replica: 'La palabra "sensación" quedó dando vueltas seis meses. Se la recordaron en cada acto.'
    },
    der: {
      acepta: true,
      texto: 'Mando más patrulleros',
      efectos: { caja: -7, pueblo: 7, rosca: 3 },
      replica: 'Llegaron cuatro móviles. Dos andaban. Igual la cuadra durmió distinto esa semana.'
    }
  },
  {
    id: 'puerta_giratoria',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Su ministro dijo en televisión que los jueces somos una puerta giratoria. Lo dijo en horario central.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Y tiene razón',
      efectos: { pueblo: 6, rosca: -7 },
      pone: ['pelea_justicia'],
      replica: 'A la semana, dos fallos que el gobierno daba por ganados salieron al revés.'
    },
    der: {
      acepta: true,
      texto: 'Le pido disculpas',
      efectos: { rosca: 4, pueblo: -4 },
      replica: 'Aceptó las disculpas. El ministro se enteró de que te habías disculpado por los diarios.'
    }
  },
  {
    id: 'trenes',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Hace tres meses que el tren tarda el doble. Salgo a las cinco y llego tarde igual, todos los días.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Está licitado',
      efectos: { pueblo: -5, caja: 2 },
      replica: 'Estaba licitado. Desde hacía nueve años, con tres gobiernos distintos firmando la misma prórroga.'
    },
    der: {
      acepta: true,
      texto: 'Plan de emergencia ya',
      efectos: { caja: -9, pueblo: 8, campo: 2 },
      replica: 'En seis semanas el tren recuperó doce minutos. Doce minutos por día, por doscientas mil personas.'
    }
  },
  {
    id: 'colectivo_boleto',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Si sube el boleto, en mi barrio la mitad deja de ir a estudiar. No es una opinión, es lo que va a pasar.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Va a tener que subir',
      efectos: { caja: 8, pueblo: -8, inflacion: 2 },
      replica: 'Subió. La matrícula del turno noche cayó un dieciocho por ciento y nadie publicó ese número.'
    },
    der: {
      acepta: true,
      texto: 'Queda congelado',
      efectos: { caja: -8, pueblo: 8, inflacion: 1 },
      replica: 'Quedó congelado. El subsidio para congelarlo salió de la misma partida que los hospitales.'
    }
  },
  {
    id: 'mesa_social_resultado',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'La mesa social lleva seis reuniones y cero resoluciones. Dígame si es una mesa o es un mueble.',
    peso: 1.3,
    requiere: { flags: ['mesa_social'], mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Nos seguimos reuniendo',
      efectos: { pueblo: -8, rosca: 2 },
      pone: ['calle_caliente'],
      replica: 'Hubo tres reuniones más. A la cuarta dejaron de venir y nadie avisó por qué.'
    },
    der: {
      acepta: true,
      texto: 'Tres puntos se resuelven',
      efectos: { caja: -10, pueblo: 9, campo: -4 },
      saca: ['mesa_social'],
      replica: 'Se resolvieron tres de once. Fue la primera vez que alguien salió de ahí con algo escrito.'
    }
  },
  {
    id: 'hospital',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'En el hospital del barrio no hay gasas. No hay insumos, no hay presupuesto: no hay gasas, presidente.',
    peso: 1.3,
    urgeSi: { caja: { min: 60 } },
    izq: {
      rechaza: true,
      texto: 'Eso es de la provincia',
      efectos: { pueblo: -8, rosca: -3, caja: 2 },
      replica: 'Técnicamente tenías razón. Nadie en la historia aplaudió una razón técnica.'
    },
    der: {
      acepta: true,
      texto: 'Sale una partida hoy',
      efectos: { caja: -9, pueblo: 9 },
      replica: 'Llegaron las gasas el jueves. También llegó el pedido de las otras cuatro cosas que faltaban.'
    }
  },
  {
    id: 'sindicato_caja',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'La obra social del gremio está fundida y hay afiliados sin tratamiento. Necesitamos una mano del Estado.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Primero que la auditen',
      efectos: { rosca: -6, pueblo: 4, campo: 4 },
      pone: ['tension_gremial'],
      replica: 'Aceptaron la auditoría con una sonrisa que no era una sonrisa. Los papeles tardaron catorce meses.'
    },
    der: {
      acepta: true,
      texto: 'Giramos los fondos',
      efectos: { caja: -9, rosca: 6, pueblo: 3, campo: -4 },
      pone: ['gremios_aliados'],
      replica: 'Se giraron. Los tratamientos se reanudaron. Adónde fue el resto no lo preguntó nadie.'
    }
  },
  {
    id: 'marcha_universitaria',
    forma: 'propuesta',
    personaje: 'gremio_docente',
    texto: 'Un millón de personas caminando por el presupuesto universitario. Los rectores esperan en la puerta.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'No hay plata',
      efectos: { pueblo: -11, caja: 6, campo: 6 },
      pone: ['conflicto_universidad'],
      replica: 'La frase salió en todos los carteles de la marcha siguiente, que fue más grande.'
    },
    der: {
      acepta: true,
      texto: 'Que pasen los rectores',
      efectos: { caja: -8, pueblo: 9, campo: -4 },
      replica: 'Pasaron. Salieron con la mitad de lo que pedían y lo anunciaron como un triunfo, porque lo era.'
    }
  },
  {
    id: 'villa_urbanizacion',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'El barrio necesita cloacas antes que discursos. El proyecto está hecho y cuesta menos de lo que pensás.',
    peso: 1,
    izq: { rechaza: true, texto: 'Ahora no se puede', efectos: { caja: 4, pueblo: -6 }, replica: 'No se pudo ese año ni el siguiente. El proyecto sigue en una carpeta, impecable.' },
    der: { acepta: true, texto: 'Se hace', efectos: { caja: -10, pueblo: 10, rosca: 2 }, replica: 'Se hizo en catorce meses. Nadie cortó ninguna cinta porque no había nada que mostrar arriba de la tierra.' }
  },
  {
    id: 'ferias',
    forma: 'dilema',
    personaje: 'puntero',
    texto: 'Los feriantes ocupan ocho cuadras sin permiso. Los comerciantes de esas ocho cuadras pagan impuestos.',
    peso: 1,
    izq: { texto: 'Los regularizamos', efectos: { pueblo: 5, campo: -4, caja: 2 }, replica: 'Se anotaron cuatrocientos. Los otros doscientos se corrieron dos cuadras y siguieron igual.' },
    der: { texto: 'Se desaloja', efectos: { pueblo: -6, campo: 6, rosca: 2 }, replica: 'Se desalojó un martes a las seis de la mañana. El jueves estaban a tres cuadras.' }
  },
  {
    id: 'incendio_campo',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Se están quemando trescientas mil hectáreas. Los aviones hidrantes están y no los autoriza nadie.',
    peso: 1.1,
    izq: { rechaza: true, texto: 'Que actúe la provincia', efectos: { campo: -10, pueblo: -5, rosca: -3, caja: 3 }, replica: 'La provincia no tenía aviones. El humo llegó a las ciudades y ahí sí se volvió un tema nacional.' },
    der: { acepta: true, texto: 'Que salga todo lo que haya', efectos: { caja: -11, campo: 10, pueblo: 6 }, replica: 'Salieron los aviones. Se salvaron ochenta mil hectáreas y nadie va a saber nunca cuáles.' }
  },
  {
    id: 'inundacion',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Cuatro mil casas bajo el agua. Necesito camiones, colchones, y necesito que vengas vos.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Mando ayuda, pero no voy',
      efectos: { caja: -6, pueblo: -3, rosca: -2 },
      replica: 'Llegó la ayuda. La foto que dio la vuelta fue la del intendente cargando bolsas, solo.'
    },
    der: {
      acepta: true,
      texto: 'Salgo para allá',
      efectos: { caja: -8, pueblo: 9, rosca: 4 },
      replica: 'Te sacaron una foto con las botas embarradas hasta la rodilla. Esa vez no fue una puesta en escena.'
    }
  },
  {
    id: 'calle_caliente_estalla',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'Ya no manejamos nosotros lo que pasa en la calle. Te lo digo como aviso, no como amenaza. Se nos fue.',
    peso: 1.7,
    requiere: { flags: ['calle_caliente'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Que se hagan cargo ellos',
      efectos: { pueblo: -13, rosca: -5, campo: 4 },
      pone: ['desborde'],
      replica: 'El viernes hubo quema de cubiertas en once accesos distintos y ningún referente atendió el teléfono.'
    },
    der: {
      acepta: true,
      texto: 'Sale un paquete de urgencia',
      efectos: { caja: -16, pueblo: 12, campo: -6, inflacion: 3 },
      saca: ['calle_caliente'],
      replica: 'Salió el paquete. Compró cuatro meses, que en este país es mucho tiempo.'
    }
  }
];
