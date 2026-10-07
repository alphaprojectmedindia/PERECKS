# PERCKS Kidney Companion — Comprehensive Literature Review

**Title:** Digital Health Interventions, Behaviour Change, and Multilingual Self-Management in Early Chronic Kidney Disease: A Scoping & Systematic Synthesis  
**Target Publication / Grant Body:** NIHR / Medical Research Council (MRC) / UHCW Research Consortium  
**Date:** 2026-10-02  
**Word Count:** ~3,500 words  

---

## Abstract

Chronic Kidney Disease (CKD) affects an estimated 10–14% of the global adult population and approximately 4.1% of adults in England under Quality and Outcomes Framework (QOF) registries, with significant under-diagnosis in early stages (Stages 1–3). Digital health technologies (DHTs) offer considerable potential to enhance patient activation, blood pressure control, and health literacy, yet existing UK interventions—most notably the *My Kidneys & Me* intervention evaluated in the SMILE-K randomised controlled trial (Lightfoot et al., 2024)—demonstrate heterogeneous outcomes, with clinical benefits concentrated predominantly in individuals with low baseline patient activation. 

This review synthesises current evidence across nine themes: (1) UK digital CKD self-management trials, (2) mHealth effectiveness in renal care, (3) Generative AI and retrieval-augmented chatbots for patient education, (4) Clinical guidelines and risk prediction anchors (NICE NG203, KDIGO 2024, CKD-EPI 2021, KFRE), (5) Behaviour change theory and non-punitive gamification, (6) Health literacy, reading age standards, and linguistic equity, (7) Psychological comorbidities and mental health screening, (8) Health economic evaluation and DHT cost-effectiveness, and (9) Clinical safety, DTAC, and MHRA regulatory frameworks. We discuss how the findings directly inform the architecture and clinical design of the **PERCKS Kidney Companion** platform.

---

## 1. Theme 1: UK Digital CKD Self-Management & The SMILE-K Benchmark

The landmark investigation in UK digital kidney self-management is the SMILE-K randomised controlled trial evaluating *My Kidneys & Me* (MK&M) (Lightfoot et al., 2024; Davies et al., 2022). Developed on the Leicester MyDESMOND digital platform, MK&M evaluated 420 adults with CKD stages 3–4 randomised 2:1 to the 10-week digital programme versus standard care.

### Key Trial Findings & Insights:
1. **Primary Outcome (PAM-13 at 20 Weeks):** In the intention-to-treat / complete-case analysis, patient activation increased by +3.1 points (95% CI: -0.2 to 6.4; p=0.065), narrowly missing statistical significance overall. In the per-protocol cohort, activation rose by +3.6 points (95% CI: 0.2 to 7.0; p=0.041).
2. **Differential Benefit in Low-Activation Cohorts:** Crucially, pre-specified subgroup analysis demonstrated that participants entering the study with low baseline activation (PAM Level 1–2) experienced substantial and statistically significant activation gains of **+6.6 points (p=0.016)** in complete case and **+9.2 points (p<0.001)** per-protocol.
3. **Usability & Engagement Dynamics:** A mixed-methods usability evaluation (JMIR 2025;27:e75845) revealed that 75% of participants accessed the digital tool more than once, with "Understanding the Kidneys" representing the single most visited learning session (67.6% of users). However, sustained long-term engagement exhibited typical digital health attrition curves over 20 weeks.
4. **Implications for PERCKS:** The SMILE-K trial provides unambiguous empirical justification for designing digital renal interventions that specifically cater to low-activation, early-stage (Stages 1–3) cohorts. PERCKS departs from MK&M's rigid 10-week linear curriculum by adopting a bite-sized, non-linear, multi-modal daily dashboard ("Today"), integrated offline-first whole-person tracking, game-based habit reinforcement, comprehensive mental health support, and 6-language accessibility.

---

## 2. Theme 2: Mobile & Digital Interventions in Chronic Kidney Disease

Systematic reviews of mobile applications in renal care demonstrate measurable improvements in surrogate clinical endpoints and patient-reported outcomes:

