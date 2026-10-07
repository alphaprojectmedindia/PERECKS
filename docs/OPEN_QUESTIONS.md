# PERCKS Kidney Companion — Open Questions & Decision Log

**Status:** Awaiting Project Stakeholder Review  
**Last Updated:** 2026-10-02  

---

This document tracks all decisions, missing licences, unverified citations, clinical sign-offs, and governance requirements that must be resolved with the project team.

## 1. Core Governance & Project Details (Section 20)

| ID | Item / Question | Current Placeholder / Default | Stakeholder / Owner Required | Status |
|---|---|---|---|---|
| **OQ-01** | **Official project name and acronym expansion** | Working title: *PERCKS Kidney Companion* (Acronym unexpanded) | Principal Investigator / Project Lead | Open |
| **OQ-02** | **Medindia article reuse licence** | Zero Medindia text used; all educational articles written fresh or sourced via NHS Website Content API v2 | Medindia / Research Team | Open (Default: Fresh text) |
| **OQ-03** | **PAM-13 licence & alternative activation measure** | "Activation measure" slot provided with clear placeholder pending Insignia Health licence confirmation | Project Lead / Health Economics Lead | Open (Placeholder ready) |
| **OQ-04** | **NHS Developer Portal account & API keys** | Server proxy scaffolded with mock/fallback mode for NHS Website Content API v2 and Directory of Healthcare Services (Service Search) API v3 | Technical Lead / NHS Digital Account Owner | Open |
| **OQ-05** | **Hosting provider & regional budget** | Supabase UK (London region, AWS eu-west-2) for data residency compliance | Technical Lead / Budget Holder | Open |
| **OQ-06** | **Named clinical reviewers, native-language reviewers, and moderators** | Draft flags enabled across all content; reviewer credentials catalogued in `/content/reviewers.json` once supplied | Clinical Lead / Project Team | Open |
| **OQ-07** | **LLM provider approval for Chatbot (V1)** | Feature flagged OFF in MVP. Retrieval-only pipeline designed; will require UK/EU-hosted, contractually covered enterprise endpoint | Data Protection Officer / PI | Open |
| **OQ-08** | **Clinical Safety Officer (CSO) & Data Protection Officer (DPO)** | Placeholders recorded in `docs/CLINICAL_SAFETY.md` and `docs/DPIA.md` pending named appointments (DCB0129 compliance) | NHS Trust Sponsor / UHCW | Open |

---

## 2. Licensing & Questionnaires Checklist

| Instrument | Licence Status | Action / Mitigation in Code |
|---|---|---|
| **PAM-13** (Patient Activation Measure) | Proprietary (Insignia Health) | Code contains generic activation measure interface with placeholder; unverified questions hidden until licence is attached |
| **EQ-5D-5L** | EuroQol registration required | Questionnaire slot built; pending registration confirmation |
| **Kidney Symptom Questionnaire (KSQ)** | University/academic licence | Questionnaire slot built; pending permission check |
| **Sleep Scales** (e.g. ISI, PSQI) | Academic registration | Using generic single-item sleep quality tracker in MVP |
| **PHQ-9 & GAD-7** | Public domain / freely usable | Included in MVP with standard scoring and immediate crisis intervention protocol |

---

## 3. Data & API Provenance Notes

1. **NHS Website Content API:** Migration from deprecated v1 to v2 in progress. All articles rendered with explicit attribution: *"Content supplied by the NHS website"*.
2. **Directory of Healthcare Services API:** Using v3 endpoints (v1 and v2 deprecated 2 February 2026). Geocoding fallback provided via `postcodes.io`.
3. **Food Composition Data:** McCance and Widdowson's CoFID (Open Government Licence) used for UK food database; USDA FoodData Central (CC0) used strictly as fallback for missing potassium/phosphorus values, explicitly tagged by source.
4. **NHANES 2017–2023 Cohort:** US population survey data used strictly for offline demographic distribution exploration and calculator test vector generation; never presented as UK clinical guidance.
