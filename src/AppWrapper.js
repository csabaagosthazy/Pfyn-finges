import App from "./App";
import { AuthProvider } from "./context/AuthContext";

// app childres gets value={{ isAuthenticated, isAdmin }}>
export default function AppWrapper() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
