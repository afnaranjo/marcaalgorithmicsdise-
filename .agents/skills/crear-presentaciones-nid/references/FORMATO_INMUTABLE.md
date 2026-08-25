# Formato NID inmutable

## Contrato geométrico

| Elemento | Valor bloqueado |
|---|---|
| Lienzo lógico | 1280 × 720 px |
| Proporción | 16:9 |
| Margen principal | 72 px |
| Lienzo editorial claro | x=24, y=24, w=1232, h=672 |
| Logotipo superior | x=1156, y=44, w=76, h=34 |
| Numeración | x=72, y=662 |
| Zona de cámara | x=998, y=556, w=238, h=134 |

La zona de cámara se considera ocupada si cualquier parte de un objeto la toca. Solo se permiten el fondo a página completa y el lienzo editorial base.

Para cualquier objeto que baje hasta `y>=556`, termina antes de `x=970`. Sobre `y<556`, utiliza el ancho disponible hasta `x≈1208`.

## Tipografía bloqueada

- Familia única: Arial.
- Portada: 58–72 pt.
- Títulos: 40–50 pt; mínimo absoluto 35 pt.
- Subtítulos: 24–30 pt.
- Cuerpo: 18–24 pt; mínimo absoluto 16 pt.
- Etiquetas y pies: 11–15 pt.
- Evita bloques largos centrados.
- No reduzcas la fuente para hacer caber contenido.

## Paleta bloqueada

| Token | Hex | Uso |
|---|---|---|
| navy | `#091127` | fondos de ruptura y títulos |
| navy2 | `#18233D` | paneles oscuros |
| ink | `#17223B` | texto principal |
| muted | `#65738C` | texto secundario |
| blue | `#2F7ED8` | señal primaria |
| lavender | `#7E70C9` | señal secundaria |
| cyan | `#35B4C2` | señal terciaria |
| coral | `#F18779` | advertencia o contraste |
| green | `#48A585` | confirmación |
| paleBlue | `#E5EFFB` | relleno suave |
| paleLavender | `#EEEAFB` | relleno suave |
| paleCyan | `#E5F6F8` | relleno suave |
| paleCoral | `#FDEBE8` | error o advertencia suave |
| paleGreen | `#E8F5F0` | confirmación suave |
| ice | `#F7F9FD` | lienzo claro |
| white | `#FFFFFF` | blanco |
| line | `#DCE4F1` | divisores |

No añadas colores de marca nuevos. Una diapositiva usa uno o dos acentos como máximo.

## Marca

- Usa únicamente `assets/brand/nid-dark.png` o `assets/brand/nid-white.png`.
- Conserva la proporción del monograma.
- No reconstruyas el símbolo con letras.
- No deformes ni recortes el logo.
- Mantén una aplicación discreta.
- En escenas con personas, un solo logo en ropa por imagen es suficiente.

## Arquetipos aprobados

1. Portada mínima.
2. Pregunta de entrada.
3. Mapa conceptual.
4. Evidencia visual.
5. Explicación asimétrica.
6. Comparación.
7. Secuencia.
8. Ejemplo analizado.
9. Práctica guiada.
10. Práctica autónoma.
11. Ruptura editorial.
12. Síntesis.
13. Cierre aplicable.

Alterna arquetipos. No conviertas toda la clase en tarjetas repetidas.

## Reglas de composición

- Una idea principal por diapositiva.
- El título comunica una conclusión o avance.
- El texto visible se dirige al estudiante.
- El fondo pastel es sutil; la ruptura usa navy plano.
- Los conectores quedan detrás de nodos y textos.
- Las imágenes se reservan desde el mapa inicial.
- No uses una imagen únicamente para llenar espacio.
- No repitas una silueta de diapositiva dos veces seguidas.
