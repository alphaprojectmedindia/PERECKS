# Manual Dataset Access & Governance Guide

This document outlines the registration, ethical approval, and access protocols for research-grade datasets used in extended phases of the PERCKS Kidney Companion initiative.

---

## 1. Regulated Research Datasets (Non-Redistributable)

### A. UK Biobank (Kidney Progression Cohort)
* **Access URL:** [https://www.ukbiobank.ac.uk/enable-your-research/apply-for-access](https://www.ukbiobank.ac.uk/enable-your-research/apply-for-access)
* **Prerequisites:** Institutional research sponsor agreement (Coventry University / UHCW / Leeds / Birmingham), approved Material Transfer Agreement (MTA), and payment of access management fees.
* **Storage Requirement:** Secure UK cloud storage enclave. Raw participant-level genomic or biochemical data must NEVER be committed to the repository or exported client-side.

### B. Clinical Practice Research Datalink (CPRD Aurum & GOLD)
* **Access URL:** [https://cprd.com/data-access](https://cprd.com/data-access)
* **Prerequisites:** Approved Research Data Governance (RDG) protocol.
* **Use:** Observational longitudinal trajectory analysis of CKD Stages 1–3 in UK primary care.

### C. NHS Technology Reference data Update Distribution (TRUD) - dm+d
* **Access URL:** [https://isd.digital.nhs.uk/trud/](https://isd.digital.nhs.uk/trud/)
* **Prerequisites:** Free TRUD user account and acceptance of the NHS England TRUD licence terms.
* **Use:** Download the definitive NHS Dictionary of Medicines and Devices (`dm+d`) release XML for SNOMED-coded medicine terminology.

### D. UK Renal Registry (UK Kidney Association Data Request)
* **Access URL:** [https://ukkidney.org/audit-research/data-requests](https://ukkidney.org/audit-research/data-requests)
* **Prerequisites:** Formal UKKA research committee application and data sharing agreement.

---

## 2. Automated & Open Datasets in Repository
* **CoFID (UK Food Composition):** Open Government Licence v3.0 (`data/processed/foods_uk.json`).
* **UK Treatment Costs:** PSSRU, NHS National Cost Collection, and NICE NG203 (`data/processed/uk_treatment_costs.json`).
* **UK Renal Centres:** UKKA public registry (`data/processed/renal_units_uk.json`).
* **CDC NHANES Cohort:** Public domain (`data/processed/sample_nhanes_cohort.json`).
