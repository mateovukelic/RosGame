// Mazo económico: inflación, dólar, deuda, tarifas. El corazón del problema.
export const CARTAS_ECONOMIA = [
  {
    id: 'ministro_plan',
    personaje: 'ministro',
    texto: 'Tenemos dos caminos: shock o gradualismo. Los dos salen mal, pero de distinta forma.',
    peso: 1.4,
    requiere: { mesMax: 6 },
    izq: {
      texto: 'Shock',
      efectos: { inflacion: -8, pueblo: -12, campo: 10, caja: 8 },
      pone: ['shock'],
      replica: 'El primer mes fue brutal. El segundo también.'
    },
    der: {
      texto: 'Gradualismo',
      efectos: { inflacion: 4, pueblo: 6, campo: -5, caja: -5 },
      pone: ['gradualismo'],
      replica: 'Nadie se enojó del todo. Nadie se arregló tampoco.'
    }
  },
  {
    id: 'brecha',
    personaje: 'ministro',
    texto: 'La brecha con el paralelo llegó al ciento veinte por ciento. Hay que hacer algo.',
    peso: 1.3,
    urgeSi: { inflacion: { min: 45 } },
    izq: {
      texto: 'Devaluar de una',
      efectos: { inflacion: 9, campo: 12, caja: 10, pueblo: -12 },
      pone: ['devaluo'],
      replica: 'Los precios se acomodaron en cuarenta y ocho horas. Para arriba.'
    },
    der: {
      texto: 'Aguantar el tipo',
      efectos: { caja: -9, campo: -6, pueblo: 4, inflacion: -2 },
      pone: ['atraso_cambiario']
    }
  },
  {
    id: 'corrida',
    personaje: 'ministro',
    texto: 'Hoy se fueron mil doscientos millones. Mañana abre el mercado igual.',
    peso: 0.6,
    urgeSi: { caja: { max: 35 } },
    urgeMult: 6,
    izq: {
      texto: 'Vender reservas',
      efectos: { caja: -14, inflacion: -3, campo: 4, pueblo: 3 },
      replica: 'Frenó. Por once días.'
    },
    der: {
      texto: 'Subir la tasa al cielo',
      efectos: { inflacion: -5, campo: -9, pueblo: -7, caja: 5 },
      pone: ['tasa_alta'],
      replica: 'La economía se congeló y el dólar también. Todo congelado.'
    }
  },
  {
    id: 'organismo_desembolso',
    personaje: 'organismo',
    texto: 'El desembolso está aprobado. Solo faltan tres metas fiscales. Cuantitativas.',
    peso: 1.2,
    izq: {
      texto: 'Firmamos',
      efectos: { caja: 18, campo: 8, pueblo: -10, inflacion: -2 },
      pone: ['acuerdo_firmado', 'auditado']
    },
    der: {
      texto: 'Nos arreglamos solos',
      efectos: { caja: -10, campo: -8, pueblo: 10, inflacion: 3 },
      pone: ['soberania_financiera']
    }
  },
  {
    id: 'organismo_revision',
    personaje: 'organismo',
    texto: 'Revisión trimestral. El déficit se desvió. ¿Ajustan ustedes o ajustamos nosotros?',
    peso: 1.4,
    requiere: { flags: ['acuerdo_firmado'], mesMin: 8 },
    izq: {
      texto: 'Ajustamos nosotros',
      efectos: { caja: 10, pueblo: -11, campo: 5, inflacion: -3 }
    },
    der: {
      texto: 'Pedimos waiver',
      efectos: { caja: -6, campo: -5, rosca: -4, pueblo: 3 },
      replica: 'Lo dieron. Con una nota al pie que no le gustó a nadie.'
    }
  },
  {
    id: 'default_vencimiento',
    personaje: 'ministro',
    texto: 'Vence el martes. No están los dólares. Tengo tres opciones y dos son malas.',
    peso: 0.5,
    urgeSi: { caja: { max: 22 } },
    urgeMult: 8,
    izq: {
      texto: 'Pagar como sea',
      efectos: { caja: -16, campo: 8, pueblo: -8, inflacion: 2 },
      replica: 'Se pagó. Se vació media reserva para hacerlo.'
    },
    der: {
      texto: 'Reperfilar',
      efectos: { caja: 6, campo: -14, pueblo: 4, inflacion: 5 },
      pone: ['reperfilo'],
      replica: 'La palabra "reperfilar" entró al diccionario del miedo.'
    }
  },
  {
    id: 'tarifas',
    personaje: 'ministro',
    texto: 'El subsidio a la energía se come el presupuesto de salud. ¿Sinceramos?',
    peso: 1.2,
    izq: {
      texto: 'Aumento escalonado',
      efectos: { caja: 8, pueblo: -7, campo: 5, inflacion: 3 },
      pone: ['tarifazo_hecho']
    },
    der: {
      texto: 'Congelar otro año',
      efectos: { caja: -9, pueblo: 6, campo: -4, inflacion: 2 },
      pone: ['subsidio_eterno']
    }
  },
  {
    id: 'apagon',
    personaje: 'vecina',
    texto: 'Cuarenta grados y hace ocho horas que no hay luz. El freezer se echó a perder.',
    peso: 1.3,
    requiere: { flags: ['subsidio_eterno'], mesMin: 12 },
    izq: {
      texto: 'Multar a las empresas',
      efectos: { pueblo: 7, campo: -8, caja: 3 }
    },
    der: {
      texto: 'Pedir disculpas',
      efectos: { pueblo: -8, campo: 3, rosca: -2 }
    }
  },
  {
    id: 'emision',
    personaje: 'ministro',
    texto: 'Faltan fondos. Puedo pedirle a la maquinita que trabaje un turno extra.',
    peso: 1.2,
    unaVez: false,
    izq: {
      texto: 'Que imprima',
      efectos: { caja: 12, inflacion: 8, pueblo: 3, campo: -4 }
    },
    der: {
      texto: 'Ni un peso',
      efectos: { caja: -4, inflacion: -4, pueblo: -5, campo: 5 }
    }
  },
  {
    id: 'retenciones_suba',
    personaje: 'productor',
    texto: 'Si vuelven a tocar las retenciones, no sembramos. Y no es una amenaza.',
    peso: 1.3,
    izq: {
      texto: 'Subirlas igual',
      efectos: { caja: 13, campo: -15, pueblo: 6, inflacion: -1 },
      pone: ['campo_enojado']
    },
    der: {
      texto: 'Bajarlas',
      efectos: { caja: -10, campo: 14, pueblo: -5, inflacion: 1 },
      pone: ['campo_contento']
    }
  },
  {
    id: 'lockout',
    personaje: 'productor',
    texto: 'Paro de comercialización por tiempo indeterminado. Las rutas ya están.',
    peso: 1.5,
    requiere: { flags: ['campo_enojado'], mesMin: 6 },
    izq: {
      texto: 'Negociar',
      efectos: { campo: 10, caja: -8, pueblo: -4 },
      saca: ['campo_enojado']
    },
    der: {
      texto: 'Aguantar',
      efectos: { campo: -10, pueblo: -6, caja: -6, inflacion: 4 },
      pone: ['desabastecimiento']
    }
  },
  {
    id: 'precios',
    personaje: 'empresario',
    texto: 'El acuerdo de precios no se cumple porque no se puede cumplir. Usted lo sabe.',
    peso: 1.1,
    urgeSi: { inflacion: { min: 50 } },
    izq: {
      texto: 'Mandar inspectores',
      efectos: { pueblo: 6, campo: -7, inflacion: -3 },
      pone: ['guerra_gondolas']
    },
    der: {
      texto: 'Liberar precios',
      efectos: { inflacion: 6, campo: 8, pueblo: -8, caja: 3 }
    }
  },
  {
    id: 'gondolas_vacias',
    personaje: 'vecina',
    texto: 'Fui al súper y no había aceite. Ni fideos. ¿Qué cocino?',
    peso: 1.4,
    requiere: { algunaFlag: ['guerra_gondolas', 'desabastecimiento'], mesMin: 4 },
    izq: {
      texto: 'Importar de urgencia',
      efectos: { caja: -11, pueblo: 7, campo: -5 }
    },
    der: {
      texto: 'Es un boicot',
      efectos: { pueblo: -7, campo: -6, rosca: 3 },
      replica: 'Puede que tuvieras razón. No sirvió de nada tenerla.'
    }
  },
  {
    id: 'dolar_ahorro',
    personaje: 'taxista',
    texto: '¿Va a dejar comprar dólares o no? Porque yo ya tengo el turno en el banco.',
    peso: 1,
    izq: {
      texto: 'Cupo libre',
      efectos: { caja: -10, pueblo: 7, campo: 5, inflacion: 2 }
    },
    der: {
      texto: 'Cepo duro',
      efectos: { caja: 9, pueblo: -6, campo: -6, inflacion: 3 },
      pone: ['cepo_duro']
    }
  },
  {
    id: 'blue',
    personaje: 'periodista',
    texto: 'El paralelo batió récord. ¿Es un mercado marginal o es el precio real?',
    peso: 1.1,
    requiere: { flags: ['cepo_duro'], mesMin: 5 },
    izq: {
      texto: 'Es marginal',
      efectos: { pueblo: -3, campo: -5, inflacion: 3 },
      replica: 'Todos los precios de la economía se pusieron a mirar ese número marginal.'
    },
    der: {
      texto: 'Abrir un poco',
      efectos: { caja: -7, campo: 7, inflacion: -2, pueblo: 2 },
      saca: ['cepo_duro']
    }
  },
  {
    id: 'paritaria',
    personaje: 'sindicalista',
    texto: 'Pedimos por encima de la inflación proyectada. Su proyección, dicho sea de paso, es un chiste.',
    peso: 1.3,
    unaVez: false,
    izq: {
      texto: 'Conceder',
      efectos: { pueblo: 9, inflacion: 5, campo: -6, caja: -5 }
    },
    der: {
      texto: 'Techo del gobierno',
      efectos: { pueblo: -8, inflacion: -3, campo: 6, caja: 4 },
      pone: ['paritaria_cerrada']
    }
  },
  {
    id: 'inversion_extranjera',
    personaje: 'empresario',
    texto: 'Hay un fondo que quiere poner mil millones. Quieren estabilidad jurídica por treinta años.',
    peso: 1.1,
    izq: {
      texto: 'Garantizado',
      efectos: { caja: 12, campo: 9, pueblo: -7, rosca: -3 },
      pone: ['blindaje_juridico']
    },
    der: {
      texto: 'No hipoteco el futuro',
      efectos: { caja: -5, campo: -7, pueblo: 7 }
    }
  },
  {
    id: 'litio',
    personaje: 'gobernadora',
    texto: 'El recurso está en mi provincia. La regalía la discutimos acá, no en Buenos Aires.',
    peso: 1.1,
    izq: {
      texto: 'Que sea provincial',
      efectos: { rosca: 9, caja: -6, campo: 5 }
    },
    der: {
      texto: 'Es estratégico, es nacional',
      efectos: { rosca: -9, caja: 11, pueblo: 4 },
      pone: ['pelea_federal']
    }
  },
  {
    id: 'impuesto_riqueza',
    personaje: 'ministro',
    texto: 'Un aporte extraordinario a las grandes fortunas. Por única vez, dicen siempre.',
    peso: 1.1,
    izq: {
      texto: 'Va',
      efectos: { caja: 13, pueblo: 8, campo: -12, rosca: -3 }
    },
    der: {
      texto: 'Espanta capitales',
      efectos: { caja: -4, campo: 8, pueblo: -7 }
    }
  },
  {
    id: 'inflacion_mensual',
    personaje: 'periodista',
    texto: 'Dato de inflación del mes. Está peor que el anterior. ¿Sale a hablar usted o el ministro?',
    peso: 1.2,
    unaVez: false,
    requiere: { inflacionMin: 50 },
    izq: {
      texto: 'Salgo yo',
      efectos: { pueblo: -4, rosca: 4, inflacion: -1 },
      replica: 'Te pusiste el traje del problema. Al menos diste la cara.'
    },
    der: {
      texto: 'Que salga él',
      efectos: { pueblo: -2, rosca: -3 },
      pone: ['ministro_quemado']
    }
  },
  {
    id: 'ministro_renuncia',
    personaje: 'ministro',
    texto: 'Tengo la renuncia escrita. Si la acepta, el lunes el dólar hace lo que quiere.',
    peso: 1.5,
    requiere: { flags: ['ministro_quemado'], mesMin: 6 },
    izq: {
      texto: 'Aceptarla',
      efectos: { caja: -10, campo: -8, inflacion: 5, pueblo: 4 },
      saca: ['ministro_quemado', 'ministro_estrella'],
      pone: ['crisis_gabinete'],
      replica: 'El lunes el dólar hizo lo que quiso. Tenía razón.'
    },
    der: {
      texto: 'Te banco',
      efectos: { rosca: -5, campo: 6, caja: 4, pueblo: -3 },
      saca: ['ministro_quemado']
    }
  },
  {
    id: 'aposto_todo',
    personaje: 'chanta',
    texto: 'Escuchame una locura: ponemos las reservas en un bono que rinde una barbaridad.',
    peso: 0.35,
    requiere: { mesMin: 14, stats: { caja: { min: 45 } } },
    izq: {
      texto: 'Jugarlo',
      efectos: { caja: [-30, 35], campo: [-12, 12] },
      pone: ['aposto_reservas'],
      replica: 'Nadie en el gabinete quiso firmar al lado tuyo.'
    },
    der: {
      texto: 'Estás loco',
      efectos: { caja: 2, rosca: 2 }
    }
  }
];
