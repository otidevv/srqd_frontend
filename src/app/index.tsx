import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProviders } from "./providers";
import App from "@/App";
import { LoginPage } from "@/pages/login";
import { ForgotPasswordPage } from "@/pages/forgot-password";
import { ResetPasswordPage } from "@/pages/reset-password";
import { DashboardPage } from "@/pages/dashboard";
import { CasosPage, CasoDetailPage } from "@/pages/casos";
import { ConsultaPage } from "@/pages/consulta";
import { ConsultaPublicaPage } from "@/pages/consulta-publica";
import { StatsPage } from "@/pages/stats";
import { UsersPage } from "@/pages/users";
import { ProfilePage } from "@/pages/profile";
import { ChangePasswordPage } from "@/pages/change-password";
import { RolesPage } from "@/pages/admin/roles";
import { SedesPage } from "@/pages/admin/sedes";
import { DependenciasPage } from "@/pages/admin/dependencias";
import { PublicacionesPage } from "@/pages/admin/publicaciones";
import { UnauthorizedPage } from "@/pages/unauthorized";
import { ProtectedRoute } from "@/shared/lib";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<App />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/consulta-publica" element={<ConsultaPublicaPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* SRQD routes */}
          <Route
            path="/casos"
            element={
              <ProtectedRoute requiredPermission={{ module: "casos", action: "read" }}>
                <CasosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/casos/:id"
            element={
              <ProtectedRoute requiredPermission={{ module: "casos", action: "read" }}>
                <CasoDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consulta"
            element={
              <ProtectedRoute>
                <ConsultaPage />
              </ProtectedRoute>
            }
          />

          {/* Estadísticas y reportes */}
          <Route
            path="/estadisticas"
            element={
              <ProtectedRoute requiredPermission={{ module: "estadisticas", action: "read" }}>
                <StatsPage />
              </ProtectedRoute>
            }
          />

          {/* Profile routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/change-password"
            element={
              <ProtectedRoute>
                <ChangePasswordPage />
              </ProtectedRoute>
            }
          />

          {/* TODO: Add more SRQD routes */}
          {/* /casos/nuevo - Registrar nuevo caso */}

          {/* Admin routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requiredPermission={{ module: "users", action: "read" }}>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <ProtectedRoute requiredPermission={{ module: "roles", action: "read" }}>
                <RolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sedes"
            element={
              <ProtectedRoute requiredPermission={{ module: "sedes", action: "read" }}>
                <SedesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dependencias"
            element={
              <ProtectedRoute requiredPermission={{ module: "dependencias", action: "read" }}>
                <DependenciasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/publicaciones"
            element={
              <ProtectedRoute requiredPermission={{ module: "publicaciones", action: "read" }}>
                <PublicacionesPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProviders>
    </BrowserRouter>
  </StrictMode>
);
