// Orquestador de la interfaz. Todo lo que pasa acá es presentación:
// las reglas viven en src/engine/.
import { Juego } from './engine/juego.js';
import { Legado } from './engine/legado.js';
import { FASES, BALANCE } from './engine/constantes.js';
import { semillaAlAzar } from './engine/rng.js';
import { personaje } from './data/personajes.js';
import { ESTADO_OBJETIVO } from './engine/objetivos.js';
import { retratoSvg } from './ui/retratos.js';
import { FINALES } from './data/finales.js';
import { $, crear, mostrarPantalla } from './ui/dom.js';
import { Hud, pintarInflacion } from './ui/hud.js';
import { CartaArrastrable } from './ui/carta.js';

const legado = new Legado();
let juego = null;
let gabineteElegido = 'tecnico';
let hud = null;
let carta = null;

// ---------------------------------------------------------------- MENÚ
function pintarMenu() {
  const lista = $('#lista-gabinetes');
  lista.replaceChildren();

  const gabinetes = legado.gabinetes();
  if (!gabinetes.find((g) => g.id === gabineteElegido)?.disponible) {
    gabineteElegido = gabinetes.find((g) => g.disponible).id;
  }

  for (const g of gabinetes) {
    const stats = crear('div', { clase: 'gabinete-stats' }, [
      crear('span', { texto: `✊ ${g.stats.pueblo}` }),
      crear('span', { texto: `🎩 ${g.stats.rosca}` }),
      crear('span', { texto: `🌾 ${g.stats.campo}` }),
      crear('span', { texto: `💵 ${g.stats.caja}` }),
      crear('span', { texto: `🔥 ${g.inflacion}` })
    ]);

    // Un gabinete bloqueado no necesita una tarjeta entera: le alcanza una línea
    // que diga qué es lo que falta. Así el botón de empezar entra sin scrollear.
    const cuerpo = g.disponible
      ? crear('div', {}, [
          crear('div', { clase: 'gabinete-nombre', texto: g.nombre }),
          crear('div', { clase: 'gabinete-desc', texto: g.desc }),
          crear('div', { clase: 'gabinete-detalle', texto: g.detalle }),
          stats
        ])
      : crear('div', {}, [crear('div', { clase: 'gabinete-pista', texto: g.pista || 'Bloqueado' })]);

    const boton = crear(
      'button',
      {
        clase: `gabinete${g.disponible ? '' : ' bloqueado'}${g.id === gabineteElegido ? ' elegido' : ''}`,
        type: 'button',
        disabled: g.disponible ? null : 'disabled',
        onclick: () => {
          gabineteElegido = g.id;
          pintarMenu();
        }
      },
      [crear('div', { clase: 'gabinete-icono', texto: g.disponible ? g.icono : '🔒' }), cuerpo]
    );
    lista.append(boton);
  }

  // El instructivo es para el que abre el juego por primera vez. Al que ya jugó
  // un mandato le estorba, así que desaparece solo.
  $('#comojuega').hidden = legado.datos.mandatosJugados > 0;

  const p = legado.progreso();
  $('#progreso').replaceChildren(
    ...[
      ['Mandatos', p.mandatos],
      ['Mejor racha', `${p.mejorMes} meses`],
      ['Finales', p.finales],
      ['Victorias', p.victorias]
    ].map(([nombre, valor]) =>
      crear('div', { clase: 'progreso-item' }, [
        crear('b', { texto: String(valor) }),
        crear('span', { texto: nombre })
      ])
    )
  );

  $('#lista-finales').replaceChildren(
    ...legado.archivoFinales(FINALES).map((f) =>
      crear('div', { clase: `final-item${f.visto ? ' visto' : ''}` }, [
        crear('strong', { texto: f.titulo }),
        crear('span', { texto: f.epigrafe })
      ])
    )
  );
}

// ---------------------------------------------------------------- PRÓLOGO
const MARCA = { cumplido: '✓', fallido: '✕', activo: '◦' };

function fichaObjetivo(objetivo, { conDesc = true } = {}) {
  return crear('div', { clase: `objetivo ${objetivo.resultado || 'activo'}` }, [
    crear('span', { clase: 'objetivo-marca', texto: MARCA[objetivo.resultado || 'activo'] }),
    crear('div', { clase: 'objetivo-cuerpo' }, [
      crear('div', { clase: 'objetivo-tit', texto: objetivo.titulo }),
      conDesc ? crear('div', { clase: 'objetivo-desc', texto: objetivo.desc }) : null
    ]),
    crear('span', { clase: 'objetivo-plazo', texto: `mes ${objetivo.vence}` })
  ]);
}

