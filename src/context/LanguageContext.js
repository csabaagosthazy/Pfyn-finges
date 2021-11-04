import React, {useContext, useEffect, useState} from 'react';

export const LanguageContext = React.createContext({
    language: 'en'
});

export const languages = {
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

export const languagesList = [
    {
        code: 'en',
        name: 'English',
        country_code: 'gb'
    },
    {
        code: 'fr',
        name: 'Français',
        country_code: 'fr'
    }
];

export const LanguageProvider = ({children}) => {
    const [language, setLanguage] = useState('en');

    const changeLanguage = (language) => {
        setLanguage(language);
    }

    return (
        <LanguageContext.Provider value={{languages, language, changeLanguage}}>
            {children}
        </LanguageContext.Provider>
    )
};

export const useLang = () => useContext(LanguageContext);