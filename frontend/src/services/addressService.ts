import { fetchServer } from "@/lib/api-server";

export type AddressType = "shipping" | "billing";

export interface Address {
  id: number;
  name: string;
  phone: string;
  address_line_1: string;
  address_line_2?: string | null;
  city: string;
  state: string;
  zip_code?: string | null;
  is_default: boolean;
  type: AddressType;
  created_at?: string;
}

export async function getAddresses(): Promise<Address[]> {
  try {
    const response = await fetchServer("/address", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();

    return body.data ?? [];
  } catch {
    return [];
  }
}
