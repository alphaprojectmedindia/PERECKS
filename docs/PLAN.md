# PERCKS Kidney Companion — Project Implementation Plan

**Document Version:** 1.0.0  
**Status:** Pending Approval  
**Last Updated:** 2026-10-02  

---

## 1. Executive Summary & Vision

**PERCKS Kidney Companion** is a calm, accessible, and friendly responsive web application and installable PWA designed to empower adults living with early-stage chronic kidney disease (CKD stages 1–3) and individuals at elevated risk (hypertension, type 2 diabetes, obesity).

### Core Pillars
1. **Calm, Plain-Language Education (Reading Age 9–11):** NHS-aligned education and self-care learning via the NHS Website Content API v2 and clinician-reviewed in-house modular articles.
2. **Whole-Person Tracking (< 30 Seconds):** Offline-first tracking of blood pressure, blood glucose, weight, fluid, salt, activity, sleep, mood, symptoms, and lab trends with clinician-set targets.
3. **Evidence-Based Calculators & Tools:** Standardised, verified calculators (CKD-EPI 2021 race-free eGFR, KDIGO ACR staging, KFRE 4-variable behind feature flag, NICE NG136 BP averaging, BMI, WHtR, BRI, alcohol units, salt conversion, etc.) strictly with published test vectors.
4. **Gentle Gamification & Behavioral Change:** Non-punitive daily habits, quizzes, food detective games, gentle streaks with rest days and "I'm unwell" pauses (tagged with BCTTv1 taxonomy).
5. **Privacy & UK Clinical Safety by Design:** Special-category UK GDPR compliance, UK (London) hosting, DCB0129/DCB0160 compliance, DTAC alignment, patient-controlled selective reporting, and automated crisis mitigation flows.
6. **Accessibility & Equity:** Multilingual support across 6 languages (English, Polish, Urdu [RTL], Bengali, Punjabi [Gurmukhi], Tamil), full WCAG 2.2 AA compliance, easy-read fonts (Atkinson Hyperlegible), and one-way Web Speech API read-aloud.

---

## 2. Architecture & Extensibility Model

The system is designed for zero-core-change extensibility. Every feature, calculator, tracker, educational module, game, and dataset operates as a decoupled plugin registered via type-safe TypeScript manifests.

```
src/
├── app/                  # Application bootstrap, routing, and top-level layout
├── core/                 # Shared foundations: event bus, sync engine, offline DB
├── design/               # NHS design system tokens, typography, accessible components
├── i18n/                 # Translation dictionaries, RTL engine, locale formatters
├── modules/              # Pluggable modular features with manifest.ts
│   ├── account/          # Magic-link auth, profile, consents, GDPR export/delete
│   ├── today/            # Calm 3-task daily deck, guide character, points
│   ├── learn/            # NHS Content v2 syndication, reviewed articles, quizzes
│   ├── track/            # Offline-first trackers (BP, weight, labs, meds, mood)
│   ├── calculators/      # Mathematical models with published verification vectors
│   ├── mind/             # PHQ-9, GAD-7, grounding tools, strict crisis flow
│   ├── play/             # Modular game engine & BCTTv1 mechanics
│   ├── insights/         # Rules-based summary & appointment preparation
│   ├── share/            # PDF generation, expiring read-only links, access logs
│   ├── care-finder/      # NHS ODS, Service Search v3 & London support registry
│   └── admin/            # Content review workflow, moderation, research export
├── services/             # Supabase client, NHS API proxy, IndexedDB client
└── store/                # Zustand stores with offline persistence
```

### Manifest Schema Standard
Every module defines a `manifest.ts` adhering to a strict Zod contract:
```typescript
export interface ModuleManifest {
  id: string;
  title: Record<string, string>; // Localised title
  route: string;
  featureFlag?: string;
  bctTags: string[];             // BCTTv1 Behaviour Change Technique codes
  requiredConsents: Array<'health_data' | 'mental_health' | 'community' | 'research'>;
  offlineCapable: boolean;
  version: string;
}
```

---

## 3. Phased Milestones & Deliverables

### Milestone M0: Foundation, Tooling, CI/CD & Design System (Week 1)
* **Goal:** Establish a rock-solid, type-safe, and verifiable repository foundation.
* **Key Tasks:**
  1. Scaffold project: Vite + React 18 + TypeScript (strict) + Tailwind (utilities) + `nhsuk-frontend` design tokens.
  2. Implement Zod schemas for all content types, manifests, and data dictionaries.
  3. Set up i18n framework supporting 6 target languages with RTL support for Urdu.
  4. Configure IndexedDB layer (`idb`) and Supabase client abstraction (`DataClient`).
  5. Build Automated CI/CD Quality Gates:
     - Vitest for unit tests
     - `axe-core` and Playwright for accessibility regression checks (0 critical/serious issues)
     - `scripts/verify-refs.ts` to validate all citations via Crossref & PubMed
     - `scripts/check-readability.ts` to enforce Flesch-Kincaid Grade Level ≤ 7 and max 20 words/sentence
  6. Create `data/sources.json` and download automation scripts (`scripts/data/fetch_all.ts`).
  7. Author core ADRs (Architecture Decision Records) in `docs/adr/`.

