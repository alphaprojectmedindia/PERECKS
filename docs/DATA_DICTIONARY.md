# PERCKS Kidney Companion — Data Dictionary & Database Schema

**Document Version:** 1.0.0  
**Storage Architecture:** PostgreSQL 15 (Supabase UK London Region) & IndexedDB (`percks_offline_db`)  

---

## 1. Relational Database Tables (PostgreSQL with RLS)

### Table: `profiles`
* `id` (UUID, PK, references `auth.users`)
* `nickname` (TEXT, pseudonymous display name)
* `avatar_icon` (TEXT, e.g., 'bean', 'heart', 'droplet')
* `avatar_color` (TEXT, hex code)
* `language` (VARCHAR(5), 'en' | 'pl' | 'ur' | 'bn' | 'pa' | 'ta')
* `font_scale` (INT, 100 | 125 | 150 | 200)
* `reading_level` (VARCHAR(10), 'simple' | 'standard')
* `theme` (VARCHAR(20), 'calm' | 'high_contrast' | 'dark' | 'large_text' | 'dyslexia')
* `ckd_stage` (VARCHAR(10), optional self-selected: 'stage_1' | 'stage_2' | 'stage_3a' | 'stage_3b' | 'at_risk' | 'unknown')
* `quiet_hours_start` (TIME, default '21:00')
* `quiet_hours_end` (TIME, default '08:00')
* `created_at` (TIMESTAMPTZ)
* `updated_at` (TIMESTAMPTZ)

### Table: `consents`
* `user_id` (UUID, PK, references `profiles.id`)
* `health_data_consent` (BOOLEAN, explicit Art 9 consent)
* `mental_health_consent` (BOOLEAN, consent for PHQ-9/GAD-7)
* `community_consent` (BOOLEAN, 18+ and peer space rules)
* `research_export_consent` (BOOLEAN, opt-in pseudonymised trial export)
* `updated_at` (TIMESTAMPTZ)

### Table: `measurements`
* `id` (UUID, PK)
* `user_id` (UUID, references `profiles.id`)
* `type` (VARCHAR(30), 'blood_pressure' | 'weight' | 'glucose' | 'fluid' | 'salt' | 'activity' | 'sleep' | 'waist' | 'hip')
* `value_primary` (NUMERIC, e.g. systolic BP, weight in kg, ml fluid)
* `value_secondary` (NUMERIC, e.g. diastolic BP, pulse, sleep quality rating)
* `unit` (VARCHAR(15), 'mmHg' | 'kg' | 'mmol/L' | 'ml' | 'grams' | 'minutes' | 'hours')
* `taken_at` (TIMESTAMPTZ)
* `notes` (TEXT)
* `sync_status` (VARCHAR(15), 'synced' | 'pending')

### Table: `labs`
* `id` (UUID, PK)
* `user_id` (UUID, references `profiles.id`)
* `test_name` (VARCHAR(30), 'egfr' | 'creatinine' | 'urine_acr' | 'hba1c' | 'potassium' | 'cholesterol')
* `value` (NUMERIC)
* `unit` (VARCHAR(15), 'ml/min/1.73m2' | 'umol/L' | 'mg/mmol' | 'mmol/mol' | 'mmol/L')
* `sample_date` (DATE)
* `lab_location` (TEXT)

### Table: `questionnaire_responses`
* `id` (UUID, PK)
* `user_id` (UUID, references `profiles.id`)
* `instrument` (VARCHAR(20), 'phq9' | 'gad7' | 'activation_placeholder')
* `item_responses` (JSONB, array of numeric scores per item)
* `total_score` (INT)
* `severity_band` (TEXT)
* `completed_at` (TIMESTAMPTZ)

### Table: `points_ledger`
* `id` (UUID, PK)
* `user_id` (UUID, references `profiles.id`)
* `activity_id` (VARCHAR(50), e.g. 'log_bp', 'finish_lesson', 'quiz_complete')
* `points_awarded` (INT)
* `bct_tag` (VARCHAR(10))
* `awarded_at` (TIMESTAMPTZ)

### Table: `shares`
* `id` (UUID, PK)
* `user_id` (UUID, references `profiles.id`)
* `token_hash` (TEXT, SHA-256 hashed secret token)
* `recipient_type` (VARCHAR(20), 'clinician' | 'family')
* `include_mental_health` (BOOLEAN, default false)
* `expires_at` (TIMESTAMPTZ)
* `is_revoked` (BOOLEAN, default false)
* `created_at` (TIMESTAMPTZ)

### Table: `share_views`
* `id` (UUID, PK)
* `share_id` (UUID, references `shares.id`)
* `viewed_at` (TIMESTAMPTZ)
* `user_agent_hash` (TEXT)
