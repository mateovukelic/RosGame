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
- **Círculo Rojo vs. Pueblo** es la distancia entre gobernar y ser querido.
- **Caja** es el recurso que todos quieren y nadie genera.

Los nombres de las facciones son los que se usan en la mesa: el *Círculo Rojo* no
es "el Congreso" ni "la política", es como le dicen los que están adentro. La clave
interna sigue siendo `rosca` —el juego se llama así— y lo que ve el jugador es
`META_STATS.nombre`. El rótulo del medidor usa `corto`, porque en una columna de
ochenta y cuatro píxeles entra una palabra y no dos.
- **Inflación** es el cuarto jugador de la mesa, y no se sienta a negociar.

## Morir por exceso, y por qué hay que avisar

Sí: en Reigns los cuatro medidores matan tanto en cero como en el máximo. Es la
mecánica central y es lo que obliga a mantener todo en el medio en vez de empujar
un número para arriba y olvidarse.

El problema no era la mecánica: era la justificación. *"El pueblo te quiere tanto
que la Rosca te saca"* pedía que el jugador aceptara una traición ajena como
explicación de su propia derrota. Eso se siente arbitrario, y con razón.

La regla nueva: **cada techo es una forma de captura, y la captura se explica
sola**. Con el Círculo Rojo en 100 seguís en el cargo y hace meses que no gobernás: pedís
un café y te traen un decreto ya firmado por vos. Con el Campo en 100 el gobierno
tiene dueño y vos firmaste el manual de uso. Con la Caja en 100 la meta fiscal dejó
de ser un instrumento y pasó a ser la única política. Y con el Pueblo en 100 no
podés tomar una sola decisión que la calle no aplauda: la tarifa que había que
tocar, la partida que había que cerrar, el nombramiento que había que revisar,
todo se pospone para no romper el encanto, y un país no aguanta quince meses así.

Ninguna de esas cuatro depende de que alguien te traicione. Todas son consecuencia
directa de lo que el jugador hizo.

La segunda mitad del arreglo es más importante que la primera: **avisar**. Pasando
84 en cualquier facción entra una carta de aviso que nombra exactamente el problema
y ofrece una salida con costo — gastar de lo que sobra para comprar lo que falta.
El `urgeMult` de esas cartas es deliberadamente enorme (200 contra el 4 o 9 del
resto del mazo), porque una carta cuyo único trabajo es avisar y que llega tarde
equivale a no existir. Hoy aparece a las dos o tres cartas de entrar en zona.

Con aviso y con salida, llegar a cien deja de ser algo que te pasa y pasa a ser
algo que elegiste.

## La factura siempre vuelve

Las flags encadenan bien pero tienen un problema: **habilitan** una carta y después
dejan que el sorteo decida si alguna vez aparece. La consecuencia de una decisión
importante puede no llegar nunca, y el jugador nunca sabe si el juego se acordó.

`siembra` resuelve eso. Una opción agenda una carta para dentro de una ventana de
meses y esa carta llega, con fecha:

```js
siembra: { carta: 'favor_legislativo', meses: [8, 14] }
```

Lo que hace que funcione no es la mecánica sino la redacción: **todas las cartas de
consecuencia arrancan nombrando la decisión que las trajo.** "Los tres votos que
compraste para tu ley estrella vienen a cobrar." "Las escuelas que conectaste en
junio pasaron el invierno con calefacción." El punto es que el jugador ate el cabo
justo cuando ya se había olvidado.

Tres reglas que las sostienen:

- **La mitad cobra y la mitad paga.** Si todas fueran facturas, sembrar sería
  siempre malo y el jugador aprendería a no comprometerse con nada.
- **La ventana nunca pasa de veinticuatro meses.** Más allá de eso el cabo no se
  ata: la carta llega y parece un evento suelto.
- **Ninguna sale por sorteo.** Son `soloEncadenada`: si nadie la sembró, no existe.
  Un test verifica que ninguna quede huérfana.

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

Una carta buena cumple cuatro cosas:

1. **Las dos opciones son defendibles.** Si una es obviamente correcta, no es una
   decisión, es un trámite. `npm run validar` marca las cartas cuyas dos opciones
   pesan casi lo mismo — eso no es un error, pero conviene revisarlas.
2. **Tiene un detalle que no se puede inventar de memoria.** "Cuarenta escuelas sin
   gas y estamos en junio" funciona; "hay problemas en educación" no. El detalle
   concreto es lo único que separa una escena de una planilla de efectos. Por eso
   el texto tiene un piso de sesenta caracteres, verificado por un test: no porque
   más largo sea mejor, sino porque abajo de eso no entra un detalle.
3. **El personaje habla como habla ese personaje.** Cada uno tiene su regla de voz
   escrita en `personajes.js`, en el campo `voz`. El juego no la lee: la lee quien
   escriba la carta siguiente, para que el Ministro no termine hablando como la
   Vecina. El Ministro dice "sincerar"; la Vecina dice el precio del asado.
