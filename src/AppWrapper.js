import {App} from "./App";
import {AuthProvider} from "./context/AuthContext";
import React from "react";
import {LanguageProvider} from "./context/LanguageContext";

export default function AppWrapper() {

    return (
        <LanguageProvider>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </LanguageProvider>
    );
}