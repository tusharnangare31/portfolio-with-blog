import React, { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppSwitcher from './AppSwitcher';
import CustomCursor from './components/CustomCursor';

// Lazy load blog pages for code splitting
const BlogPage = lazy(() => import('./pages/BlogPage'));

// Lazy load Admin pages
const AdminLayout = lazy(() => import('./components/Admin/AdminLayout'));
const Dashboard = lazy(() => import('./components/Admin/Dashboard'));
const EditPost = lazy(() => import('./components/Admin/EditPost'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-accent text-lg font-medium animate-pulse">Loading...</div>
  </div>
);

const AppRouter = () => {
  // Enforce dark mode based on localStorage or default to dark
  useEffect(() => {
    const theme = localStorage.getItem('portfolio-theme') || 'dark';
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <>
      {/* Global custom cursor that works across all routes */}
      <CustomCursor />
      <Routes>
        {/* Portfolio Home */}
        <Route path="/" element={<AppSwitcher />} />
        
        {/* Blog Routes */}
        <Route
          path="/blog/*"
          element={
            <Suspense fallback={<LoadingFallback />}>
              <BlogPage />
            </Suspense>
          }
        />

        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={
            <Suspense fallback={<LoadingFallback />}>
              <AdminLayout />
            </Suspense>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="create" element={<EditPost />} />
          <Route path="edit/:slug" element={<EditPost />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRouter;
