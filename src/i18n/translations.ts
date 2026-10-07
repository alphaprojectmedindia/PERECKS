/**
 * PERCKS Kidney Companion — Multilingual Localization Dictionary
 * Supported Languages: English (en), Polish (pl), Urdu (ur), Bengali (bn), Punjabi (pa), Tamil (ta)
 */

export type LanguageCode = 'en' | 'pl' | 'ur' | 'bn' | 'pa' | 'ta';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  nav: {
    today: string;
    track: string;
    learn: string;
    calculators: string;
    mind: string;
    play: string;
    costing: string;
    careFinder: string;
    support: string;
    reports: string;
    community: string;
    settings: string;
  };
  today: {
    greeting: string;
    tasksTitle: string;
    points: string;
    streak: string;
    streakDays: string;
    restDayNotice: string;
    unwellPause: string;
    guideMessage: string;
  };
  track: {
    title: string;
    logVitals: string;
    bp: string;
    weight: string;
    glucose: string;
    fluid: string;
    salt: string;
    activity: string;
    sleep: string;
    save: string;
    history: string;
    timeInRange: string;
    target: string;
    notes: string;
  };
  calculators: {
    title: string;
    disclaimer: string;
    egfrTitle: string;
    kfreTitle: string;
    bpTitle: string;
    bmiTitle: string;
    calculate: string;
    result: string;
    stage: string;
    whatThisMeans: string;
  };
  mind: {
    title: string;
    phq9: string;
    gad7: string;
    breathing: string;
    grounding: string;
    talkingTherapies: string;
  };
  crisis: {
    bannerTitle: string;
    bannerBody: string;
    call999: string;
    call111: string;
    callSamaritans: string;
    textShout: string;
    pauseNotice: string;
  };
  costing: {
    title: string;
    subtitle: string;
    preventionValue: string;
    stageCosts: string;
    resourceCosts: string;
  };
  settings: {
    title: string;
    language: string;
    textSize: string;
    theme: string;
    readingLevel: string;
    exportData: string;
    deleteAccount: string;
    consents: string;
  };
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    appName: "PERCKS Kidney Companion",
    tagline: "Calm, friendly, plain-language education and self-tracking for kidney health.",
    nav: {
      today: "Today",
      track: "Track",
      learn: "Learn",
      calculators: "Calculators",
      mind: "Mind",
      play: "Play",
      costing: "UK NHS Costs",
      careFinder: "Find Care",
      support: "Support",
      reports: "Reports",
      community: "Community",
      settings: "Settings",
    },
    today: {
      greeting: "Hello! Welcome to your calm space.",
      tasksTitle: "Today's 3 Small Steps",
      points: "Kidney Points",
      streak: "Gentle Streak",
      streakDays: "days active",
      restDayNotice: "Today is your planned rest day. Be kind to yourself.",
      unwellPause: "I'm unwell (Pause streak)",
      guideMessage: "Bea the Bean: Every small positive choice protects your delicate kidney filters today!",
    },
    track: {
      title: "Track Your Health (<30s)",
      logVitals: "Log a Measurement",
      bp: "Blood Pressure",
      weight: "Weight",
      glucose: "Blood Glucose",
      fluid: "Fluid Intake",
      salt: "Salt Diary",
      activity: "Physical Activity",
      sleep: "Sleep Diary",
      save: "Save to My Record",
      history: "Recent Log History",
      timeInRange: "Time in Target Range",
      target: "Your Target",
      notes: "Notes (Optional)",
    },
    calculators: {
      title: "Evidence-Based Calculators",
      disclaimer: "This information is for education and self-monitoring. It does not replace advice from your doctor, nurse, or renal team.",
      egfrTitle: "eGFR Kidney Function (CKD-EPI 2021 Race-Free)",
      kfreTitle: "Kidney Failure Risk Equation (KFRE 4-Variable)",
      bpTitle: "7-Day Home Blood Pressure Averaging (NICE NG136)",
      bmiTitle: "Body Mass Index & Body Measures",
      calculate: "Calculate",
      result: "Your Result",
      stage: "Kidney Stage",
      whatThisMeans: "What this means in plain English",
    },
    mind: {
      title: "Mind & Emotional Wellbeing",
      phq9: "PHQ-9 Mood Check-In",
      gad7: "GAD-7 Anxiety Screener",
      breathing: "2-Minute Box Breathing",
      grounding: "5-4-3-2-1 Sensory Grounding",
      talkingTherapies: "Free NHS Talking Therapies Self-Referral",
    },
    crisis: {
      bannerTitle: "Need urgent support right now?",
      bannerBody: "If you are feeling overwhelmed, distressed, or having thoughts of self-harm, compassionate help is available 24/7.",
      call999: "Call 999 (Life-threatening emergency)",
      call111: "Call NHS 111 (Option 2 for Mental Health)",
      callSamaritans: "Samaritans: Call 116 123 (Free & Confidential)",
      textShout: "Shout Crisis Text Line: Text SHOUT to 85258",
      pauseNotice: "Reminders and points are currently paused while you look after yourself.",
    },
    costing: {
      title: "UK NHS Kidney Treatment & Resource Costs",
      subtitle: "Official NHS National Cost Collection & PSSRU Economic Data",
      preventionValue: "The Value of Early Prevention",
      stageCosts: "Annual Direct NHS Cost by CKD Stage",
      resourceCosts: "NHS Resource Unit Tariffs",
    },
    settings: {
      title: "App Settings & Privacy",
      language: "Language",
      textSize: "Text Size",
      theme: "Visual Theme",
      readingLevel: "Reading Level",
      exportData: "Export My Data (JSON / CSV)",
      deleteAccount: "Delete My Account Permanently",
      consents: "My Privacy & Research Consents",
    },
  },

  pl: {
    appName: "PERCKS Towarzysz Nerek",
    tagline: "Spokojna, przystępna edukacja i codzienna kontrola zdrowia nerek.",
    nav: {
      today: "Dzisiaj",
      track: "Dziennik",
      learn: "Wiedza",
      calculators: "Kalkulatory",
      mind: "Umysł",
      play: "Gry",
      costing: "Koszty NHS",
      careFinder: "Znajdź opiekę",
      support: "Wsparcie",
      reports: "Raporty",
      community: "Społeczność",
      settings: "Ustawienia",
    },
    today: {
      greeting: "Witaj w Twojej bezpiecznej przestrzeni.",
      tasksTitle: "Dzisiejsze 3 małe kroki",
      points: "Punkty Zdrowia Nerek",
      streak: "Spokojna Seria",
      streakDays: "dni aktywności",
      restDayNotice: "Dziś jest Twój dzień odpoczynku. Bądź dla siebie wyrozumiały.",
      unwellPause: "Źle się czuję (Wstrzymaj serię)",
      guideMessage: "Bea the Bean: Każdy mały, zdrowy krok chroni dziś Twoje nerki!",
    },
    track: {
      title: "Zapisz pomiary (<30 sek)",
      logVitals: "Wpisz pomiar",
      bp: "Ciśnienie tętnicze",
      weight: "Waga",
      glucose: "Cukier we krwi",
      fluid: "Ilość płynów",
      salt: "Spożycie soli",
      activity: "Aktywność fizyczna",
      sleep: "Sen",
      save: "Zapisz w moim profilu",
      history: "Ostatnie pomiary",
      timeInRange: "Czas w normie",
      target: "Twój cel",
      notes: "Notatki (opcjonalnie)",
    },
    calculators: {
      title: "Kalkulatory Medyczne",
      disclaimer: "Informacje mają charakter edukacyjny i nie zastępują porady lekarza ani pielęgniarki nefrologicznej.",
      egfrTitle: "Kalkulator filtracji nerkowej eGFR (CKD-EPI 2021)",
      kfreTitle: "Kalkulator ryzyka KFRE (4 parametry)",
      bpTitle: "Średnia 7-dniowa ciśnienia (NICE NG136)",
      bmiTitle: "Wskaźnik masy ciała BMI",
      calculate: "Oblicz",
      result: "Twój wynik",
      stage: "Stadium nerek",
      whatThisMeans: "Co to oznacza prostym językiem",
    },
    mind: {
      title: "Zdrowie Psychiczne i Emocjonalne",
      phq9: "Test nastroju PHQ-9",
      gad7: "Ocena niepokoju GAD-7",
      breathing: "2-minutowe ćwiczenie oddechowe",
      grounding: "Ćwiczenie uziemiające 5-4-3-2-1",
      talkingTherapies: "Bezpłatna terapia NHS Talking Therapies",
    },
    crisis: {
      bannerTitle: "Potrzebujesz natychmiastowej pomocy?",
      bannerBody: "Jeśli czujesz się przytłoczony lub masz myśli samobójcze, pomoc jest dostępna całodobowo.",
      call999: "Zadzwoń pod 999 (Pogotowie ratunkowe)",
      call111: "Zadzwoń pod NHS 111 (Opcja 2 dla kryzysu psychicznego)",
      callSamaritans: "Samaritans: 116 123 (Bezpłatnie i poufnie)",
      textShout: "Shout SMS: Wyślij SHOUT pod 85258",
      pauseNotice: "Powiadomienia i punkty są wstrzymane, abyś mógł zadbać o siebie.",
    },
    costing: {
      title: "Koszty leczenia nerek w UK (NHS)",
      subtitle: "Oficjalne dane ekonomiczne NHS National Cost Collection i PSSRU",
      preventionValue: "Wartość wczesnej profilaktyki",
      stageCosts: "Roczne koszty NHS według stadium CKD",
      resourceCosts: "Cennik jednostkowych świadczeń NHS",
    },
    settings: {
      title: "Ustawienia i Prywatność",
      language: "Język",
      textSize: "Rozmiar tekstu",
      theme: "Motyw wizualny",
      readingLevel: "Poziom tekstu",
      exportData: "Eksportuj moje dane (JSON/CSV)",
      deleteAccount: "Usuń konto trwale",
      consents: "Zgody na przetwarzanie danych",
    },
  },

  ur: {
    appName: "پرکس گردوں کا ساتھی (PERCKS)",
    tagline: "گردوں کی صحت کے لیے پرسکون، آسان اور سادہ رہنمائی اور روزانہ کی دیکھ بھال۔",
    nav: {
      today: "آج کا دن",
      track: "ریکارڈ",
      learn: "معلومات",
      calculators: "کیلکولیٹر",
      mind: "ذہنی سکون",
      play: "کھیل",
      costing: "این ایچ ایس اخراجات",
      careFinder: "ڈاکٹر تلاش کریں",
      support: "مدد اور تعاون",
      reports: "رپورٹس",
      community: "کمیونٹی",
      settings: "ترتیبات",
    },
    today: {
      greeting: "خوش آمدید! یہ آپ کا پرسکون ذاتی گوشہ ہے۔",
      tasksTitle: "آج کے 3 آسان اقدامات",
      points: "گردوں کے پوائنٹس",
      streak: "مسلسل دیکھ بھال",
      streakDays: "فعال دن",
      restDayNotice: "آج آپ کے آرام کا دن ہے۔",
      unwellPause: "طبیعت خراب ہے (روکیں)",
      guideMessage: "بیا دی بین: آپ کا ہر چھوٹا اور اچھا فیصلہ آپ کے گردوں کی حفاظت کرتا ہے!",
    },
    track: {
      title: "صحت کا ریکارڈ (30 سیکنڈ میں)",
      logVitals: "نیا ریکارڈ درج کریں",
      bp: "بلڈ پریشر",
      weight: "وزن",
      glucose: "بلڈ شوگر",
      fluid: "پانی اور مشروبات",
      salt: "نمک کا اندراج",
      activity: "ورزش اور چہل قدمی",
      sleep: "نیند کا ریکارڈ",
      save: "محفوظ کریں",
      history: "حالیہ ریکارڈ",
      timeInRange: "ہدف کے مطابق وقت",
      target: "آپ کا ہدف",
      notes: "اضافی نوٹس",
    },
    calculators: {
      title: "طبی کیلکولیٹر",
      disclaimer: "یہ معلومات صرف رہنمائی کے لیے ہیں۔ یہ ڈاکٹر یا گردوں کے ماہر کے مشورے کا نعم البدل نہیں ہیں۔",
      egfrTitle: "گردوں کی کارکردگی (eGFR CKD-EPI 2021)",
      kfreTitle: "گردوں کے خطرے کا تخمینہ (KFRE)",
      bpTitle: "7 دن کا اوسط بلڈ پریشر (NICE NG136)",
      bmiTitle: "جسمانی وزن اور بی ایم آئی (BMI)",
      calculate: "حساب لگائیں",
      result: "آپ کا نتیجہ",
      stage: "گردوں کا مرحلہ",
      whatThisMeans: "آسان الفاظ میں اس کا مطلب",
    },
    mind: {
      title: "ذہنی اور قلبی سکون",
      phq9: "موڈ کا جائزہ (PHQ-9)",
      gad7: "بے چینی اور پریشانی کا ٹیسٹ (GAD-7)",
      breathing: "2 منٹ سانس کی پرسکون مشق",
      grounding: "حواس کو پرسکون کرنے کی مشق (5-4-3-2-1)",
      talkingTherapies: "مفت این ایچ ایس بات چیت تھراپی",
    },
    crisis: {
      bannerTitle: "کیا آپ کو فوری مدد کی ضرورت ہے؟",
      bannerBody: "اگر آپ شدید پریشان ہیں یا خود کو نقصان پہنچانے کے خیالات آ رہے ہیں تو فوری اور مفت مدد دستیاب ہے۔",
      call999: "999 پر کال کریں (ہنگامی حالت)",
      call111: "این ایچ ایس 111 (ذہنی صحت کے لیے آپشن 2)",
      callSamaritans: "سمیریٹنز: 116 123 پر مفت کال کریں",
      textShout: "شاؤٹ ایس ایم ایس: 85258 پر SHOUT لکھ کر بھیجیں",
      pauseNotice: "آپ کی صحت کی بہتری تک یاد دہانیاں روک دی گئی ہیں۔",
    },
    costing: {
      title: "برطانیہ میں گردوں کے علاج کے اخراجات",
      subtitle: "این ایچ ایس (NHS) اور پی ایس ایس آر یو (PSSRU) کے مستند سرکاری اعداد و شمار",
      preventionValue: "ابتدائی روک تھام کی اہمیت",
      stageCosts: "مرحلہ وار سالانہ این ایچ ایس لاگت",
      resourceCosts: "طبی خدمات کی فیس",
    },
    settings: {
      title: "ترتیبات اور رازداری",
      language: "زبان",
      textSize: "تحریر کا سائز",
      theme: "رنگ اور تھیم",
      readingLevel: "پڑھنے کی سطح",
      exportData: "اپنا ریکارڈ ڈاؤن لوڈ کریں",
      deleteAccount: "اکاؤنٹ مکمل طور پر ختم کریں",
      consents: "رازداری کی اجازتیں",
    },
  },

  bn: {
    appName: "পার্কস কিডনি সঙ্গী (PERCKS)",
    tagline: "কিডনির সুস্থতার জন্য শান্ত, সহজ ভাষায় শিক্ষা এবং স্ব-পর্যবেক্ষণ।",
    nav: {
      today: "আজকের দিন",
      track: "লগ করুন",
      learn: "জানুন",
      calculators: "ক্যালকুলেটর",
      mind: "মন",
      play: "খেলা",
      costing: "NHS খরচ",
      careFinder: "সেবা খুঁজুন",
      support: "সহায়তা",
      reports: "রিপোর্ট",
      community: "কমিউনিটি",
      settings: "সেটিংস",
    },
    today: {
      greeting: "স্বাগতম! এটি আপনার শান্ত সুস্থতার স্থান।",
      tasksTitle: "আজকের ৩টি সহজ পদক্ষেপ",
      points: "কিডনি পয়েন্ট",
      streak: "ধারাবাহিকতা",
      streakDays: "দিন সক্রিয়",
      restDayNotice: "আজ আপনার বিশ্রামের দিন। নিজের যত্ন নিন।",
      unwellPause: "অসুস্থ বোধ করছি (বিরতি)",
      guideMessage: "বিয়া দ্য বিন: আপনার প্রতিটি ছোট পদক্ষেপ আজ আপনার কিডনি রক্ষা করছে!",
    },
    track: {
      title: "স্বাস্থ্যের হিসাব রাখুন (<৩০ সেকেন্ড)",
      logVitals: "পরিমাপ লিখুন",
      bp: "রক্তচাপ (BP)",
      weight: "ওজন",
      glucose: "রক্তে শর্করা",
      fluid: "তরল গ্রহণ",
      salt: "লবণের পরিমাণ",
      activity: "শারীরিক পরিশ্রম",
      sleep: "ঘুমের সময়",
      save: "সংরক্ষণ করুন",
      history: "পূর্ববর্তী রেকর্ড",
      timeInRange: "নির্ধারিত সীমার মধ্যে সময়",
      target: "আপনার লক্ষ্য",
      notes: "মন্তব্য (ঐচ্ছিক)",
    },
    calculators: {
      title: "চিকিৎসা ক্যালকুলেটর",
      disclaimer: "এই তথ্য শুধুমাত্র শিক্ষার জন্য। এটি আপনার ডাক্তারের পরামর্শের বিকল্প নয়।",
      egfrTitle: "eGFR কিডনির কার্যকারিতা (CKD-EPI 2021)",
      kfreTitle: "কিডনি ঝুঁকির সমীকরণ (KFRE)",
      bpTitle: "৭ দিনের গড় রক্তচাপ (NICE NG136)",
      bmiTitle: "বডি মাস ইনডেক্স (BMI)",
      calculate: "গণনা করুন",
      result: "আপনার ফলাফল",
      stage: "কিডনির পর্যায়",
      whatThisMeans: "সহজ কথায় এর অর্থ",
    },
    mind: {
      title: "মানসিক সুস্থতা",
      phq9: "PHQ-9 মেজাজ পরীক্ষা",
      gad7: "GAD-7 উদ্বেগের মাত্রা",
      breathing: "২ মিনিটের শ্বাস-প্রশ্বাসের ব্যায়াম",
      grounding: "৫-৪-৩-২-১ মন শান্ত করার পদ্ধতি",
      talkingTherapies: "বিনামূল্যে NHS মানসিক কাউন্সেলিং",
    },
    crisis: {
      bannerTitle: "আপনার কি জরুরি সাহায্য দরকার?",
      bannerBody: "যদি আপনি মানসিক কষ্টে থাকেন বা হতাশ বোধ করেন, তবে ২৪ ঘণ্টা বিনামূল্যে সাহায্য পাওয়া যায়।",
      call999: "৯৯৯ এ কল করুন (জরুরি অবস্থা)",
      call111: "NHS ১১১ এ কল করুন (মানসিক স্বাস্থ্যের জন্য অপশন ২)",
      callSamaritans: "Samaritans: ১১৬ ১২৩ এ বিনামূল্যে কল করুন",
      textShout: "Shout SMS: ৮৫২৫৮ এ SHOUT লিখে পাঠান",
      pauseNotice: "আপনি সুস্থ না হওয়া পর্যন্ত রিমাইন্ডার বন্ধ রাখা হয়েছে।",
    },
    costing: {
      title: "যুক্তরাজ্যে কিডনি চিকিৎসার NHS খরচ",
      subtitle: "NHS National Cost Collection এবং PSSRU এর অফিসিয়াল অর্থনৈতিক তথ্য",
      preventionValue: "প্রাথমিক প্রতিরোধের গুরুত্ব",
      stageCosts: "পর্যায়ভিত্তিক বাৎসরিক NHS ব্যয়",
      resourceCosts: "স্বাস্থ্যসেবার নির্দিষ্ট ফি",
    },
    settings: {
      title: "সেটিংস ও গোপনীয়তা",
      language: "ভাষা",
      textSize: "লেখার আকার",
      theme: "থিম",
      readingLevel: "পড়ার স্তর",
      exportData: "আমার ডেটা ডাউনলোড করুন",
      deleteAccount: "অ্যাকাউন্ট চিরতরে মুছে ফেলুন",
      consents: "গোপনীয়তার সম্মতি",
    },
  },

  pa: {
    appName: "ਪਰਕਸ ਗੁਰਦੇ ਸਾਥੀ (PERCKS)",
    tagline: "ਗੁਰਦਿਆਂ ਦੀ ਸਿਹਤ ਲਈ ਸ਼ਾਂਤ, ਸਰਲ ਭਾਸ਼ਾ ਵਿੱਚ ਸਿੱਖਿਆ ਅਤੇ ਰੋਜ਼ਾਨਾ ਨਿਗਰਾਨੀ।",
    nav: {
      today: "ਅੱਜ",
      track: "ਟ੍ਰੈਕ ਕਰੋ",
      learn: "ਸਿੱਖੋ",
      calculators: "ਕੈਲਕੁਲੇਟਰ",
      mind: "ਮਾਨਸਿਕ ਸ਼ਾਂਤੀ",
      play: "ਖੇਡੋ",
      costing: "NHS ਖਰਚੇ",
      careFinder: "ਸੇਵਾ ਲੱਭੋ",
      support: "ਸਹਾਇਤਾ",
      reports: "ਰਿਪੋਰਟਾਂ",
      community: "ਭਾਈਚਾਰਾ",
      settings: "ਸੈਟਿੰਗਾਂ",
    },
    today: {
      greeting: "ਜੀ ਆਇਆਂ ਨੂੰ! ਇਹ ਤੁਹਾਡੀ ਸ਼ਾਂਤ ਨਿੱਜੀ ਜਗ੍ਹਾ ਹੈ।",
      tasksTitle: "ਅੱਜ ਦੇ 3 ਆਸਾਨ ਕਦਮ",
      points: "ਗੁਰਦਾ ਪੁਆਇੰਟ",
      streak: "ਲਗਾਤਾਰਤਾ",
      streakDays: "ਦਿਨ ਸਰਗਰਮ",
      restDayNotice: "ਅੱਜ ਤੁਹਾਡਾ ਆਰਾਮ ਦਾ ਦਿਨ ਹੈ।",
      unwellPause: "ਤਬੀਅਤ ਠੀਕ ਨਹੀਂ ਹੈ (ਰੋਕੋ)",
      guideMessage: "ਬੀਆ ਦ ਬੀਨ: ਤੁਹਾਡਾ ਹਰ ਛੋਟਾ ਚੰਗਾ ਕਦਮ ਅੱਜ ਤੁਹਾਡੇ ਗੁਰਦਿਆਂ ਦੀ ਰੱਖਿਆ ਕਰਦਾ ਹੈ!",
    },
    track: {
      title: "ਸਿਹਤ ਦਾ ਰਿਕਾਰਡ (<30 ਸਕਿੰਟ)",
      logVitals: "ਨਵਾਂ ਮਾਪ ਦਰਜ ਕਰੋ",
      bp: "ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ",
      weight: "ਭਾਰ",
      glucose: "ਬਲੱਡ ਸ਼ੂਗਰ",
      fluid: "ਤਰਲ ਪਦਾਰਥ",
      salt: "ਲੂਣ ਦੀ ਮਾਤਰਾ",
      activity: "ਕਸਰਤ",
      sleep: "ਨੀਂਦ ਦਾ ਰਿਕਾਰਡ",
      save: "ਸੰਭਾਲੋ",
      history: "ਪਿਛਲਾ ਰਿਕਾਰਡ",
      timeInRange: "ਟਾਰਗੇਟ ਵਿੱਚ ਸਮਾਂ",
      target: "ਤੁਹਾਡਾ ਟੀਚਾ",
      notes: "ਨੋਟਸ",
    },
    calculators: {
      title: "ਮੈਡੀਕਲ ਕੈਲਕੁਲੇਟਰ",
      disclaimer: "ਇਹ ਜਾਣਕਾਰੀ ਸਿਰਫ਼ ਸਿੱਖਿਆ ਲਈ ਹੈ। ਇਹ ਡਾਕਟਰ ਦੀ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ।",
      egfrTitle: "ਗੁਰਦਿਆਂ ਦੀ ਕਾਰਜਕੁਸ਼ਲਤਾ (eGFR CKD-EPI 2021)",
      kfreTitle: "ਗੁਰਦੇ ਦੇ ਜੋਖਮ ਦਾ ਅਨੁਮਾਨ (KFRE)",
      bpTitle: "7 ਦਿਨਾਂ ਦੀ ਔਸਤ ਬੀਪੀ (NICE NG136)",
      bmiTitle: "ਬੀ ਐੱਮ ਆਈ (BMI)",
      calculate: "ਹਿਸਾਬ ਲਗਾਓ",
      result: "ਤੁਹਾਡਾ ਨਤੀਜਾ",
      stage: "ਗੁਰਦੇ ਦਾ ਪੜਾਅ",
      whatThisMeans: "ਸਰਲ ਸ਼ਬਦਾਂ ਵਿੱਚ ਇਸਦਾ ਅਰਥ",
    },
    mind: {
      title: "ਮਾਨਸਿਕ ਤੰਦਰੁਸਤੀ",
      phq9: "ਮੂਡ ਟੈਸਟ (PHQ-9)",
      gad7: "ਚਿੰਤਾ ਟੈਸਟ (GAD-7)",
      breathing: "2 ਮਿੰਟ ਸਾਹ ਲੈਣ ਦੀ ਕਸਰਤ",
      grounding: "ਮਨ ਸ਼ਾਂਤ ਕਰਨ ਦੀ ਵਿਧੀ (5-4-3-2-1)",
      talkingTherapies: "ਮੁਫ਼ਤ NHS ਮਾਨਸਿਕ ਥੈਰੇਪੀ",
    },
    crisis: {
      bannerTitle: "ਕੀ ਤੁਹਾਨੂੰ ਤੁਰੰਤ ਮਦਦ ਦੀ ਲੋੜ ਹੈ?",
      bannerBody: "ਜੇਕਰ ਤੁਸੀਂ ਬਹੁਤ ਪਰੇਸ਼ਾਨ ਹੋ ਜਾਂ ਆਪਣੇ ਆਪ ਨੂੰ ਨੁਕਸਾਨ ਪਹੁੰਚਾਉਣ ਬਾਰੇ ਸੋਚ ਰਹੇ ਹੋ, ਤਾਂ 24 ਘੰਟੇ ਮਦਦ ਉਪਲਬਧ ਹੈ।",
      call999: "999 'ਤੇ ਕਾਲ ਕਰੋ (ਐਮਰਜੈਂਸੀ)",
      call111: "NHS 111 (ਮਾਨਸਿਕ ਸਿਹਤ ਲਈ ਵਿਕਲਪ 2)",
      callSamaritans: "Samaritans: 116 123 'ਤੇ ਮੁਫ਼ਤ ਕਾਲ ਕਰੋ",
      textShout: "Shout SMS: 85258 'ਤੇ SHOUT ਲਿਖ ਕੇ ਭੇਜੋ",
      pauseNotice: "ਤੁਹਾਡੀ ਸਿਹਤ ਸੁਧਰਨ ਤੱਕ ਰੀਮਾਈਂਡਰ ਰੋਕੇ ਗਏ ਹਨ।",
    },
    costing: {
      title: "ਯੂਕੇ ਵਿੱਚ ਗੁਰਦੇ ਦੇ ਇਲਾਜ ਦੇ ਖਰਚੇ (NHS)",
      subtitle: "ਸਰਕਾਰੀ NHS National Cost Collection ਅਤੇ PSSRU ਆਰਥਿਕ ਅੰਕੜੇ",
      preventionValue: "ਸ਼ੁਰੂਆਤੀ ਬਚਾਅ ਦੀ ਮਹੱਤਤਾ",
      stageCosts: "ਸਾਲਾਨਾ NHS ਖਰਚਾ",
      resourceCosts: "ਮੈਡੀਕਲ ਸੇਵਾਵਾਂ ਦੇ ਖਰਚੇ",
    },
    settings: {
      title: "ਸੈਟਿੰਗਾਂ ਅਤੇ ਪਰਦੇਦਾਰੀ",
      language: "ਭਾਸ਼ਾ",
      textSize: "ਅੱਖਰਾਂ ਦਾ ਆਕਾਰ",
      theme: "ਥੀਮ",
      readingLevel: "ਪੜ੍ਹਨ ਦਾ ਪੱਧਰ",
      exportData: "ਮੇਰਾ ਰਿਕਾਰਡ ਡਾਊਨਲੋਡ ਕਰੋ",
      deleteAccount: "ਖਾਤਾ ਪੱਕੇ ਤੌਰ 'ਤੇ ਮਿਟਾਓ",
      consents: "ਪਰਦੇਦਾਰੀ ਦੀਆਂ ਮਨਜ਼ੂਰੀਆਂ",
    },
  },

  ta: {
    appName: "பெர்க்ஸ் சிறுநீரக துணை (PERCKS)",
    tagline: "சிறுநீரக ஆரோக்கியத்திற்கான அமைதியான, எளிய கல்வி மற்றும் தினசரி சுய கண்காணிப்பு.",
    nav: {
      today: "இன்று",
      track: "பதிவு",
      learn: "அறிவோம்",
      calculators: "கணிப்பான்",
      mind: "மன அமைதி",
      play: "விளையாடு",
      costing: "NHS செலவுகள்",
      careFinder: "மருத்துவ சேவை",
      support: "ஆதரவு",
      reports: "அறிக்கைகள்",
      community: "சமூகம்",
      settings: "அமைப்புகள்",
    },
    today: {
      greeting: "வணக்கம்! உங்கள் அமைதியான நலவாழ்வு தளத்திற்கு நல்வரவு.",
      tasksTitle: "இன்றைய 3 எளிய வழிகள்",
      points: "சிறுநீரக புள்ளிகள்",
      streak: "தொடர் ஆரோக்கியம்",
      streakDays: "செயலில் உள்ள நாட்கள்",
      restDayNotice: "இன்று உங்கள் ஓய்வு நாள்.",
      unwellPause: "உடல்நிலை சரியில்லை (இடைநிறுத்து)",
      guideMessage: "பீயா தி பீன்: உங்களின் ஒவ்வொரு சிறிய நல்ல தேர்வும் இன்று சிறுநீரகத்தை பாதுகாக்கிறது!",
    },
    track: {
      title: "உடல்நலப் பதிவு (<30 விநாடிகள்)",
      logVitals: "புதிய அளவீட்டைப் பதிவு செய்க",
      bp: "இரத்த அழுத்தம் (BP)",
      weight: "எடை",
      glucose: "இரத்த சர்க்கரை",
      fluid: "திரவ அளவு",
      salt: "உப்பு உட்கொள்ளல்",
      activity: "உடற்பயிற்சி",
      sleep: "தூக்கப் பதிவு",
      save: "சேமிக்கவும்",
      history: "முந்தைய பதிவுகள்",
      timeInRange: "சரியான வரம்பில் நேரம்",
      target: "உங்கள் இலக்கு",
      notes: "குறிப்புகள்",
    },
    calculators: {
      title: "மருத்துவ கணிப்பான்கள்",
      disclaimer: "இந்த தகவல் கல்வி நோக்கத்திற்காக மட்டுமே. இது மருத்துவரின் ஆலோசனைக்கு மாற்றாகாது.",
      egfrTitle: "சிறுநீரக செயல்பாடு (eGFR CKD-EPI 2021)",
      kfreTitle: "சிறுநீரக ஆபத்து சமன்பாடு (KFRE)",
      bpTitle: "7 நாள் சராசரி இரத்த அழுத்தம் (NICE NG136)",
      bmiTitle: "உடல் நிறை குறியீட்டெண் (BMI)",
      calculate: "கணக்கிடு",
      result: "உங்கள் முடிவு",
      stage: "சிறுநீரக நிலை",
      whatThisMeans: "எளிய தமிழில் இதன் விளக்கம்",
    },
    mind: {
      title: "மனநலம் மற்றும் அமைதி",
      phq9: "மனநிலை பரிசோதனை (PHQ-9)",
      gad7: "பதற்ற பரிசோதனை (GAD-7)",
      breathing: "2 நிமிட சுவாசப் பயிற்சி",
      grounding: "5-4-3-2-1 மனதை ஒருமுகப்படுத்தும் பயிற்சி",
      talkingTherapies: "இலவச NHS மனநல ஆலோசனை",
    },
    crisis: {
      bannerTitle: "உங்களுக்கு உடனடி உதவி தேவையா?",
      bannerBody: "நீங்கள் மிகுந்த மன அழுத்தத்தில் இருந்தால் அல்லது சுய-தீங்கு எண்ணங்கள் வந்தால், 24 மணி நேரமும் உதவி கிடைக்கும்.",
      call999: "999 ஐ அழைக்கவும் (அவசர உதவி)",
      call111: "NHS 111 ஐ அழைக்கவும் (மனநலத்திற்கு எண் 2)",
      callSamaritans: "Samaritans: 116 123 ஐ இலவசமாக அழைக்கவும்",
      textShout: "Shout SMS: 85258 க்கு SHOUT என குறுஞ்செய்தி அனுப்பவும்",
      pauseNotice: "நீங்கள் நலமாகும் வரை நினைவூட்டல்கள் நிறுத்தப்பட்டுள்ளன.",
    },
    costing: {
      title: "இங்கிலாந்து NHS சிறுநீரக சிகிச்சை செலவுகள்",
      subtitle: "அதிகாரப்பூர்வ NHS National Cost Collection மற்றும் PSSRU பொருளாதாரத் தரவு",
      preventionValue: "ஆரம்பகால தடுப்பின் மதிப்பு",
      stageCosts: "ஆண்டுதோறும் NHS செலவு",
      resourceCosts: "மருத்துவ சேவை கட்டணங்கள்",
    },
    settings: {
      title: "அமைப்புகள் மற்றும் தனியுரிமை",
      language: "மொழி",
      textSize: "எழுத்து அளவு",
      theme: "வண்ண தீம்",
      readingLevel: "வாசிப்பு நிலை",
      exportData: "என் தரவை பதிவிறக்கு",
      deleteAccount: "கணக்கை நிரந்தரமாக நீக்கு",
      consents: "தனியுரிமை அனுமதிகள்",
    },
  },
};
