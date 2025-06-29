import React from 'react';

export default function NatureHatchHero() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full min-h-screen bg-white px-4 md:px-8 lg:px-16">
      {/* Left Content */}
      <div className="w-full md:w-1/2 pt-16 md:pt-0 md:pr-8 lg:pr-16 parat-regular">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
          </div>
          <h2 className="ml-3 text-xl font-bold text-green-700 prata-regular">NATURE HATCH</h2>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-gray-800 prata-regular">
          Just don't eat any Egg.<br />
          Get the <span className="text-green-600">Best Quality</span> Nutritious Eggs.
        </h1>
        
        <p className="text-gray-600 mb-8 ">
          Our organic free-range eggs come from hens raised in humane conditions with access to outdoor pastures, fresh air, and natural diets. We're committed to sustainable farming practices that are better for the animals, better for the environment, and better for you.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button className="px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Shop Now
          </button>
          <button className="px-6 py-3 border-2 border-green-600 text-green-600 font-medium rounded-lg hover:bg-green-50 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
            Learn More
          </button>
        </div>
        
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">100%</span>
            <span className="text-sm text-gray-600 prata-regular">Organic</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">Free</span>
            <span className="text-sm text-gray-600 prata-regular">Range</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-green-600">A+</span>
            <span className="text-sm text-gray-600 prata-regular">Quality</span>
          </div>
        </div>
      </div>
      
      {/* Right Content - Logo with CSS animation */}
      <div className="w-full md:w-1/2 flex items-center justify-center py-16 md:py-0">
        <div className="w-64 h-64 md:w-80 md:h-80 logo-spin">
          {/* Nature Hatch Logo from the brochure */}
          <div className="relative w-full h-full">
            {/* Circular logo with chicken silhouette */}
            <div className="w-full h-full rounded-full border-8 border-green-600 flex items-center justify-center bg-white shadow-lg">
              <div className="absolute">
                <svg className="w-40 h-40 md:w-48 md:h-48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Simplified chicken logo based on the brochure */}
                  <path d="M65,30 C60,25 50,20 40,25 C30,30 25,40 30,50 C35,60 45,65 55,60 C65,55 70,40 65,30 Z" fill="#4CAF50"/>
                  <path d="M42,42 C45,45 50,45 53,42 C56,39 56,34 53,31 C50,28 45,28 42,31 C39,34 39,39 42,42 Z" fill="white"/>
                  <path d="M35,55 L25,70 M38,58 L30,75 M60,55 L70,70" stroke="#4CAF50" strokeWidth="2"/>
                  <path d="M48,50 L48,60 C48,63 55,63 55,60 L55,50" stroke="#4CAF50" strokeWidth="2"/>
                </svg>
              </div>
              <div className="absolute top-0 left-0 right-0 pt-4 text-center">
                <span className="font-bold text-green-600 text-lg">NATURE HATCH</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 pb-4 text-center">
                <span className="font-bold text-green-600 text-lg">ORGANIC EGGS</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CSS for the animation - can be moved to a separate CSS file */}
        <style jsx>{`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          .logo-spin {
            animation: spin 20s linear infinite;
          }
        `}</style>
      </div>
    </div>
  );
}