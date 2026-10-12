import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./productDetail";
function ProductList({addToCart}) {
  const [products, setProducts] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container py-4">
     <h1 id="products" className="text-center mb-4">
       Our Products
      </h1>

      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 mb-4" key={product._id}>
            <div className="card h-70 shadow-sm">
              
              <img
                src={product.image}
                className="card-img-top"
                alt={product.name}
                style={{ width:"100%",height: "50vh", objectFit: "cover",padding:"10px" }}
              />

              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>

                <h6 className="text-success">
                  ₹{product.price}
                </h6>

                <p className="card-text">
                  {product.description}
                </p>

                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Rating:</strong> {product.Rating}<span className="stars">★★★★☆</span>
                </p>
                <p>
                  <strong>Stock:</strong> {product.stock}
                </p>

                <button className="btn btn-primary w-40" onClick={()=>addToCart(product)}>
                  Add to Cart
                </button>
                <button className="btn btn-warning w-40 ms-3"
                  onClick={() => navigate(`/details/${product._id}`)}>
                  View Details
                 </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;

