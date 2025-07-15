const Product = require("../models/productModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const createProduct = async (req,res)=>{
    try {
       
        const file = req.files.imageURL;
     
        const result = await cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
          
        })
    const { 
        productname,
        description,
        price,
        quantity,
        category,
        // imageURL:result.url,
     } = req.body;
   

    const errors = [];

    if (!productname) errors.push("Product name is required");
    if (!description) errors.push("Description is required");
    if (!price) errors.push("Price is required");
    if (!quantity) errors.push("Quantity is required");
    if (!category) errors.push("Category is required");
    
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const product = new Product({
      productname,
      description,
      price,
      quantity,
      category,
      imageURL: result.url,
      // createdAt: new Date(),
      // updatedAt: new Date(),
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getProductByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// const updateProduct = async (req, res) => {
//   try {
//     const { productname, description, price, quantity, category } = req.body;
//     const file = req.files.imageURL;
//     const result = await cloudinary.uploader.upload(
//       file.tempFilePath,
//       (err, result) => {
//         // console.log(result.url);
//       }
//     );
//     const product = await Product.findByIdAndUpdate(
//       req.params.id,
//       {
//         productname,
//         description,
//         price,
//         quantity,
//         category,
//         imageURL: result.url,
//       },
//       { new: true }
//     );
//     if (!product) {
//       return res.status(404).json({ msg: "Product not found" });
//     }
//     res.status(200).json(product);
//   } catch (error) {
//     console.log(error.message);
//     res.status(500).json({ msg: "Server Error" });
//   }
// };



const updateProduct = async (req, res) => {
    try {
      const { productname, description, price, quantity, category } = req.body;
  
      // Validate required fields
      if (
        !productname?.trim() ||
        !description?.trim() ||
        isNaN(price) ||
        isNaN(quantity) ||
        !category?.trim()
      ) {
        return res.status(400).json({ msg: "All fields are required and must be valid." });
      }
  
      // Initialize fields to update
      const updatedFields = {
        productname,
        description,
        price,
        quantity,
        category,
        updatedAt: new Date()
      };
  
      // Handle optional image upload
      if (req.files && req.files.imageURL) {
        const file = req.files.imageURL;
        const result = await cloudinary.uploader.upload(file.tempFilePath);
        updatedFields.imageURL = result.url;
      }
  
      const product = await Product.findByIdAndUpdate(req.params.id, updatedFields, {
        new: true,
        runValidators: true,
      });
  
      if (!product) {
        return res.status(404).json({ msg: "Product not found" });
      }
  
      res.status(200).json(product);
    } catch (error) {
      // console.log(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  };

  

const addreview = async (req, res) => {
  try {
    // const {productId} = req.params;
    const { user, rating, comment } = req.body;

    if (!user || !rating || !comment) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    product.reviews.push({ user, rating, comment });

    // product.averageRating = (product.averageRating + rating) / product.reviews.length;

    const totalRating = product.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    product.averageRating = totalRating / product.reviews.length;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductByCategory,
  getProductById,
  deleteProduct,
  updateProduct,
  addreview,
};
