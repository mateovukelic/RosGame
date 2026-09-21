# 🎩 LA ROSCA — *Crónicas de un mandato*

Juego de gestión política con toques roguelike, bien criollo. Inspirado en **Reigns**:
una carta por vez, dos opciones, arrastrás para un lado o para el otro. Cuatro años,
un país, y cuatro equilibrios que no se pueden sostener todos juntos.

> Todos los personajes son arquetipos. Cualquier parecido con la realidad es culpa de la realidad.

---

## Jugar

Hay una **demo jugable publicada** (ver abajo cómo se genera), y también corre
local sin build ni dependencias — es HTML + módulos ES:

```bash
npm start            # levanta http://localhost:8080
# o, si preferís:
python3 -m http.server 8080
```

Abrí `http://localhost:8080` y asumí el cargo.

**Controles:** arrastrá la carta hacia un lado y las barras te muestran a dónde
iría cada medidor si soltás ahí; soltá pasando el umbral para confirmar, o volvé
al centro para cancelar. También andan `←` / `→` y los botones (apuntarlos con el
mouse o con el tab previsualiza igual).

También hay una galería de retratos en `http://localhost:8080/galeria.html`, que
sirve para revisar los personajes y probar combinaciones de partes al azar.

---

## Cómo funciona

### Los cuatro equilibrios

| | | Si llega a 0 | Si llega a 100 |
|---|---|---|---|
| ✊ | **Pueblo** — la calle, los sindicatos, el aguante | *Que se vayan todos* | *El conductor eterno* |
| 🎩 | **Rosca** — la interna, los gobernadores, el Congreso | *Juicio político* | *El sello de goma* |
| 🌾 | **Campo** — el agro, los exportadores, los dólares de verdad | *Lockout* | *La patria contratista* |
| 💵 | **Caja** — reservas, tesoro, la plata que hay | *Default* | *La plata no se come* |

Como en Reigns, **el exceso mata igual que la falta**. Gobernar es mantener cuatro
números lejos de los dos bordes al mismo tiempo, con cartas que siempre empujan en
direcciones opuestas.

### 🔥 La inflación

El quinto medidor, y el que hace que esto sea acá y no en otro lado. No es un stat
que se equilibra: es una presión que **sube sola todos los meses**, y más rápido
cuanto más alta está. Pasando el 55% empieza a comerse Pueblo y Caja por su cuenta.
Si llega a 100 se acabó, sin importar cómo esté el resto.

Además: **si la Caja se te iría a negativo, no se va a negativo. Se emite.** El
faltante se clava en cero y se convierte en inflación. Podés gastar lo que no tenés,
pero lo pagás igual, más tarde y más caro.

### Los toques roguelike

- **Corridas cortas y permadeath.** Un mandato son 48 meses. Cuando caés, caés.
- **Semillas.** `MATE-7741`. La misma semilla da exactamente la misma partida:
  sirve para competir con un amigo o para reintentar una corrida injusta.
- **Decretos.** Cada 12 meses elegís 1 de 3 modificadores permanentes (Cepo,
  Motosierra, Ancla Cambiaria, Pacto de Gobernadores…). Cambian cómo pega todo
  lo demás durante el resto de la corrida.
- **Gabinetes.** El loadout de arranque. Tres disponibles de entrada, tres que se
  desbloquean jugando.
- **Cadenas de cartas.** Las decisiones dejan *flags* que habilitan cartas más
  adelante. Inaugurar un puente al 60% tiene consecuencias como ocho meses después.
- **Legado.** Entre corridas se guardan finales descubiertos, récords y desbloqueos.
- **Ascensión.** Sobrevivir el mandato completo no termina el juego: podés seguir
  gobernando, con el país más caliente cada vez, hasta tres mandatos.

### Los finales

14 finales. Ocho por llevar un medidor a un borde, uno por hiperinflación, dos por
sobrevivir, y **tres secretos** que sólo salen si encadenaste las decisiones justas.
El archivo del menú los va revelando.

---

## Desarrollo

```bash
npm test        # 55 tests: motor, mazo, retratos, legado y balance
npm run validar # reporte de salud del mazo + 1000 corridas simuladas
npm run demo    # arma dist/demo.html, la versión de una sola página
```

### Estructura

```
index.html
styles/main.css
src/
  engine/           # reglas puras, sin DOM: corre entero en Node
    juego.js        # orquestador de la corrida
    mazo.js         # qué carta sale cada mes
    efectos.js      # efectos, condiciones, emisión
    finales.js      # evaluación de finales
    legado.js       # progresión entre corridas
    simulador.js    # IA de prueba para balancear
    rng.js          # random determinístico por semilla
    constantes.js   # ⚙️ todo el balance en un solo lugar
  data/             # contenido
    cartas/         # base · economia · calle · rosca · folklore · crisis
    personajes.js decretos.js gabinetes.js finales.js
  ui/               # presentación (DOM)
    retratos.js     # retratos SVG paramétricos (puro: se testea en Node)
    carta.js hud.js dom.js
  main.js
test/               # node:test, sin dependencias
tools/validar-mazo.js
galeria.html        # banco de pruebas de los retratos
```

