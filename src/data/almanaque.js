// AGENDA — lo que pasa sí o sí, todos los años, en su mes.
//
// Cada entrada es un golpe fijo del almanaque político. Cuando el mandato entra
// en ese mes, el motor pone una de sus cartas por delante de todo lo demás
// (lo mismo que hace la asunción en el mes 1, generalizado).
//
// `cartas` es un pozo de variantes: se elige la primera que no salió todavía en
// la partida, en el orden en que están escritas, así el año 1 abre con la
// primera y el año 2 trae la segunda. Cuando se agotan, se sortea entre todas:
// la paritaria docente vuelve cada febrero, y está bien que vuelva.
//
// `anios` restringe la entrada a ciertos años de gestión. Sin `anios`, todos.
//
// Las cartas de la agenda son `soloEncadenada`: no salen nunca por sorteo.

export const AGENDA = [
  { mes: 'feb', cartas: ['clases_a', 'clases_b'] },
  // El primer 1° de marzo es el discurso inaugural ante la Asamblea. Los
  // siguientes marzos alternan entre la apertura de sesiones y el 24.
  { mes: 'mar', anios: [1], cartas: ['sesiones_a'] },
  { mes: 'mar', anios: [2, 3, 4], cartas: ['marzo_memoria', 'sesiones_b'] },
  { mes: 'abr', cartas: ['cosecha_a', 'cosecha_b'] },
  { mes: 'jun', cartas: ['aguinaldo', 'gas_invierno'] },
  { mes: 'sep', cartas: ['presupuesto_a', 'presupuesto_b'] }
];
