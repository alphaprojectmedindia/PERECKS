# PERCKS Kidney Companion — Online Safety Act 2023 Risk Assessment

**Statutory Framework:** UK Online Safety Act 2023  
**Service Type:** User-to-User Health Community & Moderated Peer Support  
**Target User Demographics:** Adults aged 18+ with CKD Stages 1–3 or risk factors  
**Last Assessment Date:** 2026-10-02  

---

## 1. Safety Duties & Age Assurance

1. **Age Gating (18+ Requirement):** Community interaction features are strictly restricted to adults aged 18 and older. Age verification is declared during onboarding and enforced prior to granting community posting privileges.
2. **Pseudonymous Identity:** Real names and NHS numbers are never displayed in community spaces. Users select an avatar shape/colour and a non-identifying nickname.
3. **Pre-Moderation for First-Time Posters:** To prevent harassment, spam, and non-compliant medical claims, all initial posts by new users must be approved by a moderator before becoming public.

---

## 2. Safety Risk Assessment Matrix

| Risk Category | Harm Scenario | Technical & Operational Controls |
|---|---|---|
| **Harmful Medical Misinformation** | Users sharing untested alternative cures, unregulated herbal remedies, or advising others to cease prescribed medications. | 1. Automated keyword screening for prohibited claims. 2. Clear community house rules prohibiting medical advice. 3. Rapid moderator review queue and reporting tools. |
| **Self-Harm & Mental Health Crises** | Users expressing severe distress, despair, or suicidal intent in discussion forums. | 1. Real-time regex and NLP keyword intercept on post submission. 2. Immediate display of emergency crisis resources (999, NHS 111 Opt 2, Samaritans, Shout). 3. Automated alert flagged to on-call moderation team. |
| **Harassment & Bullying** | Aggressive, discriminatory, or abusive interactions in peer spaces. | 1. User-level 'Block' and 'Report Post' buttons on every message. 2. Moderation audit log recording all reported content and moderator enforcement actions. |

---

## 3. Moderation Architecture & Audit Trail

All community events and moderator interventions are permanently stored in the `moderation_actions` database table:
* `action_id`, `post_id`, `moderator_id`, `action_taken` (`approved`, `rejected`, `warned`, `banned`), `reason`, `timestamp`.
* Zero health data or personal medical history is linked to public moderator audit logs.
