# Flujo y control de calidad

## Antes de construir

1. Revisa todos los archivos entregados.
2. Confirma el tema, nivel, examen y resultado de aprendizaje.
3. Verifica conceptos, cálculos y respuestas.
4. Define el modo de materia.
5. Escribe el guion antes de diagramar.
6. Reserva la zona de cámara desde el inicio.

## Durante la construcción

- Usa `scripts/locked_design_system.mjs`.
- Mantén cada título en una caja independiente.
- Acorta el texto antes de reducir tipografía.
- Coloca ecuaciones como SVG o PNG de alta resolución.
- Inserta textos finales como texto editable.
- Incrusta las imágenes; no uses vínculos temporales.
- Añade notas docentes y fuentes a cada diapositiva.
- Coloca la clave de actividades autónomas solo en notas.

## Revisión pedagógica

- La promesa de aprendizaje es clara.
- Cada diapositiva cumple una función diferente.
- Los ejemplos demuestran lo explicado.
- La práctica evalúa el contenido enseñado.
- El cierre permite aplicar una regla o producir una respuesta.

## Revisión editorial

- Ortografía, puntuación, tildes y nombres propios correctos.
- Una idea principal por diapositiva.
- Títulos sin saltos accidentales.
- Textos legibles a distancia.
- Sin instrucciones internas visibles.

## Revisión visual

- Punto focal claro.
- Imágenes nítidas y recortadas con intención.
- Ningún visual de relleno.
- Logo oficial, proporcional y discreto.
- Esquina inferior derecha completamente libre.
- El resto del ancho derecho se utiliza con naturalidad.

## Revisión técnica

- Cero solapamientos.
- Cero recortes.
- Cero objetos fuera del lienzo.
- Cero objetos en la zona de cámara.
- PPTX íntegro y editable.
- Notas y fuentes presentes.
- Imágenes incrustadas.
- Render principal y prueba con un segundo motor.
- Inspección individual del 100 % de las diapositivas.

## Rechazo automático

No entregues si:

- cambió fuente, paleta, fondo, logo, márgenes o proporción;
- un elemento invade la cámara;
- un título se parte accidentalmente;
- una fórmula, respuesta o dato no fue verificado;
- una imagen científica es dudosa;
- una imagen solo decora;
- una actividad no corresponde a la explicación;
- falta la ruptura editorial;
- falta la clave docente o las fuentes;
- no se inspeccionó cada diapositiva.

## Evidencia final

Conserva junto al PPTX:

- renders individuales;
- montaje;
- `*.inspect.ndjson`;
- fuente de construcción;
- fuentes y recursos finales;
- resultado de los validadores.
