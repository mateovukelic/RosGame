// DECRETOS — los "relics" del roguelike. Se eligen cada 12 meses (1 de 3).
// Son permanentes durante la corrida y modifican cómo pega todo lo demás.
//
// efecto admite:
//   porMes:      { stat: delta }  aplicado cada mes
//   amortigua:   { stat: factor } multiplica los deltas NEGATIVOS (0.5 = mitad de daño)
//   potencia:    { stat: factor } multiplica los deltas POSITIVOS
//   porMesCondicional: { requiere: {...}, efectos: {...} }
// El decreto puede además traer `pone: ['flag']` (flags que activa al tomarse).

export const DECRETOS = [
  {
    id: 'precios_cuidados',
    nombre: 'Precios Vigilados',
    icono: '🏷️',
    desc: 'Una canasta con precio fijo y un ejército de inspectores.',
    detalle: 'La inflación sube más lento, pero el Campo te lo cobra todos los meses.',
    efecto: { porMes: { inflacion: -0.7, campo: -0.35 } }
  },
  {
    id: 'retenciones',
    nombre: 'Retenciones Móviles',
    icono: '🚜',
    desc: 'Cada barco que sale deja algo en la aduana.',
    detalle: 'Caja constante. El Campo no te lo perdona nunca.',
    efecto: { porMes: { caja: 0.8, campo: -0.5 }, potencia: { caja: 1.15 } }
  },
  {
    id: 'plan_social',
    nombre: 'Red de Contención',
    icono: '🤝',
    desc: 'Transferencias directas, comedores y tarjeta alimentaria.',
    detalle: 'El Pueblo aguanta cualquier cosa. La Caja se resiente.',
    efecto: { porMes: { pueblo: 0.55, caja: -0.5 }, amortigua: { pueblo: 0.7 } }
  },
  {
    id: 'cadena_nacional',
    nombre: 'Cadena Nacional',
    icono: '📺',
    desc: 'Todos los martes, a las nueve, hablás vos.',
    detalle: 'Los golpes de imagen duelen menos. Nadie te quiere más por eso.',
    efecto: { amortigua: { pueblo: 0.75, rosca: 0.85 } }
  },
  {
    id: 'superpoderes',
    nombre: 'Superpoderes',
    icono: '✍️',
    desc: 'Decretos de necesidad y urgencia para todo.',
    detalle: 'Podés mover la Caja a gusto sin pedir permiso. El Congreso toma nota.',
    efecto: { potencia: { caja: 1.3, campo: 1.15 }, porMes: { rosca: -0.4 } }
  },
  {
    id: 'pacto_gobernadores',
    nombre: 'Pacto de Gobernadores',
    icono: '🗺️',
    desc: 'Coparticipación a cambio de manos levantadas.',
    detalle: 'La Rosca te banca. Sale plata todos los meses.',
    efecto: { porMes: { rosca: 0.7, caja: -0.45 }, amortigua: { rosca: 0.6 } }
  },
  {
    id: 'cepo',
    nombre: 'Cepo Cambiario',
    icono: '🔒',
    desc: 'Nadie compra un dólar sin permiso.',
    detalle: 'Frena la sangría de reservas. La brecha hace el resto.',
    efecto: { porMes: { caja: 0.9, inflacion: 0.35 }, amortigua: { caja: 0.6 } }
  },
  {
    id: 'ancla_cambiaria',
    nombre: 'Ancla Cambiaria',
    icono: '⚓',
    desc: 'El dólar quieto, pase lo que pase.',
    detalle: 'La inflación baja sola. Las reservas se van todos los meses.',
    efecto: { porMes: { inflacion: -1.1, caja: -0.75 } }
  },
  {
    id: 'obra_publica',
    nombre: 'Obra Pública',
    icono: '🏗️',
    desc: 'Cintas cortadas de Ushuaia a La Quiaca.',
    detalle: 'Pueblo y Rosca contentos. La Caja sangra y la inflación se entusiasma.',
    efecto: { porMes: { pueblo: 0.45, rosca: 0.45, caja: -0.8, inflacion: 0.25 } }
  },
  {
    id: 'motosierra',
    nombre: 'Motosierra',
    icono: '🪚',
    desc: 'Se cierran organismos, se recorta todo lo recortable.',
    detalle: 'La Caja se recompone rápido. El Pueblo lo siente en el cuerpo.',
    efecto: { porMes: { caja: 1.2, pueblo: -0.7, inflacion: -0.3 }, potencia: { campo: 1.2 } }
  },
  {
    id: 'yuyo',
    nombre: 'Viento de Cola',
    icono: '🌎',
    desc: 'La soja se disparó afuera y no fue mérito tuyo.',
    detalle: 'Entra plata sola mientras el Campo esté de buen humor.',
    efecto: {
      porMesCondicional: { requiere: { stats: { campo: { min: 45 } } }, efectos: { caja: 1.4 } },
      potencia: { campo: 1.1 }
    }
  },
  {
    id: 'aguante',
    nombre: 'Aparato Territorial',
    icono: '🏟️',
    desc: 'Punteros, unidades básicas y micros que siempre están llenos.',
    detalle: 'Podés movilizar cuando querés. La Rosca sabe que le debés el aparato.',
    efecto: { potencia: { pueblo: 1.35 }, porMes: { rosca: -0.25 } }
  },
  {
    id: 'blindaje',
    nombre: 'Blindaje Financiero',
    icono: '🛡️',
    desc: 'Un organismo multilateral te pone un piso. Con letra chica.',
    detalle: 'Caja de arranque garantizada, auditoría permanente.',
    pone: ['auditado'],
    efecto: { porMes: { caja: 1.1, pueblo: -0.45 }, amortigua: { caja: 0.5 } }
  },
  {
    id: 'ministro_estrella',
    nombre: 'Ministro Estrella',
    icono: '⭐',
    desc: 'Habla lindo, tranquiliza mercados y sale en todos lados.',
    detalle: 'Todo lo bueno rinde más. Si se va, se lleva la confianza.',
    pone: ['ministro_estrella'],
    efecto: { potencia: { pueblo: 1.15, rosca: 1.15, campo: 1.15, caja: 1.15 } }
  },
  {
    id: 'tarifazo',
    nombre: 'Sinceramiento Tarifario',
    icono: '💡',
    desc: 'Se acabaron los subsidios a la energía.',
    detalle: 'La Caja respira. La factura de luz llega a todas las casas.',
    efecto: { porMes: { caja: 1.3, pueblo: -0.85, inflacion: 0.4 } }
  },
  {
    id: 'feriado',
    nombre: 'Feriados Puente',
    icono: '🏖️',
    desc: 'Cuatro fines de semana largos más por año.',
    detalle: 'Barato, efectivo y todo el mundo sabe que es para eso.',
    efecto: { porMes: { pueblo: 0.5, campo: -0.2 } }
  }
];

export function decretoPorId(id) {
  return DECRETOS.find((d) => d.id === id);
}
