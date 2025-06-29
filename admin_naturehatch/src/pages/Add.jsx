import React, { useState } from 'react';
import { Upload, FileImage, DollarSign, ShoppingBag, AlignLeft, Tag, Loader } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ token }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !description || !price || !quantity || !category || !imageFile) {
      setMessage({ type: 'error', text: 'Please fill in all fields and select an image' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('imageURL', imageFile);
    formData.append('productname', productName);
    formData.append('description', description);
    formData.append('price', parseFloat(price));
    formData.append('quantity', parseInt(quantity));
    formData.append('category', category);

    try {
      await axios.post('http://localhost:5000/api/products/create-product', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Product added successfully!');
      setProductName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory('');
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to add product. Please try again.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  const categories = [
    'White Eggs',
    'Brown Eggs',
    'Free Range Eggs',
    'Organic Eggs',
    'Duck Eggs',
    'Quail Eggs',
    'Other'
  ];

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      {message.text && (
        <div className={`mb-4 p-3 rounded-md ${message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {message.text}
        </div>
      )}      
      {/* Header */}
      <div className="border-b-4 border-green-700 pb-4 mb-6">
        <h2 className="text-3xl font-bold text-green-800">ADD NEW PRODUCT</h2>
        <p className="text-green-600">Organic • Farm Fresh • Natural</p>
      </div>
      
      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
            <FileImage className="mr-2" size={20} />
            Product Image
          </h3>
          
          <div className="flex flex-col items-center">
  {imagePreview ? (
    <div className="relative mb-4">
      <img 
        src={imagePreview} 
        alt="Product preview" 
        className="w-56 h-56 object-cover rounded-lg border-2 border-green-500" 
      />
      <button 
        type="button"
        onClick={() => {
          setImageFile(null);
          setImagePreview(null);
        }}
        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  ) : (
    <label className="w-56 h-56 flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-lg cursor-pointer hover:bg-green-50 transition">
      <Upload className="w-10 h-10 text-green-500 mb-2" />
      <span className="text-green-600 font-medium">Upload image</span>
      <span className="text-sm text-green-500">Click to browse</span>
      <input 
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  )}
</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-green-800 font-medium mb-2 flex items-center">
                <ShoppingBag className="mr-2" size={18} />
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter product name"
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>
            
            <div>
              <label className="block text-green-800 font-medium mb-2 flex items-center">
                <Tag className="mr-2" size={18} />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-green-800 font-medium mb-2 flex items-center">
                  <DollarSign className="mr-2" size={18} />
                  Price
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-green-800 font-medium mb-2 flex items-center">
                  <ShoppingBag className="mr-2" size={18} />
                  Quantity
                </label>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Available units"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                />
              </div>
            </div>
          </div>
          
          {/* Right Column - Description */}
          <div>
            <label className=" text-green-800 font-medium mb-2 flex items-center">
              <AlignLeft className="mr-2" size={18} />
              Product Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="8"
              placeholder="Describe your product's features, benefits, and unique selling points..."
              className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
            ></textarea>
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center 
            ${isSubmitting ? 'bg-green-600 cursor-not-allowed' : 'bg-green-700 hover:bg-green-800'} 
            transition-colors duration-200`}
        >
          {isSubmitting ? (
            <>
              <Loader className="animate-spin mr-2" size={20} />
              Processing...
            </>
          ) : (
            <>
              <Upload className="mr-2" size={20} />
              ADD PRODUCT
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Add;