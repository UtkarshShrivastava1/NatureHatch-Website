import React from 'react'
import {NavLink} from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-amber-50 border-t border-amber-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Main footer content */}
      <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: About */}
        <div>
          <div className="flex items-center mb-4">
            {/* Logo placeholder - replace with your actual logo */}
            <div className="h-10 w-10 rounded-full bg-amber-400 mr-3 flex items-center justify-center">
              <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5C7.58172 5 4 8.58172 4 13C4 17.4183 7.58172 21 12 21C16.4183 21 20 17.4183 20 13C20 8.58172 16.4183 5 12 5Z" fill="currentColor" />
                <path d="M12 3C6.47715 3 2 7.47715 2 13C2 18.5228 6.47715 23 12 23C17.5228 23 22 18.5228 22 13C22 7.47715 17.5228 3 12 3Z" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">Farm Fresh Eggs</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Bringing the freshest, highest quality eggs directly from our family farm to your table since 1987.
          </p>
          <div className="flex space-x-4">
            {/* Social media icons */}
            {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
              <NavLink key={platform} to="" className="text-amber-700 hover:text-amber-500 transition-colors">
                <span className="sr-only">{platform}</span>
                <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                  {/* Simple placeholder for social icons */}
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <rect x="6" y="6" width="12" height="12" rx="6" />
                  </svg>
                </div>
             </NavLink>
            ))}
          </div>
        </div>

        {/* Column 2: Products */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4">Our Products</h3>
          <ul className="space-y-2">
            {[
              'Free Range Brown Eggs',
              'Organic White Eggs',
              'Duck Eggs',
              'Quail Eggs',
              'Egg Gift Baskets',
              'Monthly Egg Subscription'
            ].map((item) => (
              <li key={item}>
                <NavLink to="" className="text-gray-600 hover:text-amber-600 transition-colors">
                  {item}
               </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Quick Links */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
  {[
    { name: 'About Our Farm', path: '/about' },
    { name: 'Sustainability Practices', path: '/sustainability' },
    { name: 'Egg Nutrition Facts', path: '/nutrition' },
    { name: 'Recipe Collection', path: '/recipes' },
    { name: 'Farm Tours', path: '/tours' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQ', path: '/faq' }
  ].map((item) => (
    <li key={item.name}>
      <NavLink to={item.path} className="text-gray-600 hover:text-amber-600 transition-colors">
        {item.name}
      </NavLink>
    </li>
  ))}
</ul>

        </div>

        {/* Column 4: Newsletter */}
        <div>
          <h3 className="text-gray-900 font-bold mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-4">
            Subscribe to our newsletter for seasonal updates, special offers, and fresh egg recipes.
          </p>
          <form className="space-y-2">
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg border border-amber-200 focus:ring-amber-500 focus:border-amber-500 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-500 text-white px-4 py-2 rounded-r-lg hover:bg-amber-600 transition-colors"
              >
                Join
              </button>
            </div>
            <p className="text-xs text-gray-500">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>

      {/* Certification badges */}
      <div className="py-6 border-t border-amber-100">
        <div className="flex flex-wrap justify-center gap-6">
          {['Certified Organic', 'Humane Raised', 'Non-GMO Project', 'Local Farm Certified'].map((cert) => (
            <div key={cert} className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 mr-2"></div>
              <span className="text-sm text-gray-600">{cert}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="py-4 border-t border-amber-100 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} Farm Fresh Eggs. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <NavLink to="" className="text-sm text-gray-600 hover:text-amber-600">
            Privacy Policy
         </NavLink>
          <NavLink to="" className="text-sm text-gray-600 hover:text-amber-600">
            Terms of Service
         </NavLink>
          <NavLink to="" className="text-sm text-gray-600 hover:text-amber-600">
            Shipping Policy
         </NavLink>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer
