# LA ROSCA — hoja de ruta narrativa

> Estado: **propuesta, no implementada.** Este documento define hacia dónde va el
> contenido. `DESIGN.md` explica cómo funciona lo que ya existe.

## El diagnóstico

Medido sobre el mazo actual (141 cartas sorteables):

| | Hoy |
|---|---|
| Cartas sin fecha (salen en cualquier mes) | 70 |
| Cartas que se habilitan en el año 1 / 2 / 3 / 4 | 58 / 10 / 2 / **0** |
| Cartas sobre elecciones, listas o campaña | **0** |
| Facción principal: Pueblo / Círculo Rojo / Caja / Campo | 72 / 27 / 23 / **19** |
| Cartas del Periodista (el personaje más usado) | 18 |

Tres consecuencias. **El tiempo no pesa**: el mes 40 se juega igual que el mes 5.
**Falta lo más argentino de todo**: un mandato de cuatro años sin elección de medio
término ni sucesión. Y **el calendario es abstracto**: la pantalla dice "Mes 7"
aunque el prólogo diga que asumiste un 10 de diciembre.

## El concepto

**El mandato sigue el almanaque político real.** Cuatro años con identidad propia,
atravesados por golpes que se repiten todos los años y por cuatro hilos que
empiezan en el año 1 y se cobran en el año 4.

El mes 1 es diciembre. La pantalla deja de decir "Mes 7" y pasa a decir
**"Junio · Año 1"**. Con esa sola correspondencia, las fechas de la política
argentina caen solas en el tablero:

| Mes del juego | Qué es | Hito |
|---|---|---|
| 1 | Diciembre, año 1 | Asunción, 10 de diciembre |
| 4 | Marzo, año 1 | Apertura de sesiones, 1° de marzo |
| 19 | Junio, año 2 | Cierre de listas del medio término |
| 21 | Agosto, año 2 | Primarias |
| 23 | Octubre, año 2 | **Elección de medio término** |
| 43 | Junio, año 4 | Cierre de listas presidencial |
| 45 | Agosto, año 4 | Primarias |
| 47 | Octubre, año 4 | **Elección presidencial** |
| 48 | Noviembre, año 4 | Balotaje |
| 49 | Diciembre | Traspaso del mando — fin |

---

## Los cuatro años

### Año 1 — La luna de miel y la herencia
*Diciembre a noviembre · meses 1 a 12*

Asumís con capital político y con un país que no elegiste. Todo lo malo todavía se
le puede echar al que se fue, pero esa carta se gasta: sirve seis meses, no cuatro
años. Es el año de las decisiones fundacionales —por decreto o por ley, de una o
de a poco— y de la primera cosecha, que es la única entrada grande de dólares.

**Tensión principal: Caja y Campo.**

| Mes | Decisión | Quién la trae | Facción |
|---|---|---|---|
| Dic | ¿Publicar la auditoría de la herencia o mirar para adelante? | Jefe de Gabinete | Círculo Rojo |
| Ene | El paquete de reformas: ¿decreto de necesidad y urgencia o ley en el Congreso? | Jefe de Gabinete | Círculo Rojo |
| Feb | Paritaria docente: ¿empiezan las clases el 1° de marzo? | La Maestra | Pueblo |
| Mar | Discurso ante la Asamblea Legislativa: ¿confrontación o unidad? | Tu Vice | Círculo Rojo |
| Mar | El acto del 24 de marzo: presencia, tono y a quién invitás | Periodista | Pueblo |
| Abr–May | Cosecha gruesa: ¿dólar diferencial para que liquiden o retenciones firmes? | El Productor | **Campo** |
| May | Tedeum del 25 de mayo: el obispo habla de pobreza con vos en primera fila | El Obispo | Pueblo |
| Jun | Aguinaldo y frío: ¿gas importado caro o cortes a la industria? | Ministro de Economía | Caja |
| Jun–Ago | Primer paro general | El Secretario General | Pueblo |
| Nov | ¿Primer cambio de gabinete o bancar al equipo? | Jefe de Gabinete | Círculo Rojo |

