import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/calle.js', import.meta.url).pathname, {
  paro_general: {
    texto: 'Si el lunes no hay respuesta, el martes no hay país. No lo digo de vivo: lo digo para que lo anote.',
    izq: { texto: 'Que paren', replica: 'Pararon. No salió un colectivo, no abrió un banco, y el martes fue el día más silencioso del año.' },
    der: { texto: 'Sentémonos el lunes', replica: 'Se sentaron. Salieron a las tres de la mañana con un acta que no dejó contento a nadie, y con eso alcanzó.' }
  },
  piquete_nueve_julio: {
    texto: 'Mañana a las diez cortamos la Nueve de Julio. Traemos once puntos y ninguno se negocia por separado.',
    izq: { texto: 'Que despeje la policía', replica: 'Hubo empujones, dieciocho demorados y una foto de una señora mayor sentada en el asfalto.' },
    der: { texto: 'Que pasen y hablamos', replica: 'Entraron con los once puntos. Salieron con dos resueltos y la sensación de que podían volver.' }
  },
  represion_escalada: {
    texto: 'Hay un pibe con la cara lastimada en todas las portadas. Tiene diecisiete. ¿Lo conoce alguien de acá?',
    izq: { texto: 'Se va el jefe policial', replica: 'Lo pasaron a disponibilidad. La fuerza entendió el mensaje y lo tomó como una traición.' },
    der: { texto: 'Banco a la fuerza', replica: 'La marcha del jueves fue la más grande en veinte años, y no la convocó ningún partido.' }
  },
  estado_sitio: {
    texto: 'Catorce comercios saqueados anoche, todos en el mismo cordón. Tenemos la herramienta legal lista.',
    izq: { texto: 'Ni en pedo', replica: 'Los saqueos siguieron tres noches y después pararon solos. Nadie supo nunca por qué pararon.' },
    der: { texto: 'Que se declare', replica: 'Se llenó la plaza veinte minutos después del anuncio. No hizo falta que nadie los convocara.' }
  },
  cacerolazo: {
    texto: 'Anoche golpeamos cacerolas ocho cuadras. En mi cuadra no hay un solo vecino que piense como yo.',
    izq: { texto: 'Eso es la oposición', replica: 'Esa noche volvieron a salir. Esta vez también salieron los de la cuadra de al lado.' },
    der: { texto: 'Voy y escucho', replica: 'Fuiste sin custodia. Alguien lo filmó desde un balcón. Fue tu mejor día en meses.' }
  },
  inseguridad: {
    texto: 'Entraron a tres casas en mi cuadra este mes. Ya nadie llama al 911 porque el patrullero no viene.',
    izq: { texto: 'Es sensación, señora', replica: 'La palabra "sensación" quedó dando vueltas seis meses. Se la recordaron en cada acto.' },
    der: { texto: 'Mando más patrulleros', replica: 'Llegaron cuatro móviles. Dos andaban. Igual la cuadra durmió distinto esa semana.' }
  },
  puerta_giratoria: {
    texto: 'Su ministro dijo en televisión que los jueces somos una puerta giratoria. Lo dijo en horario central.',
    izq: { texto: 'Y tiene razón', replica: 'A la semana, dos fallos que el gobierno daba por ganados salieron al revés.' },
    der: { texto: 'Le pido disculpas', replica: 'Aceptó las disculpas. El ministro se enteró de que te habías disculpado por los diarios.' }
  },
  trenes: {
    texto: 'Hace tres meses que el tren tarda el doble. Salgo a las cinco y llego tarde igual, todos los días.',
    izq: { texto: 'Está licitado', replica: 'Estaba licitado. Desde hacía nueve años, con tres gobiernos distintos firmando la misma prórroga.' },
    der: { texto: 'Plan de emergencia ya', replica: 'En seis semanas el tren recuperó doce minutos. Doce minutos por día, por doscientas mil personas.' }
  },
  colectivo_boleto: {
    texto: 'Si sube el boleto, en mi barrio la mitad deja de ir a estudiar. No es una opinión, es lo que va a pasar.',
    izq: { texto: 'Va a tener que subir', replica: 'Subió. La matrícula del turno noche cayó un dieciocho por ciento y nadie publicó ese número.' },
    der: { texto: 'Queda congelado', replica: 'Quedó congelado. El subsidio para congelarlo salió de la misma partida que los hospitales.' }
  },
  mesa_social_resultado: {
    texto: 'La mesa social lleva seis reuniones y cero resoluciones. Dígame si es una mesa o es un mueble.',
    izq: { texto: 'Nos seguimos reuniendo', replica: 'Hubo tres reuniones más. A la cuarta dejaron de venir y nadie avisó por qué.' },
    der: { texto: 'Tres puntos se resuelven', replica: 'Se resolvieron tres de once. Fue la primera vez que alguien salió de ahí con algo escrito.' }
  },
  hospital: {
    texto: 'En el hospital del barrio no hay gasas. No hay insumos, no hay presupuesto: no hay gasas, presidente.',
    izq: { texto: 'Eso es de la provincia', replica: 'Técnicamente tenías razón. Nadie en la historia aplaudió una razón técnica.' },
    der: { texto: 'Sale una partida hoy', replica: 'Llegaron las gasas el jueves. También llegó el pedido de las otras cuatro cosas que faltaban.' }
  },
  sindicato_caja: {
    texto: 'La obra social del gremio está fundida y hay afiliados sin tratamiento. Necesitamos una mano del Estado.',
    izq: { texto: 'Primero que la auditen', replica: 'Aceptaron la auditoría con una sonrisa que no era una sonrisa. Los papeles tardaron catorce meses.' },
    der: { texto: 'Giramos los fondos', replica: 'Se giraron. Los tratamientos se reanudaron. Adónde fue el resto no lo preguntó nadie.' }
  },
  marcha_universitaria: {
    texto: 'Un millón de personas caminando por el presupuesto universitario. Los rectores esperan en la puerta.',
    izq: { texto: 'No hay plata', replica: 'La frase salió en todos los carteles de la marcha siguiente, que fue más grande.' },
    der: { texto: 'Que pasen los rectores', replica: 'Pasaron. Salieron con la mitad de lo que pedían y lo anunciaron como un triunfo, porque lo era.' }
  },
  villa_urbanizacion: {
    texto: 'El barrio necesita cloacas antes que discursos. El proyecto está hecho y cuesta menos de lo que pensás.',
    izq: { texto: 'Ahora no se puede', replica: 'No se pudo ese año ni el siguiente. El proyecto sigue en una carpeta, impecable.' },
    der: { texto: 'Se hace', replica: 'Se hizo en catorce meses. Nadie cortó ninguna cinta porque no había nada que mostrar arriba de la tierra.' }
  },
  ferias: {
    texto: 'Los feriantes ocupan ocho cuadras sin permiso. Los comerciantes de esas ocho cuadras pagan impuestos.',
    izq: { texto: 'Los regularizamos', replica: 'Se anotaron cuatrocientos. Los otros doscientos se corrieron dos cuadras y siguieron igual.' },
    der: { texto: 'Se desaloja', replica: 'Se desalojó un martes a las seis de la mañana. El jueves estaban a tres cuadras.' }
  },
  incendio_campo: {
    texto: 'Se están quemando trescientas mil hectáreas. Los aviones hidrantes están y no los autoriza nadie.',
    izq: { texto: 'Que actúe la provincia', replica: 'La provincia no tenía aviones. El humo llegó a las ciudades y ahí sí se volvió un tema nacional.' },
    der: { texto: 'Que salga todo lo que haya', replica: 'Salieron los aviones. Se salvaron ochenta mil hectáreas y nadie va a saber nunca cuáles.' }
  },
  inundacion: {
    texto: 'Cuatro mil casas bajo el agua. Necesito camiones, colchones, y necesito que vengas vos.',
    izq: { texto: 'Mando ayuda, pero no voy', replica: 'Llegó la ayuda. La foto que dio la vuelta fue la del intendente cargando bolsas, solo.' },
    der: { texto: 'Salgo para allá', replica: 'Te sacaron una foto con las botas embarradas hasta la rodilla. Esa vez no fue una puesta en escena.' }
  },
  calle_caliente_estalla: {
    texto: 'Ya no manejamos nosotros lo que pasa en la calle. Te lo digo como aviso, no como amenaza. Se nos fue.',
    izq: { texto: 'Que se hagan cargo ellos', replica: 'El viernes hubo quema de cubiertas en once accesos distintos y ningún referente atendió el teléfono.' },
    der: { texto: 'Sale un paquete de urgencia', replica: 'Salió el paquete. Compró cuatro meses, que en este país es mucho tiempo.' }
  }
});
