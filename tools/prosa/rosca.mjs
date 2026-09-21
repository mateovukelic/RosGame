import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/rosca.js', import.meta.url).pathname, {
  gobernadora_coparticipacion: {
    texto: 'Mi provincia pone cuatro senadores y recibe lo que sobra. Traje los números. Los leemos juntos.',
    izq: { texto: 'Que se arreglen', replica: 'Se arreglaron. Cuando hubo que votar tu ley, tres de esos cuatro se fueron al baño.' },
    der: { texto: 'Giramos lo que pedís', replica: 'Se giró. A la semana llamaron otros dos gobernadores con carpetas parecidas.' }
  },
  gobernadores_bloqueo: {
    texto: 'El presupuesto no sale. Ya hablé con seis colegas. Somos siete, en realidad, pero seis suena mejor.',
    izq: { texto: 'Gobierno por decreto', replica: 'Gobernaste por decreto catorce meses. Cada decreto se fue quedando un poco más solo.' },
    der: { texto: 'Negociamos obra por obra', replica: 'Salió a las cuatro de la mañana. Costó siete obras y una promesa que no ibas a poder cumplir.' }
  },
  presupuesto_prorroga: {
    texto: 'Sin presupuesto aprobado gobernamos con el del año pasado, y reasigno yo lo que quiera. Técnicamente.',
    izq: { texto: 'Volvé a negociarlo', replica: 'Volvió. Salió el presupuesto y salió con cuatro artículos que no había escrito nadie del gobierno.' },
    der: { texto: 'Entonces aprovechemos', replica: 'Reasignó. La oposición lo denunció en conferencia y en privado lo anotó para su turno.' }
  },
  interna_candidato: {
    texto: 'Hay que definir la candidatura. Yo tengo intención, tengo encuestas y tengo paciencia. Vos tenés un problema.',
    izq: { texto: 'La candidatura es mía', replica: 'Sonrió para la foto. Esa misma noche cenó con tres gobernadores y vos no estabas invitado.' },
    der: { texto: 'Vas vos', replica: 'Aceptó en dos segundos, como quien ya tenía preparada la respuesta desde hacía meses.' }
  },
  guerra_interna_estalla: {
    texto: 'Hay dos listas. Dos. Y las encuestas dicen que juntos ganamos y separados perdemos los dos.',
    izq: { texto: 'Que compitan y gane el mejor', replica: 'Compitieron. Ganó la interna uno y la elección el de enfrente.' },
    der: { texto: 'Armamos lista de unidad', replica: 'Se armó. La foto de la unidad tiene a los dos sonriendo y mirando en direcciones distintas.' }
  },
  periodista_carpetazo: {
    texto: 'Tengo documentación sobre un funcionario suyo. Le doy veinticuatro horas antes de publicar.',
    izq: { texto: 'Lo banco', replica: 'Salió publicado el jueves. El funcionario duró cinco días más y se fue hablando pestes.' },
    der: { texto: 'Lo echo hoy mismo', replica: 'Se fue esa misma tarde. La nota salió igual, pero con vos adelantándote.' }
  },
  funcionario_preso: {
    texto: 'Su funcionario quedó detenido. Hay una bolsa con dólares y hay una filmación de la bolsa.',
    izq: { texto: 'Es persecución política', replica: 'La filmación se filtró completa dos días después. Duraba cuatro minutos.' },
    der: { texto: 'Colaboramos con la causa', replica: 'Se colaboró. Al tercer citado, alguien del gabinete empezó a no atender el teléfono.' }
  },
  medios_pauta: {
    texto: 'La pauta oficial se reparte de una forma bastante creativa. Tengo la planilla, si la quiere ver.',
    izq: { texto: 'Se premia a los amigos', replica: 'Los amigos escribieron bien durante ocho meses. El noveno mes empezaron a escribir regular.' },
    der: { texto: 'Se reparte parejo', replica: 'Se repartió parejo. Los que perdían plata lo llamaron censura y los que ganaban no dijeron nada.' }
  },
  prensa_vuelta: {
    texto: 'Los mismos que le aplaudían ahora le pegan con todo. Dicen que se les cortó la pauta. ¿Se cortó?',
    izq: { texto: 'Que peguen', replica: 'Pegaron cuatro meses seguidos. Después encontraron a otro y se olvidaron de vos.' },
    der: { texto: 'Pagamos más', replica: 'Pagaste más. Los editoriales mejoraron el lunes siguiente, lo cual era exactamente el problema.' }
  },
  corte_suprema: {
    texto: 'Hay una vacante en la Corte. Todo el mundo tiene un candidato. Usted tiene uno, aunque diga que no.',
    izq: { texto: 'Alguien de confianza', replica: 'Entró con lo justo. Los fallos empezaron a salirte bien y a nadie le pareció casualidad.' },
    der: { texto: 'Alguien indiscutible', replica: 'Entró por unanimidad. Seis meses después te falló en contra en el tema que más te importaba.' }
  },
  fallo_contra: {
    texto: 'La Corte declaró inconstitucional su decreto principal. El fallo tiene noventa páginas y está firme.',
    izq: { texto: 'Esto es lawfare', replica: 'La palabra funcionó dos semanas. Después se convirtió en un chiste, que es la muerte de una palabra.' },
    der: { texto: 'Se acata', replica: 'Se acató. El programa económico perdió su pata principal y hubo que inventar otra en cuatro días.' }
  },
  intendente_cajas: {
    texto: 'Necesito las cajas para diciembre. Vos sabés cómo es diciembre acá. Yo lo vi en el noventa y ocho.',
    izq: { texto: 'Este año no hay', replica: 'Cortó el teléfono sin despedirse. Fue la última vez que te atendió un domingo.' },
    der: { texto: 'Mandamos todo', replica: 'Llegaron las cajas. Diciembre pasó sin novedades, que es lo único que se le puede pedir a diciembre.' }
  },
  diciembre: {
    texto: 'Te avisé lo que pasaba en diciembre. Bueno: es diciembre. Y no te estoy llamando para saludarte.',
    izq: { texto: 'Que se lo banque él', replica: 'El jueves hubo catorce comercios rotos en su distrito. El viernes, veintidós en el de al lado.' },
    der: { texto: 'Plan de contención ya', replica: 'Se contuvo. Costó una fortuna y nadie va a saber nunca qué era lo que se evitó.' }
  },
  ley_estrella: {
    texto: 'Tu ley estrella está a tres votos. Esos tres votos tienen precio, y yo sé exactamente cuál es.',
    izq: { texto: 'Que se caiga', replica: 'Se cayó por dos votos. La oposición aplaudió de pie y tu propio bloque aplaudió sentado.' },
    der: { texto: 'Pagamos lo que haya que pagar', replica: 'Salió por cuatro votos. Dos de ellos ni siquiera eran los tres que ella había mencionado.' }
  },
  oposicion_pacto: {
    texto: 'La oposición ofrece un acuerdo de diez puntos. Ocho son razonables. También quieren la foto.',
    izq: { texto: 'Con ellos no hay acuerdo', replica: 'No hubo acuerdo. Los diez puntos los publicaron igual, como si los hubieras rechazado todos.' },
    der: { texto: 'Firmamos los diez puntos', replica: 'Se firmó. La foto salió en todas las tapas y tu propia tropa la miró como quien mira una traición.' }
  },
  espionaje: {
    texto: 'Tengo grabaciones de tus propios ministros hablando de vos. No preguntes cómo. ¿Las querés oír?',
    izq: { texto: 'Quemalas y andate', replica: 'Se fue con el pendrive. Nunca vas a saber si lo quemó.' },
    der: { texto: 'Ponelas', replica: 'Dos ministros hablaban de vos en pasado. Uno de ellos había cenado en tu casa el domingo.' }
  },
  renuncia_gabinete: {
    texto: 'Tres ministros pusieron la renuncia a disposición el mismo día, a la misma hora. Eso no es casualidad.',
    izq: { texto: 'No se las acepto a ninguno', replica: 'Se quedaron los tres. Dos siguieron hablando con periodistas y el tercero dejó de hablar con vos.' },
    der: { texto: 'Se las acepto a los tres', replica: 'Se fueron juntos. Dieron una conferencia conjunta, que es la forma elegante de un portazo.' }
  },
  juicio_politico: {
    texto: 'Hay firmas para pedir juicio político. Todavía no alcanzan. Repito: todavía.',
    izq: { texto: 'Me voy a la calle', replica: 'Convocaste. Fue mucha gente, y a los que juntaban firmas les dio exactamente igual.' },
    der: { texto: 'Negocio con todos', replica: 'Negociaste con todos. Las firmas dejaron de juntarse y empezaron a guardarse, que no es lo mismo.' }
  }
});
