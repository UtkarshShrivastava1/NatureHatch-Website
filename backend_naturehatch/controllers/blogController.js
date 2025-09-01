const Blog = require("../models/BlogModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const addBlog = async (req, res) => {
    try {
       
        const { title, content } = req.body;
     
        const file = req.files.image;
        if (!file) {
            return res.status(400).json({ message: "Image is required" });
        }
        const result = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
       
        });

        if (!title || !content) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const blog = new Blog({
            title,
            content,
            image: result.url,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await blog.save();

        res.status(201).json("Blog added successfully");
        
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json(blog);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


const updateBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const file = req.files.image;
        let imageUrl = null;

        if (file) {
            const result = await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
              
            });
            imageUrl = result.url;
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            {
                title,
                content,
                image: imageUrl,
                updatedAt: new Date(),
            },
            { new: true }
        );

        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(blog);
    } catch (error) {
        // console.log(error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
    addBlog,
    getAllBlogs,
    getBlogById,
    deleteBlog,
    updateBlog
};
