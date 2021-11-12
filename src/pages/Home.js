import React from "react";
import { useAuth } from "../context/Auth2";
import forest from "../assets/img/threes.jpg";
import { useLang } from "../context/LanguageContext";
import translation from "../locales/translation.json";

const HomePage = () => {
  const { language } = useLang();

  return (
    <container>
      <h1>{translation[language].welcome_title}</h1>
      <img src={forest} alt="Forest" width="800" />
      <p>
        <a href="https://fr.freepik.com/vecteurs/fond" position="relative">
          {translation[language].vector_bg}
        </a>
      </p>
    </container>
  );
};

export default HomePage;
