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
import { KatasPage } from "../pages/KatasPages";
import { KatasDetailPage } from "../pages/KataDetailPage";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes definition */}
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="/register" element={<RegisterPage />}></Route>
      <Route path="/katas" element={<KatasPage />}></Route>
      <Route path="/katas/:id" element={<KatasDetailPage />}></Route>
      {/* Redirecto when Page Not Found */}
      <Route path="*" element={<Navigate to="/" replace />}></Route>
    </Routes>
  );
};
