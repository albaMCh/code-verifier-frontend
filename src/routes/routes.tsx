// React Router DOM Imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import { HomePage } from "../pages/HomePages";
import { LoginPage } from "../pages/LoginPages";
import { RegisterPage } from "../pages/RegisterPages";
import { KatasPage } from "../pages/KatasPage";
import { KataCreatePage } from "../pages/KataCreatePage";
import { KataDetailPage } from "../pages/KataDetailPage";
import { KataEditPage } from "../pages/KataEditPage";
import { KataParticipatePage } from "../pages/KataParticipatePage";
import { KataRankingPage } from "../pages/KataRankingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes definition */}
      <Route path="/" element={<HomePage />}>
        <Route path="/katas" element={<KatasPage />}></Route>
        <Route path="/katas/create" element={<KataCreatePage />}></Route>
        <Route path="/katas/:id" element={<KataDetailPage />}></Route>
        <Route path="/katas/:id/edit" element={<KataEditPage />}></Route>
        <Route
          path="/katas/:id/participate"
          element={<KataParticipatePage />}
        ></Route>
        <Route path="/katas/ranking" element={<KataRankingPage />}></Route>
      </Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      {/* Redirecto when Page Not Found */}
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
