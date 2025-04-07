import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Content from "../components/pages/Content";
import Person from "../components/pages/Person";


const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content/:contentId" element={<Content />} />
        <Route path="/person/:nconst" element={<Person />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
