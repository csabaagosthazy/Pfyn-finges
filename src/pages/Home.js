import React from "react";
import { useAuth } from "../context/Auth2";
import { useHistory } from "react-router-dom";
import forest from "../img/2040.jpg";
import {useLang} from "../context/LanguageContext";
import translation from "../locales/translation.json"

const HomePage = () => {
  const { currentUser, isAdmin } = useAuth();
  const {language} = useLang();
  let history = useHistory();

  React.useEffect(() => {
    console.log("Home");
    if (currentUser) {
      if (isAdmin) {
        console.log("Admin");
      } else {
        console.log("User");
      }
    }
  }, []);

  return (
      <div>
        <h1>{translation[language].welcome_title}</h1>
        <img src={forest} alt="Forest image" width="800" />
        <p>
          <a href="https://fr.freepik.com/vecteurs/fond">
            Fond vecteur créé par upklyak - fr.freepik.com
          </a>
        </p>
      </div>
  );
};

export default HomePage;
