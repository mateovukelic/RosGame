// PERSONAJES — arquetipos, no personas reales. Cualquier parecido es culpa del país.
// `cara` es un emoji de respaldo hasta que haya arte; `color` tiñe la carta.

export const PERSONAJES = {
  ministro: { nombre: 'El Ministro de Economía', cara: '🧮', color: '#2f6f8f', bajada: 'Habla de "sendero" y de "trimestres".' },
  sindicalista: { nombre: 'El Secretario General', cara: '🧔', color: '#8f3a2f', bajada: 'Treinta años en el cargo. Ganó todas las internas.' },
  gobernadora: { nombre: 'La Gobernadora', cara: '💼', color: '#5a4a8f', bajada: 'Trae una carpeta y una amenaza, en ese orden.' },
  vecina: { nombre: 'La Vecina', cara: '🧓', color: '#7a6a3f', bajada: 'Te para en la calle. Nunca es para felicitarte.' },
  periodista: { nombre: 'El Periodista', cara: '🎙️', color: '#3f3f4f', bajada: 'Tiene el título escrito desde antes de la entrevista.' },
  productor: { nombre: 'El Productor', cara: '🚜', color: '#4f7a3f', bajada: 'Camioneta, campera de la cooperativa, paciencia corta.' },
  piquetero: { nombre: 'El Referente Social', cara: '🥁', color: '#8f5a2f', bajada: 'Trae bombos y un petitorio de once puntos.' },
  jueza: { nombre: 'La Jueza Federal', cara: '⚖️', color: '#4a4a3a', bajada: 'Habla despacio. Todo lo que decís queda registrado.' },
  organismo: { nombre: 'El Enviado del Organismo', cara: '🛂', color: '#2f5f5f', bajada: 'Llegó en el vuelo de la mañana con una planilla.' },
  barra: { nombre: 'El de la Popular', cara: '🥁', color: '#6f2f4f', bajada: 'Vino a hablar de "trabajo para los pibes".' },
  cura: { nombre: 'El Cura Villero', cara: '✝️', color: '#5f5f3f', bajada: 'No pide para él. Eso lo hace más difícil.' },
  puntero: { nombre: 'El Puntero', cara: '🧢', color: '#7f4f2f', bajada: 'Sabe cuántos votos hay en cada manzana. Literalmente.' },
  empresario: { nombre: 'El Empresario Amigo', cara: '🕴️', color: '#3f5f7f', bajada: 'Te llama "presidente" con demasiado cariño.' },
  cientifico: { nombre: 'La Científica', cara: '🔬', color: '#2f7f6f', bajada: 'Pide presupuesto con datos. Pobre.' },
  pibe: { nombre: 'El Pibe del Barrio', cara: '⚽', color: '#6f7f2f', bajada: 'Tiene dieciséis y una pregunta incómoda.' },
  militar: { nombre: 'El Jefe del Estado Mayor', cara: '🎖️', color: '#4f4f2f', bajada: 'Vino a pedir por el presupuesto. Solo por eso.' },
  gremio_docente: { nombre: 'La Maestra', cara: '📚', color: '#7f3f5f', bajada: 'Trae la lista de escuelas sin gas.' },
  tuitero: { nombre: 'El Trending Topic', cara: '📱', color: '#5f3f7f', bajada: 'Es un fenómeno de dos días. Hoy es el día uno.' },
  taxista: { nombre: 'El Tachero', cara: '🚕', color: '#7f6f2f', bajada: 'Tiene la solución. Siempre tuvo la solución.' },
  primera_dama: { nombre: 'Tu Pareja', cara: '💍', color: '#8f4f6f', bajada: 'Te conoce desde antes de todo esto.' },
  interna: { nombre: 'Tu Vice', cara: '🪑', color: '#5f2f2f', bajada: 'Sonríe en las fotos. Cuenta los votos en privado.' },
  intendente: { nombre: 'El Intendente', cara: '🏛️', color: '#3f6f5f', bajada: 'Gobierna un conurbano más grande que varios países.' },
  hincha: { nombre: 'El Hincha', cara: '🇦🇷', color: '#4f7f9f', bajada: 'Para él, el país empieza y termina en la selección.' },
  chanta: { nombre: 'El Asesor', cara: '🕶️', color: '#4f4f5f', bajada: 'Nadie sabe bien quién lo nombró ni qué hace.' },
  abuela: { nombre: 'Tu Vieja', cara: '☕', color: '#8f6f4f', bajada: 'Te llama al celular oficial. Atendés siempre.' }
};

export function personaje(id) {
  return PERSONAJES[id] || { nombre: 'Anónimo', cara: '👤', color: '#555', bajada: '' };
}
