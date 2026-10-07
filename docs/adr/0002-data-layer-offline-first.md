# ADR 0002: Offline-First Data Architecture & IndexedDB Sync

**Status:** Accepted  
**Date:** 2026-10-02  

## Context
Many patients in our target cohort (e.g. elderly or economically vulnerable populations) experience intermittent or poor mobile connectivity. Logging vital health metrics (BP, glucose, symptoms) must never fail due to a lack of network connection.

## Decision
We implemented an offline-first architecture using browser-native IndexedDB via the `idb` library:
1. Every write operation writes immediately to local IndexedDB and the in-memory Zustand store.
2. A synchronization queue manages background syncing with the UK Supabase Postgres backend when network connectivity is detected.
3. Conflict resolution uses deterministic client-side timestamps with server-side validation.

## Consequences
- 100% offline functionality for all logging, educational reading, and calculators.
- Zero data loss during network dropouts.
