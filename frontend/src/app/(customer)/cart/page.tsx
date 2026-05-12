import { CartList } from "./components/CartList";
import { CartSummary } from "./components/CartSummary";

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <CartList />
        <CartSummary />
      </div>
    </div>
  );
}
