# Cumpleaños Algorithmics — primera propuesta por defecto

Estado: `APPROVED`  
Alcance: `CAMPAIGN` — Birthday / felicitaciones de estudiantes  
Prioridad: **usar como primera propuesta cuando el usuario pida un arte de cumpleaños para Algorithmics**, salvo instrucción explícita distinta.

## Referencia visual canónica — OBLIGATORIA

La plantilla ya no debe reconstruirse solo desde memoria o desde este prompt.

**Master visual:** `examples/approved/birthday-template-v1.svg`  
**Contrato de uso:** `examples/approved/birthday-template-v1.md`

Antes de generar un cumpleaños:

1. cargar/descargar el SVG master;
2. usarlo como `reference image`, `composition reference` o master editable;
3. conservar el layout con fidelidad alta;
4. sustituir **solo FOTO + NOMBRE** por defecto;
5. no reinterpretar la composición si el usuario no lo pidió.

El SVG es una **fuente de verdad visual**, no una inspiración. Si la herramienta generativa no admite SVG, rasterizar/visualizar el master y usar esa imagen como referencia antes de generar.

**Está prohibido generar una nueva composición desde cero cuando este master esté disponible.**

## Trigger operativo — entrada mínima

Esta plantilla debe activarse automáticamente cuando el usuario:

- suba una fotografía de un estudiante y pida un arte/post de **feliz cumpleaños para Algorithmics**;
- diga únicamente “feliz cumpleaños”, “cumpleaños Algorithmics”, “hazlo como la plantilla aprobada” o equivalente dentro del proyecto;
- vuelva en otro chat/proyecto y pida la primera propuesta de cumpleaños de Algorithmics.

**Entrada mínima aceptada: `{{student_photo}}`.**

No volver a pedir al usuario que defina la composición, colores, tipografía, fondo ni estilo si no ha solicitado cambiarlos: el master visual ya los define.

Si el usuario no proporciona nombre:

- **no inventarlo**;
- generar la pieza sin nombre o dejar el bloque de nombre preparado para edición;
- si el nombre viene explícitamente en el mensaje, usarlo exactamente como se entregó.

Si el usuario no proporciona mensaje:

- usar el mensaje base aprobado de esta plantilla.

Por defecto, la primera propuesta debe conservar esta composición y solo sustituir la fotografía y el nombre autorizado.

## Objetivo

Crear una pieza de cumpleaños que se sienta inequívocamente Algorithmics: alegre, tecnológica, juvenil y humana, sin convertirse en un anuncio gamer genérico ni en una composición con estética evidente de IA.

La idea dominante es:

> **Celebrar al estudiante dentro del universo creativo de Algorithmics.**

## Formato base

- Instagram post `1080 × 1350 px` / 4:5.
- Recompone para 9:16 solo si se solicita; no hacer simple recorte.
- Lectura móvil prioritaria.

## Variables

- `{{student_photo}}`: fotografía real autorizada del estudiante.
- `{{student_name}}`: nombre a mostrar; opcional, nunca inventar.
- `{{birthday_message}}`: por defecto queda bloqueado al mensaje aprobado; solo cambiar si el usuario lo pide.
- `{{format}}`: 4:5 por defecto.

Mensaje base aprobado:

> Que este nuevo año venga lleno de ideas, proyectos y sueños que puedas convertir en realidad.

## Dirección visual — plantilla bloqueada

### Composición

1. **Fotografía real del estudiante como ancla principal** en el lado izquierdo, entrando desde el borde inferior y ocupando aproximadamente 35–45% del ancho.
2. No es obligatorio sentarlo. Mantener la postura natural de la fotografía suministrada; si está de pie, conservarla.
3. Preservar estrictamente fisonomía, edad aparente, tono de piel, cabello, ropa y gesto salvo petición explícita.
4. En el lado derecho conservar la jerarquía vertical del master:
   - `FELIZ`;
   - `CUMPLEAÑOS`;
   - banda blanca con nombre;
   - caja púrpura de mensaje con borde menta.
5. Mantener aire real entre bloques.
6. La fotografía debe integrarse con bordes limpios, escala plausible, sombra/contacto coherente y sin halo de recorte.
7. **No reinterpretar la plantilla en cada solicitud.** Si el usuario solo cambia la foto y el nombre, mantener estructura, jerarquía, pixel/voxel, paleta y proporciones del SVG master.
8. Mantener los escalones/pixel terrain púrpura del lateral izquierdo y base inferior como parte del sistema visual aprobado.

### Fondo

Fondo bloqueado por defecto: **Amarillo Septiembre `#FFD749`** con estructura principal en **Púrpura Oscuro `#602B7A`**.

Acentos:

- Menta Fresca `#33DFC0`;
- Frambuesa `#F44C75`;
- blanco funcional.

No cambiar el fondo dominante salvo instrucción explícita.

### Sistema pixel / voxel

El lenguaje pixel/voxel queda **aprobado como recurso de campaña para cumpleaños** porque conecta juego, creación digital y programación.

Conservar los elementos del master con control:

- corazón pixel;
- sombrero de cumpleaños pixel;
- símbolo de código;
- confetti geométrico;
- pastel pixel en la banda de nombre;
- pixel terrain/escalones púrpura.

