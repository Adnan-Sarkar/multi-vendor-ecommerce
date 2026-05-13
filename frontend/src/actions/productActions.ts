"use server";

import { revalidatePath } from "next/cache";

export async function createProductAction(data: any) {
  // Simulate network latency for backend processing
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log("Creating product on server:", data);
  
  // Revalidate the products list so the new product would show up
  revalidatePath("/dashboard/products");
  
  return { success: true };
}
