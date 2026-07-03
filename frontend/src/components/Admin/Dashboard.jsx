import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react';
import { getAllPosts, deletePost } from '../../data/blog';

export default function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    const data = await getAllPosts();
    setPosts(data);
    setLoading(false);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts();
  }, []);

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(slug);
      loadPosts();
    }
  };

  if (loading) {
    return <div className="p-10 flex justify-center"><Loader2 className="animate-spin text-accent" size={32} /></div>;
  }

  return (
    <div className="p-10 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Manage Posts</h1>
        <Link to="/admin/create" className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-lg font-medium hover:bg-accent/90 transition-colors">
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-foreground/5">
              <th className="p-4 font-medium text-muted">Title</th>
              <th className="p-4 font-medium text-muted">Date</th>
              <th className="p-4 font-medium text-muted text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.slug} className="border-b border-border last:border-0 hover:bg-foreground/[0.02]">
                <td className="p-4 font-medium">{post.title}</td>
                <td className="p-4 text-muted">{post.date}</td>
                <td className="p-4 flex justify-end gap-3">
                  <Link to={`/admin/edit/${post.slug}`} className="p-2 text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-colors">
                    <Edit size={18} />
                  </Link>
                  <button onClick={() => handleDelete(post.slug)} className="p-2 text-muted hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan="3" className="p-8 text-center text-muted">No posts found. Create one!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
