# LA ROSCA — documento de diseño

Notas de por qué el juego es así. Si vas a tocar el balance o escribir cartas,
leé esto primero.

## La apuesta

Reigns funciona porque cada carta es un chiste corto con consecuencias largas, y
porque los cuatro medidores están en tensión permanente: subir uno baja otro. El
problema de adaptarlo es que el marco medieval trae la tensión puesta (Iglesia
contra Pueblo contra Ejército contra Arcas).

Acá la tensión es otra, y más específica:

- **Pueblo vs. Campo** es el conflicto estructural argentino: lo que abarata la
  comida adentro es lo que desalienta producirla y exportarla.
- **Rosca vs. Pueblo** es la distancia entre gobernar y ser querido.
- **Caja** es el recurso que todos quieren y nadie genera.
- **Inflación** es el cuarto jugador de la mesa, y no se sienta a negociar.

## Por qué la inflación es un medidor aparte

Los cuatro stats son *equilibrios*: matan por exceso y por defecto. La inflación
no. Es una **presión monótona**:

1. Sube sola todos los meses (`inflacionDerivaBase`), y acelera cuanto más alta está.
2. Pasado `umbralInflacionDolor` (55) empieza a drenar Pueblo y Caja por su cuenta.
3. A 100 termina la partida, sin importar el resto.

Esto le da al juego un **reloj**. Sin ella, un jugador bueno podría quedarse
oscilando alrededor de 50 en los cuatro medidores para siempre. Con ella, el
equilibrio perfecto también pierde: hay que gastar capital político en bajarla,
y todo lo que la baja lastima otra cosa.

## Por qué la Caja no puede ir a negativo

Podría haber sido un stat más que llega a cero y perdés. En cambio: si una
decisión te dejaría la Caja bajo cero, se clava en cero y el faltante se convierte
en inflación (`inflacionPorEmision`).

Es la regla más importante del juego, y es una regla de diseño antes que un chiste:
convierte "no tengo plata" de un muro en una **elección con factura diferida**.
Siempre podés hacer lo popular. Lo vas a pagar en tres o cuatro meses, cuando ya
no te acuerdes de qué carta fue.

## Anatomía de una carta

Una carta buena cumple tres cosas:

1. **Las dos opciones son defendibles.** Si una es obviamente correcta, no es una
   decisión, es un trámite. `npm run validar` marca las cartas cuyas dos opciones
   pesan casi lo mismo — eso no es un error, pero conviene revisarlas.
2. **El personaje habla como habla ese personaje.** El Ministro dice "sendero" y
   "trimestres". La Vecina dice el precio del asado. El texto es la mitad del juego.
3. **Las consecuencias no se ven todas en el momento.** Las mejores cartas ponen
   una *flag* y cobran ocho meses después (`obra_inaugurada` → `obra_derrumbe`,
   `empresario_favor` → `favor_cobrado`).

**La réplica** (`replica`) es donde vive el humor. Se muestra después de elegir y
casi siempre dice que la cosa salió peor de lo esperado, o bien de la peor manera.

## El mazo y sus pesos

- `peso` es la probabilidad relativa base.
- `requiere` filtra por mes, flags, rangos de stats, inflación y decretos tomados.
- `urgeSi` multiplica el peso cuando el país está en una situación específica
  (`corrida` pesa 6 veces más si la Caja bajó de 35). Así el mazo **reacciona**
  al estado sin necesidad de un director de eventos aparte.
- `memoriaAntiRepeticion` evita que una carta vuelva a salir en 14 meses.
- Si se agotan las cartas válidas, se limpia la memoria de usadas (salvo las
  irrepetibles) antes que dejar al jugador sin carta.

## Decretos: los relics

Cada 12 meses, 1 de 3. Tres formas de modificar el juego, no cuatro:

- `porMes`: un goteo constante (`Retenciones Móviles`: +Caja, −Campo todos los meses).
- `amortigua` / `potencia`: multiplicadores sobre los deltas negativos/positivos
  de un stat (`Cadena Nacional` hace que los golpes de imagen duelan un 25% menos).
- `porMesCondicional`: goteo que sólo corre si se cumple una condición
  (`Viento de Cola` sólo rinde mientras el Campo esté por encima de 45).

Están pensados para **inclinar una corrida**, no para resolverla. Todos tienen un
costo explícito en el texto, porque el jugador tiene que poder elegir a ciegas
pero informado.

## Gabinetes: el loadout

Definen stats iniciales, inflación inicial, decretos de arranque y flags. Son la
variedad entre corridas: *El Aparato* empieza con la calle ganada y el Campo en
contra; *La Motosierra* al revés; *Gobierno de Emergencia* es el modo difícil.

Tres se desbloquean con el legado, para que las primeras corridas perdidas dejen
algo.

## Balance: cómo se verifica

El motor no toca el DOM, así que se puede correr entero en Node. `simulador.js`
juega miles de partidas con tres estrategias:

- **azar** — el piso. Debe sobrevivir entre 10 y 40 meses de mediana. Si muere
  antes, el juego es injusto; si sobrevive más, no hay tensión.
- **prudente** — una IA que proyecta ambas opciones y elige la que deja el país
  más lejos de los bordes. **Tiene que rendir claramente más que el azar**: si no,
  la habilidad no paga y el juego es una tragamonedas.
- **siempreIzq / siempreDer** — no deben poder completar un mandato. Si alguna lo
  logra, hay un lado sistemáticamente correcto.

Y una condición sobre los finales: **ningún final debe llevarse más del 75% de las
partidas**. Si uno domina, el mazo empuja demasiado en una dirección.

Esas cuatro condiciones son tests (`test/balance.test.js`), no recomendaciones.
Tocá `constantes.js` y te avisan.

## Cuánto mostrar antes de elegir

Esta es la decisión de diseño más importante del juego, y la primera versión la
tuvo mal.

Reigns no te muestra nada: arrastrás y ves qué pasó. Eso genera tensión, pero
también genera muertes que se sienten arbitrarias. La primera versión de acá se fue
al otro extremo: barras verdes y rojas con flechas ▲/▼ diciendo exactamente a dónde
iba cada medidor. Se podía jugar **sin leer una sola carta**, mirando los colores.
Las cartas —que son la mitad del juego, el humor, el país entero— quedaban como
decoración de un minijuego de barritas.

La regla ahora es: **la pista dice dónde mirar, el personaje dice qué va a pasar.**

Al arrastrar se muestra, por cada medidor afectado, sólo la facción y la fuerza
(`leve` / `medio` / `fuerte`), como una **burbuja debajo de la barra**: más grande,
más fuerte. Hueca cuando el efecto es un rango.

### Por qué la burbuja está debajo y no sobre la barra

Este lugar costó dos intentos y el error del segundo es el más instructivo.

El primero pintaba un segmento desde el valor actual hasta el proyectado. Decía la
dirección con la posición, que es justamente lo que no había que decir.

El segundo pareció la solución obvia: una banda **centrada** en el valor actual,
extendida hacia los dos lados. Simétrica, sin dirección… en el papel. En pantalla
se leía siempre como un aumento, y por un motivo que el razonamiento no anticipa:
la mitad izquierda de la banda cae sobre el relleno azul de la barra y se confunde
con él, mientras que la mitad derecha cae sobre la pista vacía y se recorta nítida.
El jugador no ve una banda simétrica: ve algo que sobresale hacia la derecha.

La lección general: **cualquier marca dibujada sobre la barra tiene una posición
relativa al relleno, y esa posición se lee como dirección**, por más simétrica que
sea la forma. No hay forma neutra sobre un fondo que no es neutro. La burbuja
resuelve el problema quitándole el lado al indicador en vez de intentar equilibrarlo:
está afuera de la barra, no tiene relación espacial con el valor, y su único grado
de libertad es el tamaño — que es exactamente la única cosa que queremos comunicar.

Dos consecuencias más que valen:

- **Desaparecieron los avisos de "esto te mata".** Eran útiles, pero decirte que
  una opción es letal cuando estás en 92 de Campo equivale a decirte que sube.
  Ahora el aviso es la fuerza: una burbuja dorada significa "esto mueve mucho", y
  si estás en un borde, el problema es tuyo y de lo que sepas leer.
- **La fuerza sí pasa por tus decretos.** Si tenés Cadena Nacional, el golpe que se
  previsualiza ya viene amortiguado. Mentir sobre la magnitud sería gratuito.

En el motor conviven dos métodos y la separación es deliberada: `previsualizar()`
devuelve la proyección completa con signo, y la usan los tests, el simulador y un
eventual modo asistido; `pistaDeImpacto()` devuelve sólo `{ clave, fuerza,
incierto }` y es lo único que la interfaz puede ver. Un test comprueba que subir 9
y bajar 9 den pistas idénticas y que el objeto no tenga ningún campo con dirección,
así que el día que alguien filtre el signo por comodidad, el build falla.

Cancelar sigue siendo gratis: volver la carta al centro no hace nada. Mirar tiene
que salir cero para que valga la pena mirar.

## De qué lado está el sí

Reigns mezcla los lados a propósito: parte del desafío es leer rápido y no
equivocarse de gesto. Acá la decisión es la opuesta, y es deliberada.

**Cuando un personaje viene a pedir algo, aceptar está siempre a la derecha y
rechazar siempre a la izquierda.** Las cartas que son un dilema entre dos caminos
—shock o gradualismo, escritorio o fábrica— no tienen un sí, y no marcan nada.

El motivo: si el lado del sí varía, una parte del error del jugador es motriz
—arrastró para el lado que no era— y eso no es el juego. La fricción tiene que
estar en *qué* aceptás, con qué plata y a costa de quién. Que el gesto sea
predecible libera atención para lo único que importa, que es leer.

Esto es un dato del mazo, no una costumbre: cada carta declara `forma`, y las
propuestas marcan `acepta` y `rechaza` en el lado que corresponde. Cuatro tests
lo verifican; una carta con el sí a la izquierda no compila.

**El riesgo que introduce** es evidente: si el lado es predecible, quizá la
decisión también. Si "decile que sí a todo el mundo" fuera razonable, el juego se
resolvería sin pensar. Así que eso también es un test, con dos condiciones:

- Aceptar todo y rechazar todo tienen que rendir **peor** que jugar al azar. Hoy
  dan 23 y 21 meses de mediana contra 29 al azar.
- Tienen que **morir de formas distintas**. Si los dos terminaran en el mismo
  final, el mazo estaría empujando sistemáticamente para un lado. Hoy aceptar todo
  termina en *La patria contratista* (te compraron) y rechazar todo en *Que se
  vayan todos* (te soltó la calle).

Esas dos condiciones son lo que mantiene honesta la convención.

## Historia y objetivos

Reigns tiene un reino que persiste, una maldición de fondo y misiones. Sin nada de
eso, un roguelike de cartas es un ejercicio de equilibrio: sobrevivís o no, y todas
las corridas se parecen. Lo que se agregó, en orden de cuánto cambia la partida:

**Los objetivos** son lo que más pesa. Dos por mandato, uno corto y uno largo, para
que el mandato tenga dos tiempos: algo que te ocupa el primer año y algo que te
acompaña hasta el final. Le dan a la corrida una intención además de "no morirse",
y sobre todo le dan forma a las decisiones: la misma carta se elige distinto si
estás persiguiendo *Domar la bestia* que si perseguís *Sin tutela*.

Tres detalles de balance:

- Algunos objetivos pagan con una **elección de decreto fuera de horario**. Es el
  premio más fuerte que hay, porque cambia la corrida y no sólo los números.
- La mayoría **no castiga al fallar**. No cobrar el premio ya es el costo; encima
  castigar convierte el objetivo en una trampa.
- Unos pocos tienen `falla()`, que los da por perdidos apenas se vuelven
  imposibles, en vez de dejarte esperando treinta meses a un veredicto cantado.