### Año 2 — El medio término
*Diciembre a noviembre · meses 13 a 24*

Todo el año se dobla hacia octubre. La pregunta ya no es qué conviene hacer sino
qué conviene hacer **antes de la elección**. Aparece la tentación de gastar para
ganar, el cierre de listas enfrenta a tu propio espacio, y el resultado cambia el
resto del mandato: ganar te da diputados y oxígeno; perder te convierte en un
presidente con fecha de vencimiento.

**Tensión principal: Pueblo contra Caja, con la inflación de árbitro.**

| Mes | Decisión | Quién la trae | Facción |
|---|---|---|---|
| Dic | Diciembre caliente: los intendentes piden refuerzo para las fiestas | El Intendente | Pueblo |
| Ene–Mar | ¿Plata en el bolsillo antes de la elección? El famoso "plan" | Ministro de Economía | Caja → Inflación |
| Mar | El encuestador trae números: ¿nacionalizar la elección o esconder tu cara? | **El Encuestador** | Círculo Rojo |
| Abr | ¿Suspender las primarias? Ahorra plata y evita la interna a cielo abierto | Tu Vice | Círculo Rojo |
| Jun | Cierre de listas: ¿un famoso de afuera, un intendente fuerte o la gente de tu Vice? | **El Armador** | Círculo Rojo |
| Jun | Candidaturas testimoniales: gobernadores que encabezan listas sin intención de asumir | La Gobernadora | Círculo Rojo |
| Ago | Primarias: el resultado sale de tus medidores | *(hito)* | — |
| Sep | Entre las primarias y la general: ¿gastar lo que no hay? | Ministro de Economía | Caja |
| Oct | **Elección de medio término** | *(hito)* | Pueblo |
| Nov | El día después: ¿reacomodo de gabinete o doblar la apuesta? | Jefe de Gabinete | Círculo Rojo |

**El resultado importa mecánicamente.** Ganar suma Círculo Rojo y pone la flag
`gano_medio_termino`; perder lo resta, pone `pato_rengo` y habilita la rebelión
interna del año 3.

### Año 3 — Gobernar o durar
*Diciembre a noviembre · meses 25 a 36*

El único año sin elecciones y la única ventana para las reformas grandes. También
es cuando llegan las facturas del año 1: la causa judicial que parecía cerrada, el
vencimiento de deuda grande, la vacante en la Corte. Y en tu propio espacio ya se
habla de quién viene después.

**Tensión principal: Círculo Rojo y Campo.**

| Mes | Decisión | Quién la trae | Facción |
|---|---|---|---|
| — | La reforma que sólo se puede hacer este año: laboral, previsional o impositiva | Jefe de Gabinete | Pueblo vs Campo |
| — | ¿Salir del cepo? Unificar el dólar de una o seguir con cinco cotizaciones | **El Titular del Banco Central** | Caja / Campo |
| — | El vencimiento grande: ¿pagar, renegociar con el Fondo o patear? | El Enviado del Organismo | Caja |
| — | Un juez de Nueva York condena al Estado por una expropiación de hace diez años | **El Juez de Nueva York** | Caja |
| — | Swap con Oriente o acuerdo con Washington: los dos embajadores piden audiencia | **El Embajador** | Caja / Campo |
| — | Vacante en la Corte, o la tentación de ampliarla | La Jueza Federal | Círculo Rojo |
| — | Los gobernadores piden fondos para sus propias reelecciones | La Gobernadora | Círculo Rojo |
| — | Un diputado de tu bloque se pasa a la oposición el día de una votación clave | **El Diputado Díscolo** | Círculo Rojo |

### Año 4 — La sucesión
*Diciembre a noviembre · meses 37 a 48, más el traspaso*

