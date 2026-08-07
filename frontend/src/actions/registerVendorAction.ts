"use server";

import { z } from "zod";
import { createSession } from "./authActions";

const API_URL = process.env.API_URL;

const VendorRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string(),
  shop_name: z.string().min(3, "Shop name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: z.string().min(3, "Address must be at least 3 characters"),
  city: z.string().min(3, "City must be at least 3 characters"),
  state: z.string().min(3, "State must be at least 3 characters"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export async function registerVendorAction(
  prevState: unknown,
  formData: FormData,
) {
  const validatedFields = VendorRegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
    shop_name: formData.get("shop_name"),
    description: formData.get("description"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        shop_name: formData.get("shop_name") as string,
        description: formData.get("description") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
      }
    };
  }

  const data = validatedFields?.data;

  try {
    const res = await fetch(`${API_URL}/auth/register-vendor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Registration failed.",
        inputs: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          shop_name: data.shop_name,
          description: data.description,
          address: data.address,
          city: data.city,
          state: data.state
        }
      };
    }

    const { token, user } = result.data;
    await createSession(token, user.role);

    return { success: true, role: user.role };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Server connection failed.",
      inputs: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        shop_name: data.shop_name,
        description: data.description,
        address: data.address,
        city: data.city,
        state: data.state
      }
    };
  }
}