import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import SubjectPage from "../components/SubjectPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:contentId" element={<SubjectPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
