import React, { useState, useEffect } from "react";
import { useSpring, animated, config } from "react-spring";

export default function HeroSection() {
  // Animation for the main heading
  const headingAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(-40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
    delay: 200,
  });

  // Animation for the tagline
  const taglineAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 50 },
    delay: 600,
  });

  // Animation for the content sections
  const contentAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 280, friction: 60 },
    delay: 800,
  });

  // Animation for the certification logo
  const logoAnimation = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { tension: 200, friction: 20 },
    delay: 1000,
  });

  // Egg counter animation
  const [count, setCount] = useState(0);
  const countAnimation = useSpring({
    number: count,
    from: { number: 0 },
    config: { tension: 280, friction: 120 },
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCount(365);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500 to-green-700 opacity-90"></div>
      
      {/* Animated eggs floating in background */}
      <animated.div 
        style={useSpring({
          from: { transform: "translateY(-100px)" },
          to: { transform: "translateY(600px)" },
          config: { duration: 15000, tension: 120, friction: 14 },
          loop: { reverse: true },
        })}
        className="absolute right-10 top-0 opacity-20">
        <div className="w-20 h-20 rounded-full bg-yellow-100"></div>
      </animated.div>
      
      <animated.div 
        style={useSpring({
          from: { transform: "translateY(100px)" },
          to: { transform: "translateY(-600px)" },
          config: { duration: 25000, tension: 120, friction: 14 },
          loop: { reverse: true },
        })}
        className="absolute left-20 bottom-0 opacity-10">
        <div className="w-32 h-32 rounded-full bg-yellow-50"></div>
      </animated.div>
      
      {/* Content container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center">
        {/* Main heading */}
        <animated.div style={headingAnimation} className="text-center">
          <div className="flex items-center justify-center mb-4">
            <animated.div style={logoAnimation} className="w-16 h-16 mr-4 rounded-full bg-white flex items-center justify-center p-2">
              <svg viewBox="0 0 24 24" className="w-full h-full text-green-600">
                <path fill="currentColor" d="M12,2L4.5,20.29L5.21,21L12,18L18.79,21L19.5,20.29L12,2Z" />
              </svg>
            </animated.div>
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
              Nature Hatch
            </h1>
          </div>
        </animated.div>
        
        {/* Tagline */}
        <animated.div style={taglineAnimation} className="mt-4 text-center">
          <p className="text-xl md:text-2xl text-yellow-100 font-medium">
            Organic Free Range Eggs | Naturally Healthier
          </p>
        </animated.div>
        
        {/* Content area */}
        <animated.div style={contentAnimation} className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {/* Left content */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Free Range Eggs vs Commercial White Eggs</h2>
            <div className="flex space-x-6 mb-6">
              <div className="text-center">
                <animated.span style={countAnimation} className="block text-4xl font-bold text-green-600">
                  {countAnimation.number.to(n => Math.floor(n))}
                </animated.span>
                <span className="text-gray-600">Days Outdoors</span>
              </div>
              <div className="text-center">
                <span className="block text-4xl font-bold text-green-600">12m²</span>
                <span className="text-gray-600">Per Hen</span>
              </div>
            </div>
            <p className="text-gray-700">
              Our hens roam freely on organic pastures, resulting in eggs with superior 
              nutrition, richer flavor, and vibrant orange yolks compared to conventional eggs.
            </p>
          </div>
          
          {/* Right content */}
          <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg flex flex-col">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Nutritional Value</h2>
            <ul className="space-y-2 text-gray-700 mb-4">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>33% Less Cholesterol</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>25% More Vitamin E</span>
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>75% More Beta Carotene</span>
              </li>
            </ul>
            <div className="mt-auto">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105">
                Find Where to Buy
              </button>
            </div>
          </div>
        </animated.div>
        
        {/* Features */}
        <animated.div 
          style={useSpring({
            from: { opacity: 0 },
            to: { opacity: 1 },
            delay: 1400,
          })}
          className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-4 w-full text-center">
          {[
            { icon: "🌱", label: "100% Organic" },
            { icon: "🐓", label: "Free Range" },
            { icon: "🌿", label: "Natural Feed" },
            { icon: "✅", label: "Certified" },
            { icon: "🥚", label: "Farm Fresh" },
          ].map((feature, index) => (
            <animated.div
              key={index}
              style={useSpring({
                from: { opacity: 0, transform: "translateY(20px)" },
                to: { opacity: 1, transform: "translateY(0)" },
                delay: 1400 + (index * 100),
              })}
              className="bg-white bg-opacity-80 p-3 rounded-lg"
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <div className="text-sm font-medium text-green-800">{feature.label}</div>
            </animated.div>
          ))}
        </animated.div>
      </div>
    </div>
  );
}