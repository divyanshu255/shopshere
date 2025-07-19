import React, { useState } from 'react'
import {useNavigate} from "react-router-dom" 

const Product = ({product}) => {
  const navigate = useNavigate()
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  const handleClick = () => {
    navigate(`/products/${product.id}`)
    window.scrollTo(0,0)
  }

  // Calculate discount percentage
  const discountPercentage = Math.round(((product.price * 1.2 - product.price) / (product.price * 1.2)) * 100)
  
  // Generate random stock status
  const stockStatus = product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'
  const stockColor = product.stock > 20 ? 'green' : product.stock > 0 ? 'yellow' : 'red'

  return (
    <div className="p-4 lg:w-1/3 md:w-1/2 w-full" onClick={handleClick}>
      <div 
        className="relative h-full flex flex-col items-center cursor-pointer rounded-2xl p-4 bg-white shadow-lg hover:shadow-2xl text-black text-center transition-all duration-500 transform hover:scale-105 hover:-translate-y-3 border border-gray-100 overflow-hidden group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Discount Badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            -{discountPercentage}%
          </div>
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-4 right-4 z-10">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
            stockColor === 'green' ? 'bg-green-100 text-green-800' :
            stockColor === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {stockStatus}
          </div>
        </div>

        {/* Image Container with Overlay */}
        <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 mb-4">
          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-xl"></div>
          )}
          
          <img
            alt={product.title}
            className={`w-full h-full object-contain object-center transition-all duration-700 ${
              isHovered ? 'scale-110 rotate-1' : 'scale-100 rotate-0'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            src={product.thumbnail}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`bg-white/95 backdrop-blur-sm rounded-full p-4 transition-all duration-500 transform ${
                isHovered ? 'scale-100 opacity-100 rotate-0' : 'scale-0 opacity-0 rotate-180'
              }`}>
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Quick View Badge */}
          <div className={`absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold transition-all duration-500 transform ${
            isHovered ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-75'
          }`}>
            Quick View
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full space-y-4">
          {/* Category Badge */}
          <div className="flex justify-center">
            <span className="inline-block bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 text-blue-800 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-200 shadow-sm">
              {product.category.replace('-', ' ')}
            </span>
          </div>
          
          {/* Title */}
          <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300 text-lg leading-tight">
            {product.title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center justify-center space-x-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) 
                      ? 'text-yellow-400 fill-current' 
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium ml-1">
              ({product.rating})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-center space-x-3">
            <span className="text-3xl font-bold text-green-600">
              ${product.price}
            </span>
            <span className="text-lg text-gray-400 line-through">
              ${(product.price * 1.2).toFixed(0)}
            </span>
            <div className={`w-3 h-3 bg-green-500 rounded-full transition-all duration-300 ${
              isHovered ? 'animate-ping' : ''
            }`}></div>
          </div>
          
          {/* Stock Info */}
          <div className="text-sm text-gray-500">
            {product.stock} items available
          </div>
          
          {/* Action Button */}
          <div className={`transition-all duration-500 transform ${
            isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
          }`}>
            <button className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-3 px-6 rounded-full font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden group">
              <span className="relative z-10">View Details</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
          </div>
        </div>
        
        {/* Animated Border */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`} style={{
          background: 'linear-gradient(45deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
          backgroundSize: '400% 400%',
          animation: isHovered ? 'gradientShift 2s ease infinite' : 'none',
          zIndex: -1
        }}>
          <style jsx>{`
            @keyframes gradientShift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </div>
      </div>
    </div>
  )
}

export default Product