/**
 * BlogPage Component
 * 
 * Top-level route wrapper for the blog section.
 * Handles sub-routing between the blog listing and individual post pages.
 * Wrapped in BlogLayout for consistent styling.
 * 
 * Routes:
 *   /blog        → BlogList  (all posts listing)
 *   /blog/:slug  → BlogPost  (individual post)
 */

import { Routes, Route } from 'react-router-dom';
import BlogLayout from '../components/Blog/BlogLayout';
import BlogList from '../components/Blog/BlogList';
import BlogPost from '../components/Blog/BlogPost';

export default function BlogPage() {
  return (
    <BlogLayout>
      <Routes>
        <Route index element={<BlogList />} />
        <Route path=":slug" element={<BlogPost />} />
      </Routes>
    </BlogLayout>
  );
}
