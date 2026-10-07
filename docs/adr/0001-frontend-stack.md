# ADR 0001: Frontend Technology Stack Selection

**Status:** Accepted  
**Date:** 2026-10-02  

## Context
PERCKS Kidney Companion requires a lightweight, highly accessible, resilient, and responsive frontend capable of running offline on low-end mobile devices and desktops across 6 languages.

## Decision
We selected:
- **Vite + React 18 + TypeScript (Strict):** For rapid build times, strict compile-time type safety, and robust ecosystem support.
- **Tailwind CSS + NHS Identity Tokens:** Direct adoption of the official NHS colour palette, minimum 44px touch targets, and accessible Atkinson Hyperlegible typography.
- **Zustand:** Lightweight, boilerplateless state management with seamless offline persistence middleware.
- **Client-Side PDF Generation (`jsPDF`):** To generate accessible A4 clinical summaries directly on the client, ensuring sensitive patient vitals never leave the device to a rendering server.

## Consequences
- Clean, maintainable codebase without heavy framework lock-in.
- Sub-second initial load times and flawless mobile responsiveness.
