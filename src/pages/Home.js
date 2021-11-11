import React from "react";
import { useAuth } from "../context/Auth2";
import forest from "../assets/img/threes.jpg";
import { useLang } from "../context/LanguageContext";
import translation from "../locales/translation.json";

const HomePage = () => {
  const { language } = useLang();

  return (
    <div>
      <h1>{translation[language].welcome_title}</h1>
      <img src={forest} alt="Forest" width="800" />
      <p>
        <a href="https://fr.freepik.com/vecteurs/fond">
          {translation[language].vector_bg}
        </a>
      </p>
    </div>
  );
};

export default HomePage;
