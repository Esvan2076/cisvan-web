import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useFieldErrors } from "../../../hooks/useFieldErrors";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm: React.FC<{ onSwitch: () => void }> = ({ onSwitch }) => {
  const { t } = useTranslation("auth");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, tempUser, verify, resendVerification } = useAuth();
  const { handleApiError } = useFieldErrors();
  const navigate = useNavigate();

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];

    if (password.length < 8 || password.length > 20) {
      errors.push(t("password_length_strict"));
    }
    if (!/[A-Z]/.test(password)) {
      errors.push(t("password_uppercase"));
    }
    if (!/[a-z]/.test(password)) {
      errors.push(t("password_lowercase"));
    }
    if (!/\d/.test(password)) {
      errors.push(t("password_digit"));
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(password)) {
      errors.push(t("password_special_char"));
    }

    return errors;
  };

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !repeatPassword.trim()) {
      toast.error(t("required_fields"));
      return;
    }

    if (username.length < 5 || username.length > 50) {
      toast.error(t("username_length"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("invalid_email"));
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      passwordErrors.forEach((err) => toast.error(err));
      return;
    }

    if (password !== repeatPassword) {
      toast.error(t("passwords_mismatch"));
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      toast.info(t("verification_code_sent"));
    } catch (err) {
      if (err instanceof Response) {
        await handleApiError(err, t("register_error"));
      } else {
        toast.error(t("register_error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const success = await verify(code);
      if (success) {
        toast.success(t("email_verified"));
        setUsername("");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setCode("");
        navigate("/");
      } else {
        toast.error(t("invalid_code"));
      }
    } catch (err) {
      if (err instanceof Response) {
        await handleApiError(err, t("invalid_code"));
      } else {
        toast.error(t("invalid_code"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await resendVerification();
      toast.info(t("verification_code_resent"));
    } catch (err) {
      if (err instanceof Response) {
        await handleApiError(err, t("resend_error"));
      } else {
        toast.error(t("resend_error"));
      }
    }
  };

  return (
    <div className="w-full max-w-sm bg-neutral-800 p-6 rounded-lg shadow-lg select-none">
      <h2 className="text-2xl font-bold mb-4 text-white">{t("signup_title")}</h2>

      {!tempUser ? (
        <>
          <input
            type="text"
            placeholder={t("name")}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-3 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <div className="relative w-full mb-3">
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
          <input
            type="password"
            placeholder={t("repeat_password")}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleRegister}
            disabled={loading}
            className={`w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {t("signup_button")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-300 mb-3">
            {t("code_prompt", { email: tempUser.email })}
          </p>
          <input
            type="text"
            placeholder="0000"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mb-3 px-4 py-2 text-center tracking-widest font-mono text-lg rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
          >
            {t("verify")}
          </button>
          <button
            onClick={handleResend}
            className="mt-3 text-sm text-blue-400 hover:underline"
          >
            {t("resend_code")}
          </button>
        </>
      )}

      <p className="text-sm text-gray-400 mt-4 text-center">
        {t("has_account")}{" "}
        <button className="text-red-500 hover:underline" onClick={onSwitch}>
          {t("login")}
        </button>
      </p>
    </div>
  );
};

export default SignupForm;
