import { BASE_API } from "../constants/api";
import { sendVerificationEmail, sendPasswordResetEmail } from "./emailService";

const LOGIN_URL = `${BASE_API}/user/login`;
const ME_URL = `${BASE_API}/user/me`;
const REGISTER_URL = `${BASE_API}/user/register`;
const RESEND_CODE_URL = `${BASE_API}/user/resend-code`;
const FORGOT_PASSWORD_URL = `${BASE_API}/user/forgot-password`;

const getLanguageHeader = (language: string) => ({
  "Content-Type": "application/json",
  "Accept-Language": language,
});

export const authService = {
  login: async (email: string, password: string, language: string): Promise<string> => {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw res;
    return await res.text();
  },

  getMe: async (token: string, language: string) => {
    const res = await fetch(ME_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Accept-Language": language,
      },
    });

    if (!res.ok) throw new Error("user_error");
    return await res.json();
  },

  register: async (username: string, email: string, password: string, language: string) => {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ username, email, password }),
    });

    if (!res.ok) throw res;

    const data = await res.json();
    await sendVerificationEmail(data.email, data.username, data.code);
    return { email: data.email, username: data.username };
  },

  verifyCode: async (email: string, code: string, language: string): Promise<string> => {
    const res = await fetch(`${BASE_API}/user/verify-email`, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ email, code }),
    });

    if (!res.ok) throw res;

    return await res.text();
  },

  resendCode: async (email: string, language: string) => {
    const res = await fetch(RESEND_CODE_URL, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw new Error("resend_error");

    const data = await res.json();
    await sendVerificationEmail(data.email, data.username, data.code);
  },

  forgotPassword: async (email: string, language: string) => {
    const res = await fetch(FORGOT_PASSWORD_URL, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ email }),
    });

    if (!res.ok) throw res;

    const data = await res.json(); // { email, username, code }

    // ✉️ Enviar correo de recuperación
    await sendPasswordResetEmail(data.email, data.username, data.code);

    return { email: data.email, username: data.username };
  },

  resetPassword: async (email: string, code: string, newPassword: string, lang: string): Promise<boolean> => {
    const res = await fetch(`${BASE_API}/user/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
      body: JSON.stringify({
        email,
        code,
        newPassword,
      }),
    });

    if (!res.ok) throw new Error("Reset password failed");
    return true;
  },

  getNotificationPreference: async () => {
    const token = localStorage.getItem("auth_token");
    const response = await fetch(`${BASE_API}/user/notification-preference`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Error fetching notification preference");
    return response.json();
  },
};
