# ADR 0005: UK NHS Treatment Costing Model & Health Economics Ingestion

**Status:** Accepted  
**Date:** 2026-10-02  

## Context
A major limitation of previous digital renal interventions (such as My Kidneys & Me in SMILE-K) was the absence of integrated healthcare resource utilization and costing metrics, hindering economic evaluations for NHS commissioning.

## Decision
We integrated authentic UK healthcare cost data based on:
1. **NHS National Cost Collection (NCC):** Accurate tariffs for haemodialysis (£38,500/year), peritoneal dialysis (£25,500/year), and nephrology outpatient visits.
2. **PSSRU Unit Costs of Health & Social Care (2024):** GP (£44/visit), nurse (£16.50), and dietitian (£74) tariffs.
3. **NICE Guideline NG203 Resource Impact Models:** Economic progression delay valuation.

## Consequences
- Enables patients to understand the value of prevention.
- Provides immediate health economics export capability for clinical research partners.
