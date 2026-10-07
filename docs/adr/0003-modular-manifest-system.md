# ADR 0003: Manifest-Driven Extensible Modular Architecture

**Status:** Accepted  
**Date:** 2026-10-02  

## Context
The application must support rapid expansion—including adding new calculators, behavioural games, trackers, languages, and content packs—without modifying core navigation, database layers, or routing code.

## Decision
Every feature is structured as a standalone module inside `src/modules/<module-name>/` exposing a Zod-validated `manifest.ts`. The central `ModuleRegistry` dynamically registers and renders routes, navigation items, consent gates, and BCT taxonomy tags.

## Consequences
- Clean separation of concerns.
- Third-party or academic partners can contribute new modules as self-contained drop-in folders.