La pregunta del año se hace en diciembre: ¿vas por la reelección o bendecís a un
delfín? Todo lo demás se ordena alrededor de esa respuesta. Es el año de la obra
pública apurada, del debate presidencial y de la elección que decide el final.

**Tensión principal: Pueblo e Inflación.**

| Mes | Decisión | Quién la trae | Facción |
|---|---|---|---|
| Dic | ¿Reelección o delfín? Define el resto del año | Tu Vice | Círculo Rojo |
| Ene–Jun | Obra pública a la carrera: inaugurar antes de octubre | El Intendente | Caja → Inflación |
| Jun | La fórmula: ¿quién te acompaña? | **El Armador** | Círculo Rojo |
| Ago | Primarias | *(hito)* | — |
| Sep | Debate presidencial: ¿atacar al opositor o proponer? | **El Candidato Opositor** | Pueblo |
| Oct | **Elección presidencial** | *(hito)* | — |
| Nov | Balotaje, si hace falta | *(hito)* | — |
| Dic | Traspaso del mando: el bastón, ¿a quién se lo entregás? | *(final)* | — |

**El final deja de ser "sobreviviste 48 meses" y pasa a ser el resultado de una
elección**, calculado con los medidores: el Pueblo pesa más, el Círculo Rojo
aporta el aparato, la inflación resta. Aparecen finales nuevos: reelecto, ganó tu
delfín, perdiste en balotaje, perdiste en primera vuelta.

---

## El almanaque: lo que vuelve todos los años

Además de los hitos de cada año, hay golpes que se repiten cada doce meses. Son lo
que hace que el año se sienta como un año.

| Mes | Golpe | Facción |
|---|---|---|
| Enero | Temporada: la costa llena o vacía | Pueblo |
| Febrero | Paritaria docente y el comienzo de clases | Pueblo |
| Marzo | Apertura de sesiones · 24 de marzo | Círculo Rojo · Pueblo |
| Abril–Junio | Cosecha gruesa: los dólares del año | **Campo** |
| Mayo | Tedeum del 25 de mayo | Pueblo |
| Junio | Primer aguinaldo · frío y gas | Caja |
| Julio | Vacaciones de invierno · 9 de julio | Pueblo |
| Octubre | 17 de octubre, según de qué lado estés | Círculo Rojo |
| Diciembre | Segundo aguinaldo · fiestas · diciembre caliente | Pueblo · Caja |

---

## Los cuatro hilos largos

Historias que empiezan en el año 1 y se cobran después. Se construyen con la
mecánica de `siembra` que ya existe.

**1. La herencia.** En el año 1 el ex presidente es a quien culpás. En el año 3
vuelve a la política. En el año 4 puede ser tu rival. Y el cierre del hilo cruza
partidas: **en la partida siguiente, la herencia sos vos** — el ex presidente de
la nueva partida es el que jugaste antes, con tus decisiones y tu final. Esto es
lo que venía faltando para que el país se acuerde.

**2. La interna con tu Vice.** Año 1, cortesía para la foto. Año 2, pelea por las
listas. Año 3, distancia pública. Año 4, la sucesión: o la bendecís o te enfrenta.

**3. El Fondo.** Año 1, firmar o no. Año 2, las revisiones que complican el plan
electoral. Año 3, el vencimiento grande. Año 4, el pedido de perdón por las metas
incumplidas en año de elecciones.

**4. La causa.** Año 1, un favor chico que parece no tener consecuencias. Año 3,
el procesamiento. Año 4, aparece en el debate presidencial.

---

## Los personajes

### Nuevos

Siempre arquetipos, nunca personas reales ni partidos con nombre.

