/**
 * BlogCard Component
 * 
 * A preview card for a single blog post, displayed in the blog listing grid.
 * Features a gradient placeholder header, title, excerpt, metadata,
 * tag pills, and smooth hover animations via Framer Motion.
 * 
 * Props:
 *   - post: { slug, title, excerpt, date, readTime, tags }
 *   - index: number (used for staggered animation delay)
 */

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

export default function BlogCard({ post, index = 0 }) {
  // Format the date for display (e.g. "Jun 15, 2026")
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="block group">
        <motion.article
          className="
            rounded-2xl bg-foreground/[0.03] border border-foreground/5
            overflow-hidden transition-colors duration-300
            hover:border-accent/30
          "
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* ── Cover Image or Gradient Placeholder ── */}
          {post.coverImage ? (
            <div className="h-44 relative overflow-hidden">
              <img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </div>
            </div>
          ) : (
            <div className="h-44 bg-gradient-to-br from-accent/20 via-accent/5 to-transparent relative overflow-hidden">
              {/* Decorative floating shapes */}
              <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent/10 blur-xl" />
              <div className="absolute bottom-6 left-6 w-24 h-24 rounded-full bg-accent/5 blur-2xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-accent/20 rotate-45" />

              {/* Arrow indicator on hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4 text-accent" />
                </div>
              </div>
            </div>
          )}

          {/* ── Card Body ── */}
          <div className="p-6 space-y-4">
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="
                      text-xs font-medium px-2.5 py-1 rounded-full
                      bg-accent/10 text-accent border border-accent/20
                    "
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h3 className="text-lg font-display font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-300">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-muted leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>

            {/* Meta: date & read time */}
            <div className="flex items-center gap-4 text-xs text-muted pt-2 border-t border-foreground/5">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}
