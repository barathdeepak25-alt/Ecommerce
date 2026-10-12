import { useState ,useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import ProductList from './page/Productlist'
import Navbar from './components/Navbar'
import Login from './page/Login'
import Register from './page/Register'
import Cart from './components/Cart';
import Check from './page/Check'
import ProductDetails from './page/productDetail';
import UserDetails from './page/Userdetails';
function App() {
  const [message,setMessage]=useState("")
  const [cart, setCart] = useState(() => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item._id === product._id
      );

      if (existing) {
        return currentCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== id)
    );
    setMessage(`${product.name}product added to cart successfully!`)
    setTimeout(()=>{
      setMessage("")
    },3000)
  };


  return (
    <BrowserRouter>
      <Navbar cartCount={cart.reduce(
    (total, item) => total + item.quantity,
    0
  )} />
  {message &&(
    <div className='success'>{message}</div>
  )}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/product' element={<ProductList addToCart={addToCart}/>}/>
        <Route path='/register' element={<Register/>}/>
         <Route
          path="/cart"
          element={
            <Cart cart={cart} removeFromCart={removeFromCart} />
          }/>
          <Route path='/check' element={<Check cart={cart}/>}/>
          <Route path='/details/:id'element={<ProductDetails addToCart={addToCart}/>}/>
          <Route path='/user' element={<UserDetails/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
