"use server";

export async function placeOrderAction(data: any) {
  // Simulate network latency for payment processing
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  console.log("Order placed successfully on server:", data);
  
  // Return a success flag and a mock order ID
  // The client will use this to clear the Zustand cart and redirect the user
  return { 
    success: true, 
    orderId: `ORD-${Math.floor(1000 + Math.random() * 9000)}` 
  };
}
