import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import SubjectPage from "../components/pages/SubjectPage";
import PersonPage from "../components/pages/PersonPage";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/subject/:contentId" element={<SubjectPage />} />
        <Route path="/person/:nconst" element={<PersonPage />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
