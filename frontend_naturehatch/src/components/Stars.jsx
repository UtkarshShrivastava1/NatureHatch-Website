// import React from 'react'
import { FaStar ,FaStarHalfAlt} from 'react-icons/fa';
import { AiOutlineStar } from "react-icons/ai";
// import styled from 'styled-components';
const Stars = ({stars ,reviews}) => {
  const ratingStar = Array.from({ length: 5 }, (_, index) => {
    let starValue = index + 0.5;
    return(
      <span key={index}  className='text-amber-500'>
        {stars >= starValue ? <FaStar className='icon'/> : stars >= starValue - 0.5 ? <FaStarHalfAlt className='icon'/> : <AiOutlineStar className='icon border-amber-300'/>}
      </span>
    )
  }
  );
  return (
    <div className='stars'>
      <div className='flex items-center gap-1 caret-amber-500'>
        {ratingStar}
      </div>
      <p className='reviews'>({reviews} customer reviews)</p>
    </div>
  )
}


export default Stars
