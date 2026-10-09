"use client";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "@/lib/api";
import { addToCart } from "@/store/cartSlice";

export default function ProductDetails({ id }) {
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProduct(id)
      .then(setProduct)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (error) return <p style={{ padding: 16 }}>{error}</p>;

  return (
    <div style={{ padding: 16 }}>
      <img src={product.image} alt={product.title} style={{ width: 250 }} />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating?.rate} ({product.rating?.count} reviews)</p>
      <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
    </div>
  );
}
