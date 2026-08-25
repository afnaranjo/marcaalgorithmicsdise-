---
name: crear-presentaciones-nid
description: Crear, adaptar, revisar y corregir presentaciones educativas NID en PowerPoint (.pptx) para clases en vivo de Matemática, Física, Química, Biología, Inglés, Lengua, Literatura, Razonamiento Verbal y otras materias. Usar siempre que Codex deba producir diapositivas NID, modificar su contenido, sustituir imágenes, incorporar ejercicios o auditar una presentación sin alterar el formato visual bloqueado, la marca ni la zona obligatoria para cámara.
---

# Presentaciones educativas NID

Crear presentaciones editables y rigurosas sin rediseñar la identidad aprobada. El contenido cambia según la clase; el formato permanece bloqueado.

## Regla inviolable

No cambiar el sistema visual. Mantener exactamente:

- lienzo 16:9 de 1280 × 720;
- tipografía Arial;
- paleta, fondo, márgenes, proporciones y jerarquía;
- logotipo oficial NID sin reconstruirlo con texto;
- zona de cámara vacía: `x=998, y=556, w=238, h=134`;
- espacio inferior derecho natural, sin dibujar un recuadro ni vaciar toda la columna derecha.

Si un contenido no cabe, resumir, dividir o elegir otro arquetipo aprobado. Nunca resolverlo modificando tipografía, colores, márgenes o zona de cámara.

## Archivos obligatorios

Antes de construir o editar:

1. Leer `references/FORMATO_INMUTABLE.md`.
2. Leer `references/PATRONES_POR_MATERIA.md` y activar el modo adecuado.
3. Leer `references/FLUJO_Y_CONTROL_DE_CALIDAD.md`.
4. Usar exclusivamente los activos de `assets/brand/`.
5. Tomar `assets/template.pptx` y `assets/examples/` como referencias canónicas.

`assets/source-builders/` conserva las fuentes históricas para consultar lógica
pedagógica, fórmulas y tratamiento de imágenes. No las uses como base directa
de una clase nueva porque contienen rutas originales. Todo generador nuevo debe
importar `scripts/locked_design_system.mjs`.

Preparar el runtime incluido en Codex antes de ejecutar un generador:

```bash
node scripts/runtime/setup_artifact_tool_workspace.mjs --workspace .
```

No ejecutar `npm install @oai/artifact-tool`: Artifact Tool viene incluido en el runtime de Codex.

## Qué sí puede cambiar

- tema, objetivos y secuencia pedagógica;
- explicaciones, ejercicios, respuestas y notas docentes;
- imágenes con función didáctica;
- fórmulas y diagramas verificados;
- cantidad de diapositivas;
- arquetipo aprobado de cada diapositiva.

## Qué no puede cambiar

- fuente, paleta, fondo, formato, relación de aspecto o márgenes;
- forma, color o proporción del logotipo;
- posición reservada para cámara;
- tamaño mínimo de títulos y cuerpo;
- estilo de encabezados, numeración y notas;
- estándar de fuentes, respuestas y revisión.

## Flujo obligatorio

1. Revisar la fuente entregada por el usuario.
2. Definir una promesa de aprendizaje y un guion de una idea por diapositiva.
3. Elegir el modo disciplinar en `references/PATRONES_POR_MATERIA.md`.
4. Preparar el runtime y construir con `@oai/artifact-tool`; usar `scripts/locked_design_system.mjs`.
5. En Matemática, renderizar ecuaciones con LaTeX y comprobar resultados.
6. En materias visuales o humanísticas, usar imágenes solo cuando ayuden a observar, demostrar, contextualizar, comparar, reconocer o recordar.
7. Cuando aparezca una persona, colocar como máximo un monograma oficial NID, sutil, como parche o bordado en una prenda. Superponer el activo oficial si la imagen generada no reproduce el símbolo exacto.
8. Incluir al menos una ruptura editorial de fondo plano.
9. Incluir práctica guiada, práctica autónoma y clave en notas.
10. Añadir notas del presentador y bloque `[Sources]` en cada diapositiva.
11. Renderizar todas las diapositivas, inspeccionarlas a tamaño completo y validar con un segundo motor.
12. Ejecutar los validadores antes de entregar.

## Validación obligatoria

Generar el archivo de inspección NDJSON con Artifact Tool y ejecutar:

```bash
node scripts/check_camera_safe.mjs salida.pptx.inspect.ndjson
node scripts/check_build_source.mjs ruta/al/generador.mjs
node scripts/verify_locked_system.mjs
```

La entrega queda rechazada si cualquiera devuelve un código distinto de cero.

## Entregables

Entregar:

- PPTX editable;
- PNG individual de cada diapositiva;
- montaje general;
- notas docentes con fuentes y respuestas;
- archivo de inspección;
- fuente editable o script de construcción;
- informe breve de QA.

No declarar terminado el trabajo hasta comprobar el 100 % de las diapositivas.
