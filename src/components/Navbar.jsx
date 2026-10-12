import { Link } from "react-router-dom";
function Navbar({cartCount=0}) {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container">
        <a className="navbar-brand fw-bold" href="/">
          ShopEase
        </a>

        <div className=" collapse navbar-collapse d-flex gap-3"id="shop">
          <div className="navbar-nav ms-auto align-items-lg-center gap-lg-3"> 
          <a className="nav-link text-white" href="/">
            Home
          </a>

          <a className="nav-link text-white" href="/product">
            Products
          </a>
          <a className="nav-link text-white" href="/user">
            My profile
          </a>

          <a className="nav-link text-white" href="/details/${product._id}">
            product Details
          </a>
          <button 
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#shop"
        aria-controls="shop"
        aria-expanded="false"
        aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        

          <Link to="/cart" className="btn btn-warning">
  Cart ({cartCount})
          </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;