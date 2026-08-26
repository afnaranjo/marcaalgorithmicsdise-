# Prompts reutilizables

Guarda únicamente prompts que hayan demostrado valor. Cada archivo debe declarar objetivo, audiencia, formato/composición, restricciones, elementos prohibidos y estado.

## Regla de uso

Los prompts **no sustituyen** el sistema de marca. Antes de utilizarlos se leen `AGENTS.md`, la memoria y la documentación de marca relevante.

Cuando una campaña tenga un **master visual aprobado**, el master visual tiene prioridad sobre reconstruir la composición desde un prompt textual.

## Prompts validados

### Generación y edición visual

- `image-generation/master-art-direction.md`: bloque maestro para dirección visual Algorithmics.
- `image-generation/student-with-laptop.md`: escena validada de estudiante programando y composición sobre-hombro.
- `image-generation/surgical-edit.md`: cambios puntuales sin rediseñar una pieza aprobada.
- `image-generation/parent-child-tech.md`: escena padre/madre + estudiante; revisar alcance antes de promover.

### Campañas

- `campaigns/python-campaign.md`: Python con código y montaje creíble.
- `campaigns/roblox-consumer-to-creator.md`: jugador → creador sin copiar estética gamer externa.
- `campaigns/future-coders.md`: dirección adolescente, programación + IA sutil.
- `campaigns/tech-kids-open-house.md`: estudiantes + proyectos + aire para Open House/Tech Kids.
- `campaigns/belief-vs-skills-carousel.md`: prejuicio/percepción → habilidad/evidencia para comunicación con padres.
- `campaigns/birthday-greeting.md`: **primera propuesta por defecto para cumpleaños Algorithmics**. Antes de generar debe cargar `examples/approved/birthday-template-v1.svg` como master visual obligatorio. Por defecto **solo cambian FOTO + NOMBRE**; fondo, headline, mensaje, posiciones, banda de nombre, caja de mensaje, pixel terrain, iconos, paleta y jerarquía quedan bloqueados salvo instrucción explícita. Si el usuario sube una foto y pide “feliz cumpleaños Algorithmics”, activar directamente este flujo sin volver a pedir composición, color o estilo.

### Masters visuales aprobados

- `examples/approved/birthday-template-v1.svg`: **master canónico de cumpleaños** en 1080×1350. Se debe descargar/usar como referencia visual real; no recrear de memoria.
- `examples/approved/birthday-template-v1.md`: contrato de edición del master; define elementos `LOCKED`, variables y quality gate.

### Referencias narrativas

La estructura histórica del carrusel Python de 6 láminas vive en `examples/reference/python-six-slide-carousel.md`; no convertir sus antiguos datos comerciales en valores vigentes.

## Estado

`APPROVED` significa que el patrón fue validado como reutilizable. Los datos comerciales siguen siendo variables y deben verificarse.
