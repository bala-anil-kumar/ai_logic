"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "@/store/cartSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const totalQuantity = useSelector(selectTotalQuantity);

  if (pathname === "/login") return null;

  function logout() {
    document.cookie = "isLogin=; path=/; max-age=0";
    router.replace("/login");
  }

  return (
    <nav style={{ display: "flex", gap: 16, padding: 16 }}>
      <Link href="/products">Products</Link>
      <Link href="/cart">Cart ({totalQuantity})</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
