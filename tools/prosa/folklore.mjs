import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/folklore.js', import.meta.url).pathname, {
  asado_quincho: {
    texto: 'Asado en el quincho el sábado. Van todos los que importan. La pregunta no es si venís: es si venís temprano.',
    izq: { texto: 'Mandales saludos', replica: 'Hablaron de vos toda la noche. No bien. A las dos de la mañana ya era otra cosa.' },
    der: { texto: 'Voy y hago el fuego', replica: 'Hiciste el fuego y salió bien. En esa mesa, eso pesa más de lo que cualquiera va a admitir.' }
  },
  mate_cumbre: {
    texto: 'Antes de empezar: ¿cebás vos o cebo yo? Porque en esta mesa eso define bastante más que el mate.',
    izq: { texto: 'Cebo yo', replica: 'Cebaste vos tres horas. Nadie dijo nada y todos entendieron.' },
    der: { texto: 'Cebá vos', replica: 'Cebó él. Te pasó el primero lavado, que es un mensaje que en el campo se entiende.' }
  },
  precio_asado: {
    texto: 'El asado ya no se compra, se mira. En casa comemos pollo y a los chicos les dije que es por la salud.',
    izq: { texto: 'Que lo acomode el mercado', replica: 'El mercado lo acomodó. Hacia arriba, y después se quedó ahí tranquilo.' },
    der: { texto: 'Sacamos cortes populares', replica: 'Salieron los cortes. Duraban dos horas en la góndola y el resto del día no había nada.' }
  },
  carne_exportacion: {
    texto: 'Hay demanda récord afuera y los barcos están esperando. Si nos dejan salir, entran dólares de verdad.',
    izq: { texto: 'Primero comemos nosotros', replica: 'El asado bajó un doce por ciento. Los dólares que no entraron los buscaste en otro lado, más caro.' },
    der: { texto: 'Abrimos la exportación', replica: 'Salieron los barcos y entraron los dólares. El asado subió antes de que el primer barco llegara.' }
  },
  quiniela: {
    texto: 'Soñé con un muerto que hablaba, jefe. Eso es el cero, todo el mundo lo sabe. ¿Le juego algo?',
    izq: { texto: 'Andá a trabajar', replica: 'Salió el cero. Te lo recordó cada viaje durante un año y medio.' },
    der: { texto: 'Jugale algo', replica: 'No salió. Igual seguiste preguntándole si había soñado algo, cada vez que te subías.' }
  },
  fernet: {
    texto: 'Se disparó el precio del fernet y en Córdoba están indignados de verdad. Esto no es un chiste, presidente.',
    izq: { texto: 'No es prioridad', replica: 'Fue tendencia dos días. Al tercero, alguien hizo la cuenta de cuánto había subido el vino.' },
    der: { texto: 'Le bajamos impuestos', replica: 'Bajó un veinte por ciento. Fue la medida más popular del trimestre y la más barata.' }
  },
  peaje_ruta: {
    texto: 'La ruta por la que sale la cosecha tiene más pozos que asfalto. Van tres camiones rotos este mes.',
    izq: { texto: 'Está en el plan de obras', replica: 'Estaba en el plan. También estaba en el plan anterior y en el anterior a ese.' },
    der: { texto: 'Se repavimenta', replica: 'Se repavimentaron ochenta kilómetros. Los otros ciento veinte quedaron para el gobierno que viene.' }
  },
  aguinaldo: {
    texto: 'Viene el medio aguinaldo. Si le ponés un bono encima, nos quedamos todos tranquilos hasta marzo.',
    izq: { texto: 'Sólo el aguinaldo', replica: 'Enero fue largo. En febrero ya estaban pidiendo la reapertura de todo.' },
    der: { texto: 'Bono para todos', replica: 'Cobraron el bono y se lo gastaron en dos semanas, que era exactamente lo que se esperaba.' }
  },
  verano_costa: {
    texto: 'Arranca la temporada. Si la gente no puede veranear, eso te aparece en las encuestas de marzo.',
    izq: { texto: 'Que cada uno haga lo suyo', replica: 'La costa tuvo la peor temporada en una década. Los intendentes de la costa te lo hicieron saber.' },
    der: { texto: 'Turismo subsidiado', replica: 'Se llenó todo. Salió carísimo y nadie va a recordar nunca que fue una decisión tuya.' }
  },
  empanadas: {
    texto: 'Para la cumbre con los gobernadores: ¿catering de hotel cinco estrellas o empanadas de la provincia?',
    izq: { texto: 'Empanadas de la provincia', replica: 'Se comieron todo. El gobernador que las mandó lo contó en cada entrevista durante un mes.' },
    der: { texto: 'Catering de hotel', replica: 'Sobró la mitad. Salió una foto de las bandejas intactas y se usó mucho más de lo que merecía.' }
  },
  cumbia_acto: {
    texto: 'Para el acto conseguí una banda que llena plazas sola. Sale una fortuna, pero llena la plaza sola.',
    izq: { texto: 'Con el himno alcanza', replica: 'No alcanzó. Las tomas aéreas del acto se publicaron con mucho entusiasmo desde el otro lado.' },
    der: { texto: 'Contratala', replica: 'Se llenó la plaza. En las tomas aéreas no se distingue quién fue por vos y quién fue por la banda.' }
  },
  mundial_clasificacion: {
    texto: 'Clasificamos. Por primera vez en años el país está insoportablemente feliz y no es por nada tuyo.',
    izq: { texto: 'No mezclo fútbol y política', replica: 'No lo mezclaste. Otros tres dirigentes sí, y la foto con la camiseta la sacaron ellos.' },
    der: { texto: 'Aprovechamos el envión', replica: 'Aprovechaste. Funcionó tres semanas, que es exactamente lo que dura un envión.' }
  },
  diez: {
    texto: 'Se murió el ídolo. Hay tres días de duelo y medio país en la calle sin saber bien qué hacer.',
    izq: { texto: 'Duelo nacional y nada más', replica: 'La gente se juntó igual, sin organización y sin permiso. Quedó la sensación de que sobraste.' },
    der: { texto: 'Velatorio en la Rosada', replica: 'Fue una marea humana y se desbordó todo. Valió la pena igual, y eso lo sabe todo el mundo.' }
  },
  billete_nuevo: {
    texto: 'Hay que sacar un billete de mayor denominación. La pregunta chica: ¿qué le ponemos en la cara?',
    izq: { texto: 'Un prócer', replica: 'Salió con un prócer. A los catorce meses ese billete ya no alcanzaba para un café.' },
    der: { texto: 'Un animal autóctono', replica: 'Le decían "el carpincho". Duró menos que el prócer y se rió más gente.' }
  },
  monedas: {
    texto: 'Ya no hay monedas en ningún lado. En el kiosco te dan un caramelo de vuelto. ¿Eso es legal, presidente?',
    izq: { texto: 'Acuñamos más', replica: 'Se acuñaron. Costaba más fabricar la moneda que lo que la moneda decía valer.' },
    der: { texto: 'Que sea todo digital', replica: 'Funcionó en las ciudades. En los pueblos sin señal siguieron dando caramelos.' }
  },
  yerba: {
    texto: 'La yerba se fue al doble en cuatro meses. Créame que esto se siente más que el dólar, y en más casas.',
    izq: { texto: 'Precio máximo a la yerba', replica: 'Se fijó el máximo. A la semana la yerba barata desapareció y quedó sólo la cara.' },
    der: { texto: 'Que quede libre', replica: 'Quedó libre. La gente empezó a comprar de medio kilo, que es el termómetro que ningún índice mide.' }
  },
  vieja_consejo: {
    texto: 'Nene, una sola cosa y no te digo más nada: al que traiciona una vez, la segunda le sale mucho más fácil.',
    izq: { texto: 'Esto es distinto, ma', replica: 'No era distinto. Tardaste once meses en darte cuenta y ella nunca te lo dijo.' },
    der: { texto: 'Tenés razón, ma', replica: 'Le hiciste caso. No te sirvió para nada esa semana y te sirvió muchísimo al año siguiente.' }
  },
  homenaje: {
    texto: 'Quieren ponerle su nombre a una autopista. Le aclaro que usted está vivo y todavía en el cargo.',
    izq: { texto: 'Que lleve otro nombre', replica: 'Le pusieron el nombre de una maestra rural. Fue la mejor decisión que tomaste en el trimestre.' },
    der: { texto: 'Acepto el homenaje', replica: 'Se inauguró el cartel. En seis meses estaba con aerosol y no era un aerosol cariñoso.' }
  }
});