### Milestone M1: Accounts, Onboarding, Today & Offline Trackers (Weeks 2–3)
* **Goal:** Enable swift onboarding (< 2 min), daily calm dashboard, and sub-30s offline-first tracking.
* **Key Tasks:**
  1. Passwordless magic-link authentication with optional MFA (enforced for admins).
  2. 4-step low-friction onboarding flow with granular consent toggles (health data, mental health, research).
  3. Patient profile customization: avatar, language, font scale (100%–200%), reading level, reminder windows, and clinician-set targets.
  4. "Today" dashboard: guide character prompt ("Bea the Bean"), max 3 bite-sized daily actions, gentle streak.
  5. Registry-driven trackers with IndexedDB persistence and background Supabase sync:
     - Blood pressure (morning/evening with pulse)
     - Weight, height, waist, hip
     - Blood glucose & HbA1c
     - Fluid intake & salt log
     - User-entered medicine list (reminders only, non-advisory)
     - Symptoms and activity logs
  6. Interactive time-in-target charts (day/week/month/year) with clinician target indicators.
  7. GDPR self-service: full JSON/CSV data export and one-click account deletion.

### Milestone M2: Learn Engine, Verified Calculators & Multilingual Content (Weeks 4–5)
* **Goal:** Deliver clinician-reviewed learning modules and verified clinical calculators.
* **Key Tasks:**
  1. Article rendering pipeline with NHS website content API v2 integration, attribution, and draft governance flags.
  2. In-house reviewed articles (16 seed topics) with key takeaways, quiz, and glossary tooltips.
  3. Web Speech API read-aloud integration with fallback detection for unsupported device voices.
  4. Multilingual draft integration for Polish, Urdu, Bengali, Punjabi, and Tamil.
  5. Clinical Calculator Registry with full test suites matching published literature:
     - **Body:** BMI, Waist-to-Height Ratio (Ashwell 2012), Waist-to-Hip Ratio, Body Roundness Index (Thomas 2013), BSA (Mosteller), BMR (Mifflin-St Jeor 1990).
     - **Kidney:** eGFR (CKD-EPI 2021 race-free, Inker 2021), KDIGO ACR Risk Heatmap (NG203), KFRE 4-variable (Tangri 2011/2016, behind feature flag).
     - **Cardiovascular:** NICE NG136 BP Stage & 7-day home BP averaging (discarding day 1), Pulse Pressure.
     - **Lifestyle:** Alcohol units (UK 14-unit benchmark), Salt converter (mg Sodium to g Salt), MET-minutes activity calculator, NHS Eatwell Plate Builder.
     - **Medicines:** GLP-1 logging tool, Osmolality learning tool (educational only).
     - **Pharmacist Signpost:** Clinician-signed "Ask your pharmacist" JSON registry.

### Milestone M3: Mind Module, Safety Flows, Games & Push Notifications (Weeks 6–7)
* **Goal:** Deliver mental health screeners, interactive games, and safe nudges.
* **Key Tasks:**
  1. Standardised mental health instruments: PHQ-9 and GAD-7 with published scoring bands and plain-language guidance.
  2. **Automated Crisis Screening Engine:** Immediate transition to crisis screen (999, NHS 111 opt 2, Samaritans 116 123, Shout 85258) if PHQ-9 item 9 > 0 or self-harm keywords trigger. Gamification and nudges are immediately paused.
  3. 2-minute breathing and grounding exercises with link to NHS Talking Therapies.
  4. Launch 3 Core Games:
     - *Daily Kidney Quiz*
     - *Salt Detective* (Open Food Facts integration)
     - *Pill Check* (Common OTC cautions)
  5. Kidney Points Ledger and gentle level tiers (Seed, Sprout, Bean, Bloom) with zero penalty for missed days.
  6. Client-side share card generator (PNG output via Web Share API, zero raw health data by default).
  7. Web Push (VAPID) service worker notification engine respecting quiet hours, neutral lock-screen copy, and "I'm unwell" pauses.

