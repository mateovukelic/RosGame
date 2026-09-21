// PERSONAJES — arquetipos, no personas reales. Cualquier parecido es culpa del país.
//
// `retrato` es la receta de la ilustración: las partes (forma de cara, corte,
// barba, ojos, cejas, boca, prenda, accesorio) se combinan en src/ui/retratos.js.
// `color` tiñe el fondo del retrato y el marco de la carta.
// `voz` es la regla de escritura del personaje: cómo habla, qué palabras usa y
// cuáles no. No la lee el juego — la leen las personas que escriban la próxima
// carta, para que el Ministro no termine hablando como la Vecina.

export const PERSONAJES = {
  ministro: {
    nombre: 'El Ministro de Economía',
    color: '#2f6f8f',
    bajada: 'Habla de "sendero" y de "trimestres".',
    voz:
      'Eufemismo y registro técnico. Nunca dice "devaluar" ni "ajuste": dice "corrección", "sendero", "sincerar".',
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
    voz:
      'Frases cortas. La amenaza siempre queda implícita, y siempre habla en plural: nosotros, el gremio, los compañeros.',
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
    voz:
      'Transaccional. No pide: informa. Trae números concretos y sabe cuántos votos vale cada uno de ellos.',
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
    voz:
      'Precios concretos y segunda persona. Acusa sin levantar la voz. No habla de política: habla de la carnicería.',
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
    voz:
      'La pregunta ya es el título de mañana. No le interesa la respuesta, le interesa cómo queda la respuesta.',
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
    voz:
      'Directo y sin adornos. Habla de hectáreas, camiones y fechas de siembra. Lo que dice es una cuenta ya hecha.',
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
    voz:
      'Enumera. Trae puntos, no pedidos. Avisa en lugar de amenazar, que resulta bastante más incómodo.',
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
    voz:
      'Habla despacio. Todo lo que dice suena a que ya quedó anotado en algún expediente.',
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
    voz:
      'Cortés y letal. Plural institucional y la palabra "meta". Nunca aclara qué pasa si no se cumple.',
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
    voz:
      'Empieza por lo noble —los pibes, el barrio— y termina en las entradas. El orden nunca es casual.',
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
    voz:
      'Describe, no pide. Cuenta lo que ve y después se calla. El silencio es su forma de insistir.',
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
    voz:
      'Cuenta gente por manzana. Habla en primera persona de cosas del Estado: mi gente, mis micros.',
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
    voz:
      'Suave, generoso con los halagos y preciso con los favores. Nunca dice cuánto vale lo que está pidiendo.',
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
    voz:
      'Trae datos y presupuestos exactos. Pide poco y lo pide mal, porque nunca aprendió a pedir.',
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
    voz:
      'Directo y sin armadura. Pregunta lo que nadie del gabinete se anima a preguntar en voz alta.',
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
    voz:
      'Formal y seco, "señor presidente". Cuando dice que algo excede sus capacidades, está pidiendo algo.',
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
    voz:
      'Trae listas: escuelas, chicos, grados. Los números son chicos y justamente por eso duelen.',
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
    voz:
      'Habla en métricas. Todo lo mide en horas de tendencia y nada le importa más de dos días.',
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
    voz:
      'Tiene la solución completa y la tuvo siempre. Habla mientras maneja y no espera respuesta.',
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
    voz:
      'No habla de gestión: habla de la casa y de las horas. Avisa, nunca reclama.',
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
    voz:
      'Cordial en público, contable en privado. Cuenta votos mientras sonríe para la foto.',
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
    voz:
      'Habla del territorio como quien habla del clima. Sabe cosas que en Buenos Aires no se saben.',
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
    voz:
      'Para él el país es la selección. Lo dice sin una gota de ironía y eso lo hace difícil de contestar.',
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
    voz:
      'Entusiasmo sin sustancia. Propone locuras con una seguridad que asusta, y de vez en cuando acierta.',
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
    voz:
      'No habla de política: habla de vos. Empieza preguntando si comiste y termina diciendo la verdad.',
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