El motor **no sabe nada del DOM**: `new Juego({semilla}).elegir('izq')` funciona
igual en Node que en el navegador. Por eso se puede simular el balance.

### Agregar una carta

Metela en el paquete que corresponda dentro de `src/data/cartas/`:

```js
{
  id: 'tachero_plan',                 // único en todo el mazo
  personaje: 'taxista',               // de src/data/personajes.js
  texto: '¿Sabe qué pasa? Acá falta...',
  peso: 1,                            // probabilidad relativa
  requiere: { mesMin: 6, flags: ['paro_hecho'] },
  urgeSi: { inflacion: { min: 60 } }, // sale mucho más si el país arde
  izq: {
    texto: 'Escucharlo',              // máximo 34 caracteres
    efectos: { pueblo: 4, campo: -2, inflacion: 1 },
    pone: ['escucho_al_tachero'],     // flags para cartas futuras
    replica: 'Tenía razón en una cosa.'
  },
  der: { texto: 'Dejame trabajar', efectos: { pueblo: -3, rosca: 3 } }
}
```

`npm test` valida sola que el id sea único, que el personaje exista, que las
respuestas entren en la carta, que las magnitudes sean razonables, y que **ninguna
carta requiera una flag que nadie pone nunca**.

### La previsualización de impacto

Mientras arrastrás, `Juego.previsualizar(lado)` devuelve, por cada medidor que se
mueve, la dirección, la magnitud estimada **ya pasada por tus decretos activos**,
el valor proyectado y si esa opción te deja en zona de final. El HUD lo pinta como
un segmento fantasma sobre la barra más una flecha ▲/▼; en dorado y parpadeando si
esa elección termina la partida.

A propósito **no muestra números**: se ve la dirección y el tamaño relativo, no el
`-8`. Con los números exactos la partida se vuelve una cuenta y se pierde la
tensión que hace funcionar a Reigns. Los efectos que son un rango se marcan con
`▲?`, porque ahí ni el juego sabe cuánto va a salir.

### Agregar un personaje

Los retratos no son imágenes: se arman combinando partes en `src/ui/retratos.js`.
Un personaje nuevo es una receta en `src/data/personajes.js`:

```js
tachero_2: {
  nombre: 'El Otro Tachero',
  color: '#7f6f2f',                  // tiñe el fondo del retrato
  bajada: 'Este sí sabe el camino.',
  retrato: {
    cara: 'cuadrada',                // ovalada · redonda · cuadrada · angosta
    piel: 'media', pelo: 'canoso',
    corte: 'entradas',               // 10 cortes
    barba: 'bigote',                 // no · sombra · bigote · chivo · candado · tupida
    ojos: 'entrecerrado', ceja: 'neutra', boca: 'mueca',
    prenda: 'camisa', tela: '#8a7a3a',
    accesorio: 'anteojos', accesorioColor: '#2a2620'
  }
}
```

Abrí `galeria.html` para verlo, y el botón 🎲 sortea combinaciones: sirve para
encontrar partes que se pisan entre sí. Los tests dibujan **todas** las partes
contra **todas** las formas de cara, así que una geometría rota falla el build
aunque ningún personaje la use todavía.

### Tocar el balance

Todo vive en `src/engine/constantes.js`. Después de cambiar algo:

```bash
npm run validar
```

Te dice la presión neta del mazo sobre cada medidor y simula 1000 corridas con tres
estrategias distintas (al azar, alternando y una IA prudente). La suite de tests
falla si el juego se vuelve imposible, trivial, o si un solo final se come todas
las partidas.

---

## Publicar la demo

`.github/workflows/pages.yml` publica el repo tal cual en GitHub Pages en cada
push. Hay que habilitarlo una vez: **Settings → Pages → Source: "GitHub Actions"**.
El workflow corre `npm test` antes de publicar, así que nunca sale una demo rota.

`npm run demo` arma además `dist/demo.html`: el mismo juego en una sola página, sin
`<html>`/`<head>`/`<body>` propios y sin recursos externos, para embeber en hosts
que aportan su propio esqueleto. Se genera desde `index.html` y `styles/main.css`
en vez de mantenerse a mano, para que no se desincronice.

## Estado

Vertical slice jugable y completa: 116 cartas, 16 decretos, 6 gabinetes, 14 finales,
25 personajes con retrato propio.

**Lo próximo, en orden:** sonido · más cadenas largas · eventos de elecciones de
medio término · expresión del retrato según el estado del país · modo "provincia".

