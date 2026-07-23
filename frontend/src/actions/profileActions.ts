"use server";

import { fetchServer } from "@/lib/api-server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CustomerProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .optional()
    .or(z.literal("")),
  date_of_birth: z.string().optional().or(z.literal("")),
  gender: z.enum(["male", "female"]).optional().or(z.literal("")),
  avatar: z.string().url("Avatar must be a valid URL").optional().or(z.literal("")),
});

const VendorProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .min(11, "Phone number must be at least 11 digits")
    .optional()
    .or(z.literal("")),
  shop_name: z
    .string()
    .min(3, "Shop name must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .min(3, "Address must be at least 3 characters")
    .optional()
    .or(z.literal("")),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  state: z
    .string()
    .min(2, "State must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  zip_code: z
    .string()
    .min(2, "Zip code must be at least 2 characters")
    .optional()
    .or(z.literal("")),
  avatar: z.string().url("Avatar must be a valid URL").optional().or(z.literal("")),
  logo: z.string().url("Logo must be a valid URL").optional().or(z.literal("")),
  banner: z.string().url("Banner must be a valid URL").optional().or(z.literal("")),
});

const ChangePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "Current password must be at least 8 characters"),
    new_password: z
      .string()
      .min(8, "New password must be at least 8 characters"),
    new_password_confirmation: z.string(),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "New passwords do not match",
    path: ["new_password_confirmation"],
  });

export async function getProfileAction() {
  try {
    const res = await fetchServer("/auth/profile");

    if (!res.ok) return null;

    const result = await res.json();

    return result.success ? result.data : null;
  } catch (err) {
    return null;
  }
}

export async function updateCustomerProfileAction(
  prevState: any,
  formData: FormData,
) {
  const fields: Record<string, any> = {};

  if (formData.get("name")) fields.name = formData.get("name");
  if (formData.get("phone")) fields.phone = formData.get("phone");
  if (formData.get("date_of_birth"))
    fields.date_of_birth = formData.get("date_of_birth");
  if (formData.get("gender")) fields.gender = formData.get("gender");
  if (formData.get("avatar")) fields.avatar = formData.get("avatar");

  const validatedFields = CustomerProfileSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload = Object.fromEntries(
    Object.entries(validatedFields.data).filter(
      ([_key, value]) => value !== undefined && value !== "",
    ),
  );

  try {
    const res = await fetchServer("/auth/profile/customer", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Failed to update profile.",
      };
    }

    revalidatePath("/account");

    return { success: true, message: "Profile updated successfully!" };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Server connection failed.",
    };
  }
}

export async function updateVendorProfileAction(
  prevState: any,
  formData: FormData,
) {
  const fields: Record<string, any> = {};

  if (formData.get("name")) fields.name = formData.get("name");
  if (formData.get("phone")) fields.phone = formData.get("phone");
  if (formData.get("shop_name")) fields.shop_name = formData.get("shop_name");
  if (formData.get("description"))
    fields.description = formData.get("description");
  if (formData.get("address")) fields.address = formData.get("address");
  if (formData.get("city")) fields.city = formData.get("city");
  if (formData.get("state")) fields.state = formData.get("state");
  if (formData.get("zip_code")) fields.zip_code = formData.get("zip_code");
  if (formData.get("avatar")) fields.avatar = formData.get("avatar");
  if (formData.get("logo")) fields.logo = formData.get("logo");
  if (formData.get("banner")) fields.banner = formData.get("banner");

  const validatedFields = VendorProfileSchema.safeParse(fields);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const payload = Object.fromEntries(
    Object.entries(validatedFields.data).filter(
      ([_key, value]) => value !== undefined && value !== "",
    ),
  );

  try {
    const res = await fetchServer("/auth/profile/vendor", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Failed to update profile.",
      };
    }

    revalidatePath("/dashboard/shop");

    return { success: true, message: "Shop details updated successfully!" };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Server connection failed.",
    };
  }
}

export async function changePasswordAction(prevState: any, formData: FormData) {
  const validatedFields = ChangePasswordSchema.safeParse({
    current_password: formData.get("current_password"),
    new_password: formData.get("new_password"),
    new_password_confirmation: formData.get("new_password_confirmation"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const data = validatedFields.data;

  try {
    const res = await fetchServer("/auth/change-password", {
      method: "POST",
      body: JSON.stringify({
        current_password: data.current_password,
        new_password: data.new_password,
        new_password_confirmation: data.new_password_confirmation,
      }),
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Failed to change password.",
      };
    }

    return { success: true, message: "Password changed successfully!" };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Server connection failed.",
    };
  }
}
