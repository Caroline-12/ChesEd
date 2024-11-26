import { createContext, useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import OTPInput from "@/components/OTPInput";
import Recovered from "@/components/Recovered";
import Reset from "@/components/Reset";

const RecoveryContext = createContext({});

export const RecoveryProvider = ({ children }) => {
  const [email, setEmail] = useState();
  const [otp, setOTP] = useState();

  // function NavigateComponents() {
  //   if (page === "login") return <LoginForm />;
  //   if (page === "otp") return <OTPInput />;
  //   if (page === "reset") return <Reset />;

  //   return <Recovered />;
  // }

  return (
    <RecoveryContext.Provider value={{ otp, setOTP, setEmail, email }}>
      {children}
    </RecoveryContext.Provider>
  );
};

export default RecoveryContext;
