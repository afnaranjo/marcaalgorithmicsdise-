# Decisiones de diseño

## DEC-2026-001

Fecha: 2026-08-25  
Estado: `SUPERSEDED` por `DEC-2026-002`  
Área: Identidad visual  
Alcance: `GLOBAL`

### Decisión

Adoptar Montserrat como tipografía principal y la paleta de trabajo morado `#602B7A`, turquesa `#33DFC0` y amarillo `#FFD749`.

### Motivo

Son los valores declarados en la instrucción maestra y coinciden con las variantes de logotipo suministradas por el usuario.

### Aplicación

Documentación, piezas gráficas, campañas, plantillas y tokens Algorithmics.

### No aplica

No reemplaza el sistema visual bloqueado de presentaciones NID ni invalida un futuro manual corporativo autorizado.

La definición de tres colores quedó sustituida por la paleta dura de cuatro colores aprobada en `DEC-2026-002`.

### Referencias

- `assets/brand/logos/`
- `assets/brand/fonts/montserrat/`
- `config/brand/colors.json`

## DEC-2026-002

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Color  
Alcance: `GLOBAL_ALGORITHMICS`

### Decisión

Fijar como regla dura la paleta de cuatro colores: Púrpura Oscuro `PANTONE 7664 C` / `#602B7A`, Amarillo Septiembre `PANTONE 122 C` / `#FFD749`, Menta Fresca `PANTONE 333 C` / `#33DFC0` y Frambuesa `PANTONE 184 C` / `#F44C75`.

Las capturas entregadas por el usuario son la autoridad para RGB, HSB y CMYK. El manual HTML es una guía complementaria y confirma Pantone, HEX y RGB, pero sus conversiones CMYK no prevalecen.

### Aplicación

- Pantone para tinta directa.
- HEX/RGB exacto para digital.
- CMYK de las capturas para impresión de proceso hasta definir un perfil ICC con la imprenta.
- No sustituir, aproximar ni alterar silenciosamente los cuatro colores.

### No aplica

No modifica el sistema visual NID. Tampoco aprueba automáticamente los demás contenidos del manual HTML.

### Referencias

- `docs/brand/COLORS.md`
- `docs/brand/MANUAL-REVIEW.md`
- `config/brand/colors.json`
- `assets/brand/colors/algorithmics-official-palette.svg`

## DEC-2026-003

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Dirección de arte  
Alcance: `GLOBAL`

### Decisión

Adoptar como principio obligatorio: **IA como herramienta, nunca como estética**. Una pieza debe sentirse dirigida por un diseñador humano y no depender de clichés visuales de generación automática.

### Aplicación

Posts, carruseles, stories, reels, anuncios, flyers, presentaciones, fotomontajes, prompts e imágenes base.

### Referencias

- `docs/brand/ART-DIRECTION.md`
- `docs/brand/ANTI-AI-AESTHETIC.md`
- `config/brand/art-direction.json`

## DEC-2026-004

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Edición  
Alcance: `GLOBAL`

### Decisión

Una instrucción puntual no autoriza rediseño. En correcciones tipo “quita el CTA”, “cambia el morado”, “cambia solo el rostro” o “quita el logo”, todo elemento no mencionado permanece bloqueado salvo imposibilidad física evidente.

### Referencias

- `docs/brand/COMPOSITION-AND-MONTAGE.md`
- `prompts/image-generation/surgical-edit.md`

## DEC-2026-005

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Fotografía y fisonomía  
Alcance: `GLOBAL`

### Decisión

Cuando una fotografía real es referencia y se solicita conservar fisonomía, identidad facial, edad aparente y rasgos estructurales no deben cambiar. La mejora técnica no debe convertir a la persona en un rostro genérico.

### Referencias

- `docs/brand/COMPOSITION-AND-MONTAGE.md`

## DEC-2026-006

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Montaje de programación  
Alcance: `PROGRAM` — Python / escenas de código

### Decisión

Validar la composición sobre-hombro: estudiante mirando el display, perfil parcial, manos sobre teclado, laptop en perspectiva diagonal aproximada de 35–50°, código dentro del display y espacio negativo lateral para copy.

### Referencias

- `prompts/image-generation/student-with-laptop.md`
- `docs/brand/COMPOSITION-AND-MONTAGE.md`

## DEC-2026-007

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Memoria creativa  
Alcance: `GLOBAL`

### Decisión

Los artes históricos no se versionan indiscriminadamente. Se extraen patrones reutilizables, prompts, restricciones y decisiones; se clasifican por alcance `GLOBAL`, `PROGRAM`, `CAMPAIGN` o `PIECE`. Las fotos identificables de menores requieren revisión de autorización antes de entrar al repositorio.

### Referencias

- `examples/approved/composition-patterns.md`
- `examples/reference/asset-handling.md`
- `examples/reference/historical-campaign-index.md`

## DEC-2026-008

Fecha: 2026-08-25  
Estado: `APPROVED`  
Área: Cumpleaños / felicitaciones  
Alcance: `CAMPAIGN`

### Decisión

Adoptar una **primera propuesta por defecto para artes de cumpleaños de Algorithmics** con estas características:

- fondo inicial Amarillo Septiembre `#FFD749`;
- Púrpura Oscuro `#602B7A` como estructura y tipografía dominante;
- acentos controlados Menta Fresca `#33DFC0` y Frambuesa `#F44C75`;
- Montserrat como tipografía principal;
- fotografía real del estudiante como ancla, preferentemente en tercio izquierdo;
- conservar pose y fisonomía; no es obligatorio sentar al estudiante;
- jerarquía derecha: `FELIZ` → `CUMPLEAÑOS` → nombre → mensaje;
- lenguaje pixel/voxel permitido como recurso de campaña, no como nueva identidad;
- tipografía pixel permitida solo como acento, nunca como sustituto de Montserrat;
- evitar glow/neón, estética gamer genérica y señales visuales típicas de IA.

### Motivo

La combinación aprobada integra una estética digital lúdica y juvenil con el sistema cromático y tipográfico oficial, mantiene protagonismo humano y mejora la diferenciación de las felicitaciones frente a plantillas genéricas.

### Privacidad

Guardar el patrón y el prompt; no subir automáticamente fotografías identificables de menores al repositorio sin autorización explícita para ese alcance.

### Referencias

- `prompts/campaigns/birthday-greeting.md`
- `config/brand/colors.json`
- `config/brand/typography.json`
- `docs/brand/ANTI-AI-AESTHETIC.md`
