/**
 * BlogLayout Component
 * 
 * A layout wrapper for all blog pages. Provides consistent background,
 * max-width container, padding, and selection styling that matches
 * the main portfolio design.
 * 
 * Props:
 *   - children: React nodes to render inside the layout
 */

export default function BlogLayout({ children }) {
  return (
    <div className="bg-background text-foreground min-h-screen selection:bg-accent/20 selection:text-accent">
      {/* Centered container with responsive padding */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {children}
      </main>
    </div>
  );
}
