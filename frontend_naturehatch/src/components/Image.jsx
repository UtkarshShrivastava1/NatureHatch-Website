// Image.jsx
import React from 'react';

const Image = ({
  src,
  alt,
  width,
  height,
  className = '',
  rounded = false,
  objectFit = 'cover',
  lazy = true,
  onClick,
}) => {
  const roundedClass = rounded === true 
    ? 'rounded-full' 
    : rounded === false 
      ? '' 
      : `rounded-${rounded}`;
  
  const objectFitClass = `object-${objectFit}`;
  
  return (
    <img
      src={src || 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Fried_Egg_2.jpg/1200px-Fried_Egg_2.jpg'}
      alt={alt || 'Image'}
      width={width}
      height={height}
      loading={lazy ? 'lazy' : 'eager'}
      onClick={onClick}
      className={`${roundedClass} ${objectFitClass} ${className}`}
    />
  );
};

export default Image;