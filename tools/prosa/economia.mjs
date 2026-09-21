import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/economia.js', import.meta.url).pathname, {
  ministro_plan: {
    texto: 'Hay dos caminos: de una o de a poco. Los dos terminan mal. Cambia quién se entera primero.',
    izq: { texto: 'De una y que duela', replica: 'El primer mes fue brutal. El segundo también. Del tercero nadie habla.' },
    der: { texto: 'De a poco', replica: 'Nadie se enojó del todo y nadie se arregló tampoco. Eso duró dos años.' }
  },
  brecha: {
    texto: 'La brecha con el paralelo pasó el ciento veinte por ciento. A ese número ya lo mira el almacenero.',
    izq: { texto: 'Devaluamos y listo', replica: 'Los precios se acomodaron en cuarenta y ocho horas. Los sueldos, en ocho meses.' },
    der: { texto: 'El dólar no se toca', replica: 'Aguantó. Cada semana que aguantaba costaba un poco más que la anterior.' }
  },
  corrida: {
    texto: 'Hoy se fueron mil doscientos millones. No es pánico todavía. Mañana el mercado abre igual.',
    izq: { texto: 'Vendemos reservas', replica: 'Frenó once días. Los once días más caros del año.' },
    der: { texto: 'Tasa por las nubes', replica: 'Se congeló el dólar y se congeló todo lo demás. Nadie invirtió en nada durante un trimestre.' }
  },
  organismo_desembolso: {
    texto: 'El desembolso está aprobado. Sólo restan tres metas fiscales. Cuantitativas, no indicativas.',
    izq: { texto: 'Nos arreglamos solos', replica: 'Se fue en el vuelo de la tarde. No hizo declaraciones, que fue una forma de hacerlas.' },
    der: { texto: 'Firmamos', replica: 'Entraron los dólares el jueves. La letra chica se publicó un viernes a la noche.' }
  },
  organismo_revision: {
    texto: 'Revisión trimestral. El déficit se desvió cuatro décimas. Ajustan ustedes o ajustamos nosotros.',
    izq: { texto: 'Pedimos una prórroga', replica: 'La dieron. Con una nota al pie de once palabras que a los mercados no les gustó.' },
    der: { texto: 'Ajustamos nosotros', replica: 'Ajustaste. El equipo que lo diseñó no vive en ninguno de los barrios donde se sintió.' }
  },
  default_vencimiento: {
    texto: 'Vence el martes y los dólares no están. Tengo tres opciones, dos son malas y la tercera no existe.',
    izq: { texto: 'Pagamos como sea', replica: 'Se pagó. Para pagar se usó media reserva y el resto del año fue cuesta arriba.' },
    der: { texto: 'Lo reperfilamos', replica: 'La palabra "reperfilar" entró al diccionario del miedo en menos de un día.' }
  },
  tarifas: {
    texto: 'El subsidio a la energía se come el presupuesto de salud entero. Esto no es ideología, es una resta.',
    izq: { texto: 'Congelamos un año más', replica: 'Aguantó el invierno. En febrero la distribuidora avisó que no garantizaba el verano.' },
    der: { texto: 'Que se sincere', replica: 'La factura llegó a todas las casas el mismo día. Algunos la fotografiaron y la subieron.' }
  },
  apagon: {
    texto: 'Cuarenta grados, ocho horas sin luz y el freezer lleno de cosas que ya no sirven. ¿Quién me lo paga?',
    izq: { texto: 'Multamos a la empresa', replica: 'La multa se pagó. Salió de la tarifa del año siguiente.' },
    der: { texto: 'Pedir disculpas', replica: 'Aceptó las disculpas con educación. Al año siguiente votó distinto.' }
  },
  emision: {
    texto: 'Faltan fondos para cerrar el mes. Puedo pedirle a la máquina que haga un turno extra. Uno solo.',
    izq: { texto: 'Ni un peso', replica: 'No se emitió. Se pagó tarde, y a los que se les pagó tarde se acordaron.' },
    der: { texto: 'Que haga el turno', replica: 'El mes cerró. El costo aparece dentro de noventa días, cuando ya nadie lo asocie con esto.' }
  },
  retenciones_suba: {
    texto: 'Si vuelven a tocar las retenciones, no sembramos. No es una amenaza, es una cuenta que ya hicimos.',
    izq: { texto: 'Se suben igual', replica: 'Se sembró menos. El número exacto recién se supo en la cosecha siguiente.' },
    der: { texto: 'Las bajamos', replica: 'Sembraron todo. Los dólares entraron en marzo, no en diciembre, que es cuando hacían falta.' }
  },
  lockout: {
    texto: 'Paro de comercialización por tiempo indeterminado. Las rutas ya están. Esto arranca hoy.',
    izq: { texto: 'Que aguanten ellos', replica: 'A la tercera semana no había carne en las góndolas y la discusión dejó de ser sobre retenciones.' },
    der: { texto: 'Sentémonos a hablar', replica: 'Se levantó en cuatro días. Lo que se firmó lo festejaron ellos, no vos.' }
  },
  precios: {
    texto: 'El acuerdo de precios no se cumple porque no se puede cumplir. Usted lo sabe mejor que yo.',
    izq: { texto: 'Van los inspectores', replica: 'Los inspectores encontraron todo en orden. En el depósito de atrás no entraron.' },
    der: { texto: 'Que los fije el mercado', replica: 'Los precios se acomodaron solos, hacia arriba, y después se quedaron ahí.' }
  },
  gondolas_vacias: {
    texto: 'Fui al súper y no había aceite. Ni fideos. Tengo la lista hecha y la mitad de las cosas no están.',
    izq: { texto: 'Esto es un boicot', replica: 'Puede que tuvieras razón. Tener razón no puso una botella de aceite en ningún estante.' },
    der: { texto: 'Importamos de urgencia', replica: 'Llegaron los containers en tres semanas. El aceite importado salía más que el que faltaba.' }
  },
  dolar_ahorro: {
    texto: '¿Va a dejar comprar dólares o no? Porque yo ya tengo el turno sacado en el banco, por las dudas.',
    izq: { texto: 'Cepo y se terminó', replica: 'Al otro día había tres cotizaciones distintas y ninguna era la oficial.' },
    der: { texto: 'Que compre el que quiera', replica: 'Compraron todos el mismo día. Las reservas lo sintieron esa misma semana.' }
  },
  blue: {
    texto: 'El paralelo batió récord otra vez. Dígame usted: ¿es un mercado marginal o es el precio real?',
    izq: { texto: 'Es un mercado marginal', replica: 'Todos los precios de la economía se pusieron a mirar ese número marginal.' },
    der: { texto: 'Abrimos un poco', replica: 'La brecha bajó. Bajó a un número que seguía siendo vergonzoso, pero bajó.' }
  },
  paritaria: {
    texto: 'Pedimos arriba de la inflación proyectada. Su proyección, dicho sea de paso, no la cree ni su ministro.',
    izq: { texto: 'Hay un techo y es ese', replica: 'Firmaron con el techo. A los cuatro meses pidieron la reapertura, y tenían razón.' },
    der: { texto: 'Se concede', replica: 'Firmaron contentos. Los otros catorce gremios llamaron el mismo día.' }
  },
  inversion_extranjera: {
    texto: 'Hay un fondo listo para poner mil millones. Piden estabilidad jurídica por treinta años. Treinta.',
    izq: { texto: 'No hipoteco el futuro', replica: 'Se fueron a poner la plata en otro lado. Mandaron un comunicado muy amable.' },
    der: { texto: 'Se lo garantizamos', replica: 'Entró la inversión. El contrato lo van a leer completo tres gobiernos después.' }
  },
  litio: {
    texto: 'El recurso está abajo de mi provincia. La regalía se discute acá, no en un despacho de Buenos Aires.',
    izq: { texto: 'Es nacional y estratégico', replica: 'Los otros cinco gobernadores de la zona firmaron una carta conjunta esa misma tarde.' },
    der: { texto: 'Que lo maneje la provincia', replica: 'Firmó feliz. La regalía que negoció era la mitad de lo que se paga en Australia.' }
  },
  impuesto_riqueza: {
    texto: 'Un aporte extraordinario a las grandes fortunas. Por única vez, como todos los aportes extraordinarios.',
    izq: { texto: 'Espanta capitales', replica: 'No se espantó nadie. Tampoco entró nadie nuevo. Todo siguió exactamente igual.' },
    der: { texto: 'Que lo paguen', replica: 'Pagaron seiscientos de los ochocientos alcanzados. Los otros doscientos tenían mejores abogados.' }
  },
  inflacion_mensual: {
    texto: 'Sale el dato del mes y viene peor que el anterior. Alguien tiene que dar la cara. ¿Usted o el ministro?',
    izq: { texto: 'Doy la cara yo', replica: 'Te pusiste el traje del problema. Nadie te lo agradeció, pero nadie dijo que te escondiste.' },
    der: { texto: 'Que salga el ministro', replica: 'Salió él. Volvió al despacho sin mirar a nadie y con la corbata en la mano.' }
  },
  ministro_renuncia: {
    texto: 'Tengo la renuncia escrita y firmada en el bolsillo. Si me la acepta, el lunes el dólar hace lo que quiere.',
    izq: { texto: 'Ni loco, te banco', replica: 'Se quedó. Siguió trabajando con la renuncia en el bolsillo, que es una forma rara de trabajar.' },
    der: { texto: 'Te la acepto', replica: 'El lunes el dólar hizo exactamente lo que él dijo que iba a hacer.' }
  },
  aposto_todo: {
    texto: 'Escuchame una locura: ponemos las reservas en un bono que rinde una barbaridad. Tres meses y salimos.',
    izq: { texto: 'Estás completamente loco', replica: 'Se fue riéndose. Volvió dos veces más con la misma idea y otro nombre.' },
    der: { texto: 'Jugalo', replica: 'Nadie del gabinete quiso firmar al lado tuyo. Firmaste solo, con la lapicera de él.' }
  }
});
