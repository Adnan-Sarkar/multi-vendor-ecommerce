"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { placeOrderAction } from "@/actions/checkoutActions";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().min(3, "Zip code is required"),
  cardNumber: z.string().min(16, "Invalid card number"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Invalid expiry (MM/YY)"),
  cvc: z.string().min(3, "Invalid CVC"),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export function CheckoutForm() {
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      const result = await placeOrderAction(data);
      if (result?.success) {
        clearCart();
        alert(`Order placed successfully! Your Order ID is ${result.orderId}`);
        router.push("/shop"); // Redirect back to shop on success
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Contact Info */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register("firstName")} placeholder="First Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.firstName && <p className="text-red-500 text-xs font-medium mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <input {...register("lastName")} placeholder="Last Name" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.lastName && <p className="text-red-500 text-xs font-medium mt-1">{errors.lastName.message}</p>}
            </div>
          </div>
          <div>
            <input type="email" {...register("email")} placeholder="Email Address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.email && <p className="text-red-500 text-xs font-medium mt-1">{errors.email.message}</p>}
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Shipping Address</h2>
        <div className="space-y-4">
          <div>
            <input {...register("address")} placeholder="Street Address" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.address && <p className="text-red-500 text-xs font-medium mt-1">{errors.address.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register("city")} placeholder="City" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.city && <p className="text-red-500 text-xs font-medium mt-1">{errors.city.message}</p>}
            </div>
            <div>
              <input {...register("zipCode")} placeholder="ZIP Code" className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.zipCode && <p className="text-red-500 text-xs font-medium mt-1">{errors.zipCode.message}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Payment Details</h2>
        <div className="space-y-4">
          <div>
            <input {...register("cardNumber")} placeholder="Card Number" maxLength={16} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
            {errors.cardNumber && <p className="text-red-500 text-xs font-medium mt-1">{errors.cardNumber.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input {...register("expiry")} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.expiry && <p className="text-red-500 text-xs font-medium mt-1">{errors.expiry.message}</p>}
            </div>
            <div>
              <input {...register("cvc")} placeholder="CVC" maxLength={4} className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" />
              {errors.cvc && <p className="text-red-500 text-xs font-medium mt-1">{errors.cvc.message}</p>}
            </div>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Processing Payment..." : "Place Order"}
      </button>
    </form>
  );
}
