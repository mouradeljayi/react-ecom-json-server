import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

function Navbar() {
  const { cartCount } = useContext(CartContext);

  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <Link to="/" className="navbar-brand">
        E-Commerce
      </Link>

      <Link to="/cart" className="btn btn-outline-light">
        🛒 Panier <span className="badge bg-danger">{cartCount}</span>
      </Link>
    </nav>
  );
}

export default Navbar;
