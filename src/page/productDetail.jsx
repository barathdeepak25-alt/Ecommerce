
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("URL ID:",id);
  

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
          
        const found = data.find((item) => String(item._id) === String(id));
        // console.log("Found product:",found);
        setProduct(found || null);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  
  

  if (loading) return <p>Loading product...</p>;

  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="back ">
      <button onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="details-container">
        <img
          src={product.image}
          alt={product.name}
          className="details-image"
        />

        <div className="details-info">
          <h1>{product.name}</h1>
          <h2>₹{product.price}</h2>

          <p>{product.description}</p>
           <p>Rating:{product.Rating}</p>
          <p>Category: {product.category}</p>
          <p>Stock: {product.stock}</p>

          <button
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            {product.stock <= 0 ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
