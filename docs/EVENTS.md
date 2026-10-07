# PERCKS Kidney Companion — Privacy-Preserving Event & Telemetry Schema

**Document Version:** 1.0.0  
**Policy:** Strict First-Party Telemetry (Zero Health Values in Analytics)  

---

## 1. Event Telemetry Principles

1. **No External Analytics:** Zero third-party analytics trackers (e.g. Google Analytics, Facebook Pixel, Mixpanel) are permitted in client builds.
2. **Zero Health Metrics:** Event payloads must NEVER record blood pressure readings, glucose levels, medication names, questionnaire scores, or personal notes.
3. **Action-Only Tracking:** Telemetry records module interaction counts, completion funnels, and navigation state for usability research under consented conditions.

---

## 2. Event Registry

| Event Name | Trigger | Allowed Payload Properties | Prohibited Properties |
|---|---|---|---|
| `app_opened` | User opens application or PWA loads | `{ platform: 'pwa' \| 'web', locale: string }` | Device ID, IP, location |
| `module_viewed` | User navigates to a module route | `{ moduleId: string, durationSec: number }` | Health parameters |
| `measurement_logged` | User saves any vital/log | `{ measurementType: string, source: 'manual' \| 'import' }` | **The logged value, unit, or notes** |
| `lesson_completed` | User finishes reading an educational article | `{ articleId: string, language: string, timeSpentSec: number }` | User thoughts |
| `quiz_completed` | User submits answers to a lesson quiz | `{ quizId: string, scorePercentage: number }` | Specific wrong choices |
| `calculator_used` | User calculates an educational index | `{ calculatorId: string, unitSystem: 'metric' \| 'imperial' }` | **Input values (e.g. Creatinine, BP)** |
| `game_played` | User finishes a micro-game | `{ gameId: string, level: number, pointsEarned: number }` | Specific health answers |
| `crisis_screen_triggered` | User triggers crisis keyword or PHQ9-Q9 > 0 | `{ triggerSource: 'phq9' \| 'keyword', actionTaken: 'call_999' \| 'call_111' \| 'dismiss' }` | Patient name, text input |
| `share_link_created` | User generates an expiring clinician link | `{ recipientType: 'clinician' \| 'family', durationDays: number, includedMentalHealth: boolean }` | Generated token string |
