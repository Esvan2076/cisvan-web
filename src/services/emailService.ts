import emailjs from "@emailjs/browser";
import { APP_URL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_RESET, EMAILJS_TEMPLATE_VERIFY } from "../constants/api";

export const sendVerificationEmail = async (
  email: string,
  username: string,
  code: string
) => {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_VERIFY,
    {
      email,
      name: username,
      code,
    },
    EMAILJS_PUBLIC_KEY
  );
};

export const sendPasswordResetEmail = async (
  email: string,
  username: string,
  token: string
) => {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_RESET,
    {
      email,
      name: username,
      link: `${APP_URL}/reset-password/${token}`,
    },
    EMAILJS_PUBLIC_KEY
  );
};
