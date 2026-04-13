import { useEffect, useState, useContext } from "react";
import {
  getProducts,
  getCart,
  addToCart,
  updateCart
} from "../services/api";
import { CartContext } from "../context/CartContext";

function Products() {
  const [products, setProducts] = useState([]);
  const { refreshCart } = useContext(CartContext);

  // Charger la liste des produits
  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
    });
  }, []);

  // Ajouter un produit au panier
  const handleAddToCart = async product => {
    // Récupérer le panier actuel depuis JSON Server
    const cart = await getCart();

    // Vérifier si le produit existe déjà dans le panier
    const existingItem = cart.find(
      item => item.productId === product.id
    );

    if (existingItem) {
      // Si oui → augmenter la quantité
      await updateCart(existingItem.id, {...existingItem,quantity: existingItem.quantity + 1});
    } else {
      // Sinon → ajouter un nouveau produit
      await addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      });
    }

    // 🔥 Recalculer compteur + total (Context)
    refreshCart();
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Liste des produits</h2>

      <div className="row">
        {products.map(product => (
          <div className="col-md-4" key={product.id}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} DH</p>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(product)}
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
