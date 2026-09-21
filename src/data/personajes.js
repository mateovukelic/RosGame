// PERSONAJES — arquetipos, no personas reales. Cualquier parecido es culpa del país.
//
// `retrato` es la receta de la ilustración: las partes (forma de cara, corte,
// barba, ojos, cejas, boca, prenda, accesorio) se combinan en src/ui/retratos.js.
// `color` tiñe el fondo del retrato y el marco de la carta.

export const PERSONAJES = {
  ministro: {
    nombre: 'El Ministro de Economía',
    color: '#2f6f8f',
    bajada: 'Habla de "sendero" y de "trimestres".',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'canoso', corte: 'raya',
      ojos: 'cansado', ceja: 'alta', boca: 'seria',
      prenda: 'traje', tela: '#39414f', accesorio: 'anteojos', accesorioColor: '#2a2620'
    }
  },
  sindicalista: {
    nombre: 'El Secretario General',
    color: '#8f3a2f',
    bajada: 'Treinta años en el cargo. Ganó todas las internas.',
    retrato: {
      cara: 'cuadrada', piel: 'trigue', pelo: 'negro', corte: 'entradas',
      barba: 'bigote', ojos: 'entrecerrado', ceja: 'enojada', boca: 'mueca',
      prenda: 'traje', tela: '#2e3038'
    }
  },
  gobernadora: {
    nombre: 'La Gobernadora',
    color: '#5a4a8f',
    bajada: 'Trae una carpeta y una amenaza, en ese orden.',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'castano', corte: 'recogido',
      ojos: 'normal', ceja: 'alta', boca: 'mueca',
      prenda: 'traje', tela: '#4a3f6b', accesorio: 'aros'
    }
  },
  vecina: {
    nombre: 'La Vecina',
    color: '#7a6a3f',
    bajada: 'Te para en la calle. Nunca es para felicitarte.',
    retrato: {
      cara: 'redonda', piel: 'clara', pelo: 'canoso', corte: 'media',
      ojos: 'cansado', ceja: 'enojada', boca: 'mueca',
      prenda: 'sweater', tela: '#8a6a4a', accesorio: 'anteojos', accesorioColor: '#4a3f33'
    }
  },
  periodista: {
    nombre: 'El Periodista',
    color: '#3f3f4f',
    bajada: 'Tiene el título escrito desde antes de la entrevista.',
    retrato: {
      cara: 'angosta', piel: 'media', pelo: 'negro', corte: 'corto',
      ojos: 'normal', ceja: 'alta', boca: 'abierta',
      prenda: 'traje', tela: '#33353f', accesorio: 'auriculares', accesorioColor: '#1d1e23'
    }
  },
  productor: {
    nombre: 'El Productor',
    color: '#4f7a3f',
    bajada: 'Camioneta, campera de la cooperativa, paciencia corta.',
    retrato: {
      cara: 'cuadrada', piel: 'trigue', pelo: 'castanoClaro', corte: 'corto',
      barba: 'sombra', ojos: 'entrecerrado', ceja: 'neutra', boca: 'seria',
      prenda: 'campera', tela: '#4a6b3d', accesorio: 'gorra', accesorioColor: '#2f4a28'
    }
  },
  piquetero: {
    nombre: 'El Referente Social',
    color: '#8f5a2f',
    bajada: 'Trae bombos y un petitorio de once puntos.',
    retrato: {
      cara: 'redonda', piel: 'morena', pelo: 'negro', corte: 'cola',
      barba: 'candado', ojos: 'normal', ceja: 'neutra', boca: 'seria',
      prenda: 'buzo', tela: '#8a5a2e'
    }
  },
  jueza: {
    nombre: 'La Jueza Federal',
    color: '#4a4a3a',
    bajada: 'Habla despacio. Todo lo que decís queda registrado.',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'negro', corte: 'media',
      ojos: 'entrecerrado', ceja: 'alta', boca: 'seria',
      prenda: 'toga', tela: '#1d1e23', accesorio: 'anteojos', accesorioColor: '#2a2620'
    }
  },
  organismo: {
    nombre: 'El Enviado del Organismo',
    color: '#2f5f5f',
    bajada: 'Llegó en el vuelo de la mañana con una planilla.',
    retrato: {
      cara: 'angosta', piel: 'palida', pelo: 'rubio', corte: 'raya',
      ojos: 'normal', ceja: 'neutra', boca: 'seria',
      prenda: 'traje', tela: '#4e5763', accesorio: 'anteojos', accesorioColor: '#8a8f99'
    }
  },
  barra: {
    nombre: 'El de la Popular',
    color: '#6f2f4f',
    bajada: 'Vino a hablar de "trabajo para los pibes".',
    retrato: {
      cara: 'cuadrada', piel: 'trigue', pelo: 'negro', corte: 'calvo',
      barba: 'candado', ojos: 'entrecerrado', ceja: 'enojada', boca: 'seria',
      prenda: 'chomba', tela: '#6e2f47'
    }
  },
  cura: {
    nombre: 'El Cura Villero',
    color: '#5f5f3f',
    bajada: 'No pide para él. Eso lo hace más difícil.',
    retrato: {
      cara: 'redonda', piel: 'media', pelo: 'canoso', corte: 'entradas',
      barba: 'sombra', ojos: 'normal', ceja: 'cansada', boca: 'sonrisa',
      prenda: 'sotana', tela: '#25262b'
    }
  },
  puntero: {
    nombre: 'El Puntero',
    color: '#7f4f2f',
    bajada: 'Sabe cuántos votos hay en cada manzana. Literalmente.',
    retrato: {
      cara: 'redonda', piel: 'trigue', pelo: 'negro', corte: 'corto',
      barba: 'chivo', ojos: 'normal', ceja: 'neutra', boca: 'sonrisa',
      prenda: 'chomba', tela: '#7a4a2a', accesorio: 'gorra', accesorioColor: '#3f2a18'
    }
  },
  empresario: {
    nombre: 'El Empresario Amigo',
    color: '#3f5f7f',
    bajada: 'Te llama "presidente" con demasiado cariño.',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'canoso', corte: 'raya',
      ojos: 'normal', ceja: 'alta', boca: 'sonrisa',
      prenda: 'traje', tela: '#2b3a4a'
    }
  },
  cientifico: {
    nombre: 'La Científica',
    color: '#2f7f6f',
    bajada: 'Pide presupuesto con datos. Pobre.',
    retrato: {
      cara: 'ovalada', piel: 'media', pelo: 'castano', corte: 'recogido',
      ojos: 'normal', ceja: 'neutra', boca: 'neutra',
      prenda: 'guardapolvo', tela: '#f3f1ea', accesorio: 'anteojos', accesorioColor: '#2a2620'
    }
  },
  pibe: {
    nombre: 'El Pibe del Barrio',
    color: '#6f7f2f',
    bajada: 'Tiene dieciséis y una pregunta incómoda.',
    retrato: {
      cara: 'redonda', piel: 'trigue', pelo: 'negro', corte: 'rulos',
      ojos: 'grande', ceja: 'neutra', boca: 'neutra',
      prenda: 'remera', tela: '#6a7a2e'
    }
  },
  militar: {
    nombre: 'El Jefe del Estado Mayor',
    color: '#4f4f2f',
    bajada: 'Vino a pedir por el presupuesto. Solo por eso.',
    retrato: {
      cara: 'cuadrada', piel: 'media', pelo: 'canoso', corte: 'corto',
      ojos: 'entrecerrado', ceja: 'enojada', boca: 'seria',
      prenda: 'uniforme', tela: '#4c4f36'
    }
  },
  gremio_docente: {
    nombre: 'La Maestra',
    color: '#7f3f5f',
    bajada: 'Trae la lista de escuelas sin gas.',
    retrato: {
      cara: 'ovalada', piel: 'media', pelo: 'castano', corte: 'media',
      ojos: 'normal', ceja: 'cansada', boca: 'neutra',
      prenda: 'guardapolvo', tela: '#f3f1ea'
    }
  },
  tuitero: {
    nombre: 'El Trending Topic',
    color: '#5f3f7f',
    bajada: 'Es un fenómeno de dos días. Hoy es el día uno.',
    retrato: {
      cara: 'angosta', piel: 'clara', pelo: 'rojizo', corte: 'jopo',
      ojos: 'grande', ceja: 'alta', boca: 'abierta',
      prenda: 'remera', tela: '#5a3a78'
    }
  },
  taxista: {
    nombre: 'El Tachero',
    color: '#7f6f2f',
    bajada: 'Tiene la solución. Siempre tuvo la solución.',
    retrato: {
      cara: 'cuadrada', piel: 'media', pelo: 'canoso', corte: 'entradas',
      barba: 'bigote', ojos: 'entrecerrado', ceja: 'neutra', boca: 'abierta',
      prenda: 'camisa', tela: '#8a7a3a'
    }
  },
  primera_dama: {
    nombre: 'Tu Pareja',
    color: '#8f4f6f',
    bajada: 'Te conoce desde antes de todo esto.',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'castanoClaro', corte: 'largo',
      ojos: 'normal', ceja: 'cansada', boca: 'neutra',
      prenda: 'camisa', tela: '#8a4a68', accesorio: 'aros'
    }
  },
  interna: {
    nombre: 'Tu Vice',
    color: '#5f2f2f',
    bajada: 'Sonríe en las fotos. Cuenta los votos en privado.',
    retrato: {
      cara: 'ovalada', piel: 'clara', pelo: 'negro', corte: 'media',
      ojos: 'entrecerrado', ceja: 'alta', boca: 'sonrisa',
      prenda: 'traje', tela: '#3a2b2b'
    }
  },
  intendente: {
    nombre: 'El Intendente',
    color: '#3f6f5f',
    bajada: 'Gobierna un conurbano más grande que varios países.',
    retrato: {
      cara: 'redonda', piel: 'trigue', pelo: 'castano', corte: 'entradas',
      barba: 'sombra', ojos: 'normal', ceja: 'neutra', boca: 'sonrisa',
      prenda: 'campera', tela: '#356355'
    }
  },
  hincha: {
    nombre: 'El Hincha',
    color: '#4f7f9f',
    bajada: 'Para él, el país empieza y termina en la selección.',
    retrato: {
      cara: 'redonda', piel: 'media', pelo: 'castano', corte: 'corto',
      ojos: 'grande', ceja: 'alta', boca: 'abierta',
      prenda: 'camiseta', tela: '#74acdf', accesorio: 'vincha', accesorioColor: '#74acdf'
    }
  },
  chanta: {
    nombre: 'El Asesor',
    color: '#4f4f5f',
    bajada: 'Nadie sabe bien quién lo nombró ni qué hace.',
    retrato: {
      cara: 'angosta', piel: 'media', pelo: 'negro', corte: 'corto',
      barba: 'chivo', ojos: 'entrecerrado', ceja: 'neutra', boca: 'mueca',
      prenda: 'traje', tela: '#42444f', accesorio: 'anteojos_oscuros', accesorioColor: '#1b1c20'
    }
  },
  abuela: {
    nombre: 'Tu Vieja',
    color: '#8f6f4f',
    bajada: 'Te llama al celular oficial. Atendés siempre.',
    retrato: {
      cara: 'redonda', piel: 'palida', pelo: 'blanco', corte: 'recogido',
      ojos: 'cansado', ceja: 'cansada', boca: 'sonrisa',
      prenda: 'sweater', tela: '#9a7a58', accesorio: 'anteojos_redondos', accesorioColor: '#5a4a38'
    }
  }
};

export function personaje(id) {
  return PERSONAJES[id] || { nombre: 'Anónimo', color: '#555555', bajada: '', retrato: {} };
}
