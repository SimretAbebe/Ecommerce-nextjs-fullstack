"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";
import { ShoppingCart, Minus, Plus, CreditCard, Loader2 } from "lucide-react";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔹 Loading state for checkout
  const [isLoading, setIsLoading] = useState(false);

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-extrabold mb-2 text-gray-800">
            Your Cart is Empty
          </h1>
          <p className="text-gray-500">
            Browse products and add them to your cart.
          </p>
        </div>
      </div>
    );
  }

  const handleCheckout = async (formData: FormData) => {
    try {
      setIsLoading(true);
      await checkoutAction(formData); // your server action
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 min-h-screen py-12 px-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
        Checkout
      </h1>

      <Card className="max-w-2xl mx-auto shadow-xl rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-2xl">
          <CardTitle className="text-white text-2xl font-bold">
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={item.id}
                className="border-b pb-4 last:border-none flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="font-semibold text-gray-900">
                    ${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => removeItem(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-semibold text-gray-800">
                    {item.quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full"
                    onClick={() => addItem({ ...item, quantity: 1 })}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t pt-4 text-xl font-bold flex justify-between items-center">
            <span className="text-gray-800">Total:</span>
            <span className="text-gray-900">${(total / 100).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <form action={handleCheckout} className="max-w-2xl mx-auto mt-8">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          disabled={isLoading}
          className="
            w-full py-4 text-lg font-semibold 
            bg-gradient-to-r from-blue-500 to-indigo-500 
            hover:from-blue-600 hover:to-indigo-600 
            rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer
          "
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Proceed to Payment
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
