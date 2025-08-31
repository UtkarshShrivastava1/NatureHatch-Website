const express = require('express');
const router = express.Router();
const addBlog = require('../controllers/blogController');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.post('/add-blog',addBlog);


module.exports = router;