import { aplicar } from '../reescribir.mjs';
const d = (n) => new URL(`../../src/data/cartas/${n}.js`, import.meta.url).pathname;

// Cartas cuyo texto contaba una categoría de problema ("el tren anda mal") en vez
// de un hecho que pasó. Una categoría no es una escena: no tiene cuándo ni quién.
aplicar(d('calle'), {
  trenes: { texto: 'Ayer el tren quedó clavado dos horas arriba de un puente. La gente abrió las puertas y bajó a las vías.' },
  villa_urbanizacion: { texto: 'Se inundó otra vez la manzana ocho, la cuarta vez este año. El proyecto de cloacas está hecho hace seis años.' },
  sindicato_caja: { texto: 'La obra social suspendió las diálisis en cuatro centros. Son ciento diez afiliados que no pueden esperar.' },
  paro_general: { texto: 'El plenario votó el paro anoche por unanimidad. Si el lunes no hay respuesta, el martes no hay país.' },
  colectivo_boleto: { texto: 'Si el boleto sube lo que dicen, a mi vieja el viaje al laburo le come un día de sueldo por semana.' }
});

aplicar(d('economia'), {
  ministro_plan: { texto: 'Le traigo dos carpetas. La roja corrige todo en noventa días. La azul, en tres años. El total es idéntico.' },
  impuesto_riqueza: { texto: 'Ochocientas personas declaran más patrimonio que el presupuesto de tres provincias juntas. Tengo el proyecto.' },
  precios: { texto: 'Su lista de precios cuidados tiene ciento treinta productos. En la góndola quedan once, y son los feos.' }
});

aplicar(d('rosca'), {
  medios_pauta: { texto: 'Cuatro medios se llevaron el sesenta por ciento de la pauta oficial. Tres son del mismo dueño. Tengo la planilla.' }
});

aplicar(d('folklore'), {
  verano_costa: { texto: 'Faltan tres semanas para enero y los hoteles de la costa tienen un quinto de las reservas de siempre.' }
});

aplicar(d('base'), {
  barra_pibes: { texto: 'Venimos por los pibes del barrio: hay doce sin laburo desde que cerró el frigorífico. Después hablamos de micros.' }
});

aplicar(d('crisis'), {
  crisis_confianza: { texto: 'Hoy el bono a diez años cotizó a treinta centavos. Un inversor me preguntó si el plan sigue en pie y no supe.' }
});
