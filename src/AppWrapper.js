import { App } from "./App";
import { AuthProvider } from "./context/Auth2";
import React from "react";
import { LanguageProvider } from "./context/LanguageContext";

export default function AppWrapper() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </LanguageProvider>
  );
}
