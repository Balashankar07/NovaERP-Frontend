import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/providers/auth-provider";
import { PublicRoute, ProtectedRoute } from "@/components/common";
import { DashboardLayout } from "@/components/layout";
import { ROUTES } from "@/routes";
import { LoadingView } from "@/components/ui/state-views";

// Lazy-loaded pages
const LoginPage = React.lazy(() => import("@/pages/auth").then(m => ({ default: m.LoginPage })));
const DashboardPage = React.lazy(() => import("@/pages/dashboard").then(m => ({ default: m.DashboardPage })));
const BrandsListPage = React.lazy(() => import("@/pages/brands").then(m => ({ default: m.BrandsListPage })));
const CategoriesListPage = React.lazy(() => import("@/pages/categories").then(m => ({ default: m.CategoriesListPage })));
const UnitsListPage = React.lazy(() => import("@/pages/units").then(m => ({ default: m.UnitsListPage })));
const ProductsListPage = React.lazy(() => import("@/pages/products").then(m => ({ default: m.ProductsListPage })));
const SuppliersListPage = React.lazy(() => import("@/pages/suppliers").then(m => ({ default: m.SuppliersListPage })));
const ProfilePage = React.lazy(() => import("@/pages/profile").then(m => ({ default: m.ProfilePage })));
const ForbiddenPage = React.lazy(() => import("@/pages/error").then(m => ({ default: m.ForbiddenPage })));
const NotFoundPage = React.lazy(() => import("@/pages/error").then(m => ({ default: m.NotFoundPage })));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingView title="Loading NovaERP..." className="h-screen" />}>
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
                <Route path={ROUTES.PRODUCTS} element={<ProductsListPage />} />
                <Route path={ROUTES.SUPPLIERS} element={<SuppliersListPage />} />
                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              </Route>
            </Route>
            
            {/* Error Routes */}
            <Route path={ROUTES.FORBIDDEN} element={<ForbiddenPage />} />

            {/* Catch all - 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
