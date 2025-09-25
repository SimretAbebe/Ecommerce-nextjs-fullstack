"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";
import { CheckCircleIcon } from "lucide-react"; // nice icon

export default function SuccessPage() {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4">
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 text-center animate-fadeIn">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-16 w-16 text-green-500 animate-bounce" />
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order is now being processed.
        </p>

        <Link
          href="/products"
          className="
            inline-block 
            bg-gradient-to-r from-blue-500 to-indigo-500 
            text-white font-semibold px-6 py-3 
            rounded-xl shadow hover:shadow-lg 
            hover:scale-105 transition-transform duration-300
          "
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
