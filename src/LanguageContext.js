import React from 'react';

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