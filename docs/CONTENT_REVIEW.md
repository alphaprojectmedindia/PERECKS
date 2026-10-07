# PERCKS Kidney Companion — Clinical Content Review Workflow

**Standard:** Clinical Content Governance & Safety Lifecycle  
**Document Version:** 1.0.0  
**Last Updated:** 2026-10-02  

---

## 1. Content Lifecycle State Machine

```
[DRAFT]
  │  - Created by medical writer / researcher
  │  - Zod schema validation
  │  - Readability check (Flesch-Kincaid Grade <= 7)
  │  - Visible ONLY in development mode with [DRAFT] watermark
  ▼
[IN REVIEW]
  │  - Assigned to named Clinician Reviewer (Consultant Nephrologist / Renal Pharmacist / Dietitian)
  │  - Verified against NICE (NG203/NG136) & KDIGO guidelines
  │  - Checked for non-advisory plain-language framing
  ▼
[APPROVED]
  │  - Clinician reviewer name, role, review date, and next review date recorded in JSON
  │  - Deployed to production build
  │  - Publicly visible with clinician review badge
  ▼
[RETIRED / ARCHIVED]
  - Triggered if review date passes without re-certification (> 12 months)
  - Hidden from production patient view
```

---

## 2. Reviewer Checklist (Mandatory Requirements)

Before approving any article or calculator explanation, the clinician reviewer verifies:
1. **Reading Level:** Does the text read comfortably for someone aged 9–11? Are complex terms defined in the glossary?
2. **Clinical Accuracy:** Does the text reflect UK clinical practice (NICE NG203, KDIGO 2024, CKD-EPI 2021 race-free eGFR)?
3. **Non-Advisory Framing:** Does it avoid giving personal dosing, prescriptive dietary numbers (unless clinician-set), or direct diagnostic labels?
4. **Actionability:** Are the "What you can do", "When to get help", and "Questions to ask your team" sections clear, empowering, and realistic?
5. **Attribution:** Are primary sources and academic citations accurately referenced?
