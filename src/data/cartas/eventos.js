// Mazo de eventos: cosas que PASAN, no cosas que te piden.
//
// El resto del mazo está hecho de peticiones: alguien entra al despacho y quiere
// algo. Este paquete es lo otro — la noticia del mediodía, el papelón, el
// accidente, la tormenta. Gobernar también es reaccionar a cosas que no eligió
// nadie, y por eso acá abundan los dilemas: no hay un sí ni un no, hay dos
// maneras de pararse frente a un hecho consumado.
export const CARTAS_EVENTOS = [
  {
    id: 'apagon_nacional',
    forma: 'dilema',
    personaje: 'ministro',
    texto: 'Domingo, siete de la mañana: se cayó el sistema eléctrico entero. El país completo está sin luz.',
    peso: 1.1,
    requiere: { mesMin: 4 },
    izq: {
      texto: 'Fue la empresa',
      efectos: { campo: -9, pueblo: 4, caja: 3 },
      pone: ['pelea_energetica'],
      replica: 'La empresa contestó con un comunicado de once páginas y un mapa de inversiones no hechas desde 2011.'
    },
    der: {
      texto: 'El sistema está viejo',
      efectos: { pueblo: -7, campo: 5, caja: -6 },
      replica: 'Decir la verdad costó una semana de tapas. El plan de inversión que anunciaste lo cobra otro gobierno.'
    }
  },
  {
    id: 'cumbre_traduccion',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'En la cumbre el traductor le puso "ingobernable" a una frase suya. El país de al lado pide explicaciones.',
    peso: 1,
    requiere: { mesMin: 6 },
    izq: {
      texto: 'Fue el traductor',
      efectos: { rosca: -4, campo: -3, pueblo: 3 },
      replica: 'El traductor tenía el audio. Lo publicó dos días después, con el minuto exacto marcado en amarillo.'
    },
    der: {
      texto: 'Dije lo que dije',
      efectos: { pueblo: 7, campo: -7, rosca: -5 },
      pone: ['roce_regional'],
      replica: 'Adentro te aplaudieron. El embajador de enfrente pidió licencia por motivos personales esa misma semana.'
    }
  },
  {
    id: 'santa_rosa',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Cayó granizo del tamaño de un huevo sobre la zona núcleo. Ochenta mil hectáreas hechas nada en veinte minutos.',
    peso: 1.1,
    requiere: { mesMin: 5 },
    izq: {
      rechaza: true,
      texto: 'Que responda el seguro',
      efectos: { campo: -11, caja: 4, pueblo: -2 },
      replica: 'El seguro cubría el treinta por ciento. El otro setenta se transformó en bronca con nombre y apellido.'
    },
    der: {
      acepta: true,
      texto: 'Emergencia agropecuaria',
      efectos: { campo: 10, caja: -9, pueblo: 2 },
      replica: 'Se declaró la emergencia en catorce partidos. En tres de ellos no había caído una sola piedra.'
    }
  },
  {
    id: 'ballena',
    forma: 'propuesta',
    personaje: 'intendente',
    texto: 'Varó una ballena en la playa más turística de la costa. Está viva, pesa treinta toneladas y hay cámaras.',
    peso: 0.85,
    requiere: { mesMin: 3 },
    izq: {
      rechaza: true,
      texto: 'Que se ocupe la provincia',
      efectos: { pueblo: -6, rosca: -3, caja: 2 },
      replica: 'La ballena murió el miércoles. Trescientas personas habían pasado la noche tirándole agua con baldes.'
    },
    der: {
      acepta: true,
      texto: 'Mando la Prefectura',
      efectos: { pueblo: 7, caja: -4, rosca: 2 },
      pone: ['orgullo_nacional'],
      replica: 'Volvió al mar a las seis de la tarde con la playa entera aplaudiendo. Fue la mejor imagen del año.'
    }
  },
  {
    id: 'cripto_fundida',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Se fundió una plataforma de inversión con doscientos mil ahorristas adentro. Un funcionario suyo la promocionó.',
    peso: 1.1,
    requiere: { mesMin: 8 },
    izq: {
      texto: 'Que se hagan cargo ellos',
      efectos: { pueblo: -9, campo: 3, caja: 2 },
      pone: ['funcionario_sospechado'],
      replica: 'El tuit del funcionario tenía cuatro meses y seguía online. Lo borró tarde, que es peor que no borrarlo.'
    },
    der: {
      texto: 'Investigación y el que sea',
      efectos: { pueblo: 6, rosca: -7, campo: -3 },
      pone: ['causa_abierta'],
      replica: 'La investigación arrancó rápido. El primer allanamiento fue a doce cuadras de la Casa Rosada.'
    }
  },
  {
    id: 'reality_final',
    forma: 'dilema',
    personaje: 'tuitero',
    texto: 'La final de un reality hizo más audiencia que tu última cadena nacional. El ganador te mandó un saludo en vivo.',
    peso: 0.9,
    requiere: { mesMin: 6 },
    izq: {
      texto: 'Lo invito a la Rosada',
      efectos: { pueblo: 6, rosca: -4, campo: -2 },
      replica: 'Vino con la familia. La foto tuvo más alcance que cualquier anuncio económico de ese trimestre.'
    },
    der: {
      texto: 'No comento televisión',
      efectos: { pueblo: -4, rosca: 3 },
      replica: 'Tres dirigentes de la oposición se sacaron la foto que vos no te sacaste. Uno la usó en campaña.'
    }
  },
  {
    id: 'audio_viejo',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Se filtró un audio suyo de hace cuatro años. No dice nada ilegal. Dice algo que hoy no volvería a decir.',
    peso: 1.2,
    requiere: { mesMin: 10 },
    izq: {
      texto: 'Pensaba eso, ya no',
      efectos: { pueblo: 4, rosca: -5, campo: -2 },
      replica: 'Reconocer que cambiaste de opinión te costó una semana de burlas y te ahorró tres de sospechas.'
    },
    der: {
      texto: 'Está editado',
      efectos: { pueblo: -7, rosca: 3 },
      pone: ['niega_la_calle'],
      replica: 'A las nueve horas apareció el audio completo, sin cortes, tres minutos más largo y bastante peor.'
    }
  },
  {
    id: 'vino_cumbre',
    forma: 'dilema',
    personaje: 'vecina',
    texto: 'Salió publicado lo que costó el vino de la cena de la cumbre. Es el equivalente a dos jubilaciones mínimas.',
    peso: 1,
    requiere: { mesMin: 7 },
    izq: {
      texto: 'Es protocolo diplomático',
      efectos: { pueblo: -8, campo: 3, rosca: 2 },
      replica: 'La palabra "protocolo" se convirtió en meme antes del mediodía y en cántico antes del fin de semana.'
    },
    der: {
      texto: 'Estuvo mal, lo devolvemos',
      efectos: { pueblo: 6, rosca: -4, caja: -1 },
      replica: 'Devolver las botellas no se podía: ya estaban tomadas. Se donó el equivalente y alcanzó, apenas.'
    }
  },
  {
    id: 'rio_compartido',
    forma: 'propuesta',
    personaje: 'gobernadora',
    texto: 'El país de enfrente arrancó a dragar el río compartido. Nuestros pescadores dicen que en dos años no queda nada.',
    peso: 1,
    requiere: { mesMin: 9 },
    izq: {
      rechaza: true,
      texto: 'No armo un conflicto',
      efectos: { campo: -7, pueblo: -5, rosca: -3 },
      replica: 'Los pescadores cortaron el puente internacional por su cuenta. Duró nueve días y lo arreglaron ellos.'
    },
    der: {
      acepta: true,
      texto: 'Reclamo formal y dureza',
      efectos: { pueblo: 8, campo: 4, caja: -5, rosca: -4 },
      pone: ['roce_regional'],
      replica: 'El reclamo se presentó con firmeza. La respuesta llegó en catorce meses y no resolvió nada.'
    }
  },
  {
    id: 'brote_dengue',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'Brote de dengue en ocho provincias. No hay repelente en las farmacias y hay un importador que tiene todo el stock.',
    peso: 1.1,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Que lo resuelva el mercado',
      efectos: { pueblo: -10, campo: 4, caja: 3 },
      replica: 'El repelente llegó a costar lo que una jornada de trabajo. La foto de la góndola vacía circuló sola.'
    },
    der: {
      siembra: { carta: 'demanda_importador', meses: [12,18] },
      acepta: true,
      texto: 'Importamos y repartimos',
      efectos: { pueblo: 9, caja: -8, campo: -4 },
      replica: 'Llegaron los aviones con el repelente. El importador puso una demanda millonaria y la ganó tres años después.'
    }
  },
  {
    id: 'bajante',
    forma: 'dilema',
    personaje: 'productor',
    texto: 'Tercer año de bajante. Las barcazas cargan la mitad y hay que dragar el canal o el puerto queda inutilizable.',
    peso: 1,
    requiere: { mesMin: 10 },
    izq: {
      siembra: { carta: 'puerto_rinde', meses: [8,12] },
      texto: 'Dragamos lo que haga falta',
      efectos: { caja: -12, campo: 12, pueblo: -2 },
      replica: 'Se dragó. El canal quedó operativo y ninguna persona ajena al puerto se enteró jamás de que eso pasó.'
    },
    der: {
      texto: 'Que espere a que llueva',
      efectos: { campo: -11, caja: 5, pueblo: 2 },
      replica: 'Llovió. Nueve meses después. En el medio se exportó un cuarenta por ciento menos y eso sí se notó.'
    }
  },
  {
    id: 'satelite',
    forma: 'propuesta',
    personaje: 'cientifico',
    texto: 'El satélite está terminado y funciona. Ponerlo en órbita cuesta lo mismo que un hospital de mediana complejidad.',
    peso: 0.9,
    requiere: { mesMin: 12 },
    izq: {
      rechaza: true,
      texto: 'Primero el hospital',
      efectos: { pueblo: 5, campo: -5, caja: -6 },
      replica: 'El hospital se hizo y funciona bien. El satélite quedó en un galpón con una lona encima, terminado.'
    },
    der: {
      siembra: { carta: 'satelite_arriba', meses: [16,22] },
      acepta: true,
      texto: 'Que se lance',
      efectos: { caja: -11, campo: 7, pueblo: 4, rosca: -3 },
      pone: ['orgullo_nacional'],
      replica: 'Se lanzó a las cuatro de la mañana y lo miraron dos millones de personas por internet. Funcionó.'
    }
  },
  {
    id: 'antartida',
    forma: 'propuesta',
    personaje: 'militar',
    texto: 'La base antártica pide relevo. El rompehielos está roto desde hace tres años y la ventana de hielo cierra en marzo.',
    peso: 0.85,
    requiere: { mesMin: 8 },
    izq: {
      rechaza: true,
      texto: 'Que aguanten un año más',
      efectos: { pueblo: -5, rosca: -4, campo: -3, caja: 4 },
      replica: 'Aguantaron. Dos países mandaron sus rompehielos a saludarlos y las fotos las publicaron ellos.'
    },
    der: {
      acepta: true,
      texto: 'Se arregla el rompehielos',
      efectos: { caja: -10, rosca: 5, pueblo: 5 },
      replica: 'Zarpó en febrero, con lo justo. La tripulación anterior llevaba catorce meses en el hielo.'
    }
  },
  {
    id: 'transmision_cortada',
    forma: 'dilema',
    personaje: 'hincha',
    texto: 'El canal público cortó la transmisión justo en el gol. Volvió cuarenta segundos después, con el festejo empezado.',
    peso: 0.85,
    requiere: { mesMin: 4 },
    izq: {
      texto: 'Echo al que sea',
      efectos: { pueblo: 5, rosca: -3 },
      replica: 'Echaste a un técnico de planta que llevaba veintidós años y no había tocado un solo botón esa noche.'
    },
    der: {
      texto: 'Fue un problema técnico',
      efectos: { pueblo: -6, rosca: 2 },
      replica: 'Era un problema técnico. Nadie lo creyó, y "fue un problema técnico" quedó como respuesta burlona.'
    }
  },
  {
    id: 'cantante_estadio',
    forma: 'dilema',
    personaje: 'tuitero',
    texto: 'Un cantante que llena estadios dijo tu apellido desde el escenario. Cincuenta mil personas respondieron a coro.',
    peso: 0.95,
    requiere: { mesMin: 8 },
    izq: {
      texto: 'Le contesto',
      efectos: { pueblo: -5, rosca: -3 },
      replica: 'Le contestaste desde la cuenta oficial. El tema salió el mes siguiente y la letra te nombraba entero.'
    },
    der: {
      texto: 'Que cante lo que quiera',
      efectos: { pueblo: 4, campo: 2 },
      replica: 'No dijiste nada. Se apagó en cuatro días, que es lo que dura todo lo que no encuentra con quién pelearse.'
    }
  },
  {
    id: 'contenedor',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Apareció un contenedor en el puerto que no figura en ningún papel. Adentro hay algo que nadie quiere nombrar.',
    peso: 1,
    requiere: { mesMin: 12 },
    izq: {
      siembra: { carta: 'juicio_contenedor', meses: [10,16] },
      texto: 'Que se abra con cámaras',
      efectos: { pueblo: 7, rosca: -8, campo: -3 },
      pone: ['causa_abierta'],
      replica: 'Se abrió con cámaras. Lo que había adentro complicó a gente de los tres gobiernos anteriores, y a dos del tuyo.'
    },
    der: {
      texto: 'Que se maneje con reserva',
      efectos: { rosca: 6, pueblo: -6, campo: 2 },
      pone: ['encubrimiento'],
      replica: 'Se manejó con reserva durante cinco meses. Después lo publicó un diario de otro país, con fotos.'
    }
  },
  {
    id: 'controladores',
    forma: 'propuesta',
    personaje: 'sindicalista',
    texto: 'Paro de controladores aéreos en pleno enero. Cuatrocientos vuelos cancelados y doce mil personas durmiendo en Ezeiza.',
    peso: 1.1,
    requiere: { mesMin: 6 },
    izq: {
      rechaza: true,
      texto: 'Conciliación obligatoria',
      efectos: { pueblo: -6, campo: 6, caja: 3, rosca: 3 },
      pone: ['tension_gremial'],
      replica: 'Volaron los aviones. El gremio lo tomó como una declaración de guerra y lo dijo exactamente así.'
    },
    der: {
      acepta: true,
      texto: 'Nos sentamos esta noche',
      efectos: { pueblo: 5, caja: -6, campo: -4 },
      replica: 'Se sentaron a las once de la noche y se levantaron a las cuatro. Los aviones salieron a las seis.'
    }
  },
  {
    id: 'plaga_fruta',
    forma: 'propuesta',
    personaje: 'productor',
    texto: 'Apareció plaga en la fruta del valle y un país nos cerró la importación entera. Son mil quinientos productores.',
    peso: 0.95,
    requiere: { mesMin: 10 },
    izq: {
      siembra: { carta: 'plaga_vuelve', meses: [10,14] },
      rechaza: true,
      texto: 'Que se abran otros mercados',
      efectos: { campo: -9, caja: -4, pueblo: -2 },
      replica: 'Se abrieron otros mercados. Pagaban un cuarenta por ciento menos y quedaban del otro lado del planeta.'
    },
    der: {
      acepta: true,
      texto: 'Plan sanitario de urgencia',
      efectos: { caja: -9, campo: 11 },
      replica: 'En siete meses se levantó la restricción. Durante esos siete meses se tiró fruta en las banquinas.'
    }
  },
  {
    id: 'cadena_cortada',
    forma: 'dilema',
    personaje: 'chanta',
    texto: 'La cadena nacional se cortó a los dos minutos por una falla y quedó tu cara congelada en una mueca rarísima.',
    peso: 0.8,
    requiere: { mesMin: 5 },
    izq: {
      texto: 'La rehago entera',
      efectos: { pueblo: -4, rosca: 2, caja: -2 },
      replica: 'La rehiciste el mismo día. La que vio todo el mundo fue igual la primera, congelada, con la mueca.'
    },
    der: {
      texto: 'Me río y sigo',
      efectos: { pueblo: 5, rosca: -2 },
      replica: 'La usaste de foto de perfil por un día. Fue lo más humano que hiciste en meses y funcionó.'
    }
  },
  {
    id: 'flota_pesquera',
    forma: 'dilema',
    personaje: 'militar',
    texto: 'Hay doscientos barcos extranjeros pescando justo en el límite. Entran de noche, apagan las luces y salen.',
    peso: 0.95,
    requiere: { mesMin: 11 },
    izq: {
      texto: 'Que salga la Armada',
      efectos: { pueblo: 8, caja: -7, campo: 4, rosca: 3 },
      replica: 'Se capturó uno. Los otros ciento noventa y nueve siguieron ahí, ahora con las luces prendidas.'
    },
    der: {
      texto: 'No tenemos con qué',
      efectos: { pueblo: -7, campo: -4, caja: 3 },
      replica: 'Era cierto: no había combustible para patrullar. Decirlo en voz alta fue lo que no se perdonó.'
    }
  },
  {
    id: 'archivo_desclasificado',
    forma: 'dilema',
    personaje: 'jueza',
    texto: 'Aparecieron cajas de archivo en un sótano del Estado. Hay documentos de hace cincuenta años sin catalogar.',
    peso: 0.85,
    requiere: { mesMin: 14 },
    izq: {
      texto: 'Se abre todo',
      efectos: { pueblo: 8, rosca: -7, campo: -4 },
      pone: ['datos_creibles'],
      replica: 'Se abrió todo. Tres apellidos muy conocidos aparecieron en lugares donde sus familias juraban que no estaban.'
    },
    der: {
      texto: 'Que lo revise una comisión',
      efectos: { rosca: 5, pueblo: -5 },
      replica: 'La comisión se formó, sesionó dos veces y no volvió a reunirse. Las cajas siguen en el sótano.'
    }
  },
  {
    id: 'himno_polemica',
    forma: 'dilema',
    personaje: 'periodista',
    texto: 'Una artista cantó el himno en un estadio con un arreglo distinto. El país lleva seis días discutiendo eso y sólo eso.',
    peso: 0.8,
    requiere: { mesMin: 6 },
    izq: {
      texto: 'Me parece hermoso',
      efectos: { pueblo: 3, campo: -4, rosca: -2 },
      replica: 'La mitad del país te agradeció y la otra mitad te acusó de algo grave. Las dos mitades cambiaron al jueves.'
    },
    der: {
      texto: 'No opino del himno',
      efectos: { pueblo: -2, rosca: 3, campo: 3 },
      replica: 'No opinar fue leído como opinar. Es lo que pasa cuando el país discute una sola cosa durante seis días.'
    }
  }
];
