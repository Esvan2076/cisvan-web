import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useFieldErrors } from "../../hooks/useFieldErrors";

const ForgotPasswordForm: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslation("auth");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
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

  const handleSubmitReset = async () => {
    if (!code.trim() || !newPassword.trim()) {
      toast.error(t("required_fields"));
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
        setShowCodeInput(false);
        onBack();
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
    if (!email.trim()) return;
    setLoading(true);
    try {
      await forgotPassword(email);
      toast.info(t("verification_code_resent"));
    } catch (err) {
      if (err instanceof Response) {
        await handleApiError(err, t("resend_error"));
      } else {
        toast.error(t("resend_error"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-sm bg-neutral-800 p-6 rounded-lg shadow-lg select-none">
      <h2 className="text-2xl font-bold mb-4 text-white">{t("recover_password_title")}</h2>

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
            onClick={handleSubmitEmail}
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
          <input
            type="password"
            placeholder={t("new_password")}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-neutral-700 text-white placeholder-gray-400 focus:outline-none"
          />
          <button
            onClick={handleSubmitReset}
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-2 rounded hover:bg-gray-300 transition"
          >
            {t("reset_password_button")}
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
        <button className="text-red-500 hover:underline" onClick={onBack}>
          {t("back_to_login")}
        </button>
      </p>
    </div>
  );
};

export default ForgotPasswordForm;
