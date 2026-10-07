# PERCKS Kidney Companion — Accessibility Statement & Design Guidelines

**Standard Target:** Web Content Accessibility Guidelines (WCAG) 2.2 Level AA  
**Evaluation Status:** Audited (0 critical or serious axe-core violations)  
**Last Review:** 2026-10-02  

---

## 1. Core Accessibility Commitments

1. **Accessible Reading Age (Ages 9–11):** All patient-facing educational materials and tracker summaries are written in plain, clear language. Sentences average under 20 words.
2. **Typography & Dyslexia Support:**
   - Default font stack: Arial / Helvetica with clear letter spacing.
   - Accessible "Easy Read" mode: Uses **Atkinson Hyperlegible**, designed specifically for low-vision readers.
   - Text scaling: Built-in 100%, 125%, 150%, and 200% zoom toggles that maintain full layout integrity without clipping.
3. **Colour & Contrast:**
   - Follows NHS identity palette.
   - Minimum contrast ratio of **4.5:1** for normal text and **3:1** for large text and interactive UI components.
   - Colour is never the sole conveyor of clinical meaning (e.g. stage indicators use text, icons, and numerical bands alongside colour).
4. **Touch Targets & Motor Accessibility:**
   - Minimum interactive touch target size of **44 × 44 CSS pixels** on all interactive buttons, inputs, and tabs.
   - Full keyboard navigability (`Tab`, `Shift+Tab`, `Enter`, `Space`, and arrow keys) with clear focus indicators.
5. **Screen Reader Compatibility:**
   - Tested for semantic compatibility with Apple VoiceOver, Google TalkBack, and NVDA.
   - Explicit `aria-labels`, `aria-live` regions for dynamic alerts, and logical heading hierarchies (`h1` -> `h2` -> `h3`).
6. **Multilingual & Bidirectional Layouts:**
   - Full Right-to-Left (RTL) layout switching for Urdu (`dir="rtl"`).
   - Dedicated Unicode font stacks for Bengali, Gurmukhi (Punjabi), and Tamil.

---

## 2. Accessibility Themes

Users can toggle themes seamlessly in the top navigation bar or settings:
* **Calm NHS (Default):** Soft NHS blue, pale grey background (`#F0F4F5`), high-contrast dark text (`#212B32`).
* **High Contrast:** Pure black background (`#000000`), vivid yellow (`#FFFF00`) and cyan (`#00FFFF`) accents, exceeding 7:1 contrast.
* **Large Text:** 150% base font size with expanded line height.
* **Easy Read (Dyslexia Friendly):** Atkinson Hyperlegible typeface with increased letter spacing.
* **Dark Mode:** Soft dark grey background (`#1A202C`) to reduce eye strain in low-light environments.
