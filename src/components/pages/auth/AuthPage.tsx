import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <Header />

      <main className="flex-1 flex items-start justify-center px-4 mt-10 sm:mt-20 max-[600px]:mt-10">
        {isLogin ? (
          <LoginForm
            onSwitch={() => setIsLogin(false)}
            onForgotPassword={() => navigate("/forgot-password")}
          />
        ) : (
          <SignupForm onSwitch={() => setIsLogin(true)} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
