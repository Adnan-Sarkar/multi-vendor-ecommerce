import { cookies } from "next/headers";

export async function fetchServer(endpoint: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(process.env.COOKIE_NAME as string)?.value;

  const apiURL = process.env.API_URL;

  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(`${apiURL}${endpoint}`, {
    ...options,
    headers
  });

  return res;
}