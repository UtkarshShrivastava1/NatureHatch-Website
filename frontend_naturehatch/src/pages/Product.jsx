import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import Stars from "../components/Stars"; // Assuming you have a Stars component for displaying ratings

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);

    console.log("Selected Product:", selectedProduct);
    if (selectedProduct) {
      setProductData(selectedProduct);
      setImage(selectedProduct.imageURL);
    }
  }, [productId, products]);

  if (!productData) return <div className="opacity-0"></div>;

  return (
    <div className="border-t-2 pt-10 px-4 sm:px-6 md:px-12 transition-opacity ease-in-out duration-500 opacity-100">
      {/* Product Info Section */}
      <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
        {/* Image */}
        <div className="w-full sm:w-1/2 flex justify-center">
          <img
            src={image}
            alt="Product"
            className="w-full max-w-xs sm:max-w-md md:max-w-lg rounded-lg shadow-lg hover:scale-105 transition-transform duration-200 object-contain"
          />
        </div>

        {/* Info */}
        <div className="w-full sm:w-1/2">
          <h1 className="font-semibold text-2xl sm:text-3xl mt-2 text-gray-800">
            {productData.productname}
          </h1>

          {/* <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) =>
              i < Math.floor(productData.averageRating || 0) ? (
                <img key={i} src={assets.star_icon} className="w-4" />
              ) : (
                <img key={i} src={assets.star_dull_icon} className="w-4" />
              )
            )}
            <p className="pl-2 text-sm">({productData.reviews?.length || 0})</p>
          </div> */}
          <div className="flex  items-center gap-1 mt-2">
             <p className="mt-5 text-2xl sm:text-3xl font-semibold text-gray-800">
            <Stars stars={productData.averageRating} reviews={productData.reviews}/>
          </p>
          </div>

         
          <p className="mt-5 text-2xl sm:text-3xl font-medium text-teal-600">
            {currency} {productData.price}
          </p>

          <p className="mt-5 text-gray-600">{productData.description}</p>

          <button
            onClick={() => addToCart(productData._id, 1)}
            className="mt-6 bg-black text-white px-6 py-3 text-base sm:text-lg rounded-lg hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto"
          >
            ADD TO CART
          </button>

          <hr className="mt-8" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on the product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-16 sm:mt-20">
        <div className="flex flex-col sm:flex-row border-b">
          <b className="border px-4 py-3 text-sm cursor-pointer">Description</b>
          <p className="border px-4 py-3 text-sm cursor-pointer">
            Reviews ({productData.reviews?.length || 0})
          </p>
        </div>
        <div className="flex flex-col gap-4 border px-4 py-6 text-sm text-gray-500">
          <p>{productData.description}</p>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  );
};

export default Product;
