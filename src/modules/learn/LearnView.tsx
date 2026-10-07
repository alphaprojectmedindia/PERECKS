import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { translations } from '../../i18n/translations';
import { BookOpen, CheckCircle, HelpCircle, ArrowLeft, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { SpeechButton } from '../../design/components/SpeechButton';
import articlesData from '../../../content/articles/articles.json';

export const LearnView: React.FC = () => {
  const { profile, awardPoints } = useAppStore();
  const t = translations[profile.language] || translations.en;

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const selectedArticle = articlesData.find((a) => a.id === selectedArticleId);

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (!quizSubmitted) {
      setQuizAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
    }
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    awardPoints(15, 'Quiz Master');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Title */}
      <div>
        <h2 className="text-xl font-bold text-nhs-text">{t.nav.learn}</h2>
        <p className="text-xs text-nhs-secondaryText">Clinician-reviewed plain-language guides and NHS syndicated knowledge.</p>
      </div>

      {/* NHS Attribution Box */}
      <div className="bg-blue-50 border border-nhs-brightBlue/30 rounded-xl p-3.5 flex items-center justify-between text-xs text-nhs-darkBlue">
        <span>Content aligned with NICE NG203 & NHS Website Content API v2 syndication standards.</span>
        <span className="font-semibold text-nhs-blue flex items-center gap-1">
          <span>NHS Verified</span>
          <ShieldCheck className="w-4 h-4" />
        </span>
      </div>

      {selectedArticle ? (
        /* Detailed Article Reader View */
        <div className="bg-white rounded-2xl p-6 border border-nhs-borderGrey/30 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedArticleId(null);
                setQuizAnswers({});
                setQuizSubmitted(false);
              }}
              className="inline-flex items-center gap-1 text-xs font-bold text-nhs-blue hover:underline py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all lessons</span>
            </button>

            {/* Read Aloud Button */}
            <SpeechButton
              textToRead={`${selectedArticle.title}. ${selectedArticle.summary}. ${selectedArticle.body.join(' ')}`}
            />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-nhs-lightBlue/20 text-nhs-darkBlue px-2.5 py-0.5 rounded-full font-bold">
                Reading Age: {selectedArticle.readingAge}
              </span>
              <span className="text-xs bg-green-50 text-green-700 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Reviewed by {selectedArticle.reviewedBy}</span>
              </span>
            </div>
            <h3 className="text-2xl font-bold text-nhs-text">{selectedArticle.title}</h3>
            <p className="text-sm text-nhs-secondaryText font-medium mt-1">{selectedArticle.summary}</p>
          </div>

          {/* 3 Key Points Box */}
          <div className="bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border-l-4 border-nhs-blue p-4 rounded-r-xl space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-nhs-darkBlue">3 Key Takeaways</h4>
            <ul className="space-y-1.5 text-xs text-nhs-text">
              {selectedArticle.keyPoints.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-nhs-blue font-bold">•</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Article Body */}
          <div className="space-y-3 text-sm leading-relaxed text-nhs-text">
            {selectedArticle.body.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* What You Can Do & When to Get Help */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-emerald-900 uppercase">What you can do today</h4>
              <ul className="space-y-1 text-xs text-emerald-800">
                {selectedArticle.whatYouCanDo.map((item, idx) => (
                  <li key={idx}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
              <h4 className="text-xs font-bold text-red-900 uppercase">When to get help</h4>
              <ul className="space-y-1 text-xs text-red-800">
                {selectedArticle.whenToGetHelp.map((item, idx) => (
                  <li key={idx}>⚠️ {item}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3-Question Quiz */}
          {selectedArticle.quiz && selectedArticle.quiz.length > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-4">
              <h4 className="text-sm font-bold text-nhs-darkBlue flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-nhs-blue" />
                <span>Quick Quiz: Test Your Understanding (+15 pts)</span>
              </h4>

              {selectedArticle.quiz.map((q, qIdx) => (
                <div key={qIdx} className="space-y-2">
                  <p className="text-xs font-bold text-nhs-text">{qIdx + 1}. {q.question}</p>
                  <div className="space-y-1.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = quizAnswers[qIdx] === optIdx;
                      const isCorrect = q.correctIndex === optIdx;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleSelectAnswer(qIdx, optIdx)}
                          className={`w-full p-2.5 rounded-lg text-left text-xs transition-colors border ${
                            quizSubmitted
                              ? isCorrect
                                ? 'bg-green-100 border-green-400 font-bold text-green-900'
                                : isSelected
                                ? 'bg-red-100 border-red-300 text-red-800'
                                : 'bg-white border-gray-200 text-gray-500'
                              : isSelected
                              ? 'bg-blue-100 border-nhs-blue text-nhs-darkBlue font-semibold'
                              : 'bg-white border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizSubmitted && (
                    <p className="text-[11px] text-nhs-secondaryText mt-1 italic">
                      💡 {q.explanation}
                    </p>
                  )}
                </div>
              ))}

              {!quizSubmitted && Object.keys(quizAnswers).length === selectedArticle.quiz.length && (
                <button
                  onClick={handleQuizSubmit}
                  className="px-5 py-2.5 bg-nhs-blue hover:bg-nhs-darkBlue text-white text-xs font-bold rounded-xl shadow min-h-[44px]"
                >
                  Submit Quiz Answers
                </button>
              )}
            </div>
          )}

          {/* Provenance & Citation Footnote */}
          <div className="text-[11px] text-nhs-secondaryText pt-4 border-t border-gray-100">
            <strong>Sources:</strong> {selectedArticle.sources.join(' • ')}  
            <br />
            <strong>Last Clinician Review:</strong> {selectedArticle.reviewDate} (Next due: {selectedArticle.nextReviewDate})
          </div>
        </div>
      ) : (
        /* Articles Directory Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {articlesData.map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticleId(article.id)}
              className="bg-white rounded-2xl p-5 border border-nhs-borderGrey/30 hover:border-nhs-blue shadow-sm hover:shadow-md cursor-pointer transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold bg-blue-50 text-nhs-blue px-2 py-0.5 rounded-full">
                    2 min read
                  </span>
                  <span className="text-[10px] text-green-700 bg-green-50 px-2 py-0.5 rounded font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Reviewed</span>
                  </span>
                </div>
                <h3 className="font-bold text-nhs-text text-base leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-nhs-secondaryText line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-semibold text-nhs-blue">
                <span>Start Lesson</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
