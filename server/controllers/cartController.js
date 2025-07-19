const User = require("../models/user")

// Initialize Stripe with error handling
let stripe;
try {
  if (!process.env.STRIPE_KEY) {
    console.error('STRIPE_KEY is not set in environment variables');
  } else {
    stripe = require('stripe')(process.env.STRIPE_KEY);
    console.log('Stripe initialized successfully');
  }
} catch (error) {
  console.error('Failed to initialize Stripe:', error);
}

const addToCart = async (req, res) => {
    const { id, title, description, image, price, category } = req.body
    const userId = req.id

    try {

        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        const existingProduct = user.cart.find(item => item.id == id)
        if (existingProduct) {
            return res.status(200).json({
                success: false,
                message: "Already in cart.",

            })
        }
        const product = {
            id,
            title,
            description,
            image,
            price,
            category,
            quantity: 1,
        }

        user.cart.push(product)

        await user.save()

        res.status(200).json({
            success: true,
            message: "Added to cart",

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

const removeFromCart = async (req, res) => {
    try {
        const userId = req.id
        const user = await User.findById(userId)
        const itemId = req.params.id
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }


        const productIndex = user.cart.findIndex(item => item.id == itemId)

        if (productIndex == -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            })
        }

        user.cart.splice(productIndex, 1)

        await user.save()

        res.status(200).json({
            success: true,
            message: "Item removed from cart."
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const incrementQuantity = async (req, res) => {
    const userId = req.id
    const itemId = req.params.id

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        const productIndex = user.cart.findIndex(item => item.id === itemId)
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            })
        }

        // Increment quantity
        user.cart[productIndex].quantity += 1



        // Save the updated user document
        await user.save()

        res.status(200).json({
            success: true,
            message: "Quantity updated.",

        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const decrementQuantity = async (req, res) => {
    const userId = req.id
    const itemId = req.params.id

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }

        const productIndex = user.cart.findIndex(item => item.id === itemId)
        if (productIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found."
            })
        }



        


        if (user.cart[productIndex].quantity > 1) {
            user.cart[productIndex].quantity -= 1
            await user.save()
        } else {
            return res.status(400).json({
                success: false,
                message: "Quantity should not be less than 0.",

            })
        }



        // Save the updated user document


        res.status(200).json({
            success: true,
            message: "Quantity updated",

        })

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const checkOut = async (req, res) => {
    console.log('=== CHECKOUT DEBUG ===');
    console.log('Request body:', req.body);
    console.log('User ID:', req.id);
    console.log('Stripe key exists:', !!process.env.STRIPE_KEY);
    console.log('Stripe key first 10 chars:', process.env.STRIPE_KEY ? process.env.STRIPE_KEY.substring(0, 10) + '...' : 'NOT SET');
    
    try {
      // Check if Stripe is configured
      if (!process.env.STRIPE_KEY) {
        return res.status(500).json({
          success: false,
          message: "Stripe is not configured. Please set STRIPE_KEY in your .env file.",
        });
      }

      // Validate request body
      if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No items provided for checkout.",
        });
      }

      // Validate each item
      for (let item of req.body.items) {
        if (!item.title || !item.price || !item.quantity) {
          return res.status(400).json({
            success: false,
            message: "Invalid item data. Each item must have title, price, and quantity.",
          });
        }
        if (item.price <= 0 || item.quantity <= 0) {
          return res.status(400).json({
            success: false,
            message: "Price and quantity must be greater than 0.",
          });
        }
      }

      console.log('Creating Stripe session with items:', req.body.items);

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: req.body.items.map(item => {
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.title,
                description: item.description || '',
                images: item.image ? [item.image] : [],
              },
              unit_amount: Math.round(item.price * 100), // Ensure it's an integer
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${process.env.ORIGIN || 'http://localhost:5173'}/success`,
        cancel_url: `${process.env.ORIGIN || 'http://localhost:5173'}/cancel`,
        metadata: {
          userId: req.id || 'unknown',
          itemCount: req.body.items.length.toString(),
        },
      });
  
      console.log('Stripe session created successfully:', session.id);
      res.status(200).json({ success: true, url: session.url });
    } catch (error) {
      console.error('Stripe checkout error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Payment processing failed.';
      if (error.type === 'StripeCardError') {
        errorMessage = 'Card error: ' + error.message;
      } else if (error.type === 'StripeInvalidRequestError') {
        errorMessage = 'Invalid request: ' + error.message;
      } else if (error.type === 'StripeAPIError') {
        errorMessage = 'Stripe API error: ' + error.message;
      } else if (error.type === 'StripeConnectionError') {
        errorMessage = 'Connection error: ' + error.message;
      } else if (error.type === 'StripeAuthenticationError') {
        errorMessage = 'Authentication error: ' + error.message;
      } else if (error.type === 'StripePermissionError') {
        errorMessage = 'Permission error: ' + error.message;
      } else if (error.type === 'StripeRateLimitError') {
        errorMessage = 'Rate limit error: ' + error.message;
      } else if (error.type === 'StripeValidationError') {
        errorMessage = 'Validation error: ' + error.message;
      } else {
        errorMessage = error.message || 'Unknown error occurred.';
      }

      res.status(500).json({
        success: false,
        message: errorMessage,
      });
    }
  };


  const clearCart = async(req,res) =>{
    try{
        const userId = req.id
        const user = await User.findById(userId)

        if(!user){
            return res.status(401).json({
                success: false,
                message: "You are not authorized."
            })
        }
        user.cart = []
        await user.save()

        res.status(200).json({
            success: true,
            message: "Cart clear."
        })


    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
  }

module.exports = {
    addToCart,
    removeFromCart,
    incrementQuantity,
    decrementQuantity,
    checkOut,
    clearCart
}