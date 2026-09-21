// Mazo de la calle: sindicatos, protesta social, seguridad, barrio.
export const CARTAS_CALLE = [
  {
    id: 'paro_general',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'Si el lunes no hay respuesta, el martes no hay país. Es simple.',
    peso: 1.3,
    urgeSi: { pueblo: { max: 35 } },
    izq: {
      rechaza: true,
      texto: 'Que paren',
      efectos: { pueblo: -9, campo: 6, caja: 3 },
      pone: ['tension_gremial', 'paro_hecho']
    },
    der: {
      acepta: true,
      texto: 'Sentarnos a hablar',
      efectos: { pueblo: 6, caja: -7, campo: -4, rosca: 2 },
      saca: ['tension_gremial']
    }
  },
  {
    id: 'piquete_nueve_julio',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'Mañana cortamos la Nueve de Julio. Once puntos, ninguno negociable por separado.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Despejar la calle',
      efectos: { pueblo: -8, campo: 7, rosca: 4 },
      pone: ['represion_leve'],
      replica: 'Hubo empujones y dieciocho demorados. Las fotos no ayudaron.'
    },
    der: {
      acepta: true,
      texto: 'Recibirlos',
      efectos: { pueblo: 5, caja: -6, campo: -5, rosca: -2 },
      pone: ['mesa_social']
    }
  },
  {
    id: 'represion_escalada',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Hay un pibe con la cara lastimada en todas las portadas. Tiene diecisiete años.',
    peso: 1.6,
    requiere: { flags: ['represion_leve'], mesMin: 3 },
    izq: {
      texto: 'Separar al jefe policial',
      efectos: { pueblo: 4, rosca: -6, campo: -3 },
      saca: ['represion_leve']
    },
    der: {
      texto: 'Bancar a la fuerza',
      efectos: { pueblo: -11, rosca: 5, campo: 5 },
      pone: ['mano_dura'],
      replica: 'La marcha del jueves fue la más grande en veinte años.'
    }
  },
  {
    id: 'estado_sitio',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'Se saquearon catorce comercios anoche. Podemos declarar el estado de sitio.',
    peso: 0.8,
    urgeSi: { pueblo: { max: 22 } },
    urgeMult: 7,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Ni en pedo',
      efectos: { pueblo: 6, campo: -7, caja: -8, rosca: -4 },
      replica: 'Los saqueos siguieron tres noches más y después pararon solos.'
    },
    der: {
      acepta: true,
      texto: 'Declararlo',
      efectos: { pueblo: -14, rosca: 6, campo: 8, caja: 3 },
      pone: ['estado_de_sitio'],
      replica: 'Se llenó de gente la plaza a los veinte minutos del anuncio.'
    }
  },
  {
    id: 'cacerolazo',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Anoche golpeamos cacerolas ocho cuadras. En mi cuadra nunca votó nadie como yo.',
    peso: 1.2,
    urgeSi: { inflacion: { min: 65 } },
    izq: {
      rechaza: true,
      texto: 'Es la oposición',
      efectos: { pueblo: -7, rosca: 3 },
      pone: ['niega_la_calle']
    },
    der: {
      acepta: true,
      texto: 'Salir a escuchar',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Fuiste sin custodia. Alguien filmó. Fue tu mejor día en meses.'
    }
  },
  {
    id: 'inseguridad',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Entraron a tres casas en la cuadra. Nadie llama a la policía porque no viene.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Es sensación',
      efectos: { pueblo: -9, campo: -2 },
      pone: ['niega_la_calle']
    },
    der: {
      acepta: true,
      texto: 'Más patrulleros',
      efectos: { caja: -7, pueblo: 7, rosca: 3 }
    }
  },
  {
    id: 'puerta_giratoria',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Su ministro dijo por televisión que los jueces somos una puerta giratoria.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Ratificarlo',
      efectos: { pueblo: 6, rosca: -7 },
      pone: ['pelea_justicia']
    },
    der: {
      acepta: true,
      texto: 'Pedir disculpas',
      efectos: { rosca: 4, pueblo: -4 }
    }
  },
  {
    id: 'trenes',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Hace tres meses que el tren tarda dos horas. Llego tarde al laburo todos los días.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Está licitado',
      efectos: { pueblo: -5, caja: 2 },
      replica: 'Estaba licitado. Desde hacía nueve años.'
    },
    der: {
      acepta: true,
      texto: 'Plan de emergencia',
      efectos: { caja: -9, pueblo: 8, campo: 2 }
    }
  },
  {
    id: 'colectivo_boleto',
    forma: 'propuesta',
    personaje: 'pibe',
    texto: 'Si sube el boleto, la mitad del barrio deja de ir a estudiar. Así de simple.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Que suba',
      efectos: { caja: 8, pueblo: -8, inflacion: 2 }
    },
    der: {
      acepta: true,
      texto: 'Congelar el boleto',
      efectos: { caja: -8, pueblo: 8, inflacion: 1 }
    }
  },
  {
    id: 'mesa_social_resultado',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'La mesa social lleva seis reuniones y cero resoluciones. ¿Es una mesa o un mueble?',
    peso: 1.3,
    requiere: { flags: ['mesa_social'], mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Seguir reuniéndonos',
      efectos: { pueblo: -8, rosca: 2 },
      pone: ['calle_caliente']
    },
    der: {
      acepta: true,
      texto: 'Resolver tres puntos',
      efectos: { caja: -10, pueblo: 9, campo: -4 },
      saca: ['mesa_social']
    }
  },
  {
    id: 'hospital',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'En el hospital del barrio no hay gasas. Gasas, presidente. Gasas.',
    peso: 1.3,
    urgeSi: { caja: { min: 60 } },
    izq: {
      rechaza: true,
      texto: 'Es competencia provincial',
      efectos: { pueblo: -8, rosca: -3, caja: 2 },
      replica: 'Técnicamente tenías razón. Nadie aplaude una razón técnica.'
    },
    der: {
      acepta: true,
      texto: 'Partida de emergencia',
      efectos: { caja: -9, pueblo: 9 }
    }
  },
  {
    id: 'sindicato_caja',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'La obra social del gremio está fundida. Necesitamos una ayuda del Estado.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Que auditen primero',
      efectos: { rosca: -6, pueblo: 4, campo: 4 },
      pone: ['tension_gremial']
    },
    der: {
      acepta: true,
      texto: 'Girar los fondos',
      efectos: { caja: -9, rosca: 6, pueblo: 3, campo: -4 },
      pone: ['gremios_aliados']
    }
  },
  {
    id: 'marcha_universitaria',
    forma: 'propuesta',
    personaje: 'gremio_docente',
    texto: 'Un millón de personas por el presupuesto universitario. ¿Los recibe?',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'No hay plata',
      efectos: { pueblo: -11, caja: 6, campo: 6 },
      pone: ['conflicto_universidad']
    },
    der: {
      acepta: true,
      texto: 'Recibir a los rectores',
      efectos: { caja: -8, pueblo: 9, campo: -4 }
    }
  },
  {
    id: 'villa_urbanizacion',
    forma: 'propuesta',
    personaje: 'cura',
    texto: 'El barrio necesita cloacas antes que discursos. Tenemos el proyecto hecho.',
    peso: 1,
    izq: { rechaza: true, texto: 'No ahora', efectos: { caja: 4, pueblo: -6 } },
    der: { acepta: true, texto: 'Se hace', efectos: { caja: -10, pueblo: 10, rosca: 2 } }
  },
  {
    id: 'ferias',
    forma: 'dilema',
    personaje: 'puntero',
    texto: 'Los feriantes ocupan ocho cuadras sin permiso. Los comerciantes están calientes.',
    peso: 1,
    izq: { texto: 'Regularizar', efectos: { pueblo: 5, campo: -4, caja: 2 } },
    der: { texto: 'Desalojar', efectos: { pueblo: -6, campo: 6, rosca: 2 } }
  },
  {
    id: 'incendio_campo',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Se están quemando trescientas mil hectáreas. Hacen falta aviones hidrantes.',
    peso: 1.1,
    izq: { rechaza: true, texto: 'Que actúe la provincia', efectos: { campo: -10, pueblo: -5, rosca: -3, caja: 3 } },
    der: { acepta: true, texto: 'Mandar todo', efectos: { caja: -11, campo: 10, pueblo: 6 } }
  },
  {
    id: 'inundacion',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Se inundaron cuatro mil casas. Necesito camiones, colchones y que vengas.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Mando ayuda, no voy',
      efectos: { caja: -6, pueblo: -3, rosca: -2 }
    },
    der: {
      acepta: true,
      texto: 'Voy en persona',
      efectos: { caja: -8, pueblo: 9, rosca: 4 },
      replica: 'Te sacaron una foto con las botas embarradas. Sirvió.'
    }
  },
  {
    id: 'calle_caliente_estalla',
    forma: 'propuesta',
    personaje: 'piquetero',
    texto: 'Ya no manejamos nosotros lo que pasa en la calle. Te lo digo como aviso, no como amenaza.',
    peso: 1.7,
    requiere: { flags: ['calle_caliente'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Que se hagan cargo',
      efectos: { pueblo: -13, rosca: -5, campo: 4 },
      pone: ['desborde']
    },
    der: {
      acepta: true,
      texto: 'Paquete de emergencia',
      efectos: { caja: -16, pueblo: 12, campo: -6, inflacion: 3 },
      saca: ['calle_caliente']
    }
  }
];