Evitar copiar personajes, assets o tipografías propietarias de Minecraft, Roblox u otras IP.

**Tipografía tipo pixel:** solo puede aparecer como acento decorativo. **No reemplaza la tipografía oficial.**

## Tipografía

La tipografía principal sigue siendo **Montserrat**.

- `FELIZ`: Montserrat ExtraBold/Black.
- `CUMPLEAÑOS`: Montserrat ExtraBold/Black, gran escala.
- `{{student_name}}`: Montserrat Bold dentro de la banda blanca.
- `{{birthday_message}}`: Montserrat Medium/SemiBold.

No usar una fuente “Minecraft” como tipografía institucional ni para el logo.

## Logo

- Insertar **asset oficial** de Algorithmics desde `assets/brand/logos/`.
- No reconstruir el logo con texto.
- No generar el logo mediante IA.
- Respetar zona de seguridad.
- Mantener la ubicación del master en el cuadrante superior izquierdo.

Si la herramienta generativa no puede garantizar el logo/tipografía exactos, generar la base respetando el master y componer logo/textos después con assets oficiales.

## Flujo operativo preferido

### A. Edición de master

Abrir `examples/approved/birthday-template-v1.svg` y sustituir:

- `student-photo` → fotografía nueva;
- `student-name` → nombre nuevo.

Eliminar el grupo `template-note` en exportación final.

### B. Generación con referencia visual

Si no se puede editar el SVG:

1. descargar/visualizar el SVG master;
2. usarlo como referencia de composición de alta prioridad;
3. adjuntar también la nueva fotografía del estudiante;
4. pedir preservación del layout;
5. no permitir redistribución creativa de los bloques;
6. recomponer logo y textos con assets oficiales si la IA los altera.

## Prompt maestro de generación

> Carga primero `examples/approved/birthday-template-v1.svg` y trátalo como master visual, no como inspiración. Reproduce la composición con fidelidad alta y no diseñes una alternativa. Sustituye únicamente la fotografía del slot izquierdo por `{{student_photo}}`, conservando exactamente fisonomía, edad aparente, cabello, tono de piel, ropa, proporciones y gesto del estudiante, y cambia únicamente la banda de nombre por `{{student_name}}` si fue proporcionado. Mantén bloqueados el fondo Amarillo Septiembre `#FFD749`, la estructura Púrpura Oscuro `#602B7A`, los acentos Menta `#33DFC0` y Frambuesa `#F44C75`, el headline `FELIZ CUMPLEAÑOS`, el mensaje base, la banda blanca de nombre, la caja púrpura con borde menta, el pixel terrain inferior/lateral, corazón, sombrero, símbolo de código, pastel y confetti. Mantén Montserrat como lenguaje tipográfico. Integrar la foto con piel natural, luz coherente, bordes limpios y sombras físicas. Evitar glow/neón, piel plástica, UI flotante, fondos sci-fi, objetos 3D aleatorios, simetría automática y cualquier señal de estética IA. No generar ni reconstruir el logo: usar el asset oficial desde `assets/brand/logos/`. Si la herramienta cambia tipografía o logo, generar la base y recomponer esos elementos en edición. No inventar una nueva composición.

## Texto de arte bloqueado por defecto

**FELIZ**  
**CUMPLEAÑOS**

`{{student_name}}` — solo si fue proporcionado

Que este nuevo año venga lleno de **ideas**, **proyectos** y **sueños** que puedas convertir en realidad.

## Prohibido

- generar el layout desde cero ignorando el SVG master;
- cambiar la cara del estudiante;
- convertirlo en avatar o personaje;
- mover arbitrariamente el estudiante al centro/derecha;
- cambiar la jerarquía del headline;
- cambiar la posición de la banda de nombre o caja de mensaje;
- alterar el mensaje base sin petición;
- subir saturación o suavizado hasta plastificar piel;
- glow gamer o neón por defecto;
- fondos morado-azul “AI tech” genéricos;
- usar Minecraft/Roblox como identidad visual de la pieza;
- copiar assets de terceros sin licencia;
- llenar espacios con objetos pixel sin función;
- sustituir Montserrat por una fuente pixel en todo el diseño;
- deformar o recrear el logo;
- inventar el nombre del estudiante;
- publicar edad u otros datos no autorizados.

## Quality gate

Antes de entregar:

- [ ] ¿Se cargó `examples/approved/birthday-template-v1.svg` como referencia real?
- [ ] ¿La composición coincide con el master aprobado?
- [ ] ¿Solo cambiaron foto + nombre, salvo instrucción explícita?
- [ ] ¿El estudiante sigue siendo exactamente la misma persona?
- [ ] ¿La primera lectura es “Feliz cumpleaños”?
- [ ] ¿Se usan los colores oficiales exactos?
- [ ] ¿Montserrat sigue siendo la tipografía principal?
- [ ] ¿El pixel/voxel funciona como recurso, no como nueva identidad?
- [ ] ¿La pieza evita señales típicas de IA?
- [ ] ¿El logo proviene de un asset oficial?
- [ ] ¿No se inventó ningún dato variable?

## Privacidad

El master guardado en Git es una plantilla visual **sin fotografía identificable del estudiante**. Conserva la composición, pero las fotos reales se incorporan únicamente en piezas finales con alcance autorizado.
