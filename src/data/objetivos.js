// OBJETIVOS DE MANDATO — le dan a la partida algo que perseguir además de
// no morirse. Se sortean dos por mandato: uno de plazo corto y uno largo.
//
// Forma:
//   vence   — mes en el que se evalúa
//   logro   — se cumple si esto da true al vencer
//   falla   — (opcional) lo da por perdido apenas esto da true, sin esperar
//   premio  — deltas al cumplirlo; decretoExtra da una elección de decreto
//   castigo — (opcional) deltas si se pierde. La mayoría no castiga: no
//             cobrar el premio ya es el costo.

const sinFlag = (...flags) => (e) => flags.every((f) => !e.flags.has(f));

export const OBJETIVOS = [
  // ---------- plazo corto ----------
  {
    id: 'primer_ano',
    plazo: 'corto',
    titulo: 'Llegar a fin de año',
    desc: 'Terminá el primer año con el Pueblo arriba de 45. Nadie te va a felicitar, pero vas a seguir siendo presidente.',
    vence: 12,
    logro: (e) => e.stats.pueblo >= 45,
    premio: { rosca: 6, caja: 4 }
  },
  {
    id: 'dolar_quieto',
    plazo: 'corto',
    titulo: 'Que no se escape',
    desc: 'Mes 18 con la inflación por debajo de 45 y la Caja arriba de 40. El famoso "veranito".',
    vence: 18,
    logro: (e) => e.inflacion < 45 && e.stats.caja > 40,
    premio: { campo: 8, pueblo: 4 }
  },
  {
    id: 'gobernabilidad',
    plazo: 'corto',
    titulo: 'Tener los votos',
    desc: 'Llegá al mes 20 con el Círculo Rojo arriba de 55. Sin gobernadores no se aprueba nada.',
    vence: 20,
    logro: (e) => e.stats.rosca >= 55,
    premio: { decretoExtra: true }
  },
  {
    id: 'no_soltar_calle',
    plazo: 'corto',
    titulo: 'No soltar la calle',
    desc: 'Mes 16 con el Pueblo arriba de 55, y sin que baje de 22 en el camino.',
    vence: 16,
    logro: (e) => e.stats.pueblo >= 55,
    falla: (e) => e.stats.pueblo <= 22,
    premio: { pueblo: 6, rosca: 5 }
  },
  {
    id: 'jubilados',
    plazo: 'corto',
    titulo: 'Cumplirle a los viejos',
    desc: 'Llegá al mes 22 sin quedar como incumplidor. Lo que se promete en campaña se cobra en el padrón.',
    vence: 22,
    logro: sinFlag('incumplidor'),
    premio: { pueblo: 9 },
    castigo: { pueblo: -5 }
  },
  {
    id: 'sembrar',
    plazo: 'corto',
    titulo: 'Que siembren',
    desc: 'Mes 20 con el Campo arriba de 58. Sin cosecha no hay dólares, y sin dólares no hay nada.',
    vence: 20,
    logro: (e) => e.stats.campo >= 58,
    premio: { caja: 10 }
  },

  // ---------- plazo largo ----------
  {
    id: 'manos_limpias',
    plazo: 'largo',
    titulo: 'Manos limpias',
    desc: 'Terminá el mandato sin causas abiertas ni encubrimientos. Más raro de lo que parece.',
    vence: 45,
    logro: sinFlag('causa_abierta', 'encubrimiento'),
    premio: { pueblo: 10, rosca: 6 },
    castigo: { rosca: -6 }
  },
  {
    id: 'domar_bestia',
    plazo: 'largo',
    titulo: 'Domar la bestia',
    desc: 'Mes 36 con la inflación abajo de 35. El logro que ningún gobierno pudo colgarse.',
    vence: 36,
    logro: (e) => e.inflacion < 35,
    premio: { pueblo: 12, campo: 6, decretoExtra: true }
  },
  {
    id: 'tu_ley',
    plazo: 'largo',
    titulo: 'Tu ley',
    desc: 'Conseguí aprobar tu ley estrella antes del mes 34. Sin ley no hay legado, hay gestión.',
    vence: 34,
    logro: (e) => e.flags.has('ley_aprobada'),
    premio: { rosca: 8, pueblo: 6 }
  },
  {
    id: 'sin_tutela',
    plazo: 'largo',
    titulo: 'Sin tutela',
    desc: 'Llegá al mes 40 sin firmar con el organismo. Se puede. Cuesta.',
    vence: 40,
    logro: sinFlag('acuerdo_firmado'),
    premio: { pueblo: 12, rosca: 5 }
  },
  {
    id: 'paz_social',
    plazo: 'largo',
    titulo: 'Sin desbordes',
    desc: 'Terminá el mandato sin estado de sitio, sin corralito y sin que la calle se desborde.',
    vence: 44,
    logro: sinFlag('estado_de_sitio', 'corralito', 'desborde'),
    premio: { pueblo: 10, rosca: 8 }
  },
  {
    id: 'malabarista',
    plazo: 'largo',
    titulo: 'El malabarista',
    desc: 'Mes 38 con las cuatro facciones entre 35 y 70. Nadie del todo contento, nadie del todo en contra.',
    vence: 38,
    logro: (e) => Object.values(e.stats).every((v) => v >= 35 && v <= 70),
    premio: { decretoExtra: true, caja: 8 }
  },
  {
    id: 'apostar_futuro',
    plazo: 'largo',
    titulo: 'Apostar al futuro',
    desc: 'Bancá a la ciencia antes del mes 32. No da votos ahora. Da otra cosa.',
    vence: 32,
    logro: (e) => e.flags.has('ciencia_bancada'),
    premio: { campo: 8, caja: 8 }
  },
  {
    id: 'caja_fuerte',
    plazo: 'largo',
    titulo: 'Dejar la casa ordenada',
    desc: 'Mes 42 con la Caja arriba de 55. Que el que venga no herede un incendio.',
    vence: 42,
    logro: (e) => e.stats.caja >= 55,
    premio: { campo: 10, rosca: 6 }
  }
];
