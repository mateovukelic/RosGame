// Mazo de la rosca: internas, gobernadores, Congreso, justicia, prensa.
export const CARTAS_ROSCA = [
  {
    id: 'gobernadora_coparticipacion',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Mi provincia pone cuatro senadores y recibe lo que sobra. Traje los números. Los leemos juntos.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Que se arreglen',
      efectos: { caja: 7, rosca: -10 },
      pone: ['gobernadores_enojados'],
      replica: 'Se arreglaron. Cuando hubo que votar tu ley, tres de esos cuatro se fueron al baño.'
    },
    der: {
      acepta: true,
      texto: 'Giramos lo que pedís',
      efectos: { caja: -10, rosca: 10, pueblo: 2 },
      pone: ['pacto_provincial'],
      replica: 'Se giró. A la semana llamaron otros dos gobernadores con carpetas parecidas.'
    }
  },
  {
    id: 'gobernadores_bloqueo',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'El presupuesto no sale. Ya hablé con seis colegas. Somos siete, en realidad, pero seis suena mejor.',
    peso: 1.5,
    requiere: { flags: ['gobernadores_enojados'], mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Gobierno por decreto',
      efectos: { rosca: -11, pueblo: -3, caja: 5 },
      pone: ['sin_presupuesto'],
      replica: 'Gobernaste por decreto catorce meses. Cada decreto se fue quedando un poco más solo.'
    },
    der: {
      acepta: true,
      texto: 'Negociamos obra por obra',
      efectos: { caja: -13, rosca: 11 },
      saca: ['gobernadores_enojados'],
      replica: 'Salió a las cuatro de la mañana. Costó siete obras y una promesa que no ibas a poder cumplir.'
    }
  },
  {
    id: 'presupuesto_prorroga',
    forma: 'propuesta',
    personaje: 'ministro',
    texto: 'Sin presupuesto aprobado gobernamos con el del año pasado, y reasigno yo lo que quiera. Técnicamente.',
    peso: 1.2,
    requiere: { flags: ['sin_presupuesto'] },
    izq: {
      rechaza: true,
      texto: 'Volvé a negociarlo',
      efectos: { caja: -7, rosca: 8 },
      saca: ['sin_presupuesto'],
      replica: 'Volvió. Salió el presupuesto y salió con cuatro artículos que no había escrito nadie del gobierno.'
    },
    der: {
      acepta: true,
      texto: 'Entonces aprovechemos',
      efectos: { caja: 9, rosca: -6, campo: 4 },
      replica: 'Reasignó. La oposición lo denunció en conferencia y en privado lo anotó para su turno.'
    }
  },
  {
    id: 'interna_candidato',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Hay que definir la candidatura. Yo tengo intención, tengo encuestas y tengo paciencia. Vos tenés un problema.',
    peso: 1.4,
    requiere: { mesMin: 28 },
    izq: {
      rechaza: true,
      texto: 'La candidatura es mía',
      efectos: { rosca: -9, pueblo: 6 },
      pone: ['guerra_interna'],
      replica: 'Sonrió para la foto. Esa misma noche cenó con tres gobernadores y vos no estabas invitado.'
    },
    der: {
      acepta: true,
      texto: 'Vas vos',
      efectos: { rosca: 9, pueblo: -5 },
      pone: ['candidatura_cedida'],
      replica: 'Aceptó en dos segundos, como quien ya tenía preparada la respuesta desde hacía meses.'
    }
  },
  {
    id: 'guerra_interna_estalla',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Hay dos listas. Dos. Y las encuestas dicen que juntos ganamos y separados perdemos los dos.',
    peso: 1.6,
    requiere: { flags: ['guerra_interna'], mesMin: 30 },
    izq: {
      rechaza: true,
      texto: 'Que compitan y gane el mejor',
      efectos: { rosca: -12, pueblo: 7 },
      pone: ['fractura'],
      replica: 'Compitieron. Ganó la interna uno y la elección el de enfrente.'
    },
    der: {
      acepta: true,
      texto: 'Armamos lista de unidad',
      efectos: { rosca: 12, pueblo: -6, caja: -5 },
      saca: ['guerra_interna'],
      replica: 'Se armó. La foto de la unidad tiene a los dos sonriendo y mirando en direcciones distintas.'
    }
  },
  {
    id: 'periodista_carpetazo',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Tengo documentación sobre un funcionario suyo. Le doy veinticuatro horas antes de publicar.',
    peso: 1.3,
    izq: {
      rechaza: true,
      texto: 'Lo banco',
      efectos: { pueblo: -8, rosca: 5 },
      pone: ['funcionario_sospechado'],
      replica: 'Salió publicado el jueves. El funcionario duró cinco días más y se fue hablando pestes.'
    },
    der: {
      acepta: true,
      texto: 'Lo echo hoy mismo',
      efectos: { rosca: -5, pueblo: 6, campo: 2 },
      replica: 'Se fue esa misma tarde. La nota salió igual, pero con vos adelantándote.'
    }
  },
  {
    id: 'funcionario_preso',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'Su funcionario quedó detenido. Hay una bolsa con dólares y hay una filmación de la bolsa.',
    peso: 1.6,
    requiere: { flags: ['funcionario_sospechado'], mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Es persecución política',
      efectos: { pueblo: -10, rosca: 4, campo: -5 },
      pone: ['encubrimiento'],
      replica: 'La filmación se filtró completa dos días después. Duraba cuatro minutos.'
    },
    der: {
      acepta: true,
      texto: 'Colaboramos con la causa',
      efectos: { pueblo: 4, rosca: -9, campo: 2 },
      saca: ['funcionario_sospechado'],
      pone: ['causa_abierta'],
      replica: 'Se colaboró. Al tercer citado, alguien del gabinete empezó a no atender el teléfono.'
    }
  },
  {
    id: 'medios_pauta',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'La pauta oficial se reparte de una forma bastante creativa. Tengo la planilla, si la quiere ver.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Se premia a los amigos',
      efectos: { caja: -6, rosca: 6, pueblo: -5 },
      pone: ['prensa_comprada'],
      replica: 'Los amigos escribieron bien durante ocho meses. El noveno mes empezaron a escribir regular.'
    },
    der: {
      acepta: true,
      texto: 'Se reparte parejo',
      efectos: { caja: -5, pueblo: 4, rosca: -3 },
      replica: 'Se repartió parejo. Los que perdían plata lo llamaron censura y los que ganaban no dijeron nada.'
    }
  },
  {
    id: 'prensa_vuelta',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'Los mismos que le aplaudían ahora le pegan con todo. Dicen que se les cortó la pauta. ¿Se cortó?',
    peso: 1.2,
    requiere: { flags: ['prensa_comprada'], mesMin: 10, stats: { caja: { max: 45 } } },
    izq: {
      rechaza: true,
      texto: 'Que peguen',
      efectos: { pueblo: -6, rosca: -4 },
      saca: ['prensa_comprada'],
      replica: 'Pegaron cuatro meses seguidos. Después encontraron a otro y se olvidaron de vos.'
    },
    der: {
      acepta: true,
      texto: 'Pagamos más',
      efectos: { caja: -10, pueblo: -3, rosca: 4 },
      replica: 'Pagaste más. Los editoriales mejoraron el lunes siguiente, lo cual era exactamente el problema.'
    }
  },
  {
    id: 'corte_suprema',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Hay una vacante en la Corte. Todo el mundo tiene un candidato. Usted tiene uno, aunque diga que no.',
    peso: 1.2,
    requiere: { mesMin: 10 },
    izq: {
      texto: 'Alguien de confianza',
      efectos: { rosca: 7, pueblo: -5, campo: -4 },
      pone: ['corte_propia'],
      replica: 'Entró con lo justo. Los fallos empezaron a salirte bien y a nadie le pareció casualidad.'
    },
    der: {
      texto: 'Alguien indiscutible',
      efectos: { rosca: -4, pueblo: 6, campo: 5 },
      pone: ['corte_independiente'],
      replica: 'Entró por unanimidad. Seis meses después te falló en contra en el tema que más te importaba.'
    }
  },
  {
    id: 'fallo_contra',
    forma: 'propuesta',
    personaje: 'jueza',
    texto: 'La Corte declaró inconstitucional su decreto principal. El fallo tiene noventa páginas y está firme.',
    peso: 1.4,
    requiere: { flags: ['corte_independiente'], mesMin: 16 },
    izq: {
      rechaza: true,
      texto: 'Esto es lawfare',
      efectos: { pueblo: 5, rosca: -7, campo: -6 },
      pone: ['choque_institucional'],
      replica: 'La palabra funcionó dos semanas. Después se convirtió en un chiste, que es la muerte de una palabra.'
    },
    der: {
      acepta: true,
      texto: 'Se acata',
      efectos: { caja: -8, pueblo: -4, campo: 5, rosca: 3 },
      replica: 'Se acató. El programa económico perdió su pata principal y hubo que inventar otra en cuatro días.'
    }
  },
  {
    id: 'intendente_cajas',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Necesito las cajas para diciembre. Vos sabés cómo es diciembre acá. Yo lo vi en el noventa y ocho.',
    peso: 1.1,
    izq: {
      rechaza: true,
      texto: 'Este año no hay',
      efectos: { caja: 5, rosca: -7, pueblo: -5 },
      pone: ['diciembre_bravo'],
      replica: 'Cortó el teléfono sin despedirse. Fue la última vez que te atendió un domingo.'
    },
    der: {
      acepta: true,
      texto: 'Mandamos todo',
      efectos: { caja: -9, rosca: 7, pueblo: 5 },
      replica: 'Llegaron las cajas. Diciembre pasó sin novedades, que es lo único que se le puede pedir a diciembre.'
    }
  },
  {
    id: 'diciembre',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Te avisé lo que pasaba en diciembre. Bueno: es diciembre. Y no te estoy llamando para saludarte.',
    peso: 1.6,
    requiere: { flags: ['diciembre_bravo'], mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'Que se lo banque él',
      efectos: { pueblo: -12, rosca: -6, campo: 3 },
      pone: ['desborde'],
      replica: 'El jueves hubo catorce comercios rotos en su distrito. El viernes, veintidós en el de al lado.'
    },
    der: {
      acepta: true,
      texto: 'Plan de contención ya',
      efectos: { caja: -14, pueblo: 6, rosca: 3 },
      saca: ['diciembre_bravo'],
      replica: 'Se contuvo. Costó una fortuna y nadie va a saber nunca qué era lo que se evitó.'
    }
  },
  {
    id: 'ley_estrella',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Tu ley estrella está a tres votos. Esos tres votos tienen precio, y yo sé exactamente cuál es.',
    peso: 1.3,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Que se caiga',
      efectos: { rosca: -6, pueblo: -4, campo: -3 },
      replica: 'Se cayó por dos votos. La oposición aplaudió de pie y tu propio bloque aplaudió sentado.'
    },
    der: {
      acepta: true,
      texto: 'Pagamos lo que haya que pagar',
      efectos: { caja: -11, rosca: 8, pueblo: 4, campo: 3 },
      pone: ['ley_aprobada'],
      replica: 'Salió por cuatro votos. Dos de ellos ni siquiera eran los tres que ella había mencionado.'
    }
  },
  {
    id: 'oposicion_pacto',
    forma: 'propuesta',
    personaje: 'periodista',
    texto: 'La oposición ofrece un acuerdo de diez puntos. Ocho son razonables. También quieren la foto.',
    peso: 1.1,
    requiere: { mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'Con ellos no hay acuerdo',
      efectos: { pueblo: 6, rosca: -6, campo: -4 },
      pone: ['grieta_abierta'],
      replica: 'No hubo acuerdo. Los diez puntos los publicaron igual, como si los hubieras rechazado todos.'
    },
    der: {
      acepta: true,
      texto: 'Firmamos los diez puntos',
      efectos: { rosca: 8, campo: 6, pueblo: -6 },
      pone: ['pacto_amplio'],
      replica: 'Se firmó. La foto salió en todas las tapas y tu propia tropa la miró como quien mira una traición.'
    }
  },
  {
    id: 'espionaje',
    forma: 'propuesta',
    personaje: 'chanta',
    texto: 'Tengo grabaciones de tus propios ministros hablando de vos. No preguntes cómo. ¿Las querés oír?',
    peso: 0.9,
    requiere: { mesMin: 14 },
    izq: {
      rechaza: true,
      texto: 'Quemalas y andate',
      efectos: { rosca: 4, pueblo: 3 },
      replica: 'Se fue con el pendrive. Nunca vas a saber si lo quemó.'
    },
    der: {
      acepta: true,
      texto: 'Ponelas',
      efectos: { rosca: -8, pueblo: -4, caja: -3 },
      pone: ['escuchas_ilegales'],
      replica: 'Dos ministros hablaban de vos en pasado. Uno de ellos había cenado en tu casa el domingo.'
    }
  },
  {
    id: 'renuncia_gabinete',
    forma: 'propuesta',
    personaje: 'interna',
    texto: 'Tres ministros pusieron la renuncia a disposición el mismo día, a la misma hora. Eso no es casualidad.',
    peso: 1.4,
    requiere: { algunaFlag: ['crisis_gabinete', 'guerra_interna'], mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'No se las acepto a ninguno',
      efectos: { rosca: 5, pueblo: -4 },
      replica: 'Se quedaron los tres. Dos siguieron hablando con periodistas y el tercero dejó de hablar con vos.'
    },
    der: {
      acepta: true,
      texto: 'Se las acepto a los tres',
      efectos: { rosca: -8, pueblo: 6, campo: -3 },
      saca: ['crisis_gabinete'],
      replica: 'Se fueron juntos. Dieron una conferencia conjunta, que es la forma elegante de un portazo.'
    }
  },
  {
    id: 'juicio_politico',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'Hay firmas para pedir juicio político. Todavía no alcanzan. Repito: todavía.',
    peso: 1,
    urgeSi: { rosca: { max: 25 } },
    urgeMult: 6,
    requiere: { mesMin: 10 },
    izq: {
      rechaza: true,
      texto: 'Me voy a la calle',
      efectos: { pueblo: 9, rosca: -8, campo: -5 },
      pone: ['plebiscito_calle'],
      replica: 'Convocaste. Fue mucha gente, y a los que juntaban firmas les dio exactamente igual.'
    },
    der: {
      acepta: true,
      texto: 'Negocio con todos',
      efectos: { caja: -13, rosca: 13, pueblo: -4 },
      replica: 'Negociaste con todos. Las firmas dejaron de juntarse y empezaron a guardarse, que no es lo mismo.'
    }
  }
];
