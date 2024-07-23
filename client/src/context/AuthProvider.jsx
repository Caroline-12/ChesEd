import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

  const logout = () => {
    // Perform logout logic here
    setAuth({});
    setIsLoggedIn(false);
  };

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
