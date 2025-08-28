import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Check, Sun, Egg, Coffee, Clock, Award, MapPin, Phone, Mail } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-green-600 text-white">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-green-700 transform -skew-x-12 origin-top-right"></div>
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-3xl">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              NATURE HATCH
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-2xl md:text-3xl font-light mb-6"
            >
              ORGANIC FREE RANGE
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-lg md:text-xl mb-8 max-w-2xl"
            >
              We believe that happy hens produce the most nutritious eggs. Our commitment to organic farming and free-range practices ensures that every egg is as nature intended.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="inline-flex items-center bg-white text-green-700 px-6 py-3 rounded-full font-medium shadow-lg hover:bg-green-50 transition-colors cursor-pointer"
            >
              <Egg className="w-5 h-5 mr-2" />
              Get the Best Quality Nutritious Eggs
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Our Story */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl font-bold text-green-800">Our Story</h2>
            <p className="text-lg text-gray-700">
              Nature Hatch started in 2010 with a simple mission: to provide the healthiest, most delicious eggs while respecting nature and caring for our hens. We began with just 50 hens on a small plot of land, guided by our passion for sustainable farming.
            </p>
            <p className="text-lg text-gray-700">
              Today, we've grown to become a trusted name in organic egg production, but our core values remain unchanged. Every step of our process - from the organic feed we use to the spacious pastures our hens enjoy - is designed to produce eggs just as nature intended.
            </p>
            <div className="pt-4">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Certified Organic</h3>
                  <p className="text-gray-600">Fully certified organic production</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Sun className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-green-800">Truly Free Range</h3>
                  <p className="text-gray-600">Hens roam freely on open pastures</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-xl"
          >
            <img 
              src="/farm-image.jpg" 
              alt="Nature Hatch Farm" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Nutritional Value */}
      <div className="bg-green-600 text-white py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">NUTRITIONAL VALUE</h2>
            <p className="max-w-2xl mx-auto text-lg">
              Our free range eggs are packed with important nutrients that contribute to a healthy diet and overall wellbeing.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="bg-white rounded-lg p-6 text-green-800 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Coffee className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold ml-4">Protein Power</h3>
              </div>
              <p>
                Each egg contains 6g of high-quality protein with all 9 essential amino acids to support muscle growth and repair.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Protein: 6g per egg</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Calcium: 50mg</span>
                </li>
                <li className="flex items-center">
                  <Check className="w-5 h-5 text-green-500 mr-2" />
                  <span>Vitamin A: 6% (U)</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="bg-white rounded-lg p-6 text-green-800 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Egg className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold ml-4">Flavor and Color</h3>
              </div>
              <p>
                Our eggs have rich, golden yolks and superior flavor due to the natural diet of our hens who forage for plants and insects in addition to organic feed.
              </p>
              <div className="mt-4 bg-amber-50 p-3 rounded-lg">
                <p className="text-amber-800 font-medium">
                  "The vibrant orange yolks are a testament to the nutritional value and farm-fresh quality of Nature Hatch eggs."
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="bg-white rounded-lg p-6 text-green-800 shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold ml-4">Unbeatable Freshness</h3>
              </div>
              <p>
                Our eggs go from farm to store within days, ensuring maximum freshness and nutritional benefits are preserved.
              </p>
              <div className="mt-6 border-t border-green-100 pt-4">
                <div className="flex justify-between text-sm">
                  <span>Collected</span>
                  <span>Washed</span>
                  <span>To Store</span>
                  <span>To You</span>
                </div>
                <div className="w-full bg-green-100 h-2 rounded-full mt-2 relative">
                  <div className="absolute left-0 -top-1 w-2 h-4 bg-green-500 rounded"></div>
                  <div className="absolute left-1/3 -top-1 w-2 h-4 bg-green-500 rounded"></div>
                  <div className="absolute left-2/3 -top-1 w-2 h-4 bg-green-500 rounded"></div>
                  <div className="absolute right-0 -top-1 w-2 h-4 bg-green-500 rounded"></div>
                </div>
                <p className="text-center mt-4 text-sm text-green-700">
                  <strong>7 days or less</strong> from our farm to your table
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* 5 Reasons To Feel Good */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">5 REASONS TO FEEL GOOD ABOUT FARM FRESH EGGS</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            When you choose Nature Hatch eggs, you're making a decision that benefits your health, our hens, and the environment.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-5 gap-6">
          {[
            {
              icon: <Sun className="w-12 h-12 text-green-600" />,
              title: "The Power to Choose",
              desc: "Select eggs from hens raised with care and respect"
            },
            {
              icon: <Egg className="w-12 h-12 text-green-600" />,
              title: "Flavor and Color",
              desc: "Rich, golden yolks with superior taste"
            },
            {
              icon: <Clock className="w-12 h-12 text-green-600" />,
              title: "Unbeatable Freshness",
              desc: "From our farm to your table in days"
            },
            {
              icon: <Award className="w-12 h-12 text-green-600" />,
              title: "Local Support",
              desc: "Supporting sustainable local farming"
            },
            {
              icon: <Leaf className="w-12 h-12 text-green-600" />,
              title: "Nutritional Benefits",
              desc: "Higher in omega-3s and essential nutrients"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="font-bold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Farm Information */}
      <div className="bg-green-50 py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-green-800 mb-6">VISIT OUR FARM</h2>
              <p className="text-gray-700 mb-6">
                We believe in transparency. That's why we invite visitors to tour our farm and see firsthand how we care for our hens and produce our organic eggs.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-800">Farm Location</h3>
                    <p className="text-gray-600">Nature Hatch, Topoor, Balaji Banga Bista, Inter, Comcast, Vilage Selvira, Sonti, Rijul, Natopoor Manjavamputhi</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-800">Contact</h3>
                    <p className="text-gray-600">+91/9865/25816, +91/8867/474/741, +91/93931/35738</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-green-600 mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium text-green-800">Email</h3>
                    <p className="text-gray-600">info@naturehatch.com</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-green-600 text-white px-6 py-3 rounded-full font-medium hover:bg-green-700 transition-colors"
              >
                Schedule a Farm Tour
              </motion.button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold text-green-800 mb-6">OUR COMMITMENT</h2>
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-4">SELENIUM</h3>
                <p className="text-gray-700">
                  Selenium is a powerful antioxidant that helps protect cells from oxidative damage. Our hens' natural diet contributes to higher selenium levels in their eggs, supporting your immune system and thyroid function.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-green-800 mb-4">FREE RANGE EGGS VS COMMERCIAL WHITE EGGS</h3>
                <div className="relative overflow-hidden">
                  <div className="flex">
                    <div className="w-1/2 pr-2">
                      <img 
                        src="/free-range-egg.jpg" 
                        alt="Free Range Egg" 
                        className="rounded-lg mb-2"
                      />
                      <h4 className="font-medium text-green-700 mb-1">Nature Hatch Free Range</h4>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-1" />
                          <span>Rich in omega-3 fatty acids</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-1" />
                          <span>Higher vitamin D & E</span>
                        </li>
                        <li className="flex items-center">
                          <Check className="w-4 h-4 text-green-500 mr-1" />
                          <span>Vibrant golden yolks</span>
                        </li>
                      </ul>
                    </div>
                    <div className="w-1/2 pl-2">
                      <img 
                        src="/commercial-egg.jpg" 
                        alt="Commercial White Egg" 
                        className="rounded-lg mb-2"
                      />
                      <h4 className="font-medium text-gray-700 mb-1">Commercial White Eggs</h4>
                      <ul className="text-sm text-gray-500 space-y-1">
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-1">❌</span>
                          <span>Lower nutrient density</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-1">❌</span>
                          <span>Pale yolks</span>
                        </li>
                        <li className="flex items-center">
                          <span className="w-4 h-4 mr-1">❌</span>
                          <span>Less flavor</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Certification */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="bg-green-700 text-white p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-2xl font-bold mb-4">CERTIFIED ORGANIC</h2>
                <p className="mb-6">
                  Our commitment to quality and ethical farming practices is backed by rigorous certification standards.
                </p>
                <div className="flex items-center justify-center mt-8">
                  <div className="bg-white rounded-full p-4">
                    <img 
                      src="/nature-certified-logo.png" 
                      alt="Nature Certified Logo" 
                      className="w-24 h-24"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="col-span-2 p-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold text-green-800 mb-4">OUR CERTIFICATION GUARANTEES:</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">100% Organic Feed</h4>
                        <p className="text-gray-600 text-sm">Our hens are fed with certified organic grains and plants.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">No Antibiotics</h4>
                        <p className="text-gray-600 text-sm">Our hens are raised without the use of antibiotics.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-start mb-4">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Truly Free Range</h4>
                        <p className="text-gray-600 text-sm">Our hens have access to pasture to roam and forage naturally.</p>
                      </div>
                    </div>
                    <div className="flex items-start mb-4">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">Sustainable Practices</h4>
                        <p className="text-gray-600 text-sm">Our farming methods protect the environment and conserve resources.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="mt-6 text-gray-700">
                  Nature Hatch eggs exceed industry standards. We believe in transparency and invite customers to visit our farm to see our practices firsthand. Our certification is regularly renewed through rigorous inspections to ensure we maintain the highest standards.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Call to Action */}
      <div className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold mb-6">Experience The Difference</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              "Just don't eat any Egg. Get the Best Quality Nutritious Eggs."
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-800 px-8 py-3 rounded-full font-medium hover:bg-green-100 transition-colors"
            >
              Find Where to Buy
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;