// Los mandatos siguientes no repiten el prólogo del gabinete: ya no sos el que
// asumió, sos el que sobrevivió.
const PROLOGOS_REELECCION = [
  {
    titulo: 'Otra vez',
    texto:
      'Ganaste. Por poco, con la mitad del país en contra y la otra mitad bancándote por cansancio, pero ganaste.\n\nEsta vez nadie te va a explicar cómo funciona: ya sabés. El problema es que ellos también saben cómo funcionás vos.'
  },
  {
    titulo: 'El tercero',
    texto:
      'Tres mandatos. A esta altura sos parte del paisaje: hay gente que votó por primera vez y no conoce otro presidente.\n\nEso que sentís no es poder. Es que ya no queda nadie para echarte la culpa.'
  }
];

function mostrarPrologo() {
  const g = juego.gabinete;
  const reeleccion = PROLOGOS_REELECCION[juego.estado.mandato - 2];

  $('#prologo-fecha').textContent = `Mandato ${juego.estado.mandato} · ${g.nombre}`;
  $('#prologo-titulo').textContent = reeleccion ? reeleccion.titulo : 'El primer día';
  $('#prologo-texto').textContent = reeleccion ? reeleccion.texto : g.prologo || '';
  $('#prologo-objetivos').replaceChildren(...juego.estado.objetivos.map((o) => fichaObjetivo(o)));
  mostrarPantalla('pantalla-prologo');
}

// ---------------------------------------------------------------- JUEGO
function empezar(semilla, gabinete) {
  juego = new Juego({ semilla, gabinete });
  if (!hud) hud = new Hud($('#hud'));
  if (!carta) {
    carta = new CartaArrastrable($('#carta'), {
      alElegir: (lado) => resolver(lado),
      alMover: (lado, fuerza) => previsualizar(lado, fuerza)
    });
  }
  mostrarPrologo();
}

function entrarALaCancha() {
  mostrarPantalla('pantalla-juego');
  pintarEstado();
  pintarCarta(juego.carta);
  carta.reponer();
}

function pintarEstado() {
  const valores = juego.statsVisibles();
  hud.pintar(valores);
  pintarInflacion(valores.inflacion);
  const { anio, mesDelAnio } = juego.anioMes();
  $('#calendario-texto').textContent =
    `Mandato ${juego.estado.mandato} · Año ${anio} · Mes ${mesDelAnio}`;
  $('#avance-relleno').style.width = `${(juego.estado.mes / BALANCE.mesesPorMandato) * 100}%`;
  pintarObjetivos();
}

function pintarObjetivos() {
  const activos = juego.objetivosActivos();
  $('#objetivos').replaceChildren(...activos.map((o) => fichaObjetivo(o)));
}

// Aviso breve cuando un objetivo se resuelve.
let relojAviso = null;
function mostrarAviso(objetivo) {
  const nodo = $('#aviso');
  const cumplido = objetivo.resultado === ESTADO_OBJETIVO.CUMPLIDO;
  nodo.textContent = `${cumplido ? '✓ Objetivo cumplido' : '✕ Objetivo perdido'} — ${objetivo.titulo}`;
  nodo.className = `aviso visible ${objetivo.resultado}`;
  clearTimeout(relojAviso);
  relojAviso = setTimeout(() => nodo.classList.remove('visible'), 2600);
}

function pintarCarta(c) {
  if (!c) return;
  const p = personaje(c.personaje);
  $('#carta-retrato').innerHTML = retratoSvg(p.retrato, { fondo: p.color, uid: c.personaje });
  $('#carta-retrato').setAttribute('aria-label', `Retrato de ${p.nombre}`);
  $('#carta').style.setProperty('--acento', p.color);
  $('#carta-personaje').textContent = p.nombre;
  $('#carta-bajada').textContent = p.bajada;
  $('#carta-texto').textContent = c.texto;
  $('#resp-izq').textContent = c.izq.texto;
  $('#resp-der').textContent = c.der.texto;
  $('#btn-izq-txt').textContent = c.izq.texto;
  $('#btn-der-txt').textContent = c.der.texto;
  // Las propuestas llevan el ✓ / ✗ para que la convención se aprenda sola.
  // Los dilemas no lo llevan: ahí no hay un "sí", hay dos caminos.
  const propuesta = c.forma === 'propuesta';
  $('#btn-izq-signo').textContent = propuesta ? '✗' : '';
  $('#btn-der-signo').textContent = propuesta ? '✓' : '';
  $('#carta').classList.toggle('es-propuesta', propuesta);
  $('#replica').classList.remove('visible');
}

