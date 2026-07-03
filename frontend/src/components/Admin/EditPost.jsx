import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug, createPost, updatePost } from '../../data/blog';
import Editor from './Editor';
import { Loader2 } from 'lucide-react';

export default function EditPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(slug);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    cover_image: '',
    tags: '',
    content: ''
  });

  useEffect(() => {
    const loadPost = async () => {
      const post = await getPostBySlug(slug);
      if (post) {
        setFormData({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          cover_image: post.cover_image || '',
          tags: post.tags ? post.tags.join(', ') : '',
          content: post.content
        });
      }
      setLoading(false);
    };

    if (isEditing) {
      loadPost();
    }
  }, [slug, isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
      };

      if (isEditing) {
        await updatePost(slug, payload);
      } else {
        // Basic slug generation if empty
        if (!payload.slug) {
          payload.slug = payload.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        }
        await createPost(payload);
      }
      
      navigate('/admin');
    } catch (error) {
      console.error(error);
      alert('Failed to save post. Make sure the slug is unique.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-accent" size={32} /></div>;
  }

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-display font-bold mb-8">
        {isEditing ? 'Edit Post' : 'Create New Post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Title *</label>
            <input 
              required
              type="text" 
              className="w-full p-3 rounded-lg bg-surface border border-border focus:border-accent outline-none transition-colors"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              placeholder="Post Title"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">URL Slug (Leave blank to auto-generate)</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-surface border border-border focus:border-accent outline-none transition-colors"
              value={formData.slug}
              onChange={e => setFormData({...formData, slug: e.target.value})}
              placeholder="my-awesome-post"
              disabled={isEditing} // usually you don't change slug after publishing
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Excerpt *</label>
          <textarea 
            required
            className="w-full p-3 rounded-lg bg-surface border border-border focus:border-accent outline-none transition-colors h-24 resize-none"
            value={formData.excerpt}
            onChange={e => setFormData({...formData, excerpt: e.target.value})}
            placeholder="A short summary of the post..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Cover Image URL (Optional)</label>
            <input 
              type="url" 
              className="w-full p-3 rounded-lg bg-surface border border-border focus:border-accent outline-none transition-colors"
              value={formData.cover_image}
              onChange={e => setFormData({...formData, cover_image: e.target.value})}
              placeholder="https://..."
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted">Tags (comma separated)</label>
            <input 
              type="text" 
              className="w-full p-3 rounded-lg bg-surface border border-border focus:border-accent outline-none transition-colors"
              value={formData.tags}
              onChange={e => setFormData({...formData, tags: e.target.value})}
              placeholder="React, DevOps, Tailwind"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted">Content *</label>
          <div className="p-1 rounded-xl bg-gradient-to-r from-accent/20 to-transparent">
            <Editor 
              initialHTML={isEditing ? formData.content : undefined}
              onChange={(html) => setFormData({...formData, content: html})}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6">
          <button 
            type="button" 
            onClick={() => navigate('/admin')}
            className="px-6 py-2 rounded-lg font-medium text-muted hover:bg-foreground/5 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={saving}
            className="flex items-center gap-2 bg-accent text-accent-foreground px-8 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
          >
            {saving && <Loader2 className="animate-spin" size={18} />}
            {isEditing ? 'Save Changes' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
