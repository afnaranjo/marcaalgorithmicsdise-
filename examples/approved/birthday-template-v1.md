# Plantilla maestra aprobada — Cumpleaños Algorithmics v1

Estado: `APPROVED / CANONICAL VISUAL REFERENCE`  
Alcance: `CAMPAIGN` — cumpleaños de estudiantes  
Archivo visual obligatorio: [`birthday-template-v1.svg`](./birthday-template-v1.svg)

## Regla principal

Esta plantilla **no es una inspiración**. Es la composición base que debe reutilizarse.

Cuando el usuario pida un cumpleaños de Algorithmics y suba una fotografía, el flujo por defecto es:

1. cargar/descargar `examples/approved/birthday-template-v1.svg`;
2. usarlo como referencia visual obligatoria o como master editable;
3. sustituir la fotografía del estudiante en el slot izquierdo;
4. sustituir únicamente `NOMBRE DEL ESTUDIANTE` por el nombre proporcionado;
5. conservar el resto de la composición;
6. exportar en `1080 × 1350 px` / 4:5.

**Por defecto solo cambian FOTO + NOMBRE.**

El mensaje, jerarquía, fondo, colores, posiciones, bloques, pixel terrain, caja de mensaje, iconos y proporciones se consideran `LOCKED` salvo que el usuario pida explícitamente modificar alguno.

## Elementos bloqueados

- fondo Amarillo Septiembre `#FFD749`;
- estructura Púrpura Oscuro `#602B7A`;
- acentos Menta Fresca `#33DFC0` y Frambuesa `#F44C75`;
- lectura principal `FELIZ CUMPLEAÑOS`;
- estudiante ocupando el lado izquierdo y entrando desde el borde inferior;
- título en el cuadrante superior-derecho;
- banda blanca de nombre debajo del título;
- caja púrpura de mensaje con borde menta en el cuadrante inferior-derecho;
- mensaje base: `Que este nuevo año venga lleno de ideas, proyectos y sueños que puedas convertir en realidad.`;
- escalones/pixel terrain púrpura en lateral izquierdo y zona inferior;
- lenguaje pixel/voxel controlado: corazón, sombrero, código y confetti en colores de marca;
- jerarquía tipográfica basada en Montserrat;
- logo insertado desde asset oficial, nunca reconstruido.

## Variables permitidas por defecto

- `{{student_photo}}` — obligatorio para personalizar.
- `{{student_name}}` — usar exactamente como lo entrega el usuario; no inventar.

Variables adicionales solo con instrucción explícita:

- `{{birthday_message}}`;
- formato 9:16;
- cambio de fondo dominante;
- eliminación/adición de elementos.

## Conservación de la persona

La fotografía suministrada se trata como identidad bloqueada:

- conservar fisonomía;
- conservar edad aparente;
- conservar tono de piel;
- conservar cabello;
- conservar ropa salvo instrucción contraria;
- conservar gesto o hacer únicamente el ajuste solicitado;
- no convertir al estudiante en personaje/3D/avatar;
- no suavizar hasta piel plástica.

La integración puede corregir iluminación, color, recorte y bordes para encajar en la plantilla.

## Flujo de generación recomendado

### Opción A — Edición/composición

Preferida. Abrir el SVG master y sustituir el `student-photo` y el `student-name`. Mantener las coordenadas y tamaños del master.

### Opción B — Generación con referencia

Si la herramienta no puede editar SVG:

1. rasterizar o visualizar el SVG master;
2. enviarlo como `reference image / composition reference` junto con la nueva foto;
3. pedir **preservación de layout alta**;
4. generar la foto integrada respetando el tercio izquierdo;
5. reconstruir textos/logo con assets oficiales después si la IA no los renderiza exactamente.

Nunca generar el layout de memoria usando solo un prompt textual cuando el master visual está disponible.

## Prompt operativo corto

> Carga primero `examples/approved/birthday-template-v1.svg` y trátalo como master, no como inspiración. Reproduce la composición con fidelidad alta. Sustituye únicamente la fotografía del estudiante por `{{student_photo}}` conservando su identidad y cambia únicamente el nombre por `{{student_name}}`. Mantén bloqueados fondo, paleta, título, mensaje, posiciones, proporciones, banda de nombre, caja de mensaje, pixel terrain, iconos y jerarquía. Usa el logo oficial desde `assets/brand/logos/`. Si la herramienta generativa altera textos o logo, genera la base y recompón esos elementos en edición. No inventes una nueva composición.

## Control de calidad

- [ ] ¿Se usó el SVG master como referencia real?
- [ ] ¿La composición coincide visualmente con la plantilla aprobada?
- [ ] ¿Solo cambiaron foto y nombre, salvo petición explícita?
- [ ] ¿La persona conserva su fisonomía?
- [ ] ¿El fondo sigue siendo `#FFD749`?
- [ ] ¿El púrpura sigue siendo `#602B7A`?
- [ ] ¿La caja de mensaje conserva posición/proporción?
- [ ] ¿El logo proviene del asset oficial?
- [ ] ¿No apareció estética IA genérica/neón/glow?

## Privacidad

El master SVG no contiene una fotografía identificable de un menor. Solo conserva la geometría y estructura visual. Las fotos reales se incorporan únicamente en la pieza final autorizada.
