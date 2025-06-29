import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import { Star } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.imageURL); // Set single image directly
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in-out duration-500 opacity-100">
      {/* Product Info Section */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Image */}
        <div className="flex-1 flex justify-center">
          <img
            src={image}
            alt="Product"
            className="w-full sm:w-3/4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h1 className="font-semibold text-3xl mt-2 text-gray-800">
            {productData.productname}
          </h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(productData.averageRating || 0) ? (
                <img key={i} src={assets.star_icon} className="w-4" />
              ) : (
                <img key={i} src={assets.star_dull_icon} className="w-4" />
              )
            )}
            <p className="pl-2 text-sm">({productData.reviews?.length || 0})</p>
          </div>
          <p className="mt-5 text-3xl font-medium text-teal-600">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-600 md:w-4/5">{productData.description}</p>

          <button
            onClick={() => addToCart(productData._id, 1)}
            className="mt-6 bg-black text-white px-8 py-3 text-lg rounded-lg hover:bg-gray-800 transition-colors duration-300"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on the product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-20">
        <div className="flex border-b">
          <b className="border px-5 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-5 py-3 text-sm cursor-pointer">
            Reviews ({productData.reviews?.length || 0})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProduct category={productData.category} />
    </div>
  );
};

export default Product;
