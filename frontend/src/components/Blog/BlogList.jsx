/**
 * BlogList Component
 * 
 * The main blog listing page. Displays a hero section, tag filter bar,
 * and a responsive grid of BlogCard components with staggered animations.
 * 
 * Features:
 *   - Hero with title and subtitle
 *   - Clickable tag filter pills with active accent styling
 *   - Responsive grid: 1 col → 2 col (md) → 3 col (lg)
 *   - Back to portfolio link
 *   - Framer Motion staggered entry animations
 */

import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Rss, Tag, Loader2 } from 'lucide-react';
import { getAllPosts, getAllTags } from '../../data/blog';
import BlogCard from './BlogCard';
import SEO from '../ui/SEO';

export default function BlogList() {
  const [activeTag, setActiveTag] = useState('All');

  const [allPosts, setAllPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [posts, tags] = await Promise.all([
          getAllPosts(),
          getAllTags()
        ]);
        setAllPosts(posts);
        setAllTags(tags);
      } catch (error) {
        console.error("Failed to load blog data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter posts based on the currently selected tag
  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') return allPosts;
    return allPosts.filter(
      (post) => Array.isArray(post.tags) && post.tags.includes(activeTag)
    );
  }, [allPosts, activeTag]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p>Loading posts from Hashnode...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <SEO 
        title="Blog - Tushar Nangare"
        description="Thoughts, tutorials & learnings from my DevOps journey. Read about Docker, AWS, Kubernetes, CI/CD and more."
        url="https://tusharnangare.netlify.app/blog"
      />
      {/* ── Back to Portfolio Link ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Link
          to="/"
          className="
            inline-flex items-center gap-2 text-sm text-muted
            hover:text-accent transition-colors duration-300 group
          "
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Portfolio
        </Link>
      </motion.div>

      {/* ── Hero Section ── */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6 border border-accent/20">
          <Rss className="w-4 h-4" />
          Blog
        </div>
        <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4">
          Blog
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto leading-relaxed">
          Thoughts, tutorials &amp; learnings from my DevOps journey
        </p>
      </motion.header>

      {/* ── Tag Filter Bar ── */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-2 mb-12"
        aria-label="Filter posts by tag"
      >
        {/* "All" filter pill */}
        <button
          onClick={() => setActiveTag('All')}
          className={`
            px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
            ${
              activeTag === 'All'
                ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20'
                : 'bg-foreground/[0.03] text-muted border-foreground/5 hover:border-accent/30 hover:text-foreground'
            }
          `}
        >
          All
        </button>

        {/* Dynamic tag pills */}
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border
              inline-flex items-center gap-1.5
              ${
                activeTag === tag
                  ? 'bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/20'
                  : 'bg-foreground/[0.03] text-muted border-foreground/5 hover:border-accent/30 hover:text-foreground'
              }
            `}
          >
            <Tag className="w-3 h-3" />
            {tag}
          </button>
        ))}
      </motion.nav>

      {/* ── Posts Grid ── */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-muted text-lg">
            No posts found for &ldquo;{activeTag}&rdquo;.
          </p>
        </motion.div>
      )}

      {/* ── Post Count ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-sm text-muted mt-12"
      >
        Showing {filteredPosts.length} of {allPosts.length} posts
      </motion.p>
    </div>
  );
}
