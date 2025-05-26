import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Content from "../components/pages/Content";
import Person from "../components/pages/Person";
import LegalRouter from "../components/pages/legal/Index";
import AdvancedSearch from "../components/pages/AdvancedSearch";
import AuthPage from "../components/pages/auth/AuthPage";
import EmailVerifyPage from "../components/pages/EmailVerifyPage";
import ForgotPasswordPage from "../components/pages/auth/ForgotPasswordPage";
import UserProfile from "../components/pages/UserProfile";
import UserHistoryPage from "../components/pages/UserHistoryPage";
import AdminReportsPage from "../components/pages/AdminReportsPage";
import ScrollToTop from "../components/atoms/ScrollToTop";

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content/:contentId" element={<Content />} />
        <Route path="/person/:nconst" element={<Person />} />
        <Route path="/legal/:section" element={<LegalRouter />} />
        <Route path="/advanced-search" element={<AdvancedSearch />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/verify/:token" element={<EmailVerifyPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/config" element={<UserProfile />} />
        <Route path="/history/:id" element={<UserHistoryPage />} /> {/* nueva ruta */}
        <Route path="/admin/reports" element={<AdminReportsPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
