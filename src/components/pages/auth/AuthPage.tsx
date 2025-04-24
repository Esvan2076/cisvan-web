import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4">
        {isLogin ? (
          <LoginForm onSwitch={() => setIsLogin(false)} onForgotPassword={function (): void {
            throw new Error("Function not implemented.");
          } } />
        ) : (
          <SignupForm onSwitch={() => setIsLogin(true)} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AuthPage;
