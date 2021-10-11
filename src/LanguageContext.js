import React, {useEffect, useState} from 'react';

export const LanguageContext = React.createContext({
    language: 'en',
    changeLanguage: null
});

export const languages  = {
    en: {
        welcome_title: 'Welcome to Pfyn-Finges !',
        admin: 'Admin',
        user: 'User',
        your_role: 'Your role is : ',
        pois_collection: 'POIs Collection',
        logout: 'Logout',
    },
    fr: {
        welcome_title: 'Bienvenue à Pfyn-Finges !',
        admin: 'Administrateur',
        user: 'Utilisateur',
        your_role: 'Votre rôle est : ',
        pois_collection: 'Collection de points d\'intérêt',
        logout: 'Déconnexion',
    }
};

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState('en');

    const changeLanguageEnglish = () => {
        setLanguage('en');
    }

    const changeLanguageFrench = () => {
        setLanguage('fr');
    }

    useEffect((prevLanguage) => {
        if (language !== prevLanguage) {
            localStorage.setItem("language", language);
        }
    });

    return (
        <LanguageContext.Provider value={{language, changeLanguageEnglish, changeLanguageFrench}}>
            {children}
        </LanguageContext.Provider>
    )
};