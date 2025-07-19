import React, { useEffect, useState } from 'react';
import Product from '../components/Product';
import Loader from '../components/Loader';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const categories = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories"
  ];

  const priceRanges = [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "Over $500", min: 500, max: Infinity }
  ];

  // Generate dummy products to fill all categories and price ranges
  const generateDummyProducts = (originalProducts) => {
    const dummyProducts = [];
    const existingImages = originalProducts.map(p => p.thumbnail);
    
    // Enhanced product names for each category with more variety
    const categoryNames = {
      "beauty": [
        "Glamour Lipstick Pro", "Radiance Foundation Plus", "Sparkle Eyeshadow Palette", 
        "Silk Mascara Volume", "Glow Highlighter Gold", "Matte Lipstick Collection",
        "Liquid Eyeliner Precision", "Blush Powder Natural", "Concealer Stick Perfect"
      ],
      "fragrances": [
        "Ocean Breeze Fresh", "Mystic Rose Elegance", "Woodland Musk Deep", 
        "Citrus Fresh Morning", "Vanilla Dreams Sweet", "Lavender Fields Calm",
        "Sandalwood Mystic", "Jasmine Garden Pure", "Amber Night Sensual"
      ],
      "furniture": [
        "Modern Sofa Comfort", "Elegant Chair Classic", "Stylish Table Dining", 
        "Comfort Bed Queen", "Designer Cabinet Storage", "Leather Armchair Premium",
        "Glass Coffee Table", "Wooden Bookshelf", "Metal Bed Frame"
      ],
      "groceries": [
        "Organic Fruits Basket", "Fresh Vegetables Pack", "Premium Coffee Beans", 
        "Artisan Bread Sourdough", "Natural Honey Pure", "Extra Virgin Olive Oil",
        "Organic Quinoa Grain", "Fresh Milk Dairy", "Free Range Eggs"
      ],
      "home-decoration": [
        "Wall Art Abstract", "Vase Collection Ceramic", "Candle Set Aromatherapy", 
        "Mirror Frame Vintage", "Plant Pot Hanging", "Throw Pillow Decorative",
        "Table Lamp Modern", "Rug Persian Style", "Curtain Sheer Elegant"
      ],
      "kitchen-accessories": [
        "Chef Knife Professional", "Mixing Bowl Stainless", "Cutting Board Bamboo", 
        "Measuring Cup Set", "Spatula Set Silicone", "Blender High Speed",
        "Food Processor Multi", "Coffee Maker Drip", "Toaster 4-Slice"
      ],
      "laptops": [
        "Gaming Laptop RTX", "Business Pro Ultra", "Student Edition Budget", 
        "Creative Suite Pro", "Ultra Portable Light", "MacBook Air M2",
        "Dell XPS Premium", "HP Pavilion Gaming", "Lenovo ThinkPad Business"
      ],
      "mens-shirts": [
        "Classic Polo Cotton", "Formal Shirt Oxford", "Casual Tee Graphic", 
        "Designer Blouse Silk", "Sport Jersey Team", "Dress Shirt White",
        "Polo Ralph Lauren", "Nike Dri-FIT Sport", "Calvin Klein Classic"
      ],
      "mens-shoes": [
        "Leather Boots Chelsea", "Running Shoes Nike", "Formal Oxford Black", 
        "Casual Sneakers White", "Hiking Boots Waterproof", "Dress Shoes Patent",
        "Adidas Ultraboost", "Converse Chuck Taylor", "Timberland Classic"
      ],
      "mens-watches": [
        "Luxury Timepiece Swiss", "Sport Watch Digital", "Classic Analog Silver", 
        "Smart Watch Apple", "Dress Watch Leather", "Chronograph Stainless",
        "Rolex Submariner", "Casio G-Shock", "Seiko Automatic"
      ],
      "mobile-accessories": [
        "Phone Case Protective", "Wireless Charger Fast", "Bluetooth Earbuds Pro", 
        "Screen Protector Glass", "Power Bank 10000mAh", "Car Mount Universal",
        "Selfie Stick Extendable", "Phone Stand Adjustable", "Cable USB-C Fast"
      ],
      "motorcycle": [
        "Sport Bike Yamaha", "Cruiser Model Harley", "Adventure Tour BMW", 
        "Classic Vintage Triumph", "Electric Scooter Zero", "Dirt Bike Honda",
        "Touring Motorcycle Gold", "Scooter Vespa Classic", "Dual Sport KTM"
      ],
      "skin-care": [
        "Hydrating Serum Vitamin", "Anti-Aging Cream Retinol", "Cleansing Gel Gentle", 
        "Moisturizer Daily", "Face Mask Clay", "Sunscreen SPF 50",
        "Eye Cream Brightening", "Toner Balancing", "Exfoliator Chemical"
      ],
      "smartphones": [
        "Premium Phone iPhone", "Budget Model Samsung", "Camera Pro Sony", 
        "Gaming Phone Asus", "Business Edition BlackBerry", "Flagship Galaxy S23",
        "Google Pixel Pro", "OnePlus Nord", "Xiaomi Redmi Note"
      ],
      "sports-accessories": [
        "Fitness Tracker Smart", "Yoga Mat Non-Slip", "Dumbbells Adjustable", 
        "Resistance Bands Set", "Sports Bag Gym", "Tennis Racket Wilson",
        "Basketball Official", "Soccer Ball FIFA", "Golf Clubs Set"
      ]
    };

    // Price ranges to ensure coverage
    const pricePoints = [25, 75, 150, 350, 750];

    let productId = originalProducts.length + 1;

    categories.forEach(category => {
      pricePoints.forEach((price, priceIndex) => {
        const names = categoryNames[category] || ["Premium Product"];
        const name = names[priceIndex % names.length];
        const imageIndex = (productId - 1) % existingImages.length;
        
        dummyProducts.push({
          id: productId++,
          title: `${name} - ${category.replace('-', ' ')}`,
          description: `High-quality ${category.replace('-', ' ')} product with excellent features and durability.`,
          price: price,
          discountPercentage: Math.floor(Math.random() * 30) + 10,
          rating: (Math.random() * 2 + 3).toFixed(1), // 3.0 to 5.0
          stock: Math.floor(Math.random() * 50) + 10,
          brand: "Premium Brand",
          category: category,
          thumbnail: existingImages[imageIndex],
          images: [existingImages[imageIndex]]
        });
      });
    });

    return [...originalProducts, ...dummyProducts];
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      
      // Update existing product names to be more category-specific
      const updatedOriginalProducts = data.products.map(product => {
        const categorySpecificNames = {
          "smartphones": [
            "iPhone 14 Pro Max", "Samsung Galaxy S23", "Google Pixel 7", "OnePlus 11", "Xiaomi 13 Pro",
            "Sony Xperia 1 V", "Nothing Phone 2", "ASUS ROG Phone 7", "Motorola Edge 40", "Realme GT Neo 5"
          ],
          "laptops": [
            "MacBook Pro M2", "Dell XPS 13 Plus", "HP Spectre x360", "Lenovo ThinkPad X1", "ASUS ROG Strix",
            "MSI GS66 Stealth", "Razer Blade 15", "Acer Swift 5", "Microsoft Surface Laptop", "Alienware x17"
          ],
          "fragrances": [
            "Chanel N°5 Eau de Parfum", "Dior Sauvage Elixir", "Tom Ford Black Orchid", "Jo Malone Wood Sage",
            "Yves Saint Laurent Libre", "Gucci Bloom", "Marc Jacobs Daisy", "Viktor&Rolf Flowerbomb", "Hermès Terre d'Hermès"
          ],
          "skincare": [
            "La Mer Moisturizing Cream", "SK-II Facial Treatment", "Estée Lauder Advanced Night Repair",
            "Clinique Moisture Surge", "Olay Regenerist", "Neutrogena Hydro Boost", "CeraVe Moisturizing Cream",
            "The Ordinary Niacinamide", "Paula's Choice BHA Liquid"
          ],
          "groceries": [
            "Organic Avocados Pack", "Fresh Strawberries", "Whole Grain Bread", "Extra Virgin Olive Oil",
            "Greek Yogurt Natural", "Quinoa Organic", "Almond Milk Unsweetened", "Dark Chocolate 70%",
            "Green Tea Bags", "Honey Raw Natural"
          ],
          "home-decoration": [
            "Modern Wall Clock", "Ceramic Vase Set", "LED Table Lamp", "Throw Pillow Collection",
            "Abstract Canvas Art", "Candle Holder Set", "Mirror Wall Decor", "Plant Stand Wooden",
            "Curtain Panels Sheer", "Rug Area Persian"
          ],
          "furniture": [
            "Leather Sofa 3-Seater", "Dining Table Set", "Queen Size Bed Frame", "Office Desk Modern",
            "Bookshelf Wooden", "Coffee Table Glass", "Armchair Recliner", "Wardrobe Closet",
            "Nightstand Bedside", "TV Stand Entertainment"
          ],
          "tops": [
            "Cotton T-Shirt Basic", "Silk Blouse Elegant", "Polo Shirt Classic", "Sweater Knit Warm",
            "Tank Top Summer", "Hoodie Casual", "Button-Up Shirt", "Tunic Top Flowy",
            "Crop Top Fashion", "Long Sleeve Thermal"
          ],
          "womens-dresses": [
            "Summer Dress Floral", "Cocktail Dress Black", "Maxi Dress Elegant", "Mini Dress Party",
            "Wrap Dress Casual", "Evening Gown Formal", "Sundress Beach", "Midi Dress Office",
            "Boho Dress Bohemian", "Lace Dress Romantic"
          ],
          "womens-shoes": [
            "High Heels Stiletto", "Running Shoes Nike", "Boots Ankle Leather", "Sandals Summer",
            "Flats Ballet Classic", "Sneakers Casual", "Wedges Comfortable", "Pumps Office",
            "Loafers Slip-On", "Espadrilles Summer"
          ],
          "mens-shirts": [
            "Oxford Shirt Formal", "Polo Shirt Cotton", "T-Shirt Graphic", "Dress Shirt White",
            "Flannel Shirt Plaid", "Henley Shirt Casual", "Button-Down Shirt", "Tank Top Athletic",
            "Sweater Cardigan", "Hoodie Pullover"
          ],
          "mens-shoes": [
            "Leather Boots Chelsea", "Running Shoes Adidas", "Dress Shoes Oxford", "Sneakers White",
            "Hiking Boots Waterproof", "Loafers Slip-On", "Sandals Summer", "Athletic Shoes",
            "Formal Shoes Patent", "Casual Shoes Canvas"
          ],
          "mens-watches": [
            "Rolex Submariner", "Apple Watch Series", "Casio G-Shock", "Seiko Automatic",
            "Omega Speedmaster", "Tag Heuer Carrera", "Breitling Navitimer", "Tissot T-Classic",
            "Citizen Eco-Drive", "Fossil Grant"
          ],
          "womens-bags": [
            "Leather Handbag Tote", "Crossbody Bag Small", "Backpack Fashion", "Clutch Evening",
            "Shoulder Bag Classic", "Bucket Bag Trendy", "Hobo Bag Casual", "Satchel Work",
            "Mini Bag Evening", "Duffel Bag Travel"
          ],
          "womens-jewellery": [
            "Diamond Necklace", "Pearl Earrings", "Gold Bracelet", "Silver Ring",
            "Crystal Pendant", "Rose Gold Chain", "Gemstone Ring", "Platinum Band",
            "Sterling Silver Set", "Cubic Zirconia"
          ],
          "sunglasses": [
            "Ray-Ban Aviator", "Oakley Sport", "Gucci Square", "Prada Round",
            "Tom Ford Cat Eye", "Chanel Oversized", "Versace Medusa", "Dolce & Gabbana",
            "Burberry Classic", "Fendi Logo"
          ],
          "automotive": [
            "Car Floor Mats", "Steering Wheel Cover", "Phone Mount Dashboard", "Car Air Freshener",
            "Seat Covers Universal", "Car Organizer", "Tire Pressure Gauge", "Jump Starter",
            "Car Vacuum Portable", "Windshield Sunshade"
          ],
          "motorcycle": [
            "Harley Davidson Sportster", "Honda CBR600RR", "Yamaha R1", "BMW R1250GS",
            "Ducati Panigale", "Kawasaki Ninja", "Suzuki GSX-R", "Triumph Bonneville",
            "KTM Duke", "Indian Scout"
          ],
          "lighting": [
            "LED Desk Lamp", "Table Lamp Modern", "Floor Lamp Standing", "Wall Sconce",
            "Chandelier Crystal", "Pendant Light", "Track Lighting", "Under Cabinet Light",
            "String Lights", "Emergency Light"
          ]
        };

        const names = categorySpecificNames[product.category] || [product.title];
        const randomName = names[Math.floor(Math.random() * names.length)];
        
        return {
          ...product,
          title: randomName
        };
      });
      
      const allProducts = generateDummyProducts(updatedOriginalProducts);
      setProducts(allProducts);
      setFilteredProducts(allProducts);
      setDisplayedProducts(allProducts.slice(0, productsPerPage));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories(prev => {
      const newCategories = prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category];
      return newCategories;
    });
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: '', max: '' });
  };

  const loadMoreProducts = () => {
    setCurrentPage(prev => prev + 1);
  };

  // Apply filters whenever selections change
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedCategories.includes(product.category)
      );
    }

    // Filter by price range
    if (priceRange.min !== '' || priceRange.max !== '') {
      filtered = filtered.filter(product => {
        const price = product.price;
        const min = priceRange.min !== '' ? parseFloat(priceRange.min) : 0;
        const max = priceRange.max !== '' ? parseFloat(priceRange.max) : Infinity;
        return price >= min && price <= max;
      });
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategories, priceRange, products]);

  // Update displayed products when filtered products or current page changes
  useEffect(() => {
    const startIndex = 0;
    const endIndex = currentPage * productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage, productsPerPage]);

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (products.length === 0) {
    return <p>Please connect to the internet.</p>;
  }

  const hasMoreProducts = displayedProducts.length < filteredProducts.length;

  return (
    <section className='min-h-screen w-full pt-20'>
      <div className="container mx-auto p-5">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Products Section - Left Side */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                All Products
              </h1>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {displayedProducts.length} of {filteredProducts.length} products
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex flex-wrap -m-4">
              {displayedProducts?.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            
            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreProducts}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Load More Products ({filteredProducts.length - displayedProducts.length} remaining)
                </button>
              </div>
            )}
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  No products found matching your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-4 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                >
                  View all products
                </button>
              </div>
            )}
          </div>

          {/* Filters Section - Right Side */}
          <div className="lg:w-1/4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Filters
                </h2>
                {(selectedCategories.length > 0 || priceRange.min !== '' || priceRange.max !== '') && (
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Categories
                </h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
        {categories.map((category, index) => (
                    <label 
            key={index} 
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => handleCategoryChange(category)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">
                        {category.replace('-', ' ')}
                      </span>
                    </label>
        ))}
      </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Price Range
                </h3>
                
                {/* Quick Price Ranges */}
                <div className="space-y-2 mb-4">
                  {priceRanges.map((range, index) => (
                    <label 
                      key={index} 
                      className="flex items-center gap-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-lg transition-colors"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={priceRange.min === range.min && priceRange.max === range.max}
                        onChange={() => handlePriceRangeChange(range)}
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-900 dark:text-gray-100">
                        {range.label}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Custom Price Range */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Custom Range
                  </h4>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Summary */}
              {(selectedCategories.length > 0 || priceRange.min !== '' || priceRange.max !== '') && (
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Active Filters:
                  </h4>
                  <div className="space-y-1">
                    {selectedCategories.length > 0 && (
                      <div className="text-xs text-gray-700 dark:text-gray-300">
                        Categories: {selectedCategories.length} selected
                      </div>
                    )}
                    {(priceRange.min !== '' || priceRange.max !== '') && (
                      <div className="text-xs text-gray-700 dark:text-gray-300">
                        Price: ${priceRange.min || '0'} - ${priceRange.max || '∞'}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