4. **Las consecuencias no se ven todas en el momento.** Las mejores cartas ponen
   una *flag* y cobran ocho meses después (`obra_inaugurada` → `obra_derrumbe`,
   `empresario_favor` → `favor_cobrado`).

### La réplica es obligatoria

**Las 232 opciones del mazo tienen réplica**, y hay un test que lo exige. Durante
mucho tiempo sólo la tenía el 27%, y el efecto era peor de lo que parecía: en tres
de cada cuatro decisiones el jugador elegía y el juego se quedaba mudo. Sin
réplica, una carta es un botón que mueve números.

Cuatro formas que funcionan, y conviene alternarlas para que no sea todo chiste:

- **Salió bien, pero no como querías.** "Se conectaron treinta y una. Las otras
  nueve estaban en zonas sin red de gas y nadie lo sabía."
- **La factura llega después.** "El costo aparece dentro de noventa días, cuando
  ya nadie lo asocie con esto."
- **Un detalle humano que recontextualiza.** "No insistió. Se tomó el café,
  agradeció y se fue. Eso fue peor que si hubiera insistido."
- **El número que recién después significa algo.** "Doce minutos por día, por
  doscientas mil personas."

La réplica nunca repite la respuesta —hay un test— y nunca dice sólo que salió
bien o mal: dice *qué pasó después*.

Como las réplicas pasaron a medir ochenta caracteres en promedio, el tiempo que
quedan en pantalla se calcula con el largo del texto en lugar de ser fijo, y
cualquier toque o tecla adelanta la carta. El que ya leyó no espera; al que está
leyendo no se le corta la frase.

## El mazo y sus pesos

- `peso` es la probabilidad relativa base.
- `requiere` filtra por mes, flags, rangos de stats, inflación y decretos tomados.
- `urgeSi` multiplica el peso cuando el país está en una situación específica
  (`partida` pesa 6 veces más si la Caja bajó de 35). Así el mazo **reacciona**
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

Están pensados para **inclinar una partida**, no para resolverla. Todos tienen un
costo explícito en el texto, porque el jugador tiene que poder elegir a ciegas
pero informado.

## Gabinetes: el loadout

Definen stats iniciales, inflación inicial, decretos de arranque y flags. Son la
variedad entre partidas: *El Aparato* empieza con la calle ganada y el Campo en
contra; *La Motosierra* al revés; *Gobierno de Emergencia* es el modo difícil.

Tres se desbloquean con el legado, para que las primeras partidas perdidas dejen
algo.

## Balance: cómo se verifica

El motor no toca el DOM, así que se puede correr entero en Node. `simulador.js`
juega miles de partidas con tres estrategias:

- **azar** — el piso. Debe sobrevivir entre 10 y 40 meses de mediana. Si muere
  antes, el juego es injusto; si sobrevive más, no hay tensión. Hoy: 31.
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

## Lo que pide y lo que pasa

El mazo arrancó siendo, sin que nadie lo decidiera, un mostrador: ciento dieciséis
cartas de las cuales casi noventa eran alguien entrando al despacho a pedir algo.
Cada carta estaba bien por separado y el conjunto era monótono, porque la *forma*
de la situación era siempre la misma. Cambiaba quién pedía; no cambiaba qué clase
de cosa te estaba pasando.

Y había un segundo problema, más difícil de ver: muchas cartas contaban una
**categoría de problema** en vez de un hecho. "El tren anda mal" es una categoría.
No tiene cuándo, no tiene quién, no tiene una imagen. Se puede escribir sin saber
nada del tema. "Ayer el tren quedó clavado dos horas arriba de un puente y la
gente abrió las puertas y bajó a las vías" es un hecho: tiene hora, tiene gente y
tiene una imagen que cualquiera puede ver.

Las dos correcciones:

**El paquete `eventos`.** Veintidós cartas de cosas que simplemente pasan: el
apagón nacional de un domingo a la mañana, la ballena varada en la playa más
turística, el granizo sobre la zona núcleo, el traductor que en la cumbre le puso
"ingobernable" a una frase tuya, el contenedor que apareció en el puerto y no
figura en ningún papel, la transmisión que se cortó justo en el gol. Nadie las
pidió. No hay un sí ni un no: hay dos maneras de pararse frente a algo que ya
ocurrió, y por eso casi todas son dilemas.

Eso también arregló un desbalance de forma: los dilemas pasaron del 23% al 34% del
mazo, y hay un test que exige un piso del 25%. Si todo fuera gente pidiendo cosas,
gobernar sería atender un mostrador.

**Anclar las cartas abstractas en un incidente.** Doce cartas que describían un
estado de las cosas pasaron a describir algo que pasó: la obra social que suspendió
las diálisis en cuatro centros, los cuatro medios que se llevaron el sesenta por
ciento de la pauta y tres son del mismo dueño, las ciento treinta posiciones de la
lista de precios de las que en la góndola quedan once. El efecto mecánico es cero
—no se tocó un solo número— y el efecto de lectura es que la carta ahora se puede
ver.

