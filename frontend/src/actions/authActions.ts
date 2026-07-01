"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const API_URL = process.env.API_URL;

// Zod validation schemas
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const RegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(11, "Phone number must be at least 11 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string()
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords do not match",
  path: ["password_confirmation"],
});

export async function createSession(token: string, role: string) {
  const cookieStore = await cookies();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookieStore.set(process.env.COOKIE_NAME as string, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });

  cookieStore.set(process.env.ROLE_COOKIE_NAME as string, role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
}

export async function loginAction(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        email: formData.get("email"),
        password: formData.get("password")
      }
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password })
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, error: result.message || "Invalid credentials." };
    }

    const { token, user } = result.data;
    await createSession(token, user.role);

    return { success: true, role: user.role };
  } catch (err) {
    return { success: false, error: "Server connection failed." };
  }
}

export async function registerAction(prevState: any, formData: FormData) {
  const validatedFields = RegisterSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
      }
    };
  }
  const { name, email, phone, password, password_confirmation } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ name, email, phone, password, password_confirmation })
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return { success: false, error: result.message || "Registration failed." };
    }

    const { token, user } = result.data;
    await createSession(token, user.role);

    return { success: true, role: user.role };
  } catch (err) {
    return { success: false, error: "Server connection failed." };
  }
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME as string)?.value;

  if (token) {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }

    cookieStore.delete(process.env.COOKIE_NAME as string);
    cookieStore.delete(process.env.ROLE_COOKIE_NAME as string);

    redirect("/login");
  }
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const validatedFields = ForgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: { email: formData.get("email") as string }
    };
  }

  const { email } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email })
    });
    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Failed to send OTP.",
        inputs: { email }
      };
    }
    return { success: true, email };
  } catch (err) {
    return {
      success: false,
      error: "Server connection failed.",
      inputs: { email }
    };
  }
}

export async function resetPasswordAction(prevState: any, formData: FormData) {
  const validatedFields = ResetPasswordSchema.safeParse({
    email: formData.get("email"),
    otp: formData.get("otp"),
    password: formData.get("password"),
    password_confirmation: formData.get("password_confirmation"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      inputs: {
        email: formData.get("email") as string,
        otp: formData.get("otp") as string,
      }
    };
  }

  const { email, otp, password, password_confirmation } = validatedFields.data;

  try {
    const res = await fetch(`${API_URL}/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, otp, password, password_confirmation })
    });

    const result = await res.json();

    if (!res.ok || !result.success) {
      return {
        success: false,
        error: result.message || "Failed to reset password.",
        inputs: { email, otp }
      };
    }

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: "Server connection failed.",
      inputs: { email, otp }
    };
  }
}