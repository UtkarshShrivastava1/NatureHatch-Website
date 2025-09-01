import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AddBlog = ({ token }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = "https://naturehatch-website.onrender.com";

    useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleFocus = (inputId) => {
    setFocusedInput(inputId);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        e.target.value = ''; // Reset input
        return;
      }
      
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        e.target.value = ''; // Reset input
        return;
      }

      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.onerror = () => {
        toast.error("Error reading image file");
        setImage(null);
        setImagePreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    // Reset file input
    const fileInput = document.getElementById('blog-image');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('content', content.trim());
      
      if (image) {
        formData.append('image', image);
      }

      const response = await axios.post(
        `${backendUrl}/api/blog/add-blog`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Handle successful response
      if (response.data.success || response.status === 201) {
        toast.success(response.data.message || "Blog post added successfully!");
        
        // Reset form
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
        
        // Reset file input
        const fileInput = document.getElementById('blog-image');
        if (fileInput) {
          fileInput.value = '';
        }
        
        // Navigate to blogs list
        navigate("/blogs");
      }
      
    } catch (error) {
      console.error("Error adding blog:", error);
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized. Please login again.");
        navigate("/login");
      } else if (error.response?.status === 400) {
        toast.error(error.response.data.message || "Validation error. Please check your inputs.");
      } else if (error.response?.status === 413) {
        toast.error("File too large. Please select a smaller image.");
      } else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to add blog post. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Ask for confirmation if user has entered data
    if (title.trim() || content.trim() || image) {
      const confirmLeave = window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.");
      if (confirmLeave) {
        navigate("/blogs");
      }
    } else {
      navigate("/blogs");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl bg-white">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Add New Blog Post
            </h1>
            <p className="text-gray-600 text-sm md:text-base mt-2">
              Share your thoughts and insights with the world
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="space-y-6">
            {/* Title Input */}
            <div>
              <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full transition-transform duration-200 ${
                  focusedInput === "blog-title" ? "scale-102" : "scale-100"
                }`}
              >
                <input
                  type="text"
                  id="blog-title"
                  placeholder="Enter an engaging blog title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  onFocus={() => handleFocus("blog-title")}
                  onBlur={handleBlur}
                  required
                  maxLength={200}
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {title.length}/200 characters
              </p>
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="blog-content" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <div
                className={`w-full transition-transform duration-200 ${
                  focusedInput === "blog-content" ? "scale-102" : "scale-100"
                }`}
              >
                <textarea
                  id="blog-content"
                  placeholder="Write your blog content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 resize-vertical"
                  onFocus={() => handleFocus("blog-content")}
                  onBlur={handleBlur}
                  required
                  disabled={isLoading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {content.length} characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="blog-image" className="block text-sm font-medium text-gray-700 mb-2">
                Blog Image <span className="text-gray-500">(Optional)</span>
              </label>
              
              {!imagePreview ? (
                <div
                  className={`w-full transition-transform duration-200 ${
                    focusedInput === "blog-image" ? "scale-102" : "scale-100"
                  }`}
                >
                  <input
                    type="file"
                    id="blog-image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    onFocus={() => handleFocus("blog-image")}
                    onBlur={handleBlur}
                    disabled={isLoading}
                  />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Blog preview"
                    className="w-full h-64 object-cover rounded-lg border-2 border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition duration-200"
                    disabled={isLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
              
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: JPG, PNG, GIF, WebP. Max size: 5MB
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 py-3 px-6 rounded-lg border-2 border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition duration-300"
                disabled={isLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading || !title.trim() || !content.trim()}
                className={`flex-1 py-3 px-6 rounded-lg font-medium shadow-md transition duration-300 transform ${
                  isLoading || !title.trim() || !content.trim()
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-green-700 text-white hover:shadow-lg hover:-translate-y-1 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Publishing...
                  </div>
                ) : (
                  "Publish Blog Post"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;