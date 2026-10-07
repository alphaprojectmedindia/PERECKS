import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeechButtonProps {
  textToRead: string;
  lang?: string;
}

export const SpeechButton: React.FC<SpeechButtonProps> = ({ textToRead, lang = 'en-GB' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech read-aloud is not supported on this browser/device.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel(); // Clear prior utterances
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang;
      utterance.rate = 0.95; // Calm, clear pace

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  return (
    <button
      onClick={handleToggleSpeech}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors min-h-[36px] ${
        isSpeaking
          ? 'bg-nhs-red text-white animate-pulse'
          : 'bg-nhs-lightBlue/20 text-nhs-darkBlue hover:bg-nhs-lightBlue/30 border border-nhs-lightBlue/40'
      }`}
      aria-label={isSpeaking ? 'Stop read-aloud' : 'Read article aloud'}
      title={isSpeaking ? 'Stop reading' : 'Listen to this text'}
    >
      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      <span>{isSpeaking ? 'Stop reading' : 'Read aloud'}</span>
    </button>
  );
};
