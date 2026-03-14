# Overlays

This directory contains technology-specific overlays for AI Team Foundation.

## What is an Overlay?

An overlay customizes the base foundation for a specific technology stack or use case. When initializing a new project, you can select an overlay to apply technology-specific configurations.

## Available Overlays

| Directory | Description |
|-----------|-------------|
| `cpp-qt-desktop/` | C++ Qt desktop application |
| `python-backend/` | Python backend service |
| `web-fullstack/` | Full-stack web application |
| `ai-agent-product/` | AI agent product |

## Usage

```bash
# List available overlays
ls -la

# Use an overlay during initialization
../scripts/init_project.sh -o python-backend my-project
```

## Creating an Overlay

See [docs/overlay-guide.md](../docs/overlay-guide.md) for details on creating new overlays.