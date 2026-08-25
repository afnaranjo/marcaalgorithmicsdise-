# Constitución operativa del proyecto Algorithmics

Este repositorio es la fuente de verdad del sistema creativo de Algorithmics. Conserva conocimiento estable y reutilizable; no es un almacén indiscriminado de borradores, chats o exportaciones.

## Orden de lectura

Antes de trabajar:

1. Lee este archivo.
2. Usa `00-inicio.md` como panel del vault y mapa de acceso rápido.
3. Lee `README.md`.
4. Lee `docs/ai/PROJECT-MEMORY.md`.
5. Lee `docs/brand/BRAND-SYSTEM.md`, `COLORS.md`, `TYPOGRAPHY.md` y `LOGO-USAGE.md`.
6. Lee `docs/brand/GRAPHIC-LANGUAGE.md` y, para trabajo visual, `ART-DIRECTION.md`, `COMPOSITION-AND-MONTAGE.md` y `ANTI-AI-AESTHETIC.md`.
7. Lee `docs/content/VOICE-AND-TONE.md` y `AUDIENCES.md`.
8. Carga solo la ficha de programa, workflow, skill, prompt, plantilla o ejemplo que corresponda.

## Fuentes canónicas y prioridad

- Colores ejecutables: `config/brand/colors.json`.
- Tipografía ejecutable: `config/brand/typography.json`.
- Formatos: `config/brand/formats.json`.
- Dirección de arte ejecutable: `config/brand/art-direction.json`.
- Explicación de marca: `docs/brand/`.
- Logos oficiales: `assets/brand/logos/`.
- Memoria estable: `docs/ai/PROJECT-MEMORY.md`.
- Prompts validados: `prompts/`.
- Ejemplos curados: `examples/`.
- Datos variables: confirmar en una fuente autorizada antes de publicar.

Si dos fuentes se contradicen, aplica esta prioridad:

1. instrucción explícita actual;
2. versión vigente del repositorio;
3. configuración canónica;
4. documentación estable;
5. ejemplos aprobados;
6. creatividad.

Si el conflicto no se resuelve, usa `PENDING VERIFICATION` y documenta la resolución en `docs/brand/DESIGN-DECISIONS.md` cuando corresponda.

## Identidad — reglas duras

- Usa Montserrat desde `assets/brand/fonts/montserrat/`.
- Usa exclusivamente `#602B7A`, `#FFD749`, `#33DFC0` y `#F44C75` como paleta dura Algorithmics.
- No sustituyas, aproximes ni inventes colores oficiales.
- Inserta logos oficiales; no reconstruyas el logotipo con texto, no lo deformes y no alteres proporciones.
- Distingue siempre Algorithmics de NID u otras marcas.
- Toda exploración que cambie identidad debe etiquetarse `EXPERIMENTAL`.

## Dirección de arte — reglas duras

**Usa IA como herramienta, nunca como estética.**

Toda pieza debe sentirse dirigida por un diseñador senior humano: concepto concreto, composición intencional, jerarquía editorial, aire, fotografía natural, montaje plausible y detalles controlados.

- Una pieza debe tener una idea dominante.
- El vacío es parte de la composición; no llenes por llenar.
- La tecnología debe demostrar una acción real: crear, programar, probar, diseñar, resolver o presentar.
- Prioriza fotografía real autorizada cuando exista una referencia útil.
- Evita piel plástica, rostros genéricos, glow/neón genérico, gradientes `AI-tech`, fondos sci-fi sin concepto, UI flotante, objetos 3D gratuitos, simetría automática y layouts de plantilla.
- Si una pieza podría pertenecer a cualquier academia tecnológica cambiando solo el logo, falta dirección de arte Algorithmics.

## Edición quirúrgica

Si la instrucción es puntual —por ejemplo “quita el CTA”, “cambia el morado”, “cambia solo el rostro”, “quita el logo” o “mueve al estudiante”— modifica solo lo pedido.

Todo lo no mencionado queda bloqueado salvo que exista una imposibilidad física evidente. No rediseñes una pieza aprobada para ejecutar una corrección puntual.

## Fisonomía, montaje y perspectiva

