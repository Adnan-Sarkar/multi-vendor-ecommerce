"use server";

import { fetchServer } from "@/lib/api-server";
import { revalidatePath } from "next/cache";

export async function markNotificationReadAction(notificationId: string) {
  try {
    const response = await fetchServer(`/notifications/${notificationId}/read`, {
      method: "PATCH",
    });

    if (!response.ok) {
      return { success: false };
    }

    revalidatePath("/");

    return { success: true };
  } catch {
    return { success: false };
  }
}

export async function markAllNotificationsReadAction() {
  try {
    const response = await fetchServer("/notifications/read-all", {
      method: "PATCH",
    });

    if (!response.ok) {
      return { success: false };
    }

    revalidatePath("/");

    return { success: true };
  } catch {
    return { success: false };
  }
}
