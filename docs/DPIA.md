# PERCKS Kidney Companion — Data Protection Impact Assessment (DPIA)

**Compliance Standard:** UK General Data Protection Regulation (UK GDPR) & Data Protection Act 2018  
**Data Controller:** [Sponsoring NHS Trust / Research University Consortium]  
**Data Processor:** PERCKS Infrastructure (Supabase London Region / AWS eu-west-2)  
**Date Completed:** 2026-10-02  

---

## 1. Systematic Description of Processing

### Data Categories Processed
* **Identity Data:** Pseudonymous nickname, avatar selection (no real full names required).
* **Contact Data:** Email address for passwordless magic-link sign-in.
* **Special Category Health Data (Article 9):** Blood pressure readings, blood glucose, weight, fluid/salt intake, self-reported symptoms, user-entered medication lists, lab test entries (eGFR, creatinine, urine ACR), PHQ-9 and GAD-7 screener responses.

### Lawful Basis for Processing
* **Article 6(1)(a):** Freely given, specific, informed, and unambiguous consent.
* **Article 9(2)(a):** Explicit consent for the processing of special-category health data.
* **Article 9(2)(j):** Archiving purposes in the public interest, scientific or historical research purposes (for opted-in pseudonymised research exports).

---

## 2. Privacy Risk Assessment & Mitigations

| Risk | Assessment | Mitigation Measure |
|---|---|---|
| **Data stored outside the UK** | High | All cloud database instances and edge functions are hosted exclusively in the **London region (AWS eu-west-2)**. |
| **Health metrics leaked in URLs or logs** | High | Client-side routing uses path identifiers (`/track`, `/learn`); metrics are stored in IndexedDB and sent via encrypted POST payloads. Server logs strictly sanitize all payload parameters. |
| **Unauthorized access to patient records** | High | PostgreSQL Row-Level Security (RLS) ensures each authenticated user can only access records where `auth.uid() = user_id`. |
| **Accidental sharing of sensitive mental health scores** | Medium | Clinician PDF reports and expiring links exclude PHQ-9, GAD-7, and journal entries by default, requiring explicit single-use checkbox confirmation. |
| **Data retention after account closure** | Medium | The "Delete My Account" feature triggers a cascading deletion across all relational tables and purges local IndexedDB storage immediately. |

---

## 3. Data Subject Rights Implementation

* **Right of Access & Portability (Art 15 & 20):** Instant export of all user data in standard JSON and CSV formats under *Settings > Export My Data*.
* **Right to Erasure (Art 17):** Permanent self-service account deletion under *Settings > Delete My Account*.
* **Right to Withdraw Consent (Art 7(3)):** Granular consent toggles for health tracking, mental health questionnaires, community features, and research participation.
