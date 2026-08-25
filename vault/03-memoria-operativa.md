---
tags:
  - algorithmics
  - vault
  - memoria
status: APPROVED
scope: GLOBAL
---

# Memoria operativa

La fuente canónica es [[docs/ai/PROJECT-MEMORY]]. Esta nota explica qué merece convertirse en memoria y dónde registrarlo.

## Guardar como memoria

- Reglas de marca aprobadas y reutilizables.
- Decisiones que cambian cómo se diseña, escribe o produce.
- Rutas canónicas de activos y plantillas.
- Restricciones de licencia, privacidad o uso.
- Aprendizajes que ayudarán a otra persona en futuros trabajos.

## No guardar como memoria global

- Conversaciones completas o razonamientos temporales.
- Fechas, precios, sedes, cupos u horarios sin verificación vigente.
- Borradores rechazados o duplicados sin valor de referencia.
- Credenciales, cookies, sesiones, datos personales o información de menores.

## Destino correcto

| Tipo de conocimiento | Registrar en |
|---|---|
| Regla global estable | [[docs/ai/PROJECT-MEMORY]] |
| Decisión visual | [[docs/brand/DESIGN-DECISIONS]] |
| Regla por programa | `docs/programs/` |
| Proceso reutilizable | `docs/workflows/` |
| Recurso nuevo | `assets/inbox/` y [[vault/05-bandeja-de-entrada]] |
| Nota de trabajo diaria | `vault/bitacora/` |

## Alcances permitidos

Usa uno de estos valores al registrar conocimiento: `GLOBAL`, `PROGRAM`, `CAMPAIGN`, `PIECE` o `EXPERIMENTAL`.
