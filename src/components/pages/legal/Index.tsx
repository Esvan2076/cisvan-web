import { useParams, Navigate } from "react-router-dom";
import LegalPage from "./LegalPage";

const VALID_SECTIONS = ["terms", "privacy", "faq", "about", "contact"];

const LegalRouter: React.FC = () => {
  const { section } = useParams<{ section: string }>();

  if (!section || !VALID_SECTIONS.includes(section)) {
    return <Navigate to="/" replace />;
  }

  return <LegalPage sectionKey={section} />;
};

export default LegalRouter;
