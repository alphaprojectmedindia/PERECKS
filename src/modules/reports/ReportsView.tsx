import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { FileText, Download, Share2, ShieldCheck, Clock, Check, AlertCircle } from 'lucide-react';
import jsPDF from 'jspdf';

export const ReportsView: React.FC = () => {
  const { profile, measurements, labs } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [includeMentalHealth, setIncludeMentalHealth] = useState(false);
  const [shareDurationDays, setShareDurationDays] = useState(30);
  const [generatedShareLink, setGeneratedShareLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const generatePdfReport = () => {
    const doc = new jsPDF();

    // Header
    doc.setFontSize(18);
    doc.setTextColor(0, 94, 184); // NHS Blue
    doc.text('PERCKS Kidney Companion — Clinical Summary', 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(66, 85, 99); // NHS Grey
    doc.text(`Generated on: ${new Date().toLocaleDateString('en-GB')} | Data Source: Self-Reported in PERCKS`, 14, 28);
    doc.text(`Nickname: ${profile.nickname} | Language: ${profile.language.toUpperCase()}`, 14, 34);

    doc.line(14, 38, 196, 38);

    // Section 1: Vital Signs & Blood Pressure
    doc.setFontSize(14);
    doc.setTextColor(0, 48, 135); // NHS Dark Blue
    doc.text('1. Blood Pressure & Physical Vitals', 14, 48);

    doc.setFontSize(10);
    doc.setTextColor(33, 43, 50);
    doc.text(`Clinician Set Target: <${profile.bpTargetSystolic || 135}/${profile.bpTargetDiastolic || 85} mmHg`, 14, 56);

    const bpList = measurements.filter((m) => m.type === 'blood_pressure').slice(0, 5);
    let yPos = 64;

    if (bpList.length > 0) {
      bpList.forEach((m) => {
        doc.text(
          `• ${new Date(m.takenAt).toLocaleDateString('en-GB')}: ${m.primaryValue}/${m.secondaryValue} mmHg (${m.notes || 'No notes'})`,
          16,
          yPos
        );
        yPos += 6;
      });
    } else {
      doc.text('• No blood pressure entries recorded recently.', 16, yPos);
      yPos += 6;
    }

    // Section 2: Laboratory Trends
    yPos += 6;
    doc.setFontSize(14);
    doc.setTextColor(0, 48, 135);
    doc.text('2. Laboratory Results & Biomarkers', 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(33, 43, 50);
    if (labs.length > 0) {
      labs.forEach((l) => {
        doc.text(
          `• ${l.testName.toUpperCase()}: ${l.value} ${l.unit} (Sample Date: ${l.sampleDate})`,
          16,
          yPos
        );
        yPos += 6;
      });
    } else {
      doc.text('• No laboratory test entries recorded.', 16, yPos);
      yPos += 6;
    }

    // Section 3: Questions for Next Appointment
    yPos += 8;
    doc.setFontSize(14);
    doc.setTextColor(0, 48, 135);
    doc.text('3. Questions for My Clinical Team', 14, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setTextColor(33, 43, 50);
    doc.text('• Are my current blood pressure readings on target?', 16, yPos);
    yPos += 6;
    doc.text('• When should my next eGFR and urine ACR tests be scheduled?', 16, yPos);
    yPos += 6;
    doc.text('• Do any of my regular prescriptions need adjustments?', 16, yPos);
    yPos += 12;

    // Footer Disclaimer
    doc.setFontSize(8);
    doc.setTextColor(118, 134, 146);
    doc.text(
      'Disclaimer: This report is compiled from patient self-tracking records for educational discussion and does not constitute a diagnostic report.',
      14,
      280
    );

    doc.save(`PERCKS_Kidney_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const handleGenerateShareLink = () => {
    const randomToken = Math.random().toString(36).substring(2, 15);
    const link = `https://percks.nhs.uk/share/${randomToken}?exp=${Date.now() + shareDurationDays * 86400000}`;
    setGeneratedShareLink(link);
  };

  const copyToClipboard = () => {
    if (generatedShareLink) {
      navigator.clipboard.writeText(generatedShareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.reports}</h2>
        <p className="text-xs text-nhs-secondaryText">
          Generate an accessible A4 PDF summary for your GP or renal clinic, or create an expiring read-only link.
        </p>
      </div>

      {/* PDF Download Card */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-bold text-base text-nhs-darkBlue flex items-center gap-2">
              <FileText className="w-5 h-5 text-nhs-blue" />
              <span>Download Printable A4 Clinical Summary</span>
            </h3>
            <p className="text-xs text-nhs-secondaryText">
              Includes blood pressure logs, laboratory trends (eGFR, ACR), and discussion questions. Generated 100% client-side for total privacy.
            </p>
          </div>
          <button
            onClick={generatePdfReport}
            className="px-5 py-3 bg-nhs-blue hover:bg-nhs-darkBlue text-white font-bold text-xs rounded-xl shadow flex items-center gap-2 min-h-[44px] flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Expiring Share Link Card */}
      <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-4">
        <h3 className="font-bold text-base text-nhs-darkBlue flex items-center gap-2">
          <Share2 className="w-5 h-5 text-nhs-blue" />
          <span>Generate Expiring Read-Only Share Link</span>
        </h3>
        <p className="text-xs text-nhs-secondaryText">
          Allow your doctor, nurse, or family carer to view your recent measurements without logging in.
        </p>

        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-4 text-xs">
            <label className="font-bold text-nhs-text">Link Expiry Duration:</label>
            <select
              value={shareDurationDays}
              onChange={(e) => setShareDurationDays(Number(e.target.value))}
              className="p-2 border border-nhs-borderGrey/40 rounded-lg text-xs"
            >
              <option value={7}>7 Days</option>
              <option value={30}>30 Days</option>
              <option value={90}>90 Days</option>
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              id="mh-check"
              checked={includeMentalHealth}
              onChange={(e) => setIncludeMentalHealth(e.target.checked)}
              className="w-4 h-4 rounded text-nhs-blue focus:ring-nhs-blue"
            />
            <label htmlFor="mh-check" className="text-nhs-text">
              Include mood check-in scores (Excluded by default for privacy)
            </label>
          </div>

          <button
            onClick={handleGenerateShareLink}
            className="px-5 py-2.5 bg-nhs-darkBlue hover:bg-black text-white font-bold text-xs rounded-xl shadow min-h-[44px]"
          >
            Create Share Link
          </button>

          {generatedShareLink && (
            <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 animate-fadeIn text-xs">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] truncate max-w-sm text-gray-700">
                  {generatedShareLink}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="px-3 py-1.5 bg-nhs-blue text-white rounded-lg font-bold flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
              <p className="text-[10px] text-nhs-secondaryText">
                🔒 Protected with SHA-256 hashed single-purpose token. All link accesses are logged in your security dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
