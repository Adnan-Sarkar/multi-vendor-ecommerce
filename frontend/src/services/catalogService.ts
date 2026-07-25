import { fetchServer } from "@/lib/api-server";

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  is_active?: boolean;
  order?: number | null;
  parent?: Category | null;
  children?: Category[];
  products_count?: number;
  created_at?: string;
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
