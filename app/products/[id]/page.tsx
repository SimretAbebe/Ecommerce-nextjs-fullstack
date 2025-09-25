import { ProductDetail } from "@/components/product-detail";
import { stripe } from "@/lib/stripe";
import { ShoppingBag } from "lucide-react";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ["default_price"],
  });

  const plainProduct = JSON.parse(JSON.stringify(product));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Optional header */}
        <div className="flex items-center justify-center mb-8">
          <ShoppingBag className="h-10 w-10 text-blue-500 mr-2" />
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Product Details
          </h1>
        </div>

        {/* Card-like container for product */}
        <div className="bg-white shadow-xl rounded-3xl p-8 hover:shadow-2xl transition-shadow duration-300">
          <ProductDetail product={plainProduct} />
        </div>
      </div>
    </div>
  );
}
