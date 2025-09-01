import React, { useState, useEffect } from 'react';
import { Clock, User, Calendar, ArrowRight, Search, Filter, BookOpen, Tag, Eye, Edit, Trash2, X, Save, ArrowLeft } from 'lucide-react';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from API
  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://naturehatch-website.onrender.com/api/blog/getblogs');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      const blogsWithExtras = data.map(blog => ({
        ...blog,
        author: blog.author || "Nature Hatch Team",
        readTime: `${Math.ceil(blog.content.length / 200)} min read`,
        views: Math.floor(Math.random() * 2000) + 100,
        category: blog.category || "General"
      }));
      
      setBlogs(blogsWithExtras);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to load blogs. Please try again later.');
      setLoading(false);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      const response = await fetch(`https://naturehatch-website.onrender.com/api/blog/deleteblog/${blogId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      setBlogs(blogs.filter(blog => blog._id !== blogId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const handleUpdate = async (blogId, updatedData) => {
    try {
      const formData = new FormData();
      formData.append('title', updatedData.title);
      formData.append('content', updatedData.content);
      
      if (updatedData.image) {
        formData.append('image', updatedData.image);
      }

      const response = await fetch(`https://naturehatch-website.onrender.com/api/blog/updateblog/${blogId}`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      const updatedBlog = await response.json();
      
      setBlogs(blogs.map(blog => 
        blog._id === blogId 
          ? { 
              ...updatedBlog, 
              author: updatedBlog.author || "Nature Hatch Team",
              readTime: `${Math.ceil(updatedBlog.content.length / 200)} min read`,
              views: blog.views,
              category: updatedBlog.category || "General"
            }
          : blog
      ));
      
      setEditingBlog(null);
    } catch (error) {
      console.error('Error updating blog:', error);
      alert('Failed to update blog. Please try again.');
    }
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  const closeBlogReader = () => {
    setSelectedBlog(null);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Blog Reader View
  if (selectedBlog) {
    return (
      <div className="min-h-screen ">
        {/* Header */}
        <div className="sticky top-0  z-10 ">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={closeBlogReader}
                className="flex items-center text-green-600 hover:text-green-700 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Blogs
              </button>
              <button
                onClick={closeBlogReader}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Blog Header */}
          <div className="mb-8">
            <div className="mb-6">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Tag className="w-4 h-4 mr-2" />
                {selectedBlog.category}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                {selectedBlog.title}
              </h1>
            </div>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-green-600" />
                <span className="font-medium">{selectedBlog.author}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-green-600" />
                <span>{formatDate(selectedBlog.createdAt)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-green-600" />
                <span>{selectedBlog.readTime}</span>
              </div>
              <div className="flex items-center">
                <Eye className="w-5 h-5 mr-2 text-green-600" />
                <span>{selectedBlog.views} views</span>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={selectedBlog.image}
                alt={selectedBlog.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            </div>
          </div>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
              {selectedBlog.content}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="text-gray-600">
                <p className="mb-1">Published on {formatDate(selectedBlog.createdAt)}</p>
                <p>Last updated on {formatDate(selectedBlog.updatedAt)}</p>
              </div>
              <button
                onClick={closeBlogReader}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <article
                key={blog._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Tag className="w-3 h-3 mr-1" />
                      {blog.category}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingBlog(blog);
                      }}
                      className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm(blog._id);
                      }}
                      className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Read More Overlay */}
                  <div 
                    className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center cursor-pointer"
                    onClick={() => handleReadMore(blog)}
                  >
                    <div className="bg-white rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <BookOpen className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(blog.createdAt)}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {blog.views}
                    </div>
                  </div>

                  <h2 
                    className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2 cursor-pointer"
                    onClick={() => handleReadMore(blog)}
                  >
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      {blog.author}
                    </div>
                    <div className="flex items-center text-sm text-green-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readTime}
                    </div>
                  </div>

                  <button
                    onClick={() => handleReadMore(blog)}
                    className="mt-4 text-green-600 font-medium flex items-center group-hover:text-green-700 transition-colors hover:translate-x-1 transform duration-200"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBlog && (
        <EditBlogModal
          blog={editingBlog}
          onSave={handleUpdate}
          onClose={() => setEditingBlog(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteConfirm)}
          onCancel={() => setDeleteConfirm(null)}
        />
      )}
    </div>
  );
};

// Edit Blog Modal Component
const EditBlogModal = ({ blog, onSave, onClose }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    
    await onSave(blog._id, {
      title,
      content,
      image
    });
    
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Edit Blog</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image (optional - leave empty to keep current image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="bg-red-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog</h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete this blog? This action cannot be undone.
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;