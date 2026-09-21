// Finales. El orden importa: se evalúa por prioridad descendente.
// tipo: 'caida' (perdiste), 'gloria' (sobreviviste), 'rareza' (final secreto)

export const FINALES = [
  // ---------- Finales secretos / de cadena (máxima prioridad) ----------
  {
    id: 'helicoptero',
    tipo: 'caida',
    prioridad: 100,
    titulo: 'El helicóptero',
    epigrafe: 'Terraza de la Rosada, 19:40.',
    texto:
      'Las cacerolas se escuchan desde el aire. Alguien te alcanza un portafolios con papeles que ya no valen nada. El piloto no te mira. Abajo, la plaza canta que se vayan todos, y "todos" sos vos.',
    condicion: (e) => e.flags.has('estado_de_sitio') && e.stats.pueblo <= 8
  },
  {
    id: 'timbero',
    tipo: 'rareza',
    prioridad: 95,
    titulo: 'El timbero',
    epigrafe: 'Se jugó todo al 7 de la quiniela.',
    texto:
      'Apostaste las reservas a un pleno y salió. Durante seis semanas fuiste un genio. El economista que te lo desaconsejó escribió un libro. El libro vendió más que tu plan.',
    condicion: (e) => e.flags.has('aposto_reservas') && e.stats.caja >= 92
  },
  {
    id: 'mundial',
    tipo: 'rareza',
    prioridad: 94,
    titulo: 'Campeones',
    epigrafe: 'Todo lo demás pasó a segundo plano.',
    texto:
      'La copa tapó la inflación, el déficit y tres escándalos. Saliste al balcón con la camiseta puesta y nadie recordó por qué estaban enojados. Duró cuarenta días. Fueron los mejores cuarenta días.',
    condicion: (e) => e.flags.has('copa_ganada') && e.stats.pueblo >= 85
  },
  {
    id: 'hiper',
    tipo: 'caida',
    prioridad: 90,
    titulo: 'Hiperinflación',
    epigrafe: 'Los precios se remarcan dos veces por día.',
    texto:
      'Los supermercados cerraron para reetiquetar y no volvieron a abrir. La moneda dejó de ser plata y pasó a ser papel. Adelantaste las elecciones por cadena nacional, con la voz temblando, y entregaste el bastón seis meses antes de tiempo.',
    condicion: (e) => e.inflacion >= 100
  },

  // ---------- Caídas por stat en 0 ----------
  {
    id: 'pueblo_cero',
    tipo: 'caida',
    prioridad: 50,
    titulo: 'Que se vayan todos',
    epigrafe: 'Pueblo: 0',
    texto:
      'Primero fue una olla en una esquina. Después fueron cien mil. No hubo un líder al que llamar para negociar porque no había líder: había bronca. Renunciaste por fax, que es la forma más humillante de renunciar.',
    condicion: (e) => e.stats.pueblo <= 0
  },
  {
    id: 'rosca_cero',
    tipo: 'caida',
    prioridad: 50,
    titulo: 'Juicio político',
    epigrafe: 'Rosca: 0',
    texto:
      'Te quedaste sin gobernadores, sin bloque propio y sin nadie que te atienda el teléfono un domingo. La sesión duró once horas. Los votos ya estaban contados antes de que empezara.',
    condicion: (e) => e.stats.rosca <= 0
  },
  {
    id: 'campo_cero',
    tipo: 'caida',
    prioridad: 50,
    titulo: 'Lockout',
    epigrafe: 'Campo: 0',
    texto:
      'Las rutas quedaron cortadas por camiones parados y el país descubrió, otra vez, que come porque alguien siembra. A la tercera semana sin carne en las góndolas, la Rosca decidió que era más barato perderte a vos que perder la cosecha.',
    condicion: (e) => e.stats.campo <= 0
  },
  {
    id: 'caja_cero',
    tipo: 'caida',
    prioridad: 50,
    titulo: 'Default',
    epigrafe: 'Caja: 0',
    texto:
      'No entraron los dólares, no salió el desembolso y el vencimiento no se corrió. Lo anunciaste como "una decisión soberana". Los diarios del mundo lo anunciaron con otra palabra, más corta y en inglés.',
    condicion: (e) => e.stats.caja <= 0 && e.inflacion < 100
  },

  // ---------- Caídas por stat en 100 (el exceso también mata) ----------
  {
    id: 'pueblo_lleno',
    tipo: 'caida',
    prioridad: 45,
    titulo: 'El conductor eterno',
    epigrafe: 'Pueblo: 100',
    texto:
      'Te querían tanto que empezaron a pedir que te quedes para siempre. Salieron pintadas con tu cara. La Rosca leyó la pared, entendió que ya no te necesitaba a vos sino a tu mito, y consiguió el mito mucho más barato sin vos adentro.',
    condicion: (e) => e.stats.pueblo >= 100
  },
  {
    id: 'rosca_llena',
    tipo: 'caida',
    prioridad: 45,
    titulo: 'El sello de goma',
    epigrafe: 'Rosca: 100',
    texto:
      'Les diste todo: cajas, cargos, obras, listas. Un martes pediste un café y te trajeron un decreto ya firmado por vos. Seguís en el cargo. Hace meses que no gobernás.',
    condicion: (e) => e.stats.rosca >= 100
  },
  {
    id: 'campo_lleno',
    tipo: 'caida',
    prioridad: 45,
    titulo: 'La patria contratista',
    epigrafe: 'Campo: 100',
    texto:
      'Bajaste todo lo que había para bajar y el puerto funcionó como un reloj suizo. El problema es que el reloj era de ellos. Cuando quisiste cambiar una coma, descubriste que el gobierno tenía dueño y no eras vos.',
    condicion: (e) => e.stats.campo >= 100
  },
  {
    id: 'caja_llena',
    tipo: 'caida',
    prioridad: 45,
    titulo: 'La plata no se come',
    epigrafe: 'Caja: 100',
    texto:
      'Juntaste una montaña de reservas récord mientras los hospitales pedían gasas por radio. "Estamos ordenando la casa", dijiste. La casa quedó impecable y vacía: no quedaba nadie adentro dispuesto a defenderte.',
    condicion: (e) => e.stats.caja >= 100
  },

  // ---------- Glorias ----------
  {
    id: 'leyenda',
    tipo: 'gloria',
    prioridad: 40,
    titulo: 'Prócer',
    epigrafe: 'Tres mandatos completos.',
    texto:
      'Entregaste el bastón caminando, por la puerta de adelante, con la economía andando y sin causas abiertas. Te van a poner en un billete. Con suerte, en uno que todavía sirva para algo.',
    condicion: (e) => e.mandato > 3 && e.mes === 1
  },
  {
    id: 'reeleccion',
    tipo: 'gloria',
    prioridad: 35,
    titulo: 'Reelección',
    epigrafe: 'Cuatro años completos.',
    texto:
      'Llegaste al final del mandato y ganaste otra vez. La mitad del país te odia con energía y la otra mitad te banca por cansancio. En este país, eso es un triunfo histórico.',
    condicion: (e) => e.mandato > 1 && e.mes === 1
  }
];

export function finalPorId(id) {
  return FINALES.find((f) => f.id === id);
}
