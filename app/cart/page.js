"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "@/store/cartSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  return (
    <div style={{ padding: 16 }}>
      <h2>Cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <img src={item.image} alt={item.title} style={{ width: 50, height: 50, objectFit: "contain" }} />
              <span style={{ width: 250 }}>{item.title}</span>
              <span>${item.price}</span>
              <button onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
              <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
            </div>
          ))}
          <p>Total quantity: {totalQuantity}</p>
          <p>Total amount: ${totalAmount.toFixed(2)}</p>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </>
      )}
    </div>
  );
}
