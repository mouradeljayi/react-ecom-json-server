const API_URL = import.meta.env.VITE_API_URL;

export const getProducts = () =>
    fetch(`${API_URL}/products`).then(res => res.json());

export const getCart = () =>
    fetch(`${API_URL}/cart`).then(res => res.json());

export const addToCart = item =>
    fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

export const updateCart = (id, item) =>
    fetch(`${API_URL}/cart/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });

export const removeFromCart = id =>
    fetch(`${API_URL}/cart/${id}`, {
        method: "DELETE"
    });
