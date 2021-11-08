import React, { useContext, useState } from "react";

export const LanguageContext = React.createContext({
  language: "en",
});

export const languagesList = [
  {
    code: "en",
    name: "English",
    country_code: "gb",
  },
  {
    code: "fr",
    name: "Français",
    country_code: "fr",
  },
];

export const LanguageProvider = ({ children }) => {
  if (window.localStorage.getItem("rcml-lang") === null)
    window.localStorage.setItem("rcml-lang", "en");

  let chosenLanguage = window.localStorage.getItem("rcml-lang");
  const [language, setLanguage] = useState(chosenLanguage);

  const changeLanguage = (language) => {
    window.localStorage.setItem("rcml-lang", language);
    setLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