| Personaje | Aparece | Para qué sirve | Facción principal |
|---|---|---|---|
| **El Jefe de Gabinete** | Todo el mandato | El que trae la agenda y el fusible que se puede quemar | Círculo Rojo |
| **El Ex Presidente** | Años 1, 3 y 4 | La herencia; después, el rival | Pueblo / Círculo Rojo |
| **El Encuestador** | Años 2 y 4 | Los números que ordenan la campaña | Pueblo |
| **El Armador** | Años 2 y 4 | El cierre de listas, lugar por lugar | Círculo Rojo |
| **El Titular del Banco Central** | Años 1 y 3 | Reservas, cepo, emisión | Caja |
| **El Embajador** | Año 3 | La geopolítica: Washington o el swap | Caja / Campo |
| **El Obispo** | Mayo de cada año | La Iglesia institucional, no la del barrio | Pueblo |
| **El Juez de Nueva York** | Año 3 | La deuda que viene de afuera | Caja |
| **El Diputado Díscolo** | Años 2 y 3 | El voto que se da vuelta | Círculo Rojo |
| **El Candidato Opositor** | Año 4 | El rival del debate | Pueblo |

### Los que ya existen, redistribuidos

- **El Periodista** baja de 18 cartas a unas 10: deja de ser el comodín que "trae
  la noticia" y se queda con lo que es suyo — la entrevista, la tapa, el carpetazo.
  Buena parte de sus cartas pasa al Jefe de Gabinete y al Encuestador.
- **El Productor** sube: la cosecha de cada año es suya, y el Campo es la facción
  más subrepresentada del mazo.
- **Tu Vice** gana un arco completo de cuatro años.

---

## Balance de facciones

| | Hoy | Objetivo |
|---|---|---|
| Pueblo | 51% | ~35% |
| Círculo Rojo | 19% | ~28% |
| Caja | 16% | ~20% |
| Campo | 13% | ~17% |

Casi todo el contenido nuevo es Círculo Rojo (listas, Congreso, sucesión) y Campo
(cosecha, retenciones, dólar). El Pueblo ya está sobrado.

---

## Lo que hay que construir en el motor

Poco, y todo chico:

1. **Calendario real.** `Mes 7` pasa a `Junio · Año 1`. Una función.
2. **Condición por mes del calendario y por año.** `requiere: { mesCalendario: 'jun' }`
   y `requiere: { anio: 2 }`, además del `mesMin` que ya existe. Con eso cada carta
   se ancla a su época.
3. **Agenda de hitos.** Una lista de cartas que salen sí o sí en un mes dado:
   elecciones, apertura de sesiones, cierre de listas. Es lo mismo que ya hace la
   carta de asunción en el mes 1, generalizado.
4. **La elección como cálculo.** Una función que toma los medidores y devuelve
   porcentajes. El medio término modifica el Círculo Rojo; la presidencial decide
   el final.
5. **El ex presidente en el legado.** Guardar el resumen de la partida anterior
   para que la siguiente lo use como herencia.

## Orden de trabajo

| Fase | Qué | Por qué primero |
|---|---|---|
| **1** | Calendario real + almanaque anual | El cambio más barato y el que más identidad da. Casi todo es reetiquetar cartas existentes y sumar unas diez. |
| **2** | Año 2: el medio término | Le da forma a la mitad del mandato. Suma el Encuestador y el Armador. |
| **3** | Año 4: la sucesión y el final electoral | Cambia cómo termina el juego. Suma al Candidato Opositor. |
| **4** | Los cuatro hilos largos | Usa la `siembra` que ya existe. Suma al Ex Presidente. |
| **5** | Año 3 + balance de facciones + herencia entre partidas | Lo que queda, con todo lo anterior andando. |

## Reglas de tono que se mantienen

- **Arquetipos, nunca personas reales ni partidos con nombre.**
- **La grieta no tiene razón**: cada lado paga sus decisiones.
- **El 24 de marzo no es un chiste.** La carta existe porque el acto es una
  decisión política real todos los años, y se escribe con ese peso. Lo mismo para
  cualquier referencia a víctimas reales.
- **Una carta necesita un cuándo, un cuánto o un quién** (ver `DESIGN.md`). Con el
  calendario real, el *cuándo* viene dado.
