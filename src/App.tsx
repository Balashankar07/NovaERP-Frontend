import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/providers/auth-provider";
import { PublicRoute, ProtectedRoute } from "@/components/common";
import { LoginPage } from "@/pages/auth";
import { DashboardLayout } from "@/components/layout";
import { DashboardPage } from "@/pages/dashboard";
import { BrandsListPage } from "@/pages/brands";
import { CategoriesListPage } from "@/pages/categories";
import { UnitsListPage } from "@/pages/units";
import { ForbiddenPage, NotFoundPage } from "@/pages/error";
import { ROUTES } from "@/routes";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
              <Route path={ROUTES.BRANDS} element={<BrandsListPage />} />
              <Route path={ROUTES.CATEGORIES} element={<CategoriesListPage />} />
              <Route path={ROUTES.UNITS} element={<UnitsListPage />} />
            </Route>
          </Route>
          
          {/* Error Routes */}
          <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />

          {/* Catch all - 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
