const express = require('express');
const router = express.Router();
const {addBlog , getAllBlogs} = require('../controllers/blogController');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.post('/add-blog',addBlog);
router.get("/get-all-blogs",getAllBlogs)


module.exports = router;