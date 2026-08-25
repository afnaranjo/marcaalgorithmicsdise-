# Algorithmics Brand, Design & Content System

Repositorio oficial del sistema creativo y operativo de Algorithmics utilizado por el equipo. Reúne identidad visual, contenido, programas, procesos, activos autorizados, prompts, skills y decisiones estables para que el trabajo pueda continuar sin depender de conversaciones aisladas.

## Lectura inicial

1. [`AGENTS.md`](AGENTS.md)
2. [`docs/ai/PROJECT-MEMORY.md`](docs/ai/PROJECT-MEMORY.md)
3. [`docs/brand/BRAND-SYSTEM.md`](docs/brand/BRAND-SYSTEM.md)
4. [`docs/content/VOICE-AND-TONE.md`](docs/content/VOICE-AND-TONE.md)
5. La ficha del programa, plantilla o workflow relevante para la tarea.

## Mapa

| Área | Fuente principal |
|---|---|
| Identidad | `docs/brand/` y `config/brand/` |
| Logotipos y tipografías | `assets/brand/` |
| Audiencias y copy | `docs/content/` |
| Programas | `docs/programs/` |
| Memoria para IA | `docs/ai/` |
| Vault de Obsidian | `00-inicio.md`, `.obsidian/` y `vault/` |
| Procesos | `docs/workflows/` |
| Privacidad y licencias | `docs/privacy/` |
| Skills del proyecto | `.agents/skills/` |
| Plantillas reutilizables | `templates/` |
| Prompts aprobados | `prompts/` |
| Ejemplos seleccionados | `examples/` |

## Estado actual

- Sistema visual base documentado con Montserrat y la paleta oficial de cuatro colores fijada como regla dura.
- Logos oficiales entregados por el usuario catalogados y preservados.
- Skill de presentaciones educativas NID instalada y aislada de la marca Algorithmics.
- Datos comerciales variables, edades, sedes, precios y horarios permanecen como `PENDING VERIFICATION` hasta que una fuente autorizada los confirme.

## Configuración rápida

En PowerShell:

```powershell
./scripts/setup.ps1
./scripts/validate.ps1
```

En macOS o Linux:

```bash
./scripts/setup.sh
./scripts/validate.sh
```

No se incluyen credenciales. Copia `.env.example` a `.env` únicamente si una herramienta lo requiere y mantén los valores reales fuera de Git.

## Vault de Obsidian

Abre `C:\Users\USUARIO\Documents\ChatGPT\algorithmics` como vault de Obsidian y comienza en [`00-inicio.md`](00-inicio.md). El vault enlaza la memoria, los logos, las tipografías, las presentaciones, las skills y los workflows sin duplicarlos. Los nuevos recursos se reciben primero en `assets/inbox/` para revisar origen, licencia y privacidad.

## Git

El remoto oficial es `https://github.com/afnaranjo/marcaalgorithmicsdise-.git`. Antes de trabajar, revisa `git status`, la rama activa y los cambios remotos. Los commits y el push requieren revisión; nunca se suben secretos, datos de menores ni recursos sin licencia conocida.
