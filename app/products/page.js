"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/lib/api";
import { addToCart } from "@/store/cartSlice";

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = products.filter((p) =>
    p.title.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <div style={{ padding: 16 }}>
      <h2>Products</h2>
      <input
        placeholder="Search products"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && filtered.length === 0 && <p>No products found.</p>}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
        {filtered.map((p) => (
          <div key={p.id} style={{ width: 200, border: "1px solid #ccc", padding: 8 }}>
            <Link href={`/products/${p.id}`}>
              <img src={p.image} alt={p.title} style={{ width: "100%", height: 150, objectFit: "contain" }} />
              <p>{p.title}</p>
            </Link>
            <p>${p.price}</p>
            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}
