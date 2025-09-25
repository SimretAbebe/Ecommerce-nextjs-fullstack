import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300 py-0 h-full flex flex-col border-gray-300 gap-0">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="contain"
              className="group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold text-gray-800 transition-colors duration-300">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-3">
              {product.description}
            </p>
          )}
          {price && price.unit_amount && (
            <p className="text-lg font-semibold text-gray-900 mb-4">
              ${(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <Button
            className="
  mt-auto w-full 
  bg-black text-white 
  font-semibold py-2 rounded-lg 
  shadow-lg hover:shadow-xl 
  hover:bg-gray-800 
  transition-all transform hover:scale-105 
  cursor-pointer
"> View Details
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
};
