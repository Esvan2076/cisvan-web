import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../templates/Header";
import Footer from "../templates/Footer";
import { useTranslation } from "react-i18next";

const EmailVerifyPage: React.FC = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`http://localhost:8080/user/verify-email?token=${token}`);
        const text = await res.text();

        if (res.ok) {
          toast.success(text || "Correo verificado correctamente");
          setSuccess(true);
        } else {
          toast.error(text || "Error al verificar el correo");
        }
      } catch {
        toast.error("Error al conectar con el servidor");
      } finally {
        setLoading(false);
      }
    };

    if (token) verifyEmail();
  }, [token]);
// dentro del componente
const { t } = useTranslation();

    return (
    <div className="min-h-screen flex flex-col bg-neutral-900 text-white">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
        <div className="bg-neutral-800 p-6 rounded-lg shadow-md text-center max-w-md w-full">
            {loading ? (
            <p className="text-white text-lg">{t("verifying")}</p>
            ) : success ? (
            <p className="text-green-400 text-lg">{t("verification_success")}</p>
            ) : (
            <p className="text-red-500 text-lg">{t("verification_failed")}</p>
            )}
        </div>
        </main>
        <Footer />
    </div>
    );
};

export default EmailVerifyPage;
