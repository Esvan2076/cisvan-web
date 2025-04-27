import { useNavigate } from "react-router-dom";
import ForgotPasswordForm from "../../organisms/ForgotPasswordForm";
import Header from "../../templates/Header";
import Footer from "../../templates/Footer";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
      <Header />
      <main className="flex-1 flex items-start justify-center px-4 mt-10 sm:mt-20 max-[600px]:mt-10">
        <ForgotPasswordForm onBack={() => navigate("/auth")} />
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;
