import { Suspense } from "react";
import ProductDetails from "@/components/ProductDetails";

async function Details({ params }) {
  const { id } = await params;
  return <ProductDetails id={id} />;
}

export default function ProductPage({ params }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Details params={params} />
    </Suspense>
  );
}
