import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProviders } from "./providers";
import App from "@/App";
import { LoginPage } from "@/pages/login";
import { DashboardPage } from "@/pages/dashboard";
import { CasosPage, CasoDetailPage } from "@/pages/casos";
import { ConsultaPage } from "@/pages/consulta";
import { ConsultaPublicaPage } from "@/pages/consulta-publica";
import { StatsPage } from "@/pages/stats";
import { UsersPage } from "@/pages/users";
import { RolesPage } from "@/pages/admin/roles";
import { SedesPage } from "@/pages/admin/sedes";
import { DependenciasPage } from "@/pages/admin/dependencias";
import { PublicacionesPage } from "@/pages/admin/publicaciones";
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
          <Route path="/consulta-publica" element={<ConsultaPublicaPage />} />

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
              <ProtectedRoute>
                <CasosPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/casos/:id"
            element={
              <ProtectedRoute>
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
              <ProtectedRoute>
                <StatsPage />
              </ProtectedRoute>
            }
          />

          {/* TODO: Add more SRQD routes */}
          {/* /casos/nuevo - Registrar nuevo caso */}

          {/* Admin routes */}
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <UsersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/roles"
            element={
              <ProtectedRoute>
                <RolesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sedes"
            element={
              <ProtectedRoute>
                <SedesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dependencias"
            element={
              <ProtectedRoute>
                <DependenciasPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/publicaciones"
            element={
              <ProtectedRoute>
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
