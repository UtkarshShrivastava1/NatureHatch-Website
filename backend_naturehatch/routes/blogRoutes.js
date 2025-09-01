const express = require('express');
const router = express.Router();
const {addBlog , getAllBlogs} = require('../controllers/blogController');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.post('/add-blog',addBlog);
router.get('/getblogs',getAllBlogs);
router.put('/updateblog/:id', updateBlog);
router.delete('/deleteblog/:id', deleteBlog);


module.exports = router;