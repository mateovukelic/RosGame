// Mazo de la rosca: internas, gobernadores, Congreso, justicia, prensa.
export const CARTAS_ROSCA = [
  {
    id: 'gobernadora_coparticipacion',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Mi provincia pone los votos en el Senado y recibe migajas. Hagamos números.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Que se arreglen',
      efectos: { caja: 7, rosca: -10 },
      pone: ['gobernadores_enojados']
    },
    der: {
      acepta: true,
      texto: 'Girar los fondos',
      efectos: { caja: -10, rosca: 10, pueblo: 2 },
      pone: ['pacto_provincial']
    }
  },
  {
    id: 'gobernadores_bloqueo',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'El presupuesto no sale. Ya hablé con seis colegas. Hay siete, en realidad.',
    peso: 1.5,
    requiere: { flags: ['gobernadores_enojados'], mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Gobernar por decreto',
      efectos: { rosca: -11, pueblo: -3, caja: 5 },
      pone: ['sin_presupuesto']
    },
    der: {
      acepta: true,
      texto: 'Negociar obra por obra',
      efectos: { caja: -13, rosca: 11 },
      saca: ['gobernadores_enojados']
    }
  },
  {
    id: 'presupuesto_prorroga',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Sin presupuesto aprobado, gobernamos con el del año pasado. Reasigno yo lo que quiera.',
    peso: 1.2,
    requiere: { flags: ['sin_presupuesto'] },
    izq: {
      rechaza: true,
      texto: 'Vuelvo a negociar',
      efectos: { caja: -7, rosca: 8 },
      saca: ['sin_presupuesto']
    },
    der: {
      acepta: true,
      texto: 'Aprovechemos',
      efectos: { caja: 9, rosca: -6, campo: 4 }
    }
  },
  {
    id: 'interna_candidato',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Hay que definir la candidatura. Yo tengo intención. Vos tenés un problema.',
    peso: 1.4,
    requiere: { mesMin: 28 },
    izq: {
      rechaza: true,
      texto: 'Voy yo',
      efectos: { rosca: -9, pueblo: 6 },
      pone: ['guerra_interna']
    },
    der: {
      acepta: true,
      texto: 'Vas vos',
      efectos: { rosca: 9, pueblo: -5 },
      pone: ['candidatura_cedida']
    }
  },
  {
    id: 'guerra_interna_estalla',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Hay dos listas. Dos. Y las encuestas dicen que juntos ganamos y separados no.',
    peso: 1.6,
    requiere: { flags: ['guerra_interna'], mesMin: 30 },
    izq: {
      rechaza: true,
      texto: 'Que compitan',
      efectos: { rosca: -12, pueblo: 7 },
      pone: ['fractura']
    },
    der: {
      acepta: true,
      texto: 'Lista de unidad',
      efectos: { rosca: 12, pueblo: -6, caja: -5 },
      saca: ['guerra_interna']
    }
  },
  {
    id: 'periodista_carpetazo',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Tengo documentación sobre un funcionario suyo. Le doy veinticuatro horas.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Bancarlo',
      efectos: { pueblo: -8, rosca: 5 },
      pone: ['funcionario_sospechado']
    },
    der: {
      acepta: true,
      texto: 'Echarlo ya',
      efectos: { rosca: -5, pueblo: 6, campo: 2 },
      replica: 'Se fue hablando pestes. Eso también salió publicado.'
    }
  },
  {
    id: 'funcionario_preso',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Su funcionario quedó detenido. Hay una bolsa con dólares y una filmación.',
    peso: 1.6,
    requiere: { flags: ['funcionario_sospechado'], mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Es persecución',
      efectos: { pueblo: -10, rosca: 4, campo: -5 },
      pone: ['encubrimiento']
    },
    der: {
      acepta: true,
      texto: 'Colaborar con la causa',
      efectos: { pueblo: 4, rosca: -9, campo: 2 },
      saca: ['funcionario_sospechado'],
      pone: ['causa_abierta']
    }
  },
  {
    id: 'medios_pauta',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'La pauta oficial se reparte de forma bastante creativa, presidente.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Premiar a los amigos',
      efectos: { caja: -6, rosca: 6, pueblo: -5 },
      pone: ['prensa_comprada']
    },
    der: {
      acepta: true,
      texto: 'Repartirla parejo',
      efectos: { caja: -5, pueblo: 4, rosca: -3 }
    }
  },
  {
    id: 'prensa_vuelta',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Los mismos que le aplaudían ahora le pegan. Se les cortó la pauta, dicen.',
    peso: 1.2,
    requiere: { flags: ['prensa_comprada'], mesMin: 10, stats: { caja: { max: 45 } } },
    izq: {
      rechaza: true,
      texto: 'Que peguen',
      efectos: { pueblo: -6, rosca: -4 },
      saca: ['prensa_comprada']
    },
    der: {
      acepta: true,
      texto: 'Pagar más',
      efectos: { caja: -10, pueblo: -3, rosca: 4 }
    }
  },
  {
    id: 'corte_suprema',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Hay una vacante en la Corte. Todo el mundo tiene un candidato. Usted también.',
    peso: 1.2,
    requiere: { mesMin: 10 },
    izq: {
      texto: 'Alguien de confianza',
      efectos: { rosca: 7, pueblo: -5, campo: -4 },
      pone: ['corte_propia']
    },
    der: {
      texto: 'Alguien indiscutible',
      efectos: { rosca: -4, pueblo: 6, campo: 5 },
      pone: ['corte_independiente']
    }
  },
  {
    id: 'fallo_contra',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'La Corte declaró inconstitucional su decreto principal.',
    peso: 1.4,
    requiere: { flags: ['corte_independiente'], mesMin: 16 },
    izq: {
      rechaza: true,
      texto: 'Denunciar lawfare',
      efectos: { pueblo: 5, rosca: -7, campo: -6 },
      pone: ['choque_institucional']
    },
    der: {
      acepta: true,
      texto: 'Acatar',
      efectos: { caja: -8, pueblo: -4, campo: 5, rosca: 3 }
    }
  },
  {
    id: 'intendente_cajas',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Necesito las cajas para diciembre. Vos sabés cómo es diciembre acá.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Este año no',
      efectos: { caja: 5, rosca: -7, pueblo: -5 },
      pone: ['diciembre_bravo']
    },
    der: {
      acepta: true,
      texto: 'Mandar todo',
      efectos: { caja: -9, rosca: 7, pueblo: 5 }
    }
  },
  {
    id: 'diciembre',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Te avisé lo que pasaba en diciembre. Bueno, es diciembre.',
    peso: 1.6,
    requiere: { flags: ['diciembre_bravo'], mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'Que se banque',
      efectos: { pueblo: -12, rosca: -6, campo: 3 },
      pone: ['desborde']
    },
    der: {
      acepta: true,
      texto: 'Plan de contención urgente',
      efectos: { caja: -14, pueblo: 6, rosca: 3 },
      saca: ['diciembre_bravo']
    }
  },
  {
    id: 'ley_estrella',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Tu ley estrella está a tres votos. Tres votos tienen precio y yo sé cuál.',
    peso: 1.3,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Que se caiga',
      efectos: { rosca: -6, pueblo: -4, campo: -3 },
      replica: 'Se cayó. Con aplausos de la oposición y silencio de los propios.'
    },
    der: {
      acepta: true,
      texto: 'Pagar el precio',
      efectos: { caja: -11, rosca: 8, pueblo: 4, campo: 3 },
      pone: ['ley_aprobada']
    }
  },
  {
    id: 'oposicion_pacto',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'La oposición ofrece un acuerdo de diez puntos. Quieren la foto también.',
    peso: 1.1,
    requiere: { mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'No hay acuerdo posible',
      efectos: { pueblo: 6, rosca: -6, campo: -4 },
      pone: ['grieta_abierta']
    },
    der: {
      acepta: true,
      texto: 'Firmar el acuerdo',
      efectos: { rosca: 8, campo: 6, pueblo: -6 },
      pone: ['pacto_amplio']
    }
  },
  {
    id: 'espionaje',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Tengo escuchas de tus propios ministros. ¿Las querés oír?',
    peso: 0.9,
    requiere: { mesMin: 14 },
    izq: {
      rechaza: true,
      texto: 'Quemalas y andate',
      efectos: { rosca: 4, pueblo: 3 }
    },
    der: {
      acepta: true,
      texto: 'Ponelas',
      efectos: { rosca: -8, pueblo: -4, caja: -3 },
      pone: ['escuchas_ilegales'],
      replica: 'Dos ministros hablaban de vos en pasado.'
    }
  },
  {
    id: 'renuncia_gabinete',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Tres ministros pusieron la renuncia a disposición. Es un mensaje, no un trámite.',
    peso: 1.4,
    requiere: { algunaFlag: ['crisis_gabinete', 'guerra_interna'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Rechazarlas todas',
      efectos: { rosca: 5, pueblo: -4 },
      replica: 'Se quedaron. Dos siguieron hablando con periodistas.'
    },
    der: {
      acepta: true,
      texto: 'Aceptar las tres',
      efectos: { rosca: -8, pueblo: 6, campo: -3 },
      saca: ['crisis_gabinete']
    }
  },
  {
    id: 'juicio_politico',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Hay firmas para pedir juicio político. Todavía faltan. Todavía.',
    peso: 1,
    urgeSi: { rosca: { max: 25 } },
    urgeMult: 6,
    requiere: { mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Ir a la calle',
      efectos: { pueblo: 9, rosca: -8, campo: -5 },
      pone: ['plebiscito_calle']
    },
    der: {
      acepta: true,
      texto: 'Negociar con todos',
      efectos: { caja: -13, rosca: 13, pueblo: -4 }
    }
  }
];
