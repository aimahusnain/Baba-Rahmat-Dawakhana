// CartPage.jsx

import { getCart } from "@/src/lib/db/cart";
import { formatPrice } from "@/src/lib/format";
import CartEntry from "./CartEntry";
import { setProductQuantity } from "./actions";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Your Cart - Beauty Bugz",
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <div className="h-full my-10 w-full flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Shopping Cart
      </h1>
      <div className="w-full p-8 rounded-lg shadow-lg flex flex-col sm:flex-row h-full">
        {/* Left Column - Products */}
        <div className="w-full sm:w-2/3 pr-4 overflow-y-auto">
          {/* Cart Entries */}
          {cart &&
            cart.items &&
            cart.items.map((cartItem) => (
              <CartEntry
                cartItem={cartItem}
                key={cartItem.id}
                setProductQuantity={setProductQuantity}
              />
            ))}

          {/* Empty Cart Message */}
          {(!cart || !cart.items || cart.items.length === 0) && (
            <div className="items-center flex flex-col gap-3">
              <p className="text-gray-500 text-center">
                Looks Like You don&apos;t have any Items Here!
              </p>
              <Link href="/">
                <Button>Go & Add</Button>
              </Link>
            </div>
          )}
        </div>

        {/* Right Column - Total, Tax, Proceed to Payment */}
        <div className="w-full sm:w-1/3">
          <div className="bg-gray-100 h-fit p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
            <p className="mb-2">Subtotal: {formatPrice(cart?.subtotal || 0)}</p>
            {/* <p className="mb-2">Tax: {formatPrice(cart?.tax || 0)}</p> */}
            <p className="text-xl font-bold mb-4">
              {" "}
              Total: {cart?.subtotal || 0}
            </p>
            <button className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-pink-600 transition duration-300 ease-in-out w-full">
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
