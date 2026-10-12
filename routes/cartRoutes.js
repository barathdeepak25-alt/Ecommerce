const express=require('express')
const Cart=require('../models/Cart')
const protect=require('../middleware/authMiddleware')

const router=express.Router()
//get user cart
router.get("/",protect,async(req,res)=>{
    try{
    let cart=await Cart.findOne({userId:req.userId})
    .populate("products.productId")
     if(!cart){
        cart=await Cart.create({
            userId:req.userId,
            products:[]
        })
     }
     res.json(cart)
     }catch(error){
        res.status(500).json({
            message:error.message
        })
     }
    
})

// Add product to cart
router.post("/add", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      cart = await Cart.create({
        userId: req.userId,
        products: [
          {
            productId,
            quantity: quantity || 1,
          },
        ],
      });

      return res.status(201).json(cart);
    }

    const existingProduct = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity || 1;
    } else {
      cart.products.push({
        productId,
        quantity: quantity || 1,
      });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Update cart product quantity
router.put("/update", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const product = cart.products.find(
      (item) => item.productId.toString() === productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    product.quantity = quantity;

    await cart.save();

    res.json({
      message: "Cart updated successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
// Remove product from cart
router.delete("/remove/:productId", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.products = cart.products.filter(
      (item) => item.productId.toString() !== req.params.productId
    );

    await cart.save();

    res.json({
      message: "Product removed from cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});
module.exports=router