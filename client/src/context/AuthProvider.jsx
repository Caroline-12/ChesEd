import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    // Initialize auth state from localStorage
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : {};
  });
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Initialize isLoggedIn based on auth state in localStorage
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? Object.keys(JSON.parse(savedAuth)).length > 0 : false;
  });

  const logout = () => {
    localStorage.removeItem("auth"); // Clear auth from localStorage
    setAuth({});
    setIsLoggedIn(false);
  };

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(auth).length > 0) {
      localStorage.setItem("auth", JSON.stringify(auth));
      setIsLoggedIn(true);
    }
  }, [auth]);

  useEffect(() => {
    console.log("Auth context state changed:", { auth, persist, isLoggedIn });
  }, [auth, persist, isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        persist,
        setPersist,
        isLoggedIn,
        logout,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
