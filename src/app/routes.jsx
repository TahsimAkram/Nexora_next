import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import NotFound from "../components/shared/NotFound";
import About from "../pages/About/About";

export default function AppRoutes({ onOpenContact }) {
  return (
    <Routes>
      <Route path="/" element={<Home onOpenContact={onOpenContact} />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/about" element={<About onOpenContact={onOpenContact} />} />
    </Routes>
  );
}
