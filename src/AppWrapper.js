import App from "./App";
import {AuthProvider} from "./context/AuthContext";
import React, {useState} from "react";
import {LanguageContext} from "./LanguageContext";

export default function AppWrapper() {
    const [language, setLanguage] = useState('en');

    const changeLanguageEnglish = () => {
        setLanguage('en');
    }

    const changeLanguageFrench = () => {
        setLanguage('fr');
    }

    return (
        <LanguageContext.Provider value={{language, changeLanguageEnglish, changeLanguageFrench}}>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </LanguageContext.Provider>
    );
}
