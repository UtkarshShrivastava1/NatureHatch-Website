// import React from 'react'

// const WhyChooseUs = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default WhyChooseUs
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const WhyChooseUs = () => {
  // Animation controls
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Animation effect when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Main container variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  // Item variants for staggered animations
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  // Card hover animation
  const cardHover = {
    scale: 1.03,
    boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3 }
  };

  // Features data
  const features = [
    {
      id: 1,
      title: "Free Range Eggs vs Commercial White Eggs",
      description: "Our hens roam freely on lush pastures, resulting in eggs with richer yolks and superior taste. Unlike factory farms, we prioritize animal welfare and natural living conditions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v6.037c0 1.052-.855 1.907-1.907 1.907H11.93c-1.053 0-1.907-.855-1.907-1.907v-6.037c0-.596-.232-1.169-.659-1.591L3.932 6.409a2.25 2.25 0 0 1-.659-1.591V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Nutritional Benefits",
      description: "Our eggs are packed with more omega-3 fatty acids, vitamin E, and essential nutrients. Free-range eggs contain less cholesterol and more vitamin A than conventional eggs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Sustainable Farming Practices",
      description: "We implement regenerative agriculture methods that improve soil health and biodiversity. Our farm operates on renewable energy and uses water conservation techniques.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      ),
    },
    {
      id: 4,
      title: "Locally Supported",
      description: "By choosing our eggs, you support local farmers and reduce food miles. We contribute to the community by providing jobs and educational farm visits.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
    },
    {
      id: 5,
      title: "Transparent Production",
      description: "We invite customers to visit our farm and see our processes firsthand. Our packaging clearly states all relevant information about our farming methods and egg freshness.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Chef at Local Bistro",
      content: "The quality difference in these eggs is incredible. My custards and sauces have never tasted better. The rich, orange yolks make all the difference.",
    },
    {
      id: 2,
      name: "Michael Peterson",
      role: "Health Coach",
      content: "I recommend these eggs to all my clients. The nutritional profile is significantly better than store-bought eggs, and you can taste the difference.",
    },
    {
      id: 3,
      name: "Emma Roberts",
      role: "Local Mom",
      content: "Knowing where our food comes from is important to me. My kids love visiting the farm, and I feel good about supporting ethical practices.",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-green-50 min-h-screen">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden bg-green-600 text-white"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            className="w-full h-full bg-[url('/api/placeholder/1200/600')] bg-cover bg-center opacity-20"
          />
        </div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 max-w-3xl">Why Choose Nature Hatch Free Range Eggs?</h1>
            <p className="text-xl max-w-2xl mb-8">Discover the difference that comes from ethical farming, sustainable practices, and a commitment to quality that you can taste in every bite.</p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-green-600 px-8 py-3 rounded-full font-medium shadow-lg"
            >
              Visit Our Farm
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Features Section */}
      <motion.div 
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="container mx-auto px-4 py-16"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">The Nature Hatch Difference</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">We're not just another egg farm. Here's why our customers choose us over conventional egg producers.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              whileHover={cardHover}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="p-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Statistics Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="bg-green-50 py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-green-600 mb-2"
              >
                10+
              </motion.div>
              <p className="text-gray-600">Years of Experience</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-green-600 mb-2"
              >
                5000+
              </motion.div>
              <p className="text-gray-600">Happy Hens</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-green-600 mb-2"
              >
                200+
              </motion.div>
              <p className="text-gray-600">Local Retailers</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                viewport={{ once: true }}
                className="text-4xl font-bold text-green-600 mb-2"
              >
                98%
              </motion.div>
              <p className="text-gray-600">Customer Satisfaction</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quality Comparison Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="md:flex">
            <div className="md:w-1/2 bg-green-700 text-white p-8 md:p-12">
              <h3 className="text-2xl font-bold mb-4">Our Free Range Eggs</h3>
              <ul className="space-y-3">
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Rich, orange yolks
                </motion.li>
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Higher omega-3 content
                </motion.li>
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  More vitamin A, E, and D
                </motion.li>
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Lower cholesterol
                </motion.li>
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Better taste and flavor
                </motion.li>
                <motion.li 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                  </svg>
                  Ethically produced
                </motion.li>
              </ul>
            </div>
            
            <div className="md:w-1/2 bg-gray-100 p-8 md:p-12">
              <h3 className="text-2xl font-bold text-gray-700 mb-4">Conventional Eggs</h3>
              <ul className="space-y-3 text-gray-600">
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Pale yellow yolks
                </motion.li>
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Lower omega-3 content
                </motion.li>
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Fewer nutrients
                </motion.li>
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Higher cholesterol
                </motion.li>
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Bland taste
                </motion.li>
                <motion.li 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-center"
                >
                  <svg className="w-5 h-5 mr-2 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                  Factory farmed
                </motion.li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Testimonials Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-green-50 py-16"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">What Our Customers Say</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 py-16"
      >
        <div className="bg-green-700 rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex items-center">
            <div className="md:w-1/2 p-8 md:p-12">
              <motion.div
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-3xl font-bold text-white mb-4">Ready to Taste the Difference?</h3>
                <p className="text-white/90 mb-6">Join thousands of satisfied customers who have made the switch to Nature Hatch free range eggs. Your taste buds and your body will thank you.</p>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-700 px-8 py-3 rounded-full font-medium shadow-lg"
                >
                  Find a Store Near You
                </motion.button>
              </motion.div>
            </div>
            
            <div className="md:w-1/2 bg-green-600 p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-6 shadow-inner"
              >
                <h4 className="text-xl font-semibold text-green-700 mb-4">Subscribe to Our Newsletter</h4>
                <p className="text-gray-600 mb-4">Get updates on our farm events, seasonal specials, and exclusive recipes using our eggs.</p>
                
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-green-600 text-white px-6 py-2 rounded-md font-medium"
                  >
                    Subscribe
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Find answers to the most common questions about our free range eggs and farming practices.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">What makes your eggs "free range"?</h3>
              <p className="text-gray-600">Our hens have continuous access to outdoor areas with natural vegetation. They're free to roam, forage, dust bathe, and express their natural behaviors. They're not confined to cages or cramped indoor spaces like conventional farming operations.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Are your eggs more expensive than regular eggs?</h3>
              <p className="text-gray-600">Yes, our eggs generally cost more than conventional eggs because of our ethical farming practices, higher costs for quality feed, larger space requirements per hen, and labor-intensive care. However, the superior taste, nutritional benefits, and ethical production make them well worth the slight premium.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md mb-4 overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Where can I buy your eggs?</h3>
              <p className="text-gray-600">Our eggs are available at select grocery stores, farmers markets, and specialty food shops throughout the region. You can also visit our farm store or use our website's store locator to find the nearest retailer carrying Nature Hatch eggs.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I visit your farm?</h3>
              <p className="text-gray-600">Absolutely! We offer scheduled farm tours where you can see our operations, meet our hens, and learn about our sustainable farming practices. Check our website for upcoming tour dates or contact us to arrange a private visit.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      {/* <footer className="bg-green-800 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-4">Nature Hatch Farm</h4>
              <p className="text-green-100 mb-4">Providing quality free range eggs since 2013.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white hover:text-green-200">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-green-200">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Visit Us</h4>
              <address className="text-green-100 not-italic">
                123 Farm Road<br />
                Greenville, CA 95000<br />
                United States
              </address>
              <p className="text-green-100 mt-2">(555) 123-4567</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <ul className="text-green-100">
                <li className="mb-1">Monday - Friday: 8am - 5pm</li>
                <li className="mb-1">Saturday: 9am - 4pm</li>
                <li>Sunday: 10am - 2pm</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Links</h4>
              <ul className="text-green-100">
                <li className="mb-2"><a href="#" className="hover:text-white">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Products</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Recipes</a></li>
                <li className="mb-2"><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Farm Tours</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 pt-6">
            <p className="text-center text-green-200 text-sm">© {new Date().getFullYear()} Nature Hatch Farm. All rights reserved.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default WhyChooseUs;