**El prólogo** existe para que el gabinete elegido signifique algo antes de la
primera carta. Un párrafo de escena y los dos objetivos: sirve de apertura y de
briefing a la vez, que es más barato que dos pantallas.

**La crónica** cierra el círculo. Al terminar, se rescatan las tres decisiones con
mayor impacto acumulado y se muestran en orden cronológico, con el retrato de quien
te las trajo. No es una estadística: es que un mandato son cuarenta y ocho
elecciones y sólo unas pocas se recuerdan. El final ya contaba cómo caíste; la
crónica cuenta por qué.

Lo que falta para tener de verdad el "reino que persiste" de Reigns: que una corrida
deje marcas en la siguiente. Hoy el legado sólo desbloquea cosas.

## Los retratos

Podrían haber sido 25 SVG dibujados a mano. No lo son, por dos razones: a mano el
estilo se va desparejando de a poco, y agregar el personaje 26 cuesta lo mismo que
el primero.

En cambio hay un **sistema de partes** (`src/ui/retratos.js`): forma de cara, corte,
barba, ojos, cejas, boca, prenda y accesorio se combinan sobre una grilla fija de
100×100 con la cabeza siempre en el mismo lugar. Un personaje es una receta de ocho
palabras. El módulo es puro —devuelve un string— así que se testea en Node sin DOM,
y la suite dibuja **el producto cartesiano de todas las partes contra todas las
formas de cara**: si una geometría se rompe, falla el build aunque ningún personaje
use esa combinación todavía.

Reglas de estilo que sostienen la coherencia:

- **Plano, sin contornos.** A 86px un contorno se empasta. El contraste lo hace el
  color, no la línea.
- **El fondo del retrato es el color del personaje**, el mismo que tiñe la carta.
  Cada arquetipo se reconoce por su color antes de que leas el nombre.
- **Los rasgos van en tinta cálida (`#2a2620`), no en negro.** Sobre papel crema el
  negro puro se ve como un agujero.
- **Orden de capas fijo:** fondo, pelo trasero, cuello, prenda, cabeza, orejas,
  cejas, ojos, nariz, barba, boca, pelo delantero, accesorio. La boca va *después*
  de la barba y las barbas recortan un óvalo de piel: si no, el candado se come la
  boca y parece una mancha.

`galeria.html` es la herramienta: muestra los 25 y sortea combinaciones al azar,
que es como aparecieron los cuatro defectos de la primera versión (la visera de la
gorra invisible, la colita pegada a la oreja, los ojos entrecerrados que parecían
cerrados, y la barba tapando la boca).

Los emojis originales se eliminaron del todo en vez de dejarlos como respaldo: un
respaldo que nada usa es dato muerto que miente en la próxima lectura.

## Decisiones de tono

- **Arquetipos, nunca personas reales.** Es mejor comedia y no es difamación.
  "El Secretario General", "La Gobernadora", "El Enviado del Organismo".
- **La grieta no tiene razón.** Las cartas castigan los extremos de los dos lados:
  la Rosca en 100 te vacía el cargo igual que en 0 te voltea.
- **El humor es de resignación, no de burla.** El chiste casi nunca es el personaje:
  es la situación, y que se repita.

## Pendiente

- Sonido: un golpe por carta, algo feo cuando un medidor entra en zona roja.
- Un modo "a ciegas" que apague hasta la pista de facción, para quien quiera el
  Reigns puro.
- Que una corrida deje marcas en la siguiente: el país que heredás debería
  acordarse de lo que hizo el anterior, que además eras vos.
- Retratos que reaccionen: la misma receta con `ceja: 'enojada'` cuando el Pueblo
  está en rojo, o `ojos: 'cansado'` pasados los tres años de mandato.
- Elecciones de medio término como evento de mes 24 con consecuencias en Rosca.
- Cadenas más largas (hoy la más larga tiene tres eslabones).
- Modo "provincia": misma mecánica, escala municipal, medidores distintos.
