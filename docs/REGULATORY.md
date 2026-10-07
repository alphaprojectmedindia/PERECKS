# PERCKS Kidney Companion — Regulatory & MHRA Strategy

**Document Version:** 1.0.0  
**Regulatory Jurisdiction:** United Kingdom (MHRA / UK MDR 2002)  
**Status:** Approved  

---

## 1. Intended Purpose Statement (MHRA Positioning)

> *"PERCKS Kidney Companion is a digital health application designed to deliver accessible health education, lifestyle tracking, and self-management support to adult patients (aged 18+) with early-stage chronic kidney disease (Stages 1–3) or those at elevated risk. It provides self-monitoring tools and educational simulations to support informed discussions between patients and their healthcare team. It is not intended to provide clinical diagnosis, determine clinical treatment pathways, or calculate medication dosages."*

---

## 2. Software as a Medical Device (SaMD) Classification Assessment

Under the UK Medical Devices Regulations 2002 (as amended) and MHRA guidance on Software as a Medical Device (Borderline and Qualification):

| Module / Feature | Functionality Description | Medical Device Qualification? | Governance Control |
|---|---|---|---|
| **Educational Articles & NHS Content** | Plain-language information on kidney function, diet, and lifestyle. | **Non-Device** (Health Information) | Editorial review and NHS API v2 syndication rules. |
| **Self-Tracking (BP, Weight, Mood, Food)** | Logging patient-measured vitals and displaying trends over time. | **Non-Device** (Wellbeing & Personal Diary) | Clear disclaimer: *"Self-reported values"*. |
| **Simple Body Measures (BMI, WHtR, BMR)** | Standard mathematical formula calculations. | **Non-Device** (General Health Calculator) | Standard formula verification. |
| **eGFR Staging (CKD-EPI 2021 race-free)** | Converting serum creatinine into estimated GFR stage for educational review. | **Borderline (Class I if advisory)** | Framed as educational aid; requires repeat lab confirmation; non-diagnostic disclaimer. |
| **KFRE 4-Variable Risk Equation** | Predicts 2- and 5-year risk of kidney failure progression. | **Class I / IIa SaMD (Potential)** | **Maintained behind a feature flag.** Requires formal MHRA technical file and clinical evaluation before general release. |
| **AI Assistant ("Ask")** | Retrieval-augmented LLM answering patient questions from reviewed corpus. | **Potential SaMD** | **Flagged OFF in MVP.** Requires strict guardrails, zero extrapolation, and UK-hosted processing. |

---

## 3. MHRA Ambient Voice & Voice Input Regulatory Guidance (29 July 2026)

The MHRA guidance published on 29 July 2026 clarifies regulatory requirements for ambient voice technologies and automated clinical scribes:
* **Scope in PERCKS:** Two-way conversational voice interaction and ambient clinical transcription are **OUT OF SCOPE** for the MVP.
* **Text-to-Speech (TTS):** The app provides one-way read-aloud via the browser's built-in Web Speech API (`window.speechSynthesis`). This is an accessibility accommodation under the Equality Act 2010 and does not qualify as ambient voice technology.
