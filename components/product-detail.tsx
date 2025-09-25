"use client";

import Stripe from "stripe";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-12 items-start">
      {/* Product Image */}
      {product.images && product.images[0] && (
        <div className="relative h-96 w-full md:w-1/2 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <Image
            src={product.images[0]}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="transition duration-300 hover:scale-105"
          />
        </div>
      )}

      {/* Product Details */}
      <div className="md:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-extrabold text-gray-900">
          {product.name}
        </h1>
        {product.description && (
          <p className="text-gray-700 text-lg">{product.description}</p>
        )}
        {price && price.unit_amount && (
          <p className="text-2xl font-bold text-gray-900">
            ${(price.unit_amount / 100).toFixed(2)}
          </p>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => removeItem(product.id)}
          >
            –
          </Button>
          <span className="text-lg font-semibold">{quantity}</span>
          <Button
            className="rounded-full w-10 h-10 flex items-center justify-center"
            onClick={onAddItem}
          >
            +
          </Button>
        </div>

        {/* Checkout Button */}
        {items.length > 0 && (
          <Link href="/checkout" className="w-full">
            <Button className="w-full mt-4 py-3 bg-black text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105 cursor-pointer">
              Go to Checkout
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
