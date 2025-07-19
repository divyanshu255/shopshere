import React from 'react'
import img from "/cart2.png"
import { Link } from 'react-router-dom'
const Hero = () => {
    return (
        <section className="pt-32 pb-16">
            <div className="container mx-auto flex px-6 py-16 md:flex-row flex-col-reverse items-center">
                <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left md:mb-0 items-center text-center">
                    <h1 className="sm:text-5xl text-4xl mb-6 font-bold text-gray-800 dark:text-white">
                        Welcome to ShopSphere
                    </h1>
                    <p className="mb-10 leading-relaxed text-lg text-gray-600 dark:text-gray-300 max-w-lg">
                        Your all-in-one destination for stylish fashion, innovative tech, and everyday essentials—carefully curated for modern living.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            className="inline-flex items-center justify-center text-white bg-gradient-to-r from-purple-600 to-pink-600 border-0 py-3 px-8 focus:outline-none hover:from-purple-700 hover:to-pink-700 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" 
                            to={"/cart"}
                        >
                            🛒 Cart
                        </Link>
                        <Link 
                            className="inline-flex items-center justify-center text-white bg-gradient-to-r from-blue-600 to-cyan-600 border-0 py-3 px-8 focus:outline-none hover:from-blue-700 hover:to-cyan-700 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl" 
                            to={"/products"}
                        >
                            🛍️ Products
                        </Link>
                    </div>
                </div>
                <div className="lg:max-w-lg lg:w-full md:w-1/2 w-full" id='hero-img'>
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-3xl blur-3xl"></div>
                        <img
                            className="relative z-10 w-full h-auto object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
                            alt="ShopSphere Shopping"
                            src={img}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero