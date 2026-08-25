# Comandos operativos del proyecto Algorithmics

Estado: `APPROVED`
Alcance: `GLOBAL`
Actualizado: 2026-08-25

## Comando: GUARDA

Cuando el usuario diga **“guarda”**, **“guárdalo”**, **“guarda esto”** o una instrucción equivalente dentro del proyecto Algorithmics y exista un diseño, prompt, montaje, composición, copy visual, regla o decisión aprobada como referente, interpretar la instrucción como autorización explícita para persistir el aprendizaje en el repositorio canónico `afnaranjo/marcaalgorithmicsdise-` y publicarlo en Git.

`GUARDA` no significa solamente recordar dentro del chat.

## Flujo obligatorio

1. Identificar exactamente qué fue aprobado.
2. Revisar la versión vigente del repositorio y hacer *match* con lo que ya existe.
3. No duplicar documentación, prompts, reglas o ejemplos. Complementar la fuente canónica adecuada.
4. Clasificar el alcance como `GLOBAL`, `PROGRAM`, `CAMPAIGN`, `PIECE`, `EXPERIMENTAL` o `DEPRECATED`.
5. Elegir qué representación debe persistirse:
   - regla/decisión estable;
   - prompt o megaprompt validado;
   - receta de montaje/composición;
   - patrón narrativo o de carrusel;
   - ejemplo curado;
   - asset real, solo cuando licencia, privacidad y consentimiento lo permitan.
6. Si la pieza contiene menores, datos personales o activos restringidos, no subir automáticamente el archivo visual. Guardar el aprendizaje reusable: composición, crop, iluminación, prompt, restricciones, jerarquía y decisiones aprobadas.
7. Verificar que no se incorporen secretos, credenciales, `.env`, tokens ni material sin permiso.
8. Actualizar Git con commit y push a la rama canónica cuando el acceso de escritura esté disponible.
9. Volver a leer el remoto y verificar el hash publicado antes de decir que quedó guardado.

## Persistencia entre chats y dispositivos

El objetivo de este comando es que una aprobación realizada desde escritorio, móvil u otro chat del proyecto pueda transformarse en conocimiento persistente y reutilizable.

Git es la fuente viva compartida. Otros agentes/chats deben revisar el repositorio antes de trabajar para recuperar estas decisiones.

## Ejemplos

- “Este diseño quedó perfecto, guarda.” → extraer y versionar la composición/prompt/decisión aprobada; subir el asset solo si es seguro y autorizado.
- “Este prompt sí funcionó, guarda.” → integrarlo en `prompts/`, hacer match con prompts existentes y publicar.
- “Así debe ir siempre la laptop, guarda.” → promover la regla al alcance correcto y documentarla en composición/montaje.
- “Guarda este carrusel como referencia.” → registrar secuencia, narrativa, composición y restricciones como `CAMPAIGN` o `REFERENCE`.

## Regla de precisión

No afirmar **“guardado en Git”** hasta verificar el commit remoto.

Si no existe acceso de escritura o GitHub falla, indicar claramente que el guardado persistente está pendiente; no sustituirlo silenciosamente por memoria de conversación.