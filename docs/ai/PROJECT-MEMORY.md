# Memoria del proyecto Algorithmics

Estado: `APPROVED`
Actualizado: 2026-08-25

## Fuente viva — GLOBAL

Repositorio canónico: `afnaranjo/marcaalgorithmicsdise-`.

Antes de una tarea importante de Algorithmics, revisar la versión vigente del repositorio cuando el entorno lo permita. Si Git fue actualizado, la versión nueva tiene prioridad sobre memoria anterior.

El repositorio está confirmado como `PRIVATE` y la app conectada tiene permisos de escritura. Esto no autoriza a incorporar secretos, datos personales o imágenes de menores sin revisar alcance y consentimiento.

## Comando persistente `GUARDA` — GLOBAL

Dentro del proyecto Algorithmics, cuando el usuario diga **“guarda”**, **“guárdalo”**, **“guarda esto”** o una instrucción equivalente sobre un diseño, prompt, montaje, composición, carrusel, regla o decisión aprobada, significa **persistirlo correctamente en el repositorio canónico y hacer push**, no solo recordarlo dentro del chat.

El flujo detallado vive en `docs/ai/OPERATIONAL-COMMANDS.md`.

Aplicación:

- revisar primero Git y hacer match con lo existente;
- complementar la fuente adecuada, no duplicar;
- elegir si corresponde guardar una regla, prompt, receta de montaje, patrón, ejemplo o asset autorizado;
- si hay menores, datos o licencias restringidas, guardar el aprendizaje reusable y no subir automáticamente el archivo sensible;
- hacer commit y push cuando exista acceso de escritura;
- verificar el hash remoto antes de afirmar que quedó guardado.

Objetivo: que una aprobación realizada desde escritorio, móvil u otro chat pueda quedar disponible para futuros agentes/chats que consulten la fuente viva.

## Identidad — GLOBAL

- Marca: Algorithmics — The international school of programming.
- Tipografía principal: Montserrat.
- Paleta dura: Púrpura Oscuro `#602B7A`, Amarillo Septiembre `#FFD749`, Menta Fresca `#33DFC0`, Frambuesa `#F44C75`.
- No sustituir, aproximar ni alterar estos cuatro colores.
- `assets/brand/` contiene las fuentes visuales oficiales disponibles.
- Logos oficiales sin deformación ni reconstrucción tipográfica.
- Algorithmics y NID son sistemas visuales separados.

## Posicionamiento — GLOBAL

Algorithmics no comunica solo clases de programación. El territorio central es pasar de consumir tecnología a crear con ella. Conceptos recurrentes: crear, programar, imaginar, construir, experimentar, resolver y diseñar.

## Dirección de arte — GLOBAL

Principio estable: **IA como herramienta, nunca como estética**.

Toda pieza debe sentirse dirigida por un diseñador humano: concepto específico, una idea dominante, jerarquía editorial, aire, fotografía natural, montaje plausible y tecnología con propósito.

La especificación detallada vive en:

- `docs/brand/GRAPHIC-LANGUAGE.md`;
- `docs/brand/ART-DIRECTION.md`;
- `docs/brand/COMPOSITION-AND-MONTAGE.md`;
- `docs/brand/ANTI-AI-AESTHETIC.md`.

Evitar por defecto glow/neón genérico, gradientes `AI-tech`, piel plástica, rostros genéricos, iluminación imposible, UI flotante, objetos 3D sin función, fondos sci-fi genéricos y composiciones automáticas.

## Edición quirúrgica — GLOBAL

Cuando una pieza está aprobada y la instrucción es puntual, modificar solo el elemento solicitado. “Quita CTA”, “cambia el morado”, “cambia solo el rostro”, “quita logo” o equivalentes no autorizan rediseñar el resto.

## Fotografía y fisonomía — GLOBAL

Cuando se usa una fotografía real de referencia:

- conservar identidad y edad aparente;
- no alterar estructura facial salvo petición explícita;
- mantener piel natural;
- mejorar luz, color, nitidez y fondo sin plastificar;
- integrar sujeto respetando perspectiva, escala, temperatura y sombras.

## Escenas de programación — PROGRAM

Para Python y escenas donde el código es protagonista:

- estudiante mira la pantalla;
- postura y manos naturales;
- laptop en lateral o tres cuartos;
- código dentro del display y sin datos personales;
- perspectiva física coherente entre rostro, ojos, manos, teclado y pantalla.

La receta sobre-hombro validada está en `prompts/image-generation/student-with-laptop.md`.

## Patrones de campaña — CAMPAIGN

### Tech Kids / Open House

- composición limpia y profesional;
- más aire;
- estudiantes protagonistas;
- proyectos Scratch/Python/Roblox/robótica como evidencia;
- posición izquierda/derecha flexible según copy;
- objetos 3D solo si pertenecen al sistema aprobado de campaña;
- conservar fisonomía cuando se usan fotos reales.

### Future Coders

- tono adolescente, tecnológico y aspiracional sin infantilizar;
- protagonista fuerte;
- elementos de IA/programación sutiles y secundarios;
- no repetir el naming completo en cada lámina;
- continuidad de carrusel con variación, no clones.

### Roblox — jugador a creador

- fotografía real como protagonista;
- mundo Roblox como contexto, no nueva identidad visual;
- no copiar neón gamer ni paletas externas;
- comunicar creación de experiencias/proyectos, no solo juego.

## Audiencias — GLOBAL

- Usuario: niño o adolescente.
- Decisor habitual: padre, madre o responsable.
- Infancia: creatividad, proyectos, retos y descubrimiento sin condescendencia.
- Adolescencia: autonomía, tecnología y proyectos reales.
- Adultos decisores: valor educativo, habilidades, acompañamiento y uso productivo de la tecnología sin miedo ni culpa.

## Datos variables

Precios, fechas, horarios, edades específicas, teléfonos, promociones, sedes operativas, docentes, duración y cupos están `PENDING VERIFICATION` hasta recibir una fuente autorizada vigente.

## Activos y sistemas relacionados

- Algorithmics: `assets/brand/`.
- Presentaciones NID: `.agents/skills/crear-presentaciones-nid/`; identidad separada.
- Vault: entrada `00-inicio.md`.
- Catálogo técnico: `config/assets/catalog.json`.
- Recursos nuevos: `assets/inbox/` hasta revisar origen, licencia, privacidad, duplicados y alcance.
- Manual HTML: `docs/brand/MANUAL-REVIEW.md`; no promover afirmaciones no verificadas de forma automática.

## Qué guardar en Git

Sí:

- reglas estables;
- decisiones aprobadas;
- prompts validados;
- recetas de montaje;
- plantillas y checklists;
- ejemplos curados;
- activos con licencia/consentimiento claro.

No:

- chats crudos;
- propuestas rechazadas sin aprendizaje reutilizable;
- datos temporales convertidos en regla global;
- secretos o `.env`;
- duplicados;
- fotografías sensibles sin autorización adecuada.

## Cómo actualizar esta memoria

Añade únicamente conocimiento estable. Registra decisiones visuales en `docs/brand/DESIGN-DECISIONS.md`; clasifica su alcance y enlaza la fuente detallada en vez de duplicar documentación extensa.
