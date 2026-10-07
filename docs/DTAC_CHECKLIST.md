# NHS England Digital Technology Assessment Criteria (DTAC) — Evidence Pack

**Standard:** Refreshed DTAC Form (Effective 6 April 2026)  
**Assessed Application:** PERCKS Kidney Companion (v1.0.0)  
**Target NHS Audience:** Primary Care Networks, Renal MDTs, ICBs, and Adult CKD Patients  

---

## Section C1: Clinical Safety (DCB0129 / DCB0160)
* **C1.1 Clinical Safety Officer:** Nominated CSO with current registration and DCB0129 training.
* **C1.2 Clinical Risk Management System:** Documented in `docs/CLINICAL_SAFETY.md`.
* **C1.3 Hazard Log:** Maintained with residual risk scores and ongoing mitigations.
* **C1.4 Clinical Safety Case Report:** Completed prior to pilot rollout in UHCW / Coventry University clinical trials.

## Section C2: Data Protection (UK GDPR / DPA 2018)
* **C2.1 Data Protection Officer (DPO):** Registered with the Information Commissioner's Office (ICO).
* **C2.2 Data Protection Impact Assessment (DPIA):** Completed in `docs/DPIA.md`.
* **C2.3 Data Hosting Location:** 100% UK Data Residency (London Region AWS eu-west-2 / Supabase UK).
* **C2.4 Privacy Notice:** Plain-language notice accessible on all pages and during onboarding.
* **C2.5 Data Subject Rights:** Full export and deletion tools available in app settings.

## Section C3: Technical Security (Cyber Essentials / OWASP)
* **C3.1 Encryption in Transit:** Enforced TLS 1.3 for all client-to-server communications.
* **C3.2 Encryption at Rest:** Database encrypted at rest using AES-256.
* **C3.3 Authentication Security:** Passwordless magic-link authentication with optional MFA; rate-limited endpoints.
* **C3.4 Vulnerability Management:** Automated dependency audits (`npm audit`) and zero-leak payload checks in CI.

## Section C4: Interoperability
* **C4.1 NHS API Integration:** Consuming NHS Website Content API v2 and Directory of Healthcare Services API v3.
* **C4.2 Data Export Standards:** Structured JSON and CSV data exports aligned with standard healthcare terminology.
* **C4.3 Future Roadmap (V2):** HL7 FHIR US-Core / UK Core profiles for clinical data exchange.

## Section C5: Usability and Accessibility
* **C5.1 WCAG 2.2 AA Compliance:** Audited via `axe-core` and Playwright with 0 critical/serious defects.
* **C5.2 NHS Design System Alignment:** Incorporates NHS colours, accessible typography, and calm visual hierarchy.
* **C5.3 Patient Involvement:** Co-designed with patient representatives, including multilingual communities (South Asian & Polish cohorts).
