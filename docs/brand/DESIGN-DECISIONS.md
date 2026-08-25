# Decisiones de diseño

## DEC-2026-001

Fecha: 2026-08-25
Estado: `SUPERSEDED` por `DEC-2026-002`
Área: Identidad visual
Alcance: `GLOBAL`

### Decisión

Adoptar Montserrat como tipografía principal y la paleta de trabajo morado `#602B7A`, turquesa `#33DFC0` y amarillo `#FFD749`.

### Motivo

Son los valores declarados en la instrucción maestra y coinciden con las variantes de logotipo suministradas por el usuario.

### Aplicación

Documentación, piezas gráficas, campañas, plantillas y tokens Algorithmics.

### No aplica

No reemplaza el sistema visual bloqueado de presentaciones NID ni invalida un futuro manual corporativo autorizado.

La definición de tres colores quedó sustituida por la paleta dura de cuatro colores aprobada en `DEC-2026-002`.

### Referencias

- `assets/brand/logos/`
- `assets/brand/fonts/montserrat/`
- `config/brand/colors.json`

## DEC-2026-002

Fecha: 2026-08-25
Estado: `APPROVED`
Área: Color
Alcance: `GLOBAL_ALGORITHMICS`

### Decisión

Fijar como regla dura la paleta de cuatro colores: Púrpura Oscuro `PANTONE 7664 C` / `#602B7A`, Amarillo Septiembre `PANTONE 122 C` / `#FFD749`, Menta Fresca `PANTONE 333 C` / `#33DFC0` y Frambuesa `PANTONE 184 C` / `#F44C75`.

Las capturas entregadas por el usuario son la autoridad para RGB, HSB y CMYK. El manual HTML es una guía complementaria y confirma Pantone, HEX y RGB, pero sus conversiones CMYK no prevalecen.

### Aplicación

- Pantone para tinta directa.
- HEX/RGB exacto para digital.
- CMYK de las capturas para impresión de proceso hasta definir un perfil ICC con la imprenta.
- No sustituir, aproximar ni alterar silenciosamente los cuatro colores.

### No aplica

No modifica el sistema visual NID. Tampoco aprueba automáticamente los demás contenidos del manual HTML.

### Referencias

- `docs/brand/COLORS.md`
- `docs/brand/MANUAL-REVIEW.md`
- `config/brand/colors.json`
- `assets/brand/colors/algorithmics-official-palette.svg`
