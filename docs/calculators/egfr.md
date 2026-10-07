# eGFR Calculator (CKD-EPI 2021 Race-Free Equation)

**Primary Reference:** Inker LA, Eneanya ND, Coresh J, et al. New Creatinine- and Cystatin C-Based Equations to Estimate GFR without Race. *N Engl J Med.* 2021;385(19):1737-1749. doi:10.1056/NEJMoa2102953  
**Clinical Guideline:** NICE NG203 / UK Pathology Standard  

---

## 1. Mathematical Formula

$$\text{eGFR} = 142 \times \min\left(\frac{S_{cr}}{\kappa}, 1\right)^\alpha \times \max\left(\frac{S_{cr}}{\kappa}, 1\right)^{-1.200} \times 0.9938^{\text{Age}} \times [1.012 \text{ if Female}]$$

Where:
- $S_{cr}$ = Serum Creatinine in mg/dL (divide $\mu\text{mol/L}$ by $88.4$)
- $\kappa$ = $0.7$ (Female) or $0.9$ (Male)
- $\alpha$ = $-0.241$ (Female) or $-0.302$ (Male)
- $\text{Age}$ in years

---

## 2. CKD G-Stage Classification (NICE NG203)

| Stage | eGFR Range ($\text{mL/min}/1.73\text{m}^2$) | Clinical Description |
|---|---|---|
| **G1** | $\ge 90$ | Normal or high kidney function (CKD only if persistent kidney damage/proteinuria present) |
| **G2** | $60 - 89$ | Mildly decreased kidney function |
| **G3a** | $45 - 59$ | Mild to moderately decreased kidney function |
| **G3b** | $30 - 44$ | Moderately to severely decreased kidney function |
| **G4** | $15 - 29$ | Severely decreased kidney function (Pre-dialysis preparation) |
| **G5** | $< 15$ | Kidney failure (Renal replacement therapy / conservative care) |

---

## 3. Published Test Vectors

1. **Female, Age 54, $S_{cr} = 110.5\,\mu\text{mol/L}$ ($1.25\,\text{mg/dL}$):**
   - Expected $\text{eGFR} = 53.4\,\text{mL/min}/1.73\text{m}^2$ (Stage **G3a**).
2. **Male, Age 67, $S_{cr} = 159.1\,\mu\text{mol/L}$ ($1.80\,\text{mg/dL}$):**
   - Expected $\text{eGFR} = 38.6\,\text{mL/min}/1.73\text{m}^2$ (Stage **G3b**).
3. **Female, Age 42, $S_{cr} = 75.1\,\mu\text{mol/L}$ ($0.85\,\text{mg/dL}$):**
   - Expected $\text{eGFR} = 89.2\,\text{mL/min}/1.73\text{m}^2$ (Stage **G2**).
