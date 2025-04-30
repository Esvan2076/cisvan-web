import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useFieldErrors } from "../../hooks/useFieldErrors";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ForgotPasswordForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [codeValidated, setCodeValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { forgotPassword, resetPassword, recoverUser } = useAuth();
  const { handleApiError } = useFieldErrors();

  const handleSubmitEmail = async () => {
    if (!email.trim()) {
      toast.error(t("required_fields"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(t("invalid_email"));
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      toast.success(t("verification_code_sent"));
      setShowCodeInput(true);
    } catch (err) {
      if (err instanceof Response) {
        await handleApiError(err, t("reset_request_error"));
      } else {
        toast.error(t("reset_request_error"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidateCode = () => {
    if (code.trim().length !== 4) {
      toast.error(t("invalid_code"));
      return;
    }

    const simulatedValid = true;
    if (simulatedValid) {
      setCodeValidated(true);
    } else {
      toast.error(t("invalid_code"));
    }
  };

  const handleSubmitReset = async () => {
    if (!newPassword.trim() || !repeatPassword.trim()) {
      toast.error(t("required_fields"));
      return;
    }

    if (newPassword !== repeatPassword) {
      toast.error(t("passwords_mismatch"));
      return;
    }

    setLoading(true);
    try {
      const ok = await resetPassword(code, newPassword);
      if (ok) {
        toast.success(t("password_reset_success"));
        setEmail("");
        setCode("");
        setNewPassword("");
        setRepeatPassword("");
        setShowCodeInput(false);
        setCodeValidated(false);
        onBack();
      } else {
        toast.error(t("invalid_code"));
      }
    } catch (err) {
      toast.error(t("invalid_code"));
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email.trim()) return;
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.info(t("verification_code_resent"));
    } catch {
      toast.error(t("resend_error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!showCodeInput) return handleSubmitEmail();
        if (!codeValidated) return handleValidateCode();
        return handleSubmitReset();
      }}
      className="w-full max-w-sm bg-neutral-800 p-6 rounded-lg shadow-lg select-none"
    >
      <h2 className="text-2xl font-bold mb-4 text-white">{t("recover_password")}</h2>

      {!showCodeInput ? (
        <>
          <input
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
          >
            {t("send_code")}
          </button>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-300 mb-3">
            {t("code_prompt", { email: recoverUser?.email })}
          </p>
          <input
            type="text"
            placeholder="0000"
            maxLength={4}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full mb-3 px-4 py-2 text-center tracking-widest font-mono text-lg rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />

          {!codeValidated ? (
            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
            >
              {t("verify_code")}
            </button>
          ) : (
            <>
              <div className="relative w-full mb-3">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("new_password")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
              >
                {t("reset_password_button")}
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleResend}
            className="mt-3 text-sm text-blue-400 hover:underline"
          >
            {t("resend_code")}
          </button>
        </>
      )}

      <p className="text-sm text-gray-400 mt-4 text-center">
        <button
          type="button"
          className="text-red-500 hover:underline"
          onClick={onBack}
        >
          {t("back_to_login")}
        </button>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
