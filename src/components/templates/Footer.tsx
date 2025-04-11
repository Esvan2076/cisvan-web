// src/components/templates/Footer.tsx
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-800 text-white mt-12 px-4 py-8 text-sm select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sección 1: Información */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-base">CISVAN</p>
          <Link to="/legal/about" className="hover:underline">
            {t("footer.about")}
          </Link>
          <Link to="/legal/terms" className="hover:underline">
            {t("footer.terms")}
          </Link>
          <Link to="/legal/privacy" className="hover:underline">
            {t("footer.privacy")}
          </Link>
          <a href="#" className="hover:underline">
            {t("footer.report")}
          </a>
        </div>

        {/* Sección 2: Soporte */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-base">{t("footer.support")}</p>
          <Link to="/legal/contact" className="hover:underline">
            {t("footer.contact")}
          </Link>
          <Link to="/legal/faq" className="hover:underline">
            {t("footer.faq")}
          </Link>
        </div>

        {/* Sección 3: Redes sociales + TMDB */}
        <div className="flex flex-col gap-2">
          <p className="font-bold text-base">{t("footer.social")}</p>
          <div className="flex items-center gap-4 mt-1">
            <a
              href="https://github.com/Esvan2076"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FaGithub className="text-2xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://www.instagram.com/el_esvan/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-2xl hover:text-red-500 transition" />
            </a>
            <a
              href="https://www.linkedin.com/in/esvan1/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="text-2xl hover:text-red-500 transition" />
            </a>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-400 mb-1">
              {t("footer.powered_by")}
            </p>
            <img
              src="/tmdb_logo_1.svg"
              alt="TMDB Logo"
              className="w-20 h-auto"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 pt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} CISVAN. {t("footer.rights_reserved")}
        <span className="ml-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px] align-middle">
          v1.0.0
        </span>
      </div>
    </footer>
  );
};

export default Footer;
