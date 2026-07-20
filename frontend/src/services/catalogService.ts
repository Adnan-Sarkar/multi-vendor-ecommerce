import { fetchServer } from "@/lib/api-server";

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetchServer("/category", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export async function getTags(): Promise<Tag[]> {
  try {
    const response = await fetchServer("/tag", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}
