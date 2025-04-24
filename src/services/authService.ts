import { BASE_API } from "../constants/api";
import { sendVerificationEmail } from "./emailService";

const LOGIN_URL = `${BASE_API}/user/login`;
const ME_URL = `${BASE_API}/user/me`;
const REGISTER_URL = `${BASE_API}/user/register`;
const RESEND_CODE_URL = `${BASE_API}/user/resend-code`;
const RESET_PASSWORD_URL = `${BASE_API}/user/reset-password`;
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

    if (!res.ok) throw new Error("login_error");
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
  
    if (!res.ok) throw res; // ⬅️ Esto es lo único que cambia
  
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

    if (!res.ok) throw new Error("invalid_code");
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

    if (!res.ok) throw new Error("reset_request_error");
    return await res.json();
  },

  resetPassword: async (token: string, newPassword: string, language: string) => {
    const res = await fetch(RESET_PASSWORD_URL, {
      method: "POST",
      headers: getLanguageHeader(language),
      body: JSON.stringify({ token, newPassword }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText.toLowerCase().includes("expired") ? "token_expired" : "invalid_token");
    }

    return true;
  }
};
