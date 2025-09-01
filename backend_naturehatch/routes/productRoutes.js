const express = require('express');
const router = express.Router();
const {createProduct,getAllProducts,getProductByCategory,getProductById,addreview, updateProduct,deleteProduct} = require("../controllers/productController");
const adminAuthMiddleware = require('../middlewares/adminAuthMiddleware');
const userAuthMiddleware = require('../middlewares/userAuthMiddleware');

router.post('/create-product'  ,createProduct);
router.get("/get-all-products",getAllProducts);
router.get("/get-products-by-category/:category",getProductByCategory);
router.get("/get-product-by-id/:id",getProductById);
router.post("/:productId/review",addreview);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router;