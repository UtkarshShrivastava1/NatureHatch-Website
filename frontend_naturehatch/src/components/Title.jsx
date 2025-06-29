import React from 'react';

function Title({ text1, text2, accent = "amber" }) {
  // Define color schemes based on the accent color
  const colorSchemes = {
    amber: {
      primary: 'text-amber-600',
      secondary: 'text-amber-800',
      gradient: 'from-amber-400 to-amber-600',
      decoration: 'bg-amber-400'
    },
    blue: {
      primary: 'text-blue-500',
      secondary: 'text-blue-700',
      gradient: 'from-blue-400 to-blue-600',
      decoration: 'bg-blue-400'
    },
    green: {
      primary: 'text-green-500',
      secondary: 'text-green-700',
      gradient: 'from-green-400 to-green-600',
      decoration: 'bg-green-400'
    },
    purple: {
      primary: 'text-purple-500',
      secondary: 'text-purple-700',
      gradient: 'from-purple-400 to-purple-600',
      decoration: 'bg-purple-400'
    }
  };

  const colors = colorSchemes[accent] || colorSchemes.amber;

  return (
    <div className="relative inline-flex items-center mb-6 group">
      {/* Small decorative dot */}
      <div className={`absolute -left-3 -top-3 w-2 h-2 rounded-full ${colors.decoration} opacity-70`}></div>
      
      {/* Main content container */}
      <div className="flex flex-col items-start">
        {/* First text part with gradient underline effect */}
        <div className="flex items-center">
          <p className="text-gray-600 font-light tracking-wide">
            {text1}{' '}
            <span className={`font-semibold ${colors.primary} relative`}>
              {text2}
              <span className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${colors.gradient} opacity-40 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out`}></span>
            </span>
          </p>
        </div>
        
        {/* Decorative elements row */}
        <div className="flex items-center mt-2">
          {/* Small diamond */}
          <div className={`w-2 h-2 ${colors.decoration} rotate-45 mr-2`}></div>
          
          {/* Animated line */}
          <div className="relative h-px w-16 sm:w-24 bg-gray-200 overflow-hidden">
            <div className={`absolute top-0 left-0 h-full w-full ${colors.decoration} opacity-70 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-in-out`}></div>
          </div>
          
          {/* Dot pattern */}
          <div className="flex ml-2 space-x-1">
            <div className={`w-1 h-1 rounded-full ${colors.decoration} opacity-30`}></div>
            <div className={`w-1 h-1 rounded-full ${colors.decoration} opacity-60`}></div>
            <div className={`w-1 h-1 rounded-full ${colors.decoration} opacity-90`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Title;