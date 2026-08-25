# Colores

Estado: `APPROVED` como regla dura de alcance `GLOBAL_ALGORITHMICS`.

## Paleta oficial

| Rol | Nombre | Pantone | HEX | RGB | HSB | CMYK aprobado desde captura |
|---|---|---|---|---|---|---|
| Principal | Púrpura Oscuro | `7664 C` | `#602B7A` | `96, 43, 122` | `279°, 64%, 47%` | `77, 97, 12, 3` |
| Complementario | Amarillo Septiembre | `122 C` | `#FFD749` | `255, 215, 73` | `46°, 70%, 100%` | `1, 15, 78, 0` |
| Complementario | Menta Fresca | `333 C` | `#33DFC0` | `51, 223, 192` | `168°, 76%, 87%` | `62, 0, 38, 0` |
| Complementario | Frambuesa | `184 C` | `#F44C75` | `244, 76, 117` | `344°, 68%, 95%` | `0, 82, 31, 0` |

Vista rápida: `assets/brand/colors/algorithmics-official-palette.svg`. Los valores ejecutables están en `config/brand/colors.json` y `config/brand/tokens.json`.

## Regla dura

- No sustituir, aproximar, recolorear ni modificar silenciosamente estos cuatro colores.
- Para tinta directa de impresión, especificar el Pantone.
- Para piezas digitales, usar el HEX o RGB exacto.
- Para impresión de proceso, usar el CMYK de las capturas mientras no exista un perfil ICC definido por la imprenta.
- Blanco y negro son neutros de contraste; no reemplazan la paleta oficial.
- Una variación, tinte, sombra, degradado o color derivado no se convierte en oficial sin aprobación y registro en `DESIGN-DECISIONS.md`.

## Jerarquía de fuentes

1. Las cuatro capturas de color entregadas y confirmadas por el usuario el 2026-08-25.
2. El archivo `Manual_de_Marca_Algorithmics.html` solo como guía complementaria.
3. Los tokens del repositorio, que deben reproducir esta decisión.

El manual coincide en Pantone, HEX y RGB, pero presenta conversiones CMYK diferentes. Por instrucción del usuario, las capturas prevalecen. Consulta `MANUAL-REVIEW.md` para la diferencia documentada.
