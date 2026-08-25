# Contribuir

## Antes de cambiar algo

1. Lee `AGENTS.md` y las fuentes canónicas aplicables.
2. Ejecuta `git status`, `git remote -v` y `git branch --show-current`.
3. Confirma si el material es `APPROVED`, `DRAFT`, `EXPERIMENTAL`, `DEPRECATED` o `ARCHIVED`.
4. Verifica licencias, privacidad y datos variables.

## Organización

- Documenta reglas estables en `docs/`.
- Guarda valores reutilizables en `config/`.
- Coloca activos oficiales en `assets/` con nombres semánticos.
- Conserva plantillas en `templates/` y ejemplos seleccionados en `examples/`.
- Instala skills locales en `.agents/skills/` y actualiza `docs/ai/SKILLS-INDEX.md`.

## Commits sugeridos

```text
docs(brand): documentar una decisión visual
assets(brand): agregar un recurso aprobado
feat(skill): agregar workflow de copywriting
templates(social): agregar plantilla reutilizable
fix(config): corregir token de color aprobado
```

Antes de un commit ejecuta los validadores y revisa `git diff`. El push requiere autorización explícita.
