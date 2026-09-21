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

## Decisiones de tono

- **Arquetipos, nunca personas reales.** Es mejor comedia y no es difamación.
  "El Secretario General", "La Gobernadora", "El Enviado del Organismo".
- **La grieta no tiene razón.** Las cartas castigan los extremos de los dos lados:
  la Rosca en 100 te vacía el cargo igual que en 0 te voltea.
- **El humor es de resignación, no de burla.** El chiste casi nunca es el personaje:
  es la situación, y que se repita.

## Pendiente

- Arte de personajes (hoy son emojis con un color de fondo por personaje).
- Sonido: un golpe por carta, algo feo cuando un medidor entra en zona roja.
- Elecciones de medio término como evento de mes 24 con consecuencias en Rosca.
- Cadenas más largas (hoy la más larga tiene tres eslabones).
- Modo "provincia": misma mecánica, escala municipal, medidores distintos.
