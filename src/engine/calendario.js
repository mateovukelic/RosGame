// Calendario real del mandato. El mes 1 es diciembre: se asume el 10 de
// diciembre, así que cada año de gestión va de diciembre a noviembre y las
// fechas de la política argentina caen solas en el tablero (el 1° de marzo es
// el mes 4, el medio término el 23, la presidencial el 47).

export const MESES = ['dic', 'ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov'];

export const NOMBRES_MES = {
  dic: 'Diciembre',
  ene: 'Enero',
  feb: 'Febrero',
  mar: 'Marzo',
  abr: 'Abril',
  may: 'Mayo',
  jun: 'Junio',
  jul: 'Julio',
  ago: 'Agosto',
  sep: 'Septiembre',
  oct: 'Octubre',
  nov: 'Noviembre'
};

/** Mes del mandato (1..48) → { clave: 'jun', nombre: 'Junio', anio: 1 } */
export function calendario(mes) {
  const indice = (((mes - 1) % 12) + 12) % 12;
  const clave = MESES[indice];
  return { clave, nombre: NOMBRES_MES[clave], anio: Math.floor((mes - 1) / 12) + 1 };
}

/** "Junio · Año 1" — para el HUD. */
export function fecha(mes) {
  const { nombre, anio } = calendario(mes);
  return `${nombre} · Año ${anio}`;
}

/** "junio del año 2" — para meter en una frase. */
export function fechaEnFrase(mes) {
  const { nombre, anio } = calendario(mes);
  return `${nombre.toLowerCase()} del año ${anio}`;
}

/** "jun · año 2" — para las fichas de objetivos, donde el ancho es poco. */
export function fechaCorta(mes) {
  const { clave, anio } = calendario(mes);
  return `${clave} · año ${anio}`;
}

/** Clave única de un año de gestión dentro de una partida: "1-3" = mandato 1, año 3. */
export function claveAnio(estado) {
  return `${estado.mandato}-${calendario(estado.mes).anio}`;
}