La regla que quedó: **una carta necesita un cuándo, un cuánto o un quién**. Si se
puede escribir sin ninguno de los tres, es una categoría y hay que volver a
escribirla.

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
  dan 25 y 26 meses de mediana contra 30 al azar.
- Tienen que **morir de formas distintas**. Si los dos terminaran en el mismo
  final, el mazo estaría empujando sistemáticamente para un lado. Hoy aceptar todo
  termina en *Rehén de la plaza* (no podés tomar una sola decisión impopular) y
  rechazar todo en *Que se vayan todos* (te soltó la calle). Los dos extremos del
  mismo medidor, que es exactamente la simetría que se buscaba.

Este test ya se ganó el sueldo una vez. Las cuatro cartas de aviso tenían la
salida del borde siempre a la derecha, así que "aceptar todo" se rescataba sola de
los cuatro techos y su mediana se pegó a la del azar. Alternar de qué lado está la
salida —son dilemas, no hay convención que respetar— devolvió el margen. Ningún
humano habría detectado eso jugando.

Esas dos condiciones son lo que mantiene honesta la convención.

## Historia y objetivos

Reigns tiene un reino que persiste, una maldición de fondo y misiones. Sin nada de
eso, un roguelike de cartas es un ejercicio de equilibrio: sobrevivís o no, y todas
las partidas se parecen. Lo que se agregó, en orden de cuánto cambia la partida:

**Los objetivos** son lo que más pesa. Dos por mandato, uno corto y uno largo, para
que el mandato tenga dos tiempos: algo que te ocupa el primer año y algo que te
acompaña hasta el final. Le dan a la partida una intención además de "no morirse",
y sobre todo le dan forma a las decisiones: la misma carta se elige distinto si
estás persiguiendo *Domar la bestia* que si perseguís *Sin tutela*.

Tres detalles de balance:

- Algunos objetivos pagan con una **elección de decreto fuera de horario**. Es el
  premio más fuerte que hay, porque cambia la partida y no sólo los números.
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

Lo que falta para tener de verdad el "reino que persiste" de Reigns: que una partida
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

## La forma de la carta

Arrancó siendo casi cuadrada, 330 por 330. Se ve mal por dos razones: el texto cae
en renglones largos que obligan a barrer con la vista, y no se parece a nada que
uno tenga en la mano.

Ahora la proporción es 10:16 — la de un teléfono. Renglones cortos, el retrato con
aire arriba, y la carta se lee como un objeto y no como un panel.

El detalle técnico que importa: **la altura manda y la proporción deriva el ancho**
(`height: 100%` + `aspect-ratio`), no al revés. Con el ancho fijo, en pantallas
bajas la carta empujaba la botonera abajo del fold; con la altura al mando, la
carta se achica para que todo entre. La pantalla de juego es la única con
`overflow: hidden`: el menú y el final se leen scrolleando, pero una partida que
obliga a scrollear para ver los botones no es jugable.

Eso también obligó a comprimir la tira de objetivos a dos fichas en una línea: el
espacio vertical es de la carta, y todo lo demás está de invitado.

## Vocabulario

Dos palabras se cambiaron porque en la mesa no se dicen así:

- **Círculo Rojo**, no "Rosca", para el medidor 🎩. Es como le dicen los que están
  adentro. La clave interna sigue siendo `rosca` —el juego se llama así— y lo que
  ve el jugador sale de `META_STATS.nombre`; el rótulo del medidor usa `corto`,
  porque en una columna de ochenta y cuatro píxeles entra una palabra y no dos.
- **Partida**, no "corrida", para una vuelta completa del juego. En este país una
  corrida es cambiaria o bancaria, y en otro registro es peor. La única excepción
  es la carta `corrida`, que habla de mil doscientos millones que se fueron en un
  día: ahí la palabra es exactamente la que corresponde.
- **Nombre del mandato**, no "semilla". Es lo mismo —el mismo nombre da la misma
  partida— pero "semilla" es jerga de desarrollo y no le dice nada a nadie. En el
  código sigue siendo `semilla`, que es lo que es.

La regla general: **las claves del código son identificadores y no se traducen;
lo que ve el jugador está en una sola propiedad y se puede cambiar sin tocar una
línea de lógica.** Los tres cambios de arriba no movieron un solo número.

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
- Que una partida deje marcas en la siguiente: el país que heredás debería
  acordarse de lo que hizo el anterior, que además eras vos.
- Retratos que reaccionen: la misma receta con `ceja: 'enojada'` cuando el Pueblo
  está en rojo, o `ojos: 'cansado'` pasados los tres años de mandato.
- Elecciones de medio término como evento de mes 24 con consecuencias en Rosca.
- Cadenas más largas (hoy la más larga tiene tres eslabones).
- Modo "provincia": misma mecánica, escala municipal, medidores distintos.
