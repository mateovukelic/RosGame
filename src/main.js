// Orquestador de la interfaz. Todo lo que pasa acá es presentación:
// las reglas viven en src/engine/.
import { Juego } from './engine/juego.js';
import { Legado } from './engine/legado.js';
import { FASES, BALANCE } from './engine/constantes.js';
import { semillaAlAzar } from './engine/rng.js';
import { personaje } from './data/personajes.js';
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

    const cuerpo = crear('div', {}, [
      crear('div', { clase: 'gabinete-nombre', texto: g.disponible ? g.nombre : '🔒 Bloqueado' }),
      crear('div', { clase: 'gabinete-desc', texto: g.disponible ? g.desc : '' }),
      g.disponible ? crear('div', { clase: 'gabinete-detalle', texto: g.detalle }) : null,
      g.disponible ? stats : crear('div', { clase: 'gabinete-pista', texto: g.pista || '' })
    ]);

    const boton = crear(
      'button',
      {
        clase: `gabinete${g.id === gabineteElegido ? ' elegido' : ''}`,
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

// ---------------------------------------------------------------- JUEGO
function empezar(semilla, gabinete) {
  juego = new Juego({ semilla, gabinete });
  if (!hud) hud = new Hud($('#hud'));
  if (!carta) {
    carta = new CartaArrastrable($('#carta'), {
      alElegir: (lado) => resolver(lado),
      alMover: (lado) => pintarPistas(lado)
    });
  }
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
}

function pintarCarta(c) {
  if (!c) return;
  const p = personaje(c.personaje);
  $('#carta-cara').textContent = p.cara;
  $('#carta').style.setProperty('--acento', p.color);
  $('#carta-personaje').textContent = p.nombre;
  $('#carta-bajada').textContent = p.bajada;
  $('#carta-texto').textContent = c.texto;
  $('#resp-izq').textContent = c.izq.texto;
  $('#resp-der').textContent = c.der.texto;
  $('#btn-izq-txt').textContent = c.izq.texto;
  $('#btn-der-txt').textContent = c.der.texto;
  $('#replica').classList.remove('visible');
}

function pintarPistas(lado) {
  for (const [id, clave] of [['#pista-izq', 'izq'], ['#pista-der', 'der']]) {
    const nodo = $(id);
    if (lado !== clave) {
      nodo.classList.remove('visible');
      nodo.replaceChildren();
      continue;
    }
    nodo.replaceChildren(
      ...hud.pistas(juego.previsualizar(clave)).map((icono) => crear('span', { texto: icono }))
    );
    nodo.classList.add('visible');
  }
}

function resolver(lado) {
  const resultado = juego.elegir(lado);
  pintarEstado();
  hud.golpear(resultado.deltas);
  pintarPistas(null);

  if (resultado.replica) {
    const nodo = $('#replica');
    nodo.textContent = resultado.replica;
    nodo.classList.add('visible');
  }

  const espera = resultado.replica ? 1500 : 620;

  setTimeout(() => {
    if (juego.estado.fase === FASES.FINAL) return mostrarFinal();
    if (juego.estado.fase === FASES.DECRETO) return mostrarDecretos();
    pintarCarta(juego.carta);
    carta.reponer();
  }, espera);
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
  legado.registrarCorrida(resumen);

  $('#final-tipo').textContent =
    { gloria: 'Fin del mandato', caida: 'Se terminó', rareza: 'Final inesperado' }[final.tipo] ||
    'Final';
  $('#final-tipo').className = `final-tipo ${final.tipo}`;
  $('#final-titulo').textContent = final.titulo;
  $('#final-epigrafe').textContent = final.epigrafe;
  $('#final-texto').textContent = final.texto;

  $('#final-resumen').replaceChildren(
    ...[
      ['Meses', resumen.mesesTotales],
      ['Decisiones', resumen.decisiones],
      ['Decretos', resumen.decretos.length],
      ['Semilla', resumen.semilla]
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

  $('#btn-izq').addEventListener('click', () => carta.confirmar('izq'));
  $('#btn-der').addEventListener('click', () => carta.confirmar('der'));

  $('#btn-abandonar').addEventListener('click', () => {
    if (confirm('¿Renunciás al cargo? Se pierde la corrida.')) {
      mostrarPantalla('pantalla-menu');
      pintarMenu();
    }
  });

  $('#btn-continuar').addEventListener('click', () => {
    juego.continuarMandato();
    mostrarPantalla('pantalla-juego');
    pintarEstado();
    pintarCarta(juego.carta);
    carta.reponer();
  });

  $('#btn-revancha').addEventListener('click', () => {
    empezar(semillaAlAzar(), gabineteElegido);
  });

  $('#btn-menu').addEventListener('click', () => {
    mostrarPantalla('pantalla-menu');
    pintarMenu();
  });

  $('#btn-borrar').addEventListener('click', () => {
    if (confirm('¿Borrar todo el legado? No hay vuelta atrás.')) {
      legado.borrar();
      pintarMenu();
    }
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
