# PERCKS Kidney Companion — System Architecture

**Document Version:** 1.0.0  
**Status:** Approved  
**Classification:** Official / Architectural Specification  

---

## 1. Architectural Philosophy

PERCKS Kidney Companion is architected according to four fundamental engineering principles:
1. **Offline-First & Local-Dominant:** Patients can track vitals, read reviewed educational lessons, run clinical calculators, and play games completely without internet connectivity. Data is stored locally in IndexedDB and synchronized with the UK-based cloud store when online.
2. **Zero-Core-Change Extensibility:** Trackers, calculators, games, educational articles, and languages are registered via strongly typed TypeScript manifests (`manifest.ts`). Adding a new tool never requires altering existing core routing or state managers.
3. **Clinical Safety & Privacy by Design:** Health metrics never enter URLs, plain-text analytics payloads, or external third-party servers. All client-side calculators enforce strict boundary checks and display clear non-advisory disclaimers.
4. **NHS Identity & Universal Accessibility:** Adheres to NHS design patterns, WCAG 2.2 AA accessibility standards, responsive mobile-first layouts (320px to 4K), and full bidirectional localization (LTR and RTL).

---

## 2. High-Level Component Topology

```
+-----------------------------------------------------------------------------------+
|                                  USER BROWSER / PWA                               |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                           React 18 + TypeScript UI                          |  |
|  |   [Today Dashboard]  [Trackers]  [Learn/NHS]  [Calculators]  [Mind] [Play]  |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|  +-----------------------------------------------------------------------------+  |
|  |                 State Management & Domain Layer (Zustand)                   |  |
|  |      Auth Store  |  Profile Store  |  Metrics Store  |  Points Store        |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|  +-----------------------------------------------------------------------------+  |
|  |                       Core Services & Abstraction Layer                     |  |
|  |    Offline Sync Engine   |   Calculator Engine   |   Crisis Safety Router   |  |
|  +-----------------------------------------------------------------------------+  |
|          |                                                    |                   |
|  +----------------------+                           +--------------------------+  |
|  | IndexedDB (Local DB) |                           | DataClient Proxy Client  |  |
|  | (idb local store)    |                           +--------------------------+  |
+----------+----------------------------------------------------+------------------+
           |                                                    | HTTPS (TLS 1.3)
           |                                                    v
+----------+------------------------------------------------------------------------+
|                                UK (LONDON) CLOUD BACKEND                          |
|                                                                                   |
|  +-----------------------------------------------------------------------------+  |
|  |                      Supabase Edge Functions / Node Proxy                   |  |
|  |       - NHS Content v2 Proxy             - ODS / Postcodes.io Proxy         |  |
|  |       - Magic Link Authentication        - Pseudonymised Research Exporter  |  |
|  +-----------------------------------------------------------------------------+  |
|                                         |                                         |
|  +-----------------------------------------------------------------------------+  |
|  |                    PostgreSQL Database (AWS eu-west-2, London)              |  |
|  |       - Row Level Security (RLS) on all patient tables                      |  |
|  |       - Encrypted at rest (AES-256) & strict audit logging                  |  |
|  +-----------------------------------------------------------------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Modular Manifest Registry

Every application module is located in `src/modules/<module-name>/` and must export a `manifest.ts` adhering to the following interface:

```typescript
export interface ModuleManifest {
  id: string;
  title: Record<string, string>; // Localized titles
  description: Record<string, string>;
  route: string;
  icon: string;
  featureFlag?: string;
  bctTags: string[]; // Behaviour Change Technique taxonomy v1 tags (e.g., '1.1', '2.2')
  requiredConsents: Array<'health_data' | 'mental_health' | 'community' | 'research'>;
  offlineCapable: boolean;
  minReadingAge: number;
}
```

The application's `ModuleRegistry` discovers and initializes modules dynamically, assembling navigation items and route guards automatically based on the user's active consents and enabled feature flags.

---

## 4. Offline Sync Architecture

```
User Action (e.g. Log BP) 
       │
       ▼
Write to Zustand Store (Instant UI update)
       │
       ▼
Persist to IndexedDB ('percks_db' / 'measurements' store)
       │
       ▼
Enqueue Sync Task (Status: 'pending')
       │
       ├─► [Network Online?] ──No──► Sleep until 'online' event
       │
       └─► Yes ──► Send to Supabase via DataClient
                     │
                     ├─► Success: Mark Sync Task as 'synced'
                     └─► Failure: Exponential backoff retry (1s, 2s, 4s, 8s...)
```

---

## 5. Security & Privacy Boundaries

1. **No External Tracking:** Zero third-party analytics (Google Analytics, Mixpanel, etc.) are embedded. All product usage analytics are first-party only and contain no health parameters.
2. **Special Category Data:** Handled under UK GDPR Article 9(2)(a) (Explicit Consent) and 9(2)(j) (Scientific Research).
3. **Row-Level Security (RLS):** Every PostgreSQL table enforces an RLS policy ensuring users can only read and write their own records (`auth.uid() = user_id`).
4. **Selective Sharing:** Clinician PDF reports and expiring read-only share links are generated client-side with cryptographic random tokens, omitting sensitive mental health or journal fields unless the user explicitly checks the opt-in box each time.