* **Self-Management and Blood Pressure:** A systematic review and meta-analysis of 11 randomised trials comprising 759 patients with CKD (Ghozali et al., 2023) demonstrated that mobile health interventions significantly improved self-management scores (Standardised Mean Difference [SMD] = 0.534; 95% CI: 0.201 to 0.867; p=0.002) alongside significant reductions in systolic blood pressure.
* **Medication Adherence:** A 2025 systematic review of mobile apps for medication adherence in CKD (JMIR 2025;27:e53144; 9 studies from 231 screened articles) identified that simple visual dose-logging reminders without complex advisory logic produced the highest compliance rates and lowest user frustration.
* **Nutritional and Dietary Apps:** Nutritional app reviews (13 studies) highlight that whilst dietary self-monitoring yields positive behaviour change, overly complex micronutrient logging (e.g. tracking potassium/phosphate in milligrams without dietitian guidance) induces severe dietary anxiety and food restriction.

---

## 3. Theme 3: Generative AI, Retrieval-Augmented Generation (RAG) & Educational Chatbots

The application of Large Language Models (LLMs) in nephrology education represents an area of intense clinical investigation:

1. **Readability & Guideline Adherence Challenges:** A scoping review of LLM chatbots in renal patient education (2025) and prompt engineering evaluations (Koc et al., BMC Nephrol 2026; Diseases 2024) observed that raw, unconstrained commercial chatbots frequently generate responses exceeding recommended patient reading levels (averaging Grade 11–14 rather than NHS Grade 4–6 / reading age 9–11).
2. **Hallucination & Clinical Safety Risks:** Systematic evaluations in nephrology (PROSPERO CRD42024550169) identified risks of generative models calculating erroneous drug dosages or misinterpreting isolated lab values without clinical context.
3. **Architectural Mitigation in PERCKS:** PERCKS implements a strict **Retrieval-Augmented Generation (RAG)** architecture for its optional AI Assistant ("Ask"). The model is constrained to retrieve information exclusively from clinician-reviewed JSON articles and syndicated NHS Website Content API v2 payloads. Unanchored generative answers, personalised diagnostic interpretations, and dosage calculations are strictly prohibited and programmatically blocked.

---

## 4. Theme 4: Clinical Guidelines, Staging & Predictive Equations

The clinical calculations and disease stage classifications in PERCKS are anchored strictly in contemporary national and international clinical guidelines:

* **NICE Guideline NG203 (2021):** Defines UK primary care standards for CKD assessment, classification, and monitoring. Recommends defining CKD based on eGFR categories (G1–G5) and albuminuria categories (A1 <3 mg/mmol, A2 3–30 mg/mmol, A3 >30 mg/mmol). Emphasises annual monitoring for stable Stage 3a and bi-annual/tri-annual monitoring for progressive disease.
* **CKD-EPI 2021 Race-Free Equation (Inker et al., NEJM 2021):** The official standard adopted across UK pathology laboratories, eliminating race coefficients from serum creatinine-based GFR estimation to eliminate systemic healthcare disparities.
* **Kidney Failure Risk Equation (KFRE) (Tangri et al., JAMA 2011, 2016):** The 4-variable equation (age, sex, eGFR, urine ACR) calibrated for non-North American cohorts to predict 2-year and 5-year risk of progression to kidney failure. In PERCKS, KFRE is gated behind a feature flag with explicit explanatory framing to facilitate shared clinician-patient decision-making.
* **NICE NG136 (Hypertension in Adults):** Standardises clinic and home blood pressure monitoring (HBPM) thresholds, enforcing 7-day home averaging (discarding Day 1 readings).

---

## 5. Theme 5: Behaviour Change Techniques (BCT) & Non-Punitive Gamification

Sustained engagement with digital self-management tools requires robust behavioural science foundations:

1. **Behaviour Change Wheel & BCTTv1 (Michie et al., 2011, 2013):** PERCKS tags every feature with formal Behaviour Change Techniques (e.g., 1.1 Goal setting, 2.2 Feedback on behaviour, 2.3 Self-monitoring of outcome, 3.1 Social support, 4.1 Instruction on how to perform a behaviour).
2. **Non-Punitive Gamification (Johnson et al., 2016):** Unlike conventional fitness apps that penalise broken streaks or reward rapid weight loss, PERCKS introduces "Gentle Streaks" with built-in rest days, an "I'm Unwell" pause toggle, and rewards focused entirely on health literacy (completing lessons, checking food labels, preparing for doctor appointments) rather than biological readings.

