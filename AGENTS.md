# Constitución operativa del proyecto Algorithmics

Este repositorio es la fuente de verdad del sistema creativo de Algorithmics. Conserva conocimiento estable y reutilizable; no es un almacén indiscriminado de borradores o exportaciones.

## Orden de lectura

Antes de trabajar:

1. Lee este archivo.
2. Usa `00-inicio.md` como panel del vault y mapa de acceso rápido.
3. Lee `README.md`.
4. Lee `docs/ai/PROJECT-MEMORY.md`.
5. Lee `docs/brand/BRAND-SYSTEM.md`, `COLORS.md` y `TYPOGRAPHY.md`.
6. Lee `docs/content/VOICE-AND-TONE.md` y `AUDIENCES.md`.
7. Carga solo la ficha de programa, workflow, skill, plantilla o ejemplo que corresponda.

## Fuentes canónicas

- Colores ejecutables: `config/brand/colors.json`.
- Tipografía ejecutable: `config/brand/typography.json`.
- Formatos: `config/brand/formats.json`.
- Explicación de marca: `docs/brand/`.
- Logos oficiales: `assets/brand/logos/`.
- Catálogo de activos: `config/assets/catalog.json` y `vault/02-catalogo-visual.md`.
- Memoria estable: `docs/ai/PROJECT-MEMORY.md`.
- Datos variables: confirmar en una fuente autorizada antes de publicar.

Si dos fuentes se contradicen, no elijas arbitrariamente. Marca `PENDING VERIFICATION`, investiga y documenta la resolución en `docs/brand/DESIGN-DECISIONS.md` cuando corresponda.

## Identidad

- Usa Montserrat desde `assets/brand/fonts/montserrat/`.
- Usa exclusivamente la paleta dura Algorithmics: `#602B7A`, `#FFD749`, `#33DFC0` y `#F44C75`. No sustituyas, aproximes ni inventes colores oficiales.
- Inserta los logos PNG oficiales. No reconstruyas el logotipo con texto, no lo deformes y no alteres sus proporciones.
- Distingue siempre Algorithmics de NID. La skill NID conserva su propio sistema visual bloqueado.
- Toda exploración que cambie la identidad debe etiquetarse `EXPERIMENTAL` y no convertirse en regla sin aprobación.

## Comunicación

Algorithmics ayuda a pasar de consumidor de tecnología a creador. Identifica siempre:

- quién usa el curso: niño o adolescente;
- quién decide: padre, madre o responsable;
- programa, edad, objetivo, canal y CTA;
- qué dato es estable y qué dato es temporal.

No uses el mismo tono para un niño de 9 años, un adolescente de 16 y una persona adulta decisora. No prometas resultados académicos o profesionales garantizados.

## Seguridad, privacidad y menores

- Nunca guardes secretos, credenciales, cookies, sesiones, claves privadas ni `.env` reales.
- No incorpores datos personales de estudiantes, familias o personal sin necesidad y autorización.
- Trata fotos y videos de menores como material sensible; verifica autorización y alcance antes de versionarlos.
- No redistribuyas logos, personajes, plantillas, fotografías, fuentes o recursos de terceros sin licencia o permiso comprobable.
- Clasifica recursos como `PUBLIC`, `INTERNAL`, `LICENSED` o `RESTRICTED` cuando sea necesario.

## Archivos y Git

- Prefiere `lowercase-kebab-case` para nuevos archivos.
- Conserva fuentes editables y plantillas maestras cuando aporten reutilización.
- Evita caches, renders descartados, duplicados, backups ZIP y archivos llamados `final-final`.
- Antes de editar, revisa `git status`, `git remote -v` y la rama activa.
- No uses `git reset --hard`, `git clean -fd`, force-push ni borres cambios desconocidos.
- No hagas commit o push sin que la tarea lo autorice. Revisa `git diff` y el área preparada antes de confirmar.

## Memoria y decisiones

Transforma aprendizajes repetibles en documentación, no en transcripciones de chat. Clasifica su alcance como `GLOBAL`, `PROGRAM`, `CAMPAIGN`, `PIECE` o `EXPERIMENTAL`. Una aprobación puntual no se vuelve automáticamente una regla global.

La raíz del repositorio funciona como vault de Obsidian. Usa `00-inicio.md` para navegar, `vault/` para paneles y notas operativas, y `assets/inbox/` como cuarentena de recursos nuevos. No dupliques dentro del vault información que ya tenga una fuente canónica; enlázala.

Antes de guardar algo, pregunta: “¿Esto permitirá que otra persona trabaje mejor en Algorithmics en el futuro?”. Si no, mantenlo fuera del repositorio.

## Condición de entrega

Antes de terminar:

1. Ejecuta `scripts/validate.ps1` en Windows o `scripts/validate.sh` en macOS/Linux.
2. Revisa los entregables a tamaño real cuando sean visuales.
3. Confirma identidad, legibilidad, CTA, licencias, privacidad y datos variables.
4. Actualiza memoria o decisiones solo si surgió conocimiento estable.
5. Reporta con precisión qué está local, qué fue validado y qué sigue pendiente.
