import { CARTAS_BASE } from './base.js';
import { CARTAS_ECONOMIA } from './economia.js';
import { CARTAS_CALLE } from './calle.js';
import { CARTAS_ROSCA } from './rosca.js';
import { CARTAS_FOLKLORE } from './folklore.js';
import { CARTAS_CRISIS } from './crisis.js';
import { CARTAS_EVENTOS } from './eventos.js';

export const PAQUETES = {
  base: CARTAS_BASE,
  economia: CARTAS_ECONOMIA,
  calle: CARTAS_CALLE,
  rosca: CARTAS_ROSCA,
  folklore: CARTAS_FOLKLORE,
  crisis: CARTAS_CRISIS,
  eventos: CARTAS_EVENTOS
};

export const TODAS_LAS_CARTAS = Object.entries(PAQUETES).flatMap(([paquete, cartas]) =>
  cartas.map((c) => ({ ...c, paquete }))
);
