# Kidney Failure Risk Equation (KFRE 4-Variable Model)

**Primary Reference:** Tangri N, Stevens LA, Griffith J, et al. A predictive model for progression of chronic kidney disease to kidney failure. *JAMA.* 2011;305(15):1553-1559. doi:10.1001/jama.2011.451  
**Recalibration Reference:** Tangri N, Grams ME, Levey AS, et al. Multinational assessment of accuracy of equations for predicting risk of kidney failure. *JAMA.* 2016;315(2):164-174. doi:10.1001/jama.2015.18202  

---

## 1. Mathematical Model (Non-North American Calibration)

The 4-variable KFRE calculates the linear predictor score ($S$):

$$S = -0.2201 \times \left(\frac{\text{Age}}{10} - 7.036\right) + 0.2467 \times (\text{Male} - 0.5642) - 0.5567 \times \left(\frac{\text{eGFR}}{5} - 7.222\right) + 0.4510 \times (\ln(\text{uACR}) - 5.137)$$

Where:
- $\text{Age}$ in years
- $\text{Male}$ = 1 if male, 0 if female
- $\text{eGFR}$ in $\text{mL/min}/1.73\text{m}^2$
- $\text{uACR}$ = Urine Albumin-to-Creatinine Ratio in mg/g (multiply $\text{mg/mmol}$ by $8.84$)

Predicted Risk:
$$\text{Risk}_{2\text{yr}} = 1 - S_0(2)^{\exp(S)}$$
$$\text{Risk}_{5\text{yr}} = 1 - S_0(5)^{\exp(S)}$$

Baseline survival for non-North American populations:
- $S_0(2) = 0.9832$
- $S_0(5) = 0.9365$

---

## 2. Clinical Use & Governance
* Maintained behind a feature flag (`VITE_FEATURE_KFRE_CALCULATOR`).
* Framed strictly for shared clinical discussion: *"This tool estimates risk to help guide conversations with your renal doctor. It is not an absolute forecast."*
