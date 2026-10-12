const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const auth=require('./routes/authRoutes')
const protect=require('./middleware/authMiddleware')
const cartRout=require('./routes/cartRoutes')
const Order=require('./models/Order')
const OrderRout=require('./routes/OrderRout')

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/auth",auth)
app.use("/api/cart",cartRout)
app.use("/api/orders", OrderRout);
app.get("/api/protected",protect,(req,res)=>{
  res.json({
    message:"protected route working",
    userId:req.userId
  })
})

app.get("/api/test", (req, res) => {
  res.send("API is working");
});

app.get("/", (req, res) => {
  res.send("Backend server is running");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log("MongoDB connection error", err));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});