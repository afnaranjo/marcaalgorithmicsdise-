# Prompt validado — edición quirúrgica

Estado: `APPROVED`  
Alcance: `GLOBAL`

## Regla

Modificar únicamente el elemento solicitado.

**Todo lo no mencionado queda bloqueado.**

Conservar composición, posiciones, escala, recortes, fondo, color, tipografía, jerarquía, iluminación, perspectiva, objetos, logo, CTA y personaje salvo que alguno sea exactamente el objeto de la corrección.

## Ejemplos

- “Quita el CTA” → eliminar CTA y reconstruir el fondo debajo; no mover el resto.
- “Cambia el morado” → sustituir solo el color objetivo respetando volumen/textura; no cambiar layout.
- “Cambia solo el rostro” → conservar cuerpo, ropa, pose, cabello y escena; usar la fisonomía real de la referencia.
- “Que sonría” → cambiar expresión sin cambiar identidad, edad aparente ni estructura facial.
- “Quita logo y recuadro inferior” → retirar ambos y continuar el fondo; no crear nuevos elementos.
- “Dame solo el montaje” → retirar lettering/CTA/logo solicitado y conservar la escena visual.

## Control

Antes de terminar, comparar contra la versión original y enumerar internamente qué cambió. Si aparece un cambio no solicitado, revertirlo.
