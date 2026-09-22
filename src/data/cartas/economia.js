// Mazo económico: inflación, dólar, deuda, tarifas. El corazón del problema.
export const CARTAS_ECONOMIA = [
  {
    id: 'ministro_plan',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'Le traigo dos carpetas. La roja corrige todo en noventa días. La azul, en tres años. El total es idéntico.',
    peso: 1.4,
    requiere: { mesMax: 6 },
    izq: {
      texto: 'De una y que duela',
      efectos: { inflacion: -8, pueblo: -12, campo: 10, caja: 8 },
      pone: ['shock'],
      replica: 'El primer mes fue brutal. El segundo también. Del tercero nadie habla.'
    },
    der: {
      texto: 'De a poco',
      efectos: { inflacion: 4, pueblo: 6, campo: -5, caja: -5 },
      pone: ['gradualismo'],
      replica: 'Nadie se enojó del todo y nadie se arregló tampoco. Eso duró dos años.'
    }
  },
  {
    id: 'brecha',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'La brecha con el paralelo pasó el ciento veinte por ciento. A ese número ya lo mira el almacenero.',
    peso: 1.3,
    urgeSi: { inflacion: { min: 45 } },
    izq: {
      texto: 'Devaluamos y listo',
      efectos: { inflacion: 9, campo: 12, caja: 10, pueblo: -12 },
      pone: ['devaluo'],
      replica: 'Los precios se acomodaron en cuarenta y ocho horas. Los sueldos, en ocho meses.'
    },
    der: {
      texto: 'El dólar no se toca',
      efectos: { caja: -9, campo: -6, pueblo: 4, inflacion: -2 },
      pone: ['atraso_cambiario'],
      replica: 'Aguantó. Cada semana que aguantaba costaba un poco más que la anterior.'
    }
  },
  {
    // Única "corrida" que queda en el proyecto: acá la palabra es la correcta.
    id: 'corrida',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'Hoy se fueron mil doscientos millones. No es pánico todavía. Mañana el mercado abre igual.',
    peso: 0.6,
    urgeSi: { caja: { max: 35 } },
    urgeMult: 6,
    izq: {
      texto: 'Vendemos reservas',
      efectos: { caja: -14, inflacion: -3, campo: 4, pueblo: 3 },
      replica: 'Frenó once días. Los once días más caros del año.'
    },
    der: {
      texto: 'Tasa por las nubes',
      efectos: { inflacion: -5, campo: -9, pueblo: -7, caja: 5 },
      pone: ['tasa_alta'],
      replica: 'Se congeló el dólar y se congeló todo lo demás. Nadie invirtió en nada durante un trimestre.'
    }
  },
  {
    id: 'organismo_desembolso',
    forma: 'propuesta',
    personaje: 'organismo',
    texto: 'El desembolso está aprobado. Sólo restan tres metas fiscales. Cuantitativas, no indicativas.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Nos arreglamos solos',
      efectos: { caja: -10, campo: -8, pueblo: 10, inflacion: 3 },
      pone: ['soberania_financiera'],
      replica: 'Se fue en el vuelo de la tarde. No hizo declaraciones, que fue una forma de hacerlas.'
    },
    der: {
      siembra: { carta: 'letra_chica', meses: [8,12] },
      acepta: true,
      texto: 'Firmamos',
      efectos: { caja: 18, campo: 8, pueblo: -10, inflacion: -2 },
      pone: ['acuerdo_firmado', 'auditado'],
      replica: 'Entraron los dólares el jueves. La letra chica se publicó un viernes a la noche.'
    }
  },
  {
    id: 'organismo_revision',
    forma: 'propuesta',
    personaje: 'organismo',
    texto: 'Revisión trimestral. El déficit se desvió cuatro décimas. Ajustan ustedes o ajustamos nosotros.',
    peso: 1.4,
    requiere: { flags: ['acuerdo_firmado'], mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Pedimos una prórroga',
      efectos: { caja: -6, campo: -5, rosca: -4, pueblo: 3 },
      replica: 'La dieron. Con una nota al pie de once palabras que a los mercados no les gustó.'
    },
    der: {
      acepta: true,
      texto: 'Ajustamos nosotros',
      efectos: { caja: 10, pueblo: -11, campo: 5, inflacion: -3 },
      replica: 'Ajustaste. El equipo que lo diseñó no vive en ninguno de los barrios donde se sintió.'
    }
  },
  {
    id: 'default_vencimiento',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'Vence el martes y los dólares no están. Tengo tres opciones, dos son malas y la tercera no existe.',
    peso: 0.5,
    urgeSi: { caja: { max: 22 } },
    urgeMult: 8,
    izq: {
      texto: 'Pagamos como sea',
      efectos: { caja: -16, campo: 8, pueblo: -8, inflacion: 2 },
      replica: 'Se pagó. Para pagar se usó media reserva y el resto del año fue cuesta arriba.'
    },
    der: {
      texto: 'Lo reperfilamos',
      efectos: { caja: 6, campo: -14, pueblo: 4, inflacion: 5 },
      pone: ['reperfilo'],
      replica: 'La palabra "reperfilar" entró al diccionario del miedo en menos de un día.'
    }
  },
  {
    id: 'tarifas',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'El subsidio a la energía se come el presupuesto de salud entero. Esto no es ideología, es una resta.',
    peso: 1.2,
    izq: {
      rechaza: true,
      texto: 'Congelamos un año más',
      efectos: { caja: -9, pueblo: 6, campo: -4, inflacion: 2 },
      pone: ['subsidio_eterno'],
      replica: 'Aguantó el invierno. En febrero la distribuidora avisó que no garantizaba el verano.'
    },
    der: {
      siembra: { carta: 'factura_luz', meses: [4,7] },
      acepta: true,
      texto: 'Que se sincere',
      efectos: { caja: 8, pueblo: -7, campo: 5, inflacion: 3 },
      pone: ['tarifazo_hecho'],
      replica: 'La factura llegó a todas las casas el mismo día. Algunos la fotografiaron y la subieron.'
    }
  },
  {
    id: 'apagon',
    forma: 'dilema',
    personaje: 'vecina',
    texto: 'Cuarenta grados, ocho horas sin luz y el freezer lleno de cosas que ya no sirven. ¿Quién me lo paga?',
    peso: 1.3,
    requiere: { flags: ['subsidio_eterno'], mesMin: 12 },
    izq: {
      texto: 'Multamos a la empresa',
      efectos: { pueblo: 7, campo: -8, caja: 3 },
      replica: 'La multa se pagó. Salió de la tarifa del año siguiente.'
    },
    der: {
      texto: 'Pedir disculpas',
      efectos: { pueblo: -8, campo: 3, rosca: -2 },
      replica: 'Aceptó las disculpas con educación. Al año siguiente votó distinto.'
    }
  },
  {
    id: 'emision',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Faltan fondos para cerrar el mes. Puedo pedirle a la máquina que haga un turno extra. Uno solo.',
    peso: 1.2,
    unaVez: false,
    izq: {
      rechaza: true,
      texto: 'Ni un peso',
      efectos: { caja: -4, inflacion: -4, pueblo: -5, campo: 5 },
      replica: 'No se emitió. Se pagó tarde, y a los que se les pagó tarde se acordaron.'
    },
    der: {
      siembra: { carta: 'factura_emision', meses: [6,9] },
      acepta: true,
      texto: 'Que haga el turno',
      efectos: { caja: 12, inflacion: 8, pueblo: 3, campo: -4 },
      replica: 'El mes cerró. El costo aparece dentro de noventa días, cuando ya nadie lo asocie con esto.'
    }
  },
  {
    id: 'retenciones_suba',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Si vuelven a tocar las retenciones, no sembramos. No es una amenaza, es una cuenta que ya hicimos.',
    peso: 1.3,
    izq: {
      siembra: { carta: 'siembra_caida', meses: [8,12] },
      rechaza: true,
      texto: 'Se suben igual',
      efectos: { caja: 13, campo: -15, pueblo: 6, inflacion: -1 },
      pone: ['campo_enojado'],
      replica: 'Se sembró menos. El número exacto recién se supo en la cosecha siguiente.'
    },
    der: {
      siembra: { carta: 'cosecha_record', meses: [8,12] },
      acepta: true,
      texto: 'Las bajamos',
      efectos: { caja: -10, campo: 14, pueblo: -5, inflacion: 1 },
      pone: ['campo_contento'],
      replica: 'Sembraron todo. Los dólares entraron en marzo, no en diciembre, que es cuando hacían falta.'
    }
  },
  {
    id: 'lockout',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Paro de comercialización por tiempo indeterminado. Las rutas ya están. Esto arranca hoy.',
    peso: 1.5,
    requiere: { flags: ['campo_enojado'], mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Que aguanten ellos',
      efectos: { campo: -10, pueblo: -6, caja: -6, inflacion: 4 },
      pone: ['desabastecimiento'],
      replica: 'A la tercera semana no había carne en las góndolas y la discusión dejó de ser sobre retenciones.'
    },
    der: {
      acepta: true,
      texto: 'Sentémonos a hablar',
      efectos: { campo: 10, caja: -8, pueblo: -4 },
      saca: ['campo_enojado'],
      replica: 'Se levantó en cuatro días. Lo que se firmó lo festejaron ellos, no vos.'
    }
  },
  {
    id: 'precios',
    forma: 'propuesta',
    personaje: 'empresario',
    texto: 'Su lista de precios cuidados tiene ciento treinta productos. En la góndola quedan once, y son los feos.',
    peso: 1.1,
    urgeSi: { inflacion: { min: 50 } },
    izq: {
      rechaza: true,
      texto: 'Van los inspectores',
      efectos: { pueblo: 6, campo: -7, inflacion: -3 },
      pone: ['guerra_gondolas'],
      replica: 'Los inspectores encontraron todo en orden. En el depósito de atrás no entraron.'
    },
    der: {
      acepta: true,
      texto: 'Que los fije el mercado',
      efectos: { inflacion: 6, campo: 8, pueblo: -8, caja: 3 },
      replica: 'Los precios se acomodaron solos, hacia arriba, y después se quedaron ahí.'
    }
  },
  {
    id: 'gondolas_vacias',
    forma: 'propuesta',
    personaje: 'vecina',
    texto: 'Fui al súper y no había aceite. Ni fideos. Tengo la lista hecha y la mitad de las cosas no están.',
    peso: 1.4,
    requiere: { algunaFlag: ['guerra_gondolas', 'desabastecimiento'], mesMin: 4 },
    izq: {
      rechaza: true,
      texto: 'Esto es un boicot',
      efectos: { pueblo: -7, campo: -6, rosca: 3 },
      replica: 'Puede que tuvieras razón. Tener razón no puso una botella de aceite en ningún estante.'
    },
    der: {
      acepta: true,
      texto: 'Importamos de urgencia',
      efectos: { caja: -11, pueblo: 7, campo: -5 },
      replica: 'Llegaron los containers en tres semanas. El aceite importado salía más que el que faltaba.'
    }
  },
  {
    id: 'dolar_ahorro',
    forma: 'propuesta',
    personaje: 'taxista',
    texto: '¿Va a dejar comprar dólares o no? Porque yo ya tengo el turno sacado en el banco, por las dudas.',
    peso: 1,
    izq: {
      rechaza: true,
      texto: 'Cepo y se terminó',
      efectos: { caja: 9, pueblo: -6, campo: -6, inflacion: 3 },
      pone: ['cepo_duro'],
      replica: 'Al otro día había tres cotizaciones distintas y ninguna era la oficial.'
    },
    der: {
      acepta: true,
      texto: 'Que compre el que quiera',
      efectos: { caja: -10, pueblo: 7, campo: 5, inflacion: 2 },
      replica: 'Compraron todos el mismo día. Las reservas lo sintieron esa misma semana.'
    }
  },
  {
    id: 'blue',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'El paralelo batió récord otra vez. Dígame usted: ¿es un mercado marginal o es el precio real?',
    peso: 1.1,
    requiere: { flags: ['cepo_duro'], mesMin: 5 },
    izq: {
      texto: 'Es un mercado marginal',
      efectos: { pueblo: -3, campo: -5, inflacion: 3 },
      replica: 'Todos los precios de la economía se pusieron a mirar ese número marginal.'
    },
    der: {
      texto: 'Abrimos un poco',
      efectos: { caja: -7, campo: 7, inflacion: -2, pueblo: 2 },
      saca: ['cepo_duro'],
      replica: 'La brecha bajó. Bajó a un número que seguía siendo vergonzoso, pero bajó.'
    }
  },
  {
    id: 'paritaria',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'Pedimos arriba de la inflación proyectada. Su proyección, dicho sea de paso, no la cree ni su ministro.',
    peso: 1.3,
    unaVez: false,
    izq: {
      rechaza: true,
      texto: 'Hay un techo y es ese',
      efectos: { pueblo: -8, inflacion: -3, campo: 6, caja: 4 },
      pone: ['paritaria_cerrada'],
      replica: 'Firmaron con el techo. A los cuatro meses pidieron la reapertura, y tenían razón.'
    },
    der: {
      acepta: true,
      texto: 'Se concede',
      efectos: { pueblo: 9, inflacion: 5, campo: -6, caja: -5 },
      replica: 'Firmaron contentos. Los otros catorce gremios llamaron el mismo día.'
    }
  },
  {
    id: 'inversion_extranjera',
    forma: 'propuesta',
    personaje: 'empresario',
    texto: 'Hay un fondo listo para poner mil millones. Piden estabilidad jurídica por treinta años. Treinta.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'No hipoteco el futuro',
      efectos: { caja: -5, campo: -7, pueblo: 7 },
      replica: 'Se fueron a poner la plata en otro lado. Mandaron un comunicado muy amable.'
    },
    der: {
      siembra: { carta: 'fondo_llega', meses: [10,14] },
      acepta: true,
      texto: 'Se lo garantizamos',
      efectos: { caja: 12, campo: 9, pueblo: -7, rosca: -3 },
      pone: ['blindaje_juridico'],
      replica: 'Entró la inversión. El contrato lo van a leer completo tres gobiernos después.'
    }
  },
  {
    id: 'litio',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'El recurso está abajo de mi provincia. La regalía se discute acá, no en un despacho de Buenos Aires.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Es nacional y estratégico',
      efectos: { rosca: -9, caja: 11, pueblo: 4 },
      pone: ['pelea_federal'],
      replica: 'Los otros cinco gobernadores de la zona firmaron una carta conjunta esa misma tarde.'
    },
    der: {
      acepta: true,
      texto: 'Que lo maneje la provincia',
      efectos: { rosca: 9, caja: -6, campo: 5 },
      replica: 'Firmó feliz. La regalía que negoció era la mitad de lo que se paga en Australia.'
    }
  },
  {
    id: 'impuesto_riqueza',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Ochocientas personas declaran más patrimonio que el presupuesto de tres provincias juntas. Tengo el proyecto.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Espanta capitales',
      efectos: { caja: -4, campo: 8, pueblo: -7 },
      replica: 'No se espantó nadie. Tampoco entró nadie nuevo. Todo siguió exactamente igual.'
    },
    der: {
      acepta: true,
      texto: 'Que lo paguen',
      efectos: { caja: 13, pueblo: 8, campo: -12, rosca: -3 },
      replica: 'Pagaron seiscientos de los ochocientos alcanzados. Los otros doscientos tenían mejores abogados.'
    }
  },
  {
    id: 'inflacion_mensual',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Sale el dato del mes y viene peor que el anterior. Alguien tiene que dar la cara. ¿Usted o el ministro?',
    peso: 1.2,
    unaVez: false,
    requiere: { inflacionMin: 50 },
    izq: {
      texto: 'Doy la cara yo',
      efectos: { pueblo: -4, rosca: 4, inflacion: -1 },
      replica: 'Te pusiste el traje del problema. Nadie te lo agradeció, pero nadie dijo que te escondiste.'
    },
    der: {
      texto: 'Que salga el ministro',
      efectos: { pueblo: -2, rosca: -3 },
      pone: ['ministro_quemado'],
      replica: 'Salió él. Volvió al despacho sin mirar a nadie y con la corbata en la mano.'
    }
  },
  {
    id: 'ministro_renuncia',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Tengo la renuncia escrita y firmada en el bolsillo. Si me la acepta, el lunes el dólar hace lo que quiere.',
    peso: 1.5,
    requiere: { flags: ['ministro_quemado'], mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Ni loco, te banco',
      efectos: { rosca: -5, campo: 6, caja: 4, pueblo: -3 },
      saca: ['ministro_quemado'],
      replica: 'Se quedó. Siguió trabajando con la renuncia en el bolsillo, que es una forma rara de trabajar.'
    },
    der: {
      acepta: true,
      texto: 'Te la acepto',
      efectos: { caja: -10, campo: -8, inflacion: 5, pueblo: 4 },
      saca: ['ministro_quemado', 'ministro_estrella'],
      pone: ['crisis_gabinete'],
      replica: 'El lunes el dólar hizo exactamente lo que él dijo que iba a hacer.'
    }
  },
  {
    id: 'aposto_todo',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Escuchame una locura: ponemos las reservas en un bono que rinde una barbaridad. Tres meses y salimos.',
    peso: 0.35,
    requiere: { mesMin: 14, stats: { caja: { min: 45 } } },
    izq: {
      rechaza: true,
      texto: 'Estás completamente loco',
      efectos: { caja: 2, rosca: 2 },
      replica: 'Se fue riéndose. Volvió dos veces más con la misma idea y otro nombre.'
    },
    der: {
      acepta: true,
      texto: 'Jugalo',
      efectos: { caja: [-30, 35], campo: [-12, 12] },
      pone: ['aposto_reservas'],
      replica: 'Nadie del gabinete quiso firmar al lado tuyo. Firmaste solo, con la lapicera de él.'
    }
  }
];
