import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  function login(token, user) {
    //maj pour la persistance de la session
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    //maj pour l'état en direct sur la page
    setToken(token);
    setUser(user);
  }

  function logout() {
    //on purge tout
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    //maj pour l'état en direct sur la page
    setToken(null);
    setUser(null);
  }

  return (
    //rendre ces infos accessible à toute l'app
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