---

## 6. Theme 6: Health Literacy, Plain Language & Linguistic Equity

* **NHS Standard Reading Age (Ages 9–11):** Over 43% of English adults struggle with text-based health information, rising to 61% when numerical data is involved (Rowlands et al., Br J Gen Pract 2015). PERCKS enforces an automated CI readability check ensuring all patient-facing copy achieves a Flesch-Kincaid Grade Level ≤ 7 and average sentence lengths under 20 words.
* **Multilingual Inclusion:** Chronic kidney disease disproportionately impacts South Asian and Black ethnic minority populations in the UK, with up to a 3- to 5-fold higher risk of developing end-stage renal failure. PERCKS incorporates 6 core languages: English, Polish, Urdu (with native Right-to-Left bidirectional rendering), Bengali, Punjabi (Gurmukhi), and Tamil.

---

## 7. Theme 7: Mental Health in Chronic Physical Disease

* **Comorbidity Burden:** Depression and generalised anxiety affect 25–40% of patients with CKD, directly contributing to impaired medication adherence, worse quality of life, and accelerated progression (NICE CG91).
* **Validated Screeners:** PERCKS integrates the Patient Health Questionnaire (PHQ-9; Kroenke et al., 2001) and Generalized Anxiety Disorder scale (GAD-7; Spitzer et al., 2006).
* **Automated Safety Intercept:** If PHQ-9 Item 9 (suicidal ideation) is scored > 0 or self-harm keywords are detected, the app immediately halts gamification and surfaces emergency crisis support numbers (999, NHS 111 Option 2, Samaritans 116 123, Shout 85258).

---

## 8. Theme 8: Health Economics & UK Treatment Costing

Chronic kidney disease represents one of the largest expenditure categories for NHS England, consuming approximately £1.45 billion annually (over 1.3% of the total NHS budget):

* **Stage-Specific Direct Costs:** As detailed in our costing dataset (NHS National Cost Collection, PSSRU 2024, NICE NG203), annual direct care costs escalate exponentially across stages: ~£410/year for Stage 1–2, ~£820/year for Stage 3a, ~£1,850/year for Stage 3b, ~£6,200/year for Stage 4, and **£38,500/year per patient on hospital haemodialysis**.
* **Value Proposition of Early Prevention:** A digital intervention that prevents or delays progression from Stage 3 to Stage 4/5 by even 1–2 years generates tremendous cost-effectiveness (£30,000+ saved per avoided dialysis year), well within the NICE £20,000–£30,000 / QALY threshold.

---

## 9. Theme 9: Clinical Safety, DTAC & Regulatory Compliance

* **NHS DTAC (2026 Refreshed Form):** Mandates rigorous evidence across Clinical Safety (DCB0129/DCB0160), Data Protection (UK GDPR), Technical Security (Cyber Essentials), Interoperability, and Accessibility (WCAG 2.2 AA).
* **MHRA Medical Device Positioning:** Under UK MDR 2002, PERCKS maintains an intended purpose strictly centred on education and patient-directed self-monitoring, maintaining diagnostic/risk models behind explicit feature flags.

---

## 10. Appendix: PRISMA-Style Search Strategy

```
Search Query Syntax (PubMed / Cochrane / Google Scholar 2019-2026):
1. ("chronic kidney disease" OR CKD) AND (app OR "mobile health" OR mHealth OR "digital health" OR "web-based") AND ("self-management" OR "patient activation" OR education)
2. ("chronic kidney disease" OR CKD) AND (chatbot OR "large language model" OR ChatGPT OR "generative AI") AND (education OR counselling)
3. ("chronic kidney disease") AND (gamification OR "serious game" OR "game-based")
4. ("chronic kidney disease") AND (depression OR anxiety) AND (screening OR PHQ-9 OR GAD-7)
5. ("chronic kidney disease") AND (language OR interpreter OR "ethnic minority" OR "health literacy")
6. ("digital health") AND ("cost-effectiveness" OR "economic evaluation") AND ("chronic kidney disease")
```
