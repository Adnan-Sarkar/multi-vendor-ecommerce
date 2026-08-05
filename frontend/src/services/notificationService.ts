import { fetchServer } from "@/lib/api-server";

export interface NotificationData {
  message?: string;
  order_id?: number;
  order_number?: string;
  grand_total?: string | number;
  product_id?: number;
  product_name?: string;
  vendor_id?: number;
  shop_name?: string;
  withdrawal_id?: number;
  amount?: string | number;
}

export interface AppNotification {
  id: string;
  type: string;
  data: NotificationData;
  read_at: string | null;
  created_at: string;
}

export async function getNotifications(): Promise<AppNotification[]> {
  try {
    const response = await fetchServer("/notifications", { cache: "no-store" });

    if (!response.ok) {
      return [];
    }

    const body = await response.json();
    return body.data ?? [];
  } catch {
    return [];
  }
}

export async function getUnreadNotificationCount(): Promise<number> {
  try {
    const response = await fetchServer("/notifications/unread-count", {
      cache: "no-store",
    });

    if (!response.ok) {
      return 0;
    }

    const body = await response.json();
    return body.data?.unread_count ?? 0;
  } catch {
    return 0;
  }
}
