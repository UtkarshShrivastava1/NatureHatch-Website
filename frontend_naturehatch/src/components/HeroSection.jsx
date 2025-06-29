import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-amber-50">
      {/* Background pattern of small egg shapes */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 30 Q 25 20, 30 15 Q 35 20, 35 30 Q 35 40, 30 45 Q 25 40, 25 30 Z' fill='%23F59E0B' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-12 pb-16 md:pt-16 md:pb-20 lg:pt-20 lg:pb-28">
          
          {/* Hero content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left column with text */}
            <div className="text-center lg:text-left">
              <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mb-6">
                Farm Fresh Daily
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                <span className="block">Nature's Perfect</span>
                <span className="block text-amber-500">Protein Package</span>
              </h1>
              
              <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto lg:mx-0">
                Experience the difference with our free-range, organic eggs sourced directly from 
                local farms. Every egg is a promise of freshness, nutrition, and exceptional taste.
              </p>
              
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-6 py-3 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                  Shop Our Eggs
                </button>
                <button className="px-6 py-3 rounded-full bg-white text-amber-600 border border-amber-200 font-medium hover:bg-amber-50 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
                  About Our Farm
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6 text-sm">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">100% Organic</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Free-Range</span>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">Local Delivery</span>
                </div>
              </div>
            </div>
            
            {/* Right column with egg image */}
            <div className="relative">
              <div className="aspect-w-4 aspect-h-3 relative">
                {/* This would be your actual egg image - using placeholder for now */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
                  {/* Replace this div with your actual image */}
                  <img 
                    src="/api/placeholder/600/500" 
                    alt="Assorted farm fresh eggs in a rustic basket" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute -right-4 top-12 bg-white rounded-full shadow-lg px-4 py-2 flex items-center">
                    <span className="text-amber-500 font-bold text-lg mr-2">A+</span>
                    <span className="text-gray-700 text-sm">Quality</span>
                  </div>
                  
                  <div className="absolute -left-4 bottom-12 bg-white rounded-full shadow-lg px-4 py-2 text-sm">
                    <span className="text-gray-700">24hr Fresh Guarantee</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-amber-300 opacity-20"></div>
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-amber-500 opacity-10"></div>
            </div>
          </div>
          
          {/* Featured egg varieties */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Free Range Brown', 'Organic White', 'Duck Eggs', 'Quail Eggs'].map((type, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-100 flex items-center justify-center">
                  <div className="w-8 h-8 bg-amber-200 rounded-full"></div>
                </div>
                <h3 className="font-medium text-gray-800">{type}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default HeroSection;