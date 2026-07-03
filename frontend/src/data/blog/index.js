/**
 * Blog Post Registry & Index (FastAPI Integration)
 * 
 * Handles fetching blog posts dynamically from the local FastAPI backend.
 * 
 * Exports:
 *   - getAllPosts()   — Returns latest posts
 *   - getPostBySlug() — Returns a single post by its URL slug
 *   - getAllTags()    — Returns an array of unique tags across all fetched posts
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('portfolio-admin-token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };
};

/**
 * Returns all blog posts mapped to the structure expected by BlogCard.
 */
export async function getAllPosts() {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

/**
 * Returns a single blog post matching the given slug.
 */
export async function getPostBySlug(slug) {
  try {
    const response = await fetch(`${API_URL}/posts/${slug}`);
    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching single post:", error);
    return null;
  }
}

/**
 * Returns an array of unique tags used across the fetched posts.
 */
export async function getAllTags() {
  const posts = await getAllPosts();
  const tagSet = new Set();
  posts.forEach((post) => {
    if (Array.isArray(post.tags)) {
      post.tags.forEach((tag) => tagSet.add(tag));
    }
  });
  return [...tagSet].sort();
}

export async function createPost(postData) {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

export async function updatePost(slug, postData) {
  const response = await fetch(`${API_URL}/posts/${slug}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(postData)
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

export async function deletePost(slug) {
  const response = await fetch(`${API_URL}/posts/${slug}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error('Failed to delete post');
  return response.json();
}
