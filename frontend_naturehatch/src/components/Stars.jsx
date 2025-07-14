import { FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { AiOutlineStar } from 'react-icons/ai';

const Stars = ({ stars = 0, reviews = [] }) => {
  // Create an array of 5 stars based on the average rating
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    const starValue = index + 1;
    const isFullStar = stars >= starValue;
    const isHalfStar = stars >= starValue - 0.5 && stars < starValue;

    return (
      <span key={index} className="text-amber-500">
        {isFullStar ? (
          <FaStar className="icon" />
        ) : isHalfStar ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return (
    <div className="stars">
      <div className="flex items-center gap-1 caret-amber-500">{ratingStar}</div>
      <p className="reviews text-gray-600 text-sm">
        ({reviews.length} customer review{reviews.length !== 1 ? 's' : ''})
      </p>
    </div>
  );
};

export default Stars;
