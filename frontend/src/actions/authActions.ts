"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_URL = process.env.API_URL;

async function createSession(token: string, role: string) {
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

export async function loginAction(state: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

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