// Muestra, mientras se arrastra (o se apunta un botón), a dónde iría cada barra.
// `fuerza` va de 0 a 1 según lo cerca que esté el arrastre del umbral: el
// fantasma se va haciendo más sólido a medida que la decisión se vuelve firme.
function previsualizar(lado, fuerza = 1) {
  if (!juego || juego.estado.fase !== FASES.CARTA) return;

  // Sólo la pista sin dirección: la interfaz no llega a saber el signo.
  const pistas = lado ? juego.pistaDeImpacto(lado) : [];
  hud.previsualizar(pistas, lado ? fuerza : 0);

  for (const [id, clave] of [['#pista-izq', 'izq'], ['#pista-der', 'der']]) {
    const nodo = $(id);
    if (lado !== clave) {
      nodo.classList.remove('visible');
      nodo.replaceChildren();
      continue;
    }
    nodo.replaceChildren(...hud.pistas(pistas).map((icono) => crear('span', { texto: icono })));
    nodo.classList.add('visible');
  }
}

// Cuánto dura la réplica en pantalla. Se calcula con el largo del texto en vez
// de usar un número fijo: las réplicas van de cuarenta a cien caracteres y con
// un tiempo único o se corta la larga o se hace eterna la corta.
function tiempoDeLectura(texto) {
  if (!texto) return 620;
  return Math.min(3600, Math.max(1500, 900 + texto.length * 28));
}

let saltarBeat = null;

function resolver(lado) {
  const resultado = juego.elegir(lado);
  pintarEstado();
  hud.limpiarPrevisualizacion();
  hud.golpear(resultado.deltas);
  previsualizar(null);

  if (resultado.replica) {
    const nodo = $('#replica');
    nodo.textContent = resultado.replica;
    nodo.classList.add('visible');
  }

  // Si se resolvió un objetivo, el aviso se lleva el turno: es información que
  // el jugador tiene que registrar antes de la carta siguiente.
  const novedad = resultado.objetivos?.[0];
  if (novedad) mostrarAviso(novedad);

  const espera = Math.max(tiempoDeLectura(resultado.replica), novedad ? 2200 : 0);

  const seguir = () => {
    if (!saltarBeat) return;
    saltarBeat();
    if (juego.estado.fase === FASES.FINAL) return mostrarFinal();
    if (juego.estado.fase === FASES.DECRETO) return mostrarDecretos();
    pintarCarta(juego.carta);
    carta.reponer();
  };

  const reloj = setTimeout(seguir, espera);
  // El que ya leyó no espera: cualquier toque o tecla adelanta la carta.
  const adelantar = () => seguir();
  saltarBeat = () => {
    clearTimeout(reloj);
    document.removeEventListener('pointerdown', adelantar);
    document.removeEventListener('keydown', adelantar);
    saltarBeat = null;
  };
  setTimeout(() => {
    if (!saltarBeat) return;
    document.addEventListener('pointerdown', adelantar);
    document.addEventListener('keydown', adelantar);
  }, 260);
}

// ---------------------------------------------------------------- DECRETOS
function mostrarDecretos() {
  const lista = $('#lista-decretos');
  lista.replaceChildren(
    ...juego.estado.ofertaDecretos.map((d) =>
      crear(
        'button',
        {
          clase: 'decreto',
          type: 'button',
          onclick: () => {
            juego.tomarDecreto(d.id);
            mostrarPantalla('pantalla-juego');
            pintarEstado();
            pintarCarta(juego.carta);
            carta.reponer();
          }
        },
        [
          crear('div', { clase: 'decreto-cab' }, [
            crear('span', { clase: 'decreto-icono', texto: d.icono }),
            crear('span', { clase: 'decreto-nombre', texto: d.nombre })
          ]),
          crear('div', { clase: 'decreto-desc', texto: d.desc }),
          crear('div', { clase: 'decreto-detalle', texto: d.detalle })
        ]
      )
    )
  );
  mostrarPantalla('pantalla-decreto');
}

