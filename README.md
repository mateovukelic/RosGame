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

**Controles:** arrastrá la carta hacia un lado y las barras te muestran **qué
facciones toca esa opción y con cuánta fuerza** — nunca en qué dirección. Soltá
pasando el umbral para confirmar, o volvé al centro para cancelar. También andan
`←` / `→` y los botones (apuntarlos con el mouse o con el tab da la misma pista).

**Cuando alguien te viene a pedir algo, aceptar está siempre a la derecha (✓) y
rechazar siempre a la izquierda (✗).** Las cartas que son un dilema entre dos
caminos no llevan esos signos, porque ahí no hay un sí.

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
npm test        # 86 tests: motor, mazo, prosa, objetivos, retratos, legado y balance
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
    objetivos.js    # sorteo y resolución de los objetivos del mandato
    legado.js       # progresión entre corridas
    simulador.js    # IA de prueba para balancear
    rng.js          # random determinístico por semilla
    constantes.js   # ⚙️ todo el balance en un solo lugar
  data/             # contenido
    cartas/         # base · economia · calle · rosca · folklore · crisis · eventos
    personajes.js decretos.js gabinetes.js finales.js objetivos.js
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
  forma: 'propuesta',                 // 'propuesta' (hay un sí) o 'dilema'
  personaje: 'taxista',               // de src/data/personajes.js
  texto: '¿Sabe qué pasa? Acá falta...',
  peso: 1,                            // probabilidad relativa
  requiere: { mesMin: 6, flags: ['paro_hecho'] },
  urgeSi: { inflacion: { min: 60 } }, // sale mucho más si el país arde
  izq: {
    rechaza: true,                    // el no va SIEMPRE a la izquierda
    texto: 'Dejame trabajar',         // máximo 34 caracteres
    efectos: { pueblo: -3, rosca: 3 }
  },
  der: {
    acepta: true,                     // el sí va SIEMPRE a la derecha
    texto: 'Contame tu plan',
    efectos: { pueblo: 4, campo: -2, inflacion: 1 },
    pone: ['escucho_al_tachero'],     // flags para cartas futuras
    replica: 'Tenía razón en una cosa.'
  }
}
```

`npm test` valida sola que el id sea único, que el personaje exista, que las
respuestas entren en la carta, que las magnitudes sean razonables, y que **ninguna
carta requiera una flag que nadie pone nunca**.

También sostiene el piso de la prosa: **las dos opciones tienen que tener réplica**
(las 232 del mazo la tienen), la réplica no puede repetir la respuesta ni ser más
corta que ella, las dos réplicas de una carta tienen que contar cosas distintas, y
el texto necesita al menos sesenta caracteres — no porque largo sea mejor, sino
porque abajo de eso no entra un detalle concreto, que es lo único que separa una
escena de una planilla de efectos.

Cada personaje tiene su regla de voz en `personajes.js`, campo `voz`. El juego no
la lee: la lee quien escriba la próxima carta.

### La pista de impacto (y por qué no dice la dirección)

Al arrastrar, `Juego.pistaDeImpacto(lado)` devuelve, por cada medidor que se mueve,
sólo tres cosas: **qué facción**, **qué tan fuerte** (`leve` / `medio` / `fuerte`)
y si el efecto es un rango. Nada más. El HUD lo pinta como una **burbuja debajo de
cada medidor**: más grande, más fuerte el impacto. Hueca si el efecto es un rango,
porque ahí ni el juego sabe cuánto va a salir.

La burbuja va *debajo* de la barra y no sobre ella. Cualquier marca puesta encima
tiene una posición, y una posición se lee como dirección: la parte que cae sobre el
relleno se confunde con el relleno y sólo se ve la que sobresale, así que todo
parece un aumento. Una burbuja aparte no tiene lado — sólo puede decir cuánto.

Sin dirección a propósito, y es la regla más importante del juego: si las barras te
dijeran si sube o baja, se podría jugar sin leer una sola carta, mirando sólo los
medidores. El texto pasaría a ser decoración. Así, la pista te dice *dónde mirar* y
el personaje te dice *qué va a pasar* — y hay que juntar las dos cosas.

Hay un `Juego.previsualizar(lado)` que sí devuelve dirección, magnitud y valor
proyectado, pero es de uso interno (tests, balance, un eventual modo asistido): la
interfaz de juego nunca lo llama. Un test verifica que subir 9 y bajar 9 produzcan
pistas byte por byte idénticas, así que el día que alguien filtre el signo, falla.

### La convención de lados

De las 138 cartas, **97 son propuestas** (alguien pide algo) y **41 son dilemas**
(dos caminos, ningún sí). Cada carta lo declara en `forma`, y las propuestas marcan
`der: { acepta: true }` / `izq: { rechaza: true }`. Cuatro tests lo verifican, así
que no se puede colar una carta con el sí a la izquierda.

La idea es que la dificultad esté en **decidir**, no en descifrar de qué lado quedó
el sí. Eso abre un riesgo obvio —que decirle que sí a todo el mundo se vuelva una
estrategia— y por eso hay dos tests que lo miden: aceptar todo y rechazar todo
tienen que rendir *peor* que jugar al azar, y tienen que morir de formas distintas.
Hoy dan 23 y 21 meses de mediana contra 29 al azar; aceptar todo termina en *La
patria contratista* y rechazar todo en *Que se vayan todos*.

### Peticiones y hechos consumados

El mazo tiene dos clases de carta y la diferencia importa más de lo que parece.

La mayoría son **peticiones**: alguien entra al despacho y quiere algo. Están
repartidas en los paquetes `base`, `economia`, `calle`, `rosca` y `folklore`.

El paquete `eventos` es lo otro: **cosas que pasan**. El apagón del domingo a la
mañana, la ballena varada en la playa más turística, el granizo sobre la zona
núcleo, el traductor que en la cumbre tradujo mal, el contenedor que apareció en
el puerto y no figura en ningún papel. Nadie las pidió y no hay un sí ni un no:
hay dos maneras de pararse frente a un hecho consumado. Por eso casi todas son
dilemas.

Un test exige que **al menos una cuarta parte del mazo sean dilemas**. Si todo
fuera gente pidiendo cosas, gobernar sería atender un mostrador.

### Objetivos, prólogo y crónica

Cada mandato sortea **dos objetivos**: uno de plazo corto y uno largo. Se muestran
en el prólogo, viven en una tira arriba de la carta (se toca para ver el detalle) y
se resuelven solos al vencer. Cumplirlos paga; algunos regalan una elección de
decreto fuera de horario. Unos pocos castigan si se pierden — la mayoría no, porque
no cobrar el premio ya es costo suficiente.

El **prólogo** es la escena de apertura, distinta por gabinete, y los mandatos
siguientes tienen la suya. Al terminar, la **crónica** rescata las tres decisiones
que más movieron el país: un mandato son cuarenta y ocho elecciones, y sólo unas
pocas se recuerdan.

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

Vertical slice jugable y completa: 138 cartas, 16 decretos, 14 objetivos,
6 gabinetes, 14 finales, 25 personajes con retrato propio.

**Lo próximo, en orden:** sonido · un hilo narrativo que cruce corridas (que lo que
hiciste en el mandato anterior aparezca en el siguiente) · más cadenas largas ·
expresión del retrato según el estado del país · modo "provincia".

