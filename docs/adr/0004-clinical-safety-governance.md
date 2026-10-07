# ADR 0004: Clinical Safety & Automated Crisis Interception (DCB0129)

**Status:** Accepted  
**Date:** 2026-10-02  

## Context
Depression and emotional distress are highly prevalent in chronic kidney disease. Incorporating patient-facing mental health questionnaires (PHQ-9) presents a safety obligation under DCB0129 if a user discloses suicidal ideation or self-harm intent.

## Decision
We engineered an automated real-time safety intercept in the client application:
1. If PHQ-9 Item 9 is scored > 0, or if self-harm keywords are detected in free-text inputs, the app immediately halts gamification, hides reward nudges, and displays an un-dismissible emergency assistance card (999, NHS 111 Option 2, Samaritans 116 123, Shout 85258).
2. The event is logged in a privacy-preserving first-party safety audit table with zero PII.

## Consequences
- Strict compliance with DCB0129 hazard mitigation requirements.
- Immediate, compassionate, and life-saving signposting for distressed users.
