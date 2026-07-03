/**
 * BlogPost Component
 * 
 * Renders a single blog post page with full markdown content.
 * Uses react-markdown with remark-gfm for GitHub Flavored Markdown support.
 * 
 * Features:
 *   - Back to blog navigation
 *   - Post metadata (title, date, read time, author, tags)
 *   - Rendered markdown with custom component styling
 *   - Code blocks with dark background
 *   - "More Posts" section at the bottom
 */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, Clock, User, Tag, Loader2, Share2, Linkedin } from 'lucide-react';
import { getPostBySlug, getAllPosts } from '../../data/blog';
import BlogCard from './BlogCard';
import SEO from '../ui/SEO';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [morePosts, setMorePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readProgress, setReadProgress] = useState(0);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function loadPost() {
      setLoading(true);
      try {
        const fetchedPost = await getPostBySlug(slug);
        setPost(fetchedPost);
        
        if (fetchedPost) {
          const allPosts = await getAllPosts();
          setMorePosts(allPosts.filter((p) => p.slug !== slug).slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to load post:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted">
        <Loader2 className="w-8 h-8 animate-spin text-accent mb-4" />
        <p>Loading post from Hashnode...</p>
      </div>
    );
  }

  // ── 404 Fallback ──
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-6xl font-display font-bold text-foreground mb-4">404</h1>
          <p className="text-muted text-lg mb-8">Post not found.</p>
          <Link
            to="/blog"
            className="
              inline-flex items-center gap-2 px-6 py-3 rounded-full
              bg-accent text-accent-foreground font-medium
              hover:shadow-lg hover:shadow-accent/20 transition-all duration-300
            "
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>
      </div>
    );
  }

  // Format the post date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // ── Custom ReactMarkdown components ──
  const markdownComponents = {
    // Headings with anchor IDs
    h1: ({ children, ...props }) => {
      const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }) => {
      const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const id = String(children).toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      return <h3 id={id} {...props}>{children}</h3>;
    },
    // Code blocks with dark background
    code: ({ inline, className, children, ...props }) => {
      if (inline) {
        return (
          <code className="blog-inline-code" {...props}>
            {children}
          </code>
        );
      }
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Links open in new tab for external URLs
    a: ({ href, children, ...props }) => {
      const isExternal = href && (href.startsWith('http') || href.startsWith('//'));
      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-accent hover:text-accent/80 underline underline-offset-4 transition-colors duration-200"
          {...props}
        >
          {children}
        </a>
      );
    },
  };

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-foreground/5">
        <motion.div
          className="h-full bg-gradient-to-r from-accent to-accent/70 shadow-[0_0_10px_rgba(var(--accent-rgb),0.5)]"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

    <div className="min-h-screen">
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} by Tushar Nangare`}
        url={`https://tusharnangare.netlify.app/blog/${slug}`}
        type="article"
      />
      {/* ── Back Button ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10"
      >
        <Link
          to="/blog"
          className="
            inline-flex items-center gap-2 text-sm text-muted
            hover:text-accent transition-colors duration-300 group
          "
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Back to Blog
        </Link>
      </motion.div>

      {/* ── Post Header ── */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="
                  text-xs font-medium px-3 py-1 rounded-full
                  bg-accent/10 text-accent border border-accent/20
                  inline-flex items-center gap-1
                "
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6">
          {post.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </span>
          {post.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="mt-8 h-px bg-gradient-to-r from-accent/50 via-foreground/10 to-transparent" />
      </motion.header>

      {/* ── Post Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="blog-content">
          {/<\/?[a-z][\s\S]*>/i.test(post.content) ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={markdownComponents}
            >
              {post.content}
            </ReactMarkdown>
          )}
        </div>
      </motion.div>

      {/* ── Share Section ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mt-16 pt-8 border-t border-foreground/5"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2 text-muted">
            <Share2 className="w-5 h-5" />
            <span className="text-sm font-medium">Share this article</span>
          </div>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://tusharnangare.netlify.app/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/5 hover:border-accent/30 hover:text-accent text-sm font-medium transition-all duration-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Post on X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://tusharnangare.netlify.app/blog/${slug}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/[0.03] border border-foreground/5 hover:border-accent/30 hover:text-accent text-sm font-medium transition-all duration-300"
            >
              <Linkedin className="w-4 h-4" />
              Share on LinkedIn
            </a>
          </div>
        </div>
      </motion.div>

      {/* ── More Posts Section ── */}
      {morePosts.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12 border-t border-foreground/5"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-8">
            More Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {morePosts.map((p, i) => (
              <BlogCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
    </>
  );
}
