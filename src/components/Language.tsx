import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const LANGUAGES = {
  KOREAN: 'korean',
  ENGLISH: 'english',
} as const;

const Language = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    LANGUAGES.KOREAN
  );

  const handleLanguageChange: () => void = () =>
    currentLanguage === LANGUAGES.KOREAN
      ? setCurrentLanguage(LANGUAGES.ENGLISH)
      : setCurrentLanguage(LANGUAGES.KOREAN);

  return (
    <button onClick={handleLanguageChange}>
      {currentLanguage.toUpperCase()}
    </button>
  );
};

export default Language;