// ---------------------------------------------------------------- FINAL
function mostrarFinal() {
  const final = juego.estado.final;
  const resumen = juego.resumen();
  legado.registrarPartida(resumen);

  $('#final-tipo').textContent =
    { gloria: 'Fin del mandato', caida: 'Se terminó', rareza: 'Final inesperado' }[final.tipo] ||
    'Final';
  $('#final-tipo').className = `final-tipo ${final.tipo}`;
  $('#final-titulo').textContent = final.titulo;
  $('#final-epigrafe').textContent = final.epigrafe;
  $('#final-texto').textContent = final.texto;

  $('#final-cronica').replaceChildren(
    ...resumen.cronica.map((c) => {
      const p = personaje(c.personaje);
      return crear('div', { clase: 'cronica-item' }, [
        crear('div', {
          clase: 'cronica-retrato',
          html: retratoSvg(p.retrato, { fondo: p.color, uid: `cr${c.mandato}-${c.mes}` })
        }),
        crear('div', { clase: 'cronica-texto' }, [
          crear('span', { clase: 'cronica-mes', texto: `Mandato ${c.mandato} · Mes ${c.mes}` }),
          crear('span', { html: `${p.nombre} — <b>«${c.eleccion}»</b>` })
        ])
      ]);
    })
  );

  $('#final-objetivos').replaceChildren(
    ...juego.estado.objetivos.map((o) => fichaObjetivo(o, { conDesc: false }))
  );

  $('#final-resumen').replaceChildren(
    ...[
      ['Meses', resumen.mesesTotales],
      ['Objetivos', `${resumen.objetivosCumplidos}/${resumen.objetivos.length}`],
      ['Decretos', resumen.decretos.length],
      ['Nombre', resumen.semilla]
    ].map(([nombre, valor]) =>
      crear('div', { clase: 'progreso-item' }, [
        crear('b', { texto: String(valor) }),
        crear('span', { texto: nombre })
      ])
    )
  );

  $('#btn-continuar').style.display = juego.puedeContinuar() ? '' : 'none';
  mostrarPantalla('pantalla-final');
  pintarMenu();
}

// Confirmación en dos toques. Reemplaza a confirm(), que además de ser feo no
// existe dentro de un iframe en sandbox (la demo publicada es uno).
function confirmarDosPasos(boton, textoConfirma, accion) {
  const original = boton.textContent;
  let armado = false;
  let reloj = null;

  const desarmar = () => {
    armado = false;
    boton.textContent = original;
    boton.classList.remove('armado');
    clearTimeout(reloj);
  };

  boton.addEventListener('click', () => {
    if (armado) {
      desarmar();
      accion();
      return;
    }
    armado = true;
    boton.textContent = textoConfirma;
    boton.classList.add('armado');
    reloj = setTimeout(desarmar, 4000);
  });

  boton.addEventListener('blur', desarmar);
  return desarmar;
}

// ---------------------------------------------------------------- EVENTOS
function cablear() {
  $('#input-semilla').value = semillaAlAzar();

  $('#btn-semilla').addEventListener('click', () => {
    $('#input-semilla').value = semillaAlAzar();
  });

  $('#btn-jugar').addEventListener('click', () => {
    const semilla = $('#input-semilla').value.trim() || semillaAlAzar();
    empezar(semilla, gabineteElegido);
  });

  $('#btn-empezar').addEventListener('click', entrarALaCancha);
  $('#btn-volver-menu').addEventListener('click', () => {
    mostrarPantalla('pantalla-menu');
    pintarMenu();
  });

  // La tira de objetivos se toca para ver de qué se trata cada uno.
  $('#objetivos').addEventListener('click', (e) => {
    const tira = e.currentTarget;
    tira.setAttribute('aria-expanded', tira.getAttribute('aria-expanded') === 'true' ? 'false' : 'true');
  });

  for (const [selector, lado] of [['#btn-izq', 'izq'], ['#btn-der', 'der']]) {
    const boton = $(selector);
    boton.addEventListener('click', () => carta.confirmar(lado));
    // Apuntar el botón previsualiza igual que arrastrar la carta hacia ese lado.
    boton.addEventListener('pointerenter', () => previsualizar(lado, 0.75));
    boton.addEventListener('focus', () => previsualizar(lado, 0.75));
    boton.addEventListener('pointerleave', () => previsualizar(null));
    boton.addEventListener('blur', () => previsualizar(null));
  }

  confirmarDosPasos($('#btn-abandonar'), 'Tocá de nuevo para renunciar', () => {
    mostrarPantalla('pantalla-menu');
    pintarMenu();
  });

  $('#btn-continuar').addEventListener('click', () => {
    juego.continuarMandato();
    // Mandato nuevo, objetivos nuevos: se vuelve a pasar por el prólogo.
    mostrarPrologo();
  });

  $('#btn-revancha').addEventListener('click', () => {
    empezar(semillaAlAzar(), gabineteElegido);
  });

  $('#btn-menu').addEventListener('click', () => {
    mostrarPantalla('pantalla-menu');
    pintarMenu();
  });

  confirmarDosPasos($('#btn-borrar'), 'Tocá de nuevo para borrar todo', () => {
    legado.borrar();
    pintarMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (!$('#pantalla-juego').classList.contains('activa')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); carta.confirmar('izq'); }
    if (e.key === 'ArrowRight') { e.preventDefault(); carta.confirmar('der'); }
  });
}

cablear();
pintarMenu();
mostrarPantalla('pantalla-menu');

// Para depurar desde la consola del navegador.
window.LaRosca = { juegoActual: () => juego, legado, BALANCE };
