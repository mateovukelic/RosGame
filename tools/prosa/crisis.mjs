import { aplicar } from '../reescribir.mjs';
aplicar(new URL('../../src/data/cartas/crisis.js', import.meta.url).pathname, {
  crisis_confianza: {
    texto: 'Nadie cree en el programa. No lo creen afuera, no lo creen adentro, y hace dos semanas que no lo creo yo.',
    izq: { texto: 'Sostenemos el rumbo', replica: 'Se sostuvo. El rumbo estaba bien; el problema era que ya no lo seguía nadie.' },
    der: { texto: 'Anunciamos un plan nuevo', replica: 'Se anunció con nombre propio y conferencia. Los mercados aplaudieron seis días.' }
  },
  crisis_plan_fracaso: {
    texto: 'El plan nuevo cumplió dos meses. Todos los indicadores están peor que antes de anunciarlo. Todos.',
    izq: { texto: 'Doblamos la apuesta', replica: 'A esta altura ya no era un plan: era una apuesta, y todos en la sala lo sabían.' },
    der: { texto: 'Cambio todo el equipo', replica: 'Se fueron los siete. El octavo, que quería irse, fue el único al que le pediste que se quede.' }
  },
  crisis_desborde: {
    texto: 'La situación excede a las fuerzas provinciales. Se lo digo con todas las letras porque no hay tiempo.',
    izq: { texto: 'Abro todas las cajas', replica: 'Se abrió todo. Se contuvo. La cuenta llegó en abril y no había con qué pagarla.' },
    der: { texto: 'Que salgan los militares', replica: 'Salieron. Las imágenes dieron la vuelta al mundo y en este país tienen un significado propio.' }
  },
  crisis_renuncia: {
    texto: 'Hay gente de tu propio espacio pidiendo que des un paso al costado. Gente que te puso ahí.',
    izq: { texto: 'Convoco a un plebiscito', replica: 'Convocaste. Poner el cargo en juego es la jugada de alguien que ya no tiene otra.' },
    der: { texto: 'Reunir a los barones', replica: 'Vinieron los quince. Salieron a las seis de la mañana y ninguno dio declaraciones.' }
  },
  crisis_plebiscito: {
    texto: 'Convocó a la gente a la plaza para medir fuerzas. Le hago la pregunta incómoda: ¿y si no va nadie?',
    izq: { texto: 'Suspendo la convocatoria', replica: 'Suspendiste. El que suspende una plaza ya sabe qué habría pasado en esa plaza.' },
    der: { texto: 'Se convoca igual', replica: 'La plaza decide. Siempre decidió, y decide sola.' }
  },
  crisis_fuga: {
    texto: 'Mis socios están sacando todo del país. Yo también, dicho sea de paso. Se lo aviso por respeto.',
    izq: { texto: 'Cierro todo', replica: 'Se cerró. Los que quedaron adentro dejaron de invertir y se dedicaron a esperar.' },
    der: { texto: 'Que se vayan', replica: 'Se fueron. Tres de ellos habían estado en la foto de tu asunción, adelante.' }
  },
  crisis_bancos: {
    texto: 'Hay cola en los bancos desde las seis de la mañana. Todavía no corrieron. Todavía están en fila.',
    izq: { texto: 'Que cada uno saque lo suyo', replica: 'Sacaron. Para el jueves el sistema tenía menos depósitos que obligaciones y no era un problema teórico.' },
    der: { texto: 'Limitamos los retiros', replica: 'Le pusiste un nombre técnico a la medida. La gente le puso otro, y ese fue el que quedó.' }
  },
  crisis_corralito: {
    texto: 'Tengo los ahorros de toda mi vida adentro de un banco que no me los da. Trabajé treinta y ocho años.',
    izq: { texto: 'La medida se sostiene', replica: 'Se sostuvo. Esa señora apareció en televisión llorando y esa imagen te sobrevivió.' },
    der: { texto: 'Devolvemos en cuotas', replica: 'Se devolvió en doce cuotas. Con la inflación de esos doce meses, se devolvió la mitad.' }
  },
  crisis_adelanto: {
    texto: 'Si adelantás las elecciones, capaz salís por la puerta de adelante. Te lo digo como amiga, aunque no lo sea.',
    izq: { texto: 'Termino mi mandato', replica: 'Te plantaste. A veces plantarse es coraje y a veces es no tener a dónde ir.' },
    der: { texto: 'Adelanto las elecciones', replica: 'Se adelantaron. Desde el anuncio, gobernaste ocho meses que nadie vino a preguntarte nada.' }
  },
  crisis_ultimo_recurso: {
    texto: 'Vine a decirte una sola cosa y me voy. Todavía estás a tiempo de hacer bien una cosa. Una.',
    izq: { texto: 'Ya es tarde, padre', replica: 'No discutió. Te dio la mano, dijo que igual iba a rezar, y se fue caminando.' },
    der: { texto: 'Decime cuál', replica: 'Te dijo cuál. Era más chica de lo que esperabas y más difícil de lo que parecía.' }
  }
});