### Milestone M4: Clinician Reports, Sharing Permissions & Care Finder (Weeks 8–9)
* **Goal:** Enable patient-controlled data sharing and healthcare service discovery.
* **Key Tasks:**
  1. Client-side accessible A4 PDF report generator (`@react-pdf/renderer` or `jsPDF`) covering physical vitals, lab trends, time-in-range, user-entered medicines, and appointment discussion points. Mental health data strictly excluded unless explicitly ticked.
  2. Expiring read-only share links (7/30/90 days) with optional passcode, hashed tokens, and patient-viewable access audit logs.
  3. Role-scoped view-only access for family/carers.
  4. "Find Care & Support" Module:
     - Integration with NHS Directory of Healthcare Services (Service Search) API v3 and ODS FHIR/ORD APIs via server proxy.
     - Geocoding via `postcodes.io`.
     - Static renal unit directory curated from UK Kidney Association data.
     - Curated London/UK support registry (`/content/support/*.json`) for charities, social care, and MoneyHelper.

### Milestone M5: Pre-moderated Community, Admin Portal & Final Audits (Weeks 10–12)
* **Goal:** Deliver community spaces, administrative review tools, research exports, and formal clinical safety sign-off.
* **Key Tasks:**
  1. 18+ pseudonymous community spaces with pre-moderation for initial posts, report/block tools, and crisis-keyword filtering.
  2. Full suite of launch games: Sick-Day Rules Sort, Plate Builder, BP Hero, Lab Decoder, Kidney Quest, Move-It, Mind Garden.
  3. GLP-1 comprehensive tracker (weight, hydration reminders, sick-day check prompts).
  4. Admin & Reviewer Portal: content lifecycle state machine (Draft -> In Review -> Approved -> Retired), reviewer profiles, and audit log.
  5. Pseudonymised, consented research export pipeline (CSV/Parquet) with data dictionary and randomisation flag support.
  6. Comprehensive security penetration test, DTAC evidence pack finalisation, DCB0129 hazard log review, and WCAG 2.2 AA audit.

### Future Versions (V1 & V2)
* **V1 (Post-MVP):**
  - Retrieval-Augmented Generative AI Assistant ("Ask") strictly grounded in NHS and reviewed content, with automated reading-age checking and CI red-team evaluation.
  - Peer buddy matching system (opt-in).
  - Native wrappers via Capacitor for Apple HealthKit and Android Health Connect.
* **V2 (Future Roadmap):**
  - NHS Login, NHS App integration, and bi-directional FHIR clinical exchange.
  - Two-way voice consultation (pending formal MHRA/DTAC ambient voice regulatory clearance).

---

## 4. Clinical Safety, Regulatory & Compliance Framework

| Framework / Regulation | Implementation Strategy |
|---|---|
| **DCB0129 / DCB0160** | Maintain hazard log in `docs/CLINICAL_SAFETY.md`. Track software hazards, severity, likelihood, and mitigations. Appoint Clinical Safety Officer (CSO). |
| **MHRA Software as Medical Device (SaMD)** | Maintain intended-purpose statement in `docs/REGULATORY.md`. Position app strictly as education and self-management support. Keep diagnostic/risk models (e.g. KFRE) behind feature flags with explicit disclaimers. |
| **NHS DTAC (Digital Technology Assessment Criteria)** | Complete DTAC checklist (`docs/DTAC_CHECKLIST.md`) covering Clinical Safety, Data Protection, Technical Security, Interoperability, and Accessibility. |
| **UK GDPR & DPA 2018** | Process special-category health data strictly under explicit, granular consent. UK London region hosting. Complete DPIA in `docs/DPIA.md`. Zero health data in URLs, server logs, or analytics. |
| **Online Safety Act 2023** | 18+ verification on community features, pseudonymous identifiers, keyword-triggered safety interventions, pre-moderation, and complete moderation audit trail in `docs/ONLINE_SAFETY.md`. |
| **Accessibility (WCAG 2.2 AA)** | Continuous CI tests via `axe-core`, minimum 44px touch targets, high-contrast and dyslexia-friendly themes, screen-reader semantic trees, and clear focus states. |

---

## 5. Quality Assurance & Verification Gates

1. **Automated Unit & Formula Testing:** 100% coverage on all clinical calculation algorithms against published literature worked examples (CKD-EPI 2021, KFRE, BRI, WHtR, BMR, etc.).
2. **Readability & Tone Verification:** CI script (`scripts/check-readability.ts`) enforcing Flesch-Kincaid reading level ≤ 7 and average sentence length ≤ 20 words for all patient-facing copy.
3. **Reference Verification Pipeline:** Script (`scripts/verify-refs.ts`) systematically verifying all DOI and PMID citations against Crossref and PubMed APIs before allowing builds.
4. **Automated Accessibility Testing:** `playwright` + `axe-core` running on every PR at mobile (360px) and desktop viewports across all 6 supported languages and themes.
5. **Security & Zero-Leak Verification:** Network interceptor tests verifying that zero PII or health metrics are transmitted in analytics or error monitoring payloads.

---

## 6. Open Questions & Approvals Required

All initial open questions, licensing placeholders, and operational decisions are catalogued in `docs/OPEN_QUESTIONS.md`. Building of application code will commence immediately upon user approval of this plan.
