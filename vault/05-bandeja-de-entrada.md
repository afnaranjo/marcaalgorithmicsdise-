---
tags:
  - algorithmics
  - vault
  - assets
  - inbox
status: APPROVED
scope: GLOBAL
---

# Bandeja de entrada de activos

Usa `assets/inbox/` para incorporar imágenes, logos, videos, plantillas o fuentes que todavía no hayan sido clasificados.

## Flujo

1. Copiar el archivo a `assets/inbox/` sin sobrescribir otro recurso.
2. Registrar origen, propietario, licencia, fecha y alcance con [[vault/plantillas/ficha-de-activo|la ficha de activo]].
3. Revisar calidad, duplicados, privacidad y presencia de menores.
4. Clasificarlo como `PUBLIC`, `INTERNAL`, `LICENSED` o `RESTRICTED`.
5. Moverlo a una ruta canónica dentro de `assets/` solo después de aprobarlo.
6. Actualizar [[config/assets/catalog.json]] y [[vault/02-catalogo-visual]].
7. Ejecutar `scripts/validate.ps1` y registrar el cambio en Git.

> [!warning] Cuarentena
> Estar en `assets/inbox/` no convierte un archivo en oficial ni autoriza su publicación.
