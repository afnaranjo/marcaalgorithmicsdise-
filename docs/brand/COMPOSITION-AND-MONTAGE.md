# Composición y montaje fotográfico

Estado: `APPROVED`  
Alcance: `GLOBAL` con recetas `PROGRAM/CAMPAIGN`

## 1. Regla de plausibilidad

Un montaje debe poder existir frente a una cámara real.

Verificar escala, perspectiva, horizonte, lente, punto de fuga, posición de manos, contacto con superficies, dirección y dureza de luz, temperatura, profundidad de campo y oclusiones.

## 2. Integración de sujeto

Un buen recorte no se reconoce como recorte.

### Bordes

- eliminar halos blancos/oscuros;
- conservar cabello fino cuando corresponda;
- evitar borde de sticker;
- igualar nitidez con el plano.

### Luz

- igualar key light;
- crear light wrap sutil solo cuando sea físicamente coherente;
- ajustar sombras de contacto;
- no iluminar cara y laptop desde direcciones incompatibles sin fuente visible.

### Color

- balancear temperatura;
- mantener piel humana;
- evitar magenta excesivo por el púrpura de marca;
- evitar piel de porcelana.

## 3. Conservación de fisonomía

Si una persona real es referencia, quedan bloqueados salvo instrucción explícita:

- estructura craneal;
- forma de ojos;
- nariz;
- mandíbula;
- proporciones faciales;
- tono general de piel;
- identidad;
- edad aparente.

Se puede mejorar iluminación, corregir color, limpiar imperfecciones temporales sin plastificar, suavizar rojez de forma natural, cambiar expresión moderadamente e integrar vestimenta aprobada cuando se solicite.

## 4. Receta validada — estudiante programando sobre-hombro

Uso: Python y escenas donde la acción de programar debe ser creíble.

### Cámara

- detrás del estudiante;
- ligeramente hacia uno de los costados;
- vista tres cuartos;
- perfil parcial del rostro.

### Sujeto

- sentado;
- hombro visible;
- manos sobre teclado;
- postura natural;
- ojos claramente orientados al centro de la pantalla.

### Laptop

- directamente frente al estudiante;
- perspectiva diagonal aproximada 35–50°;
- display visible para el espectador;
- pantalla no frontal al espectador;
- teclado alineado con manos;
- bisagra y plano físicamente posibles.

### Pantalla

- código real/coherente;
- contraste suficiente;
- sin datos personales;
- contenido mapeado a la perspectiva del display;
- nada de código flotando sobre tapa, manos o aire.

### Layout

- estudiante + laptop ocupan un lado;
- lado opuesto libre para textos;
- copy no invade rostro, manos ni pantalla.

### Evitar

- estudiante detrás de la pantalla;
- mirada a teclado cuando programar es la acción principal;
- mirada a cámara;
- laptop entre cara y cuerpo de modo imposible;
- pantalla perfectamente frontal;
- brazos/manos sin apoyo;
- perspectiva contradictoria.

## 5. Receta — cambio de estudiante sin rediseñar

Cuando la orden es sustituir a una persona:

1. conservar encuadre;
2. conservar pose;
3. conservar tamaño;
4. conservar dirección de luz;
5. conservar laptop y props no mencionados;
6. conservar sombras;
7. conservar fondo;
8. adaptar ropa solo si se pide;
9. conservar fisonomía del nuevo sujeto;
10. no mover texto ni marca salvo necesidad física inevitable.

## 6. Receta — “solo cambia el rostro”

- mantener cuerpo, ropa, pose, cabello y composición;
- el rostro debe pertenecer a la persona de referencia;
- si se solicita sonrisa: natural y coherente con ojos, pómulos y mandíbula;
- no cambiar edad aparente;
- no embellecer hasta perder identidad.

## 7. Receta — eliminar un elemento

Si se pide quitar CTA, logo, fecha, recuadro, texto inferior, estrellas o decoración, reconstruir el área con continuidad del fondo y no redistribuir automáticamente toda la composición.

Solo reequilibrar si el vacío resultante rompe la pieza.

## 8. Edición quirúrgica

“Solo cambia X” significa que todo lo no mencionado queda bloqueado. Antes de terminar, comparar con la versión original y verificar que no se introdujeron cambios no solicitados.

## 9. Perspectiva de pantallas y overlays

Las interfaces deben respetar el cuadrilátero de la pantalla, reducirse por perspectiva, tomar la luminosidad del display, recibir blur/nitidez según foco y quedar ocluidas por dedos/bordes cuando corresponda.

No pegar una captura rectangular sin transformación.

## 10. Sombras

Usar sombra de contacto, sombra proyectada, ambient occlusion sutil y rebote de color cuando tenga sentido.

No usar una sombra negra genérica debajo de cada objeto.

## 11. Profundidad de campo

El desenfoque sigue la distancia y el plano focal, no una jerarquía arbitraria. Si la cámara enfoca al estudiante, el fondo puede suavizarse y la pantalla mantenerse legible si comparte suficiente plano.

## 12. Montaje con mundos de juego

Para Roblox/Scratch:

- fotografía real como protagonista;
- mundo/juego como contexto;
- oclusión y profundidad creíbles;
- no convertir al estudiante en avatar;
- no copiar paletas externas que desplacen Algorithmics;
- evitar estética gamer neón salvo campaña explícita y aprobada.

## 13. Quality gate

Un montaje falla si se nota el recorte, no coincide luz/escala/perspectiva, la pantalla es imposible, el rostro cambió de persona, las manos se deforman, la postura no podría sostenerse o el fondo parece un generador genérico.
