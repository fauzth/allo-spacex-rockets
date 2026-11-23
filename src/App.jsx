import { BrowserRouter, Routes, Route } from "react-router-dom";
import RocketListPage from "./pages/RocketListPage";
import RocketDetailPage from "./pages/RocketDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RocketListPage />} />
        <Route path="/rockets/:id" element={<RocketDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
