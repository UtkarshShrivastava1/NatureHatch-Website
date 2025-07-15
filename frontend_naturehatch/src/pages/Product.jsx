import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
import Stars from "../components/Stars";
import { MessageCircle } from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);

  // Inside Product component JSX
  const [activeTab, setActiveTab] = useState("description");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");

  useEffect(() => {
    const selectedProduct = products.find((item) => item._id === productId);
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
        <div className="w-full sm:w-1/2 flex justify-center items-center p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 shadow-inner backdrop-blur-md">
          <div className="relative w-full max-w-xs sm:max-w-md md:max-w-lg aspect-[4/5] overflow-hidden rounded-2xl border border-white/20 shadow-xl transition-transform duration-300 hover:scale-105">
            <img
              src={image}
              alt={productData.productname}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
        </div>

        {/* Info */}
        <div className="w-full sm:w-1/2">
          <h1 className="font-semibold text-2xl sm:text-3xl mt-2 text-gray-800">
            {productData.productname}
          </h1>

          <div className="flex items-center gap-1 mt-2">
            <Stars
              stars={productData.averageRating}
              reviews={productData.reviews}
            />
          </div>

          <p className="mt-5 text-2xl sm:text-3xl font-medium text-teal-600">
            {currency} {productData.price}
          </p>

          {/* Description & Review Tabs Section */}
          <div className="mt-16 sm:mt-20">
            <div className="flex border-b mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-3 text-sm sm:text-base font-semibold border-b-2 transition-colors duration-300 ${
                  activeTab === "description"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-teal-600"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-3 text-sm sm:text-base font-semibold border-b-2 flex items-center gap-1 transition-colors duration-300 ${
                  activeTab === "reviews"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-teal-600"
                }`}
              >
                <MessageCircle className="w-4 h-4" />
                Reviews ({productData.reviews?.length || 0})
              </button>
            </div>

            {/* Description Tab */}
            {activeTab === "description" && (
              <div className="px-2 sm:px-4 py-4 text-gray-600 leading-relaxed text-sm sm:text-base bg-white/40 rounded-xl shadow-sm">
                {productData.description}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && productData.reviews.length > 0 && (
              <div className="relative">
                <div className="space-y-4 max-h-[400px] overflow-hidden transition-all duration-300 ease-in-out">
                  {(showAllReviews
                    ? productData.reviews
                    : productData.reviews.slice(0, 2)
                  ).map((review) => (
                    <div
                      key={review._id}
                      className="p-4 bg-white/30 border rounded-xl shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-semibold text-gray-800">
                          {review.user}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Stars stars={review.rating} />
                      <p className="text-gray-700 mt-2">{review.comment}</p>
                    </div>
                  ))}
                </div>
                {productData.reviews.length > 2 && (
                  <div className="mt-4 text-right">
                    <button
                      onClick={() => setShowAllReviews(!showAllReviews)}
                      className="text-sm text-teal-600 hover:underline transition-colors duration-200"
                    >
                      {showAllReviews ? "Show Less" : "Read All Reviews →"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "reviews" && productData.reviews.length === 0 && (
              <p className="text-gray-500 text-sm">
                No reviews yet for this product.
              </p>
            )}
          </div>

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

      {productData.reviews.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">
            Customer Reviews:
          </h3>
          <div className="mt-4 space-y-4">
            {productData.reviews.map((review) => (
              <div
                key={review._id}
                className="p-4 border rounded-md bg-white/30"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-black">{review.user}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center mb-2">
                  <Stars stars={review.rating} />{" "}
                  {/* if Stars can render individual rating */}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      <div className="mt-12">
        <RelatedProduct category={productData.category} />
      </div>
    </div>
  );
};

export default Product;
