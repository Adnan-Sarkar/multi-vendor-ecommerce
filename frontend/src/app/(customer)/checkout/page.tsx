import { CheckoutForm } from "./components/CheckoutForm";
import { CheckoutSummary } from "./components/CheckoutSummary";

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-7 xl:col-span-8">
          <CheckoutForm />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
