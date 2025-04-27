import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useFieldErrors } from "../../../hooks/useFieldErrors";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginFormProps {
  onSwitch: () => void;
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitch, onForgotPassword }) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { handleApiError } = useFieldErrors();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      toast.error(t("required_fields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("invalid_email"));
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        navigate("/");
        toast.success(t("welcome") + "!");
      } else {
        toast.error(t("invalid_credentials"));
      }
    } catch (err: any) {
      if (err instanceof Response) {
        await handleApiError(err, t("invalid_credentials"));
      } else {
        toast.error(t("invalid_credentials"));
      }
    }
  };

  return (
    <div className="w-full max-w-sm bg-neutral-800 p-6 rounded-lg shadow-lg select-none">
      <h2 className="text-2xl font-bold mb-4 text-white">{t("login_title")}</h2>

      <input
        type="email"
        placeholder={t("email")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
      />

      <div className="relative w-full mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 pr-10 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 hover:text-white"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button
        onClick={handleLogin}
        className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
      >
        {t("login_button")}
      </button>

      <div className="mt-3 text-center">
        <button
          className="text-sm text-blue-400 hover:underline"
          onClick={onForgotPassword}
        >
          {t("forgot_password")}
        </button>
      </div>

      <p className="text-sm text-gray-400 mt-4 text-center">
        {t("no_account")}{" "}
        <button className="text-red-500 hover:underline" onClick={onSwitch}>
          {t("signup")}
        </button>
      </p>
    </div>
  );
};

export default LoginForm;
