# PERCKS Kidney Companion — Clinical Safety & Hazard Log (DCB0129 / DCB0160)

**Standard Compliance:** DCB0129 (Clinical Risk Management: Its Application in the Deployment and Use of Health IT Systems)  
**Document Version:** 1.0.0  
**Clinical Safety Officer (CSO):** [Named Consultant Nephrologist / Research Lead - Placeholder]  
**Last Safety Review Date:** 2026-10-02  

---

## 1. Intended Purpose & Clinical Scope

PERCKS Kidney Companion is an educational and lifestyle self-management support system intended for adult patients (aged 18+) with chronic kidney disease (CKD Stages 1–3) or individuals at high risk of renal impairment (hypertension, type 2 diabetes, obesity).

### Non-Advisory Declaration
* **What it IS:** A digital companion for health literacy education, tracking personal measurements, preparing for routine clinical appointments, and practicing gentle wellness habits.
* **What it is NOT:** It does NOT diagnose conditions, prescribe medications, alter drug dosages, or provide emergency triage. Every screen and calculator clearly states:  
  > *"This information is for education and self-monitoring. It does not replace advice from your doctor, nurse, or renal team."*

---

## 2. DCB0129 Hazard Log

| Hazard ID | Hazard Description | Potential Clinical Consequence | Initial Risk Score | Mitigation & Design Controls | Residual Risk Score |
|---|---|---|---|---|---|
| **HAZ-001** | **Patient misinterprets an educational calculator result as a formal clinical diagnosis.** | Patient experiences unwarranted anxiety or delays contacting their GP. | Moderate (3x3=9) | 1. Prominent warning banners on all calculators: *"Estimate only; speak to your GP"*. 2. No automatic diagnostic labeling. 3. Requirement for repeat confirmatory testing highlighted. | Low (1x2=2) |
| **HAZ-002** | **Patient uses over-the-counter NSAID or nephrotoxic medicine unaware of renal risk.** | Accelerated progression of kidney dysfunction or acute kidney injury (AKI). | High (4x3=12) | 1. Dedicated "Pill Check" module and clinician-signed "Ask your pharmacist" directory. 2. Clear cautions regarding ibuprofen, naproxen, and potassium salt substitutes. | Low (2x1=2) |
| **HAZ-003** | **Depression or suicidal ideation undetected during self-assessment.** | Patient harm or suicide crisis without emergency support. | Critical (5x3=15) | 1. Automated real-time intercept: if PHQ-9 Item 9 > 0 or crisis keywords appear, immediately display the NHS Crisis Screen (999, NHS 111 Option 2, Samaritans 116 123, Shout 85258). 2. Gamification and notifications are instantly paused. | Low (1x2=2) |
| **HAZ-004** | **Unreviewed or inaccurate clinical text displayed in production.** | Patient receives outdated or misleading guidance. | High (4x3=12) | 1. Content pipeline state machine: Draft content is strictly hidden in production builds. 2. Every article displays author, reviewer name, review date, and next review date. 3. Automatic CI check fails on missing review dates. | Low (1x2=2) |
| **HAZ-005** | **Calculation error in eGFR or KFRE mathematical formula.** | Inaccurate risk stratification communicated to user. | High (4x3=12) | 1. Verified CKD-EPI 2021 race-free equation test suite matching published literature test vectors. 2. KFRE kept behind a clinician-controlled feature flag. 3. Input bounds validation on serum creatinine and urine ACR. | Low (1x1=1) |
| **HAZ-006** | **Patient continues taking blood pressure or diuretic medications during acute dehydrating illness.** | Severe hypotension, hypoperfusion, and acute kidney injury. | High (4x3=12) | 1. Clinician-reviewed "Sick-Day Rules" interactive education module. 2. Plain guidance explaining when to call the GP or renal nurse to discuss pausing specific medicines. | Low (2x1=2) |

---

## 3. Emergency Crisis Intervention Flow

```
User submits input (PHQ-9 screener or free-text journal/community post)
                             │
                             ▼
            Is PHQ-9 Item 9 > 0 OR Crisis Keyword matched?
                             │
              ┌──────────────┴──────────────┐
             YES                            NO
              │                             │
              ▼                             ▼
   [PAUSE GAMIFICATION & NUDGES]    [PROCEED WITH NORMAL FLOW]
              │
              ▼
   [IMMEDIATE EMERGENCY OVERLAY]
   - Call 999 (Life-threatening emergency)
   - NHS 111 Option 2 (Mental Health Crisis Team)
   - Samaritans: Call 116 123 (Free 24/7)
   - Shout Crisis Text Line: Text 'SHOUT' to 85258
              │
              ▼
   [Log Safety Event (Zero PII recorded)]
```

---

## 4. DCB0160 Handover & Deployment Summary

For NHS Trusts and Primary Care Networks deploying PERCKS Kidney Companion:
1. **Host Organisation Responsibilities:** Confirm local referral pathways and renal dietitian contact details.
2. **Clinical Governance Sign-Off:** Review the local customization of target blood pressure ranges and renal unit contact numbers.
3. **Incident Reporting:** Any safety concerns must be reported directly to the appointed Clinical Safety Officer within 24 hours.