- Si se pide conservar fisonomía, no cambies identidad facial, edad aparente ni rasgos estructurales.
- Integra sujetos respetando escala, lente, punto de fuga, luz, temperatura, profundidad, oclusiones y sombras de contacto.
- No dejes halos de recorte ni bordes de sticker.
- Las pantallas deben respetar perspectiva; las interfaces viven dentro del display y no flotan fuera de él.

Para escenas de programación sobre-hombro:

- estudiante sentado frente a laptop;
- vista desde atrás y ligeramente desde un costado;
- parte del rostro en perfil;
- hombro y manos visibles;
- ojos orientados a la pantalla;
- laptop frente al estudiante con perspectiva diagonal aproximada de 35–50°;
- código real/coherente y sin datos personales;
- pantalla no completamente frontal al espectador;
- espacio negativo reservado al copy.

Evita estudiante detrás de la pantalla, mirada a cámara o al teclado cuando programar es la acción principal, laptop físicamente imposible, manos deformes, UI sin perspectiva y código flotante.

## Comunicación y audiencia

Algorithmics ayuda a pasar de consumidor de tecnología a creador.

- Niños: curiosidad, juego con propósito, descubrimiento y creación.
- Adolescentes: autonomía, retos, tecnología y proyectos reales; no infantilizar.
- Padres/responsables: valor educativo, lógica, creatividad, acompañamiento y uso productivo de la tecnología; no culpa ni miedo.

Identifica siempre programa, audiencia, objetivo, canal, CTA y qué dato es estable o temporal. No prometas resultados académicos o profesionales garantizados.

## Clasificación de decisiones

Cada aprendizaje debe declarar alcance:

- `GLOBAL`: toda Algorithmics.
- `PROGRAM`: un programa/curso.
- `CAMPAIGN`: una campaña.
- `PIECE`: una pieza concreta.
- `EXPERIMENTAL`: exploración no oficial.
- `DEPRECATED`: dejó de usarse.

Una aprobación puntual no se convierte automáticamente en regla global.

## Seguridad, privacidad y activos

- Nunca guardes secretos, credenciales, cookies, sesiones, claves privadas ni `.env` reales.
- No incorpores datos personales sin necesidad y autorización.
- Trata fotos y videos de menores como material sensible; verifica autorización y alcance antes de versionarlos.
- No redistribuyas recursos de terceros sin licencia o permiso comprobable.
- Clasifica activos como `PUBLIC`, `INTERNAL`, `LICENSED` o `RESTRICTED`.
- Cuando una pieza sensible enseñe una composición útil, guarda el patrón, prompt y aprendizaje; no necesariamente la fotografía.

## Archivos y Git

- Prefiere `lowercase-kebab-case`.
- Conserva editables y masters cuando aporten reutilización.
- Evita caches, renders descartados, duplicados, backups ZIP y `final-final`.
- Antes de editar revisa estado, remoto, rama y cambios remotos.
- Antes de publicar revisa diff, secretos, licencias y privacidad.
- No uses force-push, `git reset --hard` o limpieza destructiva para resolver conflictos desconocidos.
- No hagas commit o push sin que la tarea lo autorice.

## Memoria y decisiones

Transforma aprendizajes repetibles en documentación, prompts y ejemplos curados, no en transcripciones de chat.

Antes de guardar algo pregunta:

> ¿Esto permitirá que otra persona trabaje mejor en Algorithmics en el futuro?

Si no, mantenlo fuera del repositorio.

## Condición de entrega

Antes de terminar una pieza:

1. Ejecuta `scripts/validate.ps1` en Windows o `scripts/validate.sh` en macOS/Linux.
2. Revisa el visual a tamaño real y reducido a pantalla móvil.
3. Confirma identidad, legibilidad, CTA, perspectiva, montaje, licencias, privacidad y datos variables.
4. Ejecuta `templates/social/design-qa-checklist.md` cuando aplique.
5. Si el resultado se ve “hecho por IA”, corrige antes de entregar.
6. Actualiza memoria/decisiones solo si surgió conocimiento estable.
7. Reporta con precisión qué fue modificado, validado y publicado.
