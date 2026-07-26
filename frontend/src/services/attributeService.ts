import { fetchServer } from "@/lib/api-server";

export interface AttributeValue {
  id: number;
  value: string;
}

export interface Attribute {
  id: number;
  name: string;
  values: AttributeValue[];
}

export async function getAttributes(): Promise<Attribute[]> {
  try {
    const response = await fetchServer("/attribute", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();

    return body.data ?? [];
  } catch {
    return [];
  }
}
