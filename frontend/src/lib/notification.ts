import type { AppNotification } from "@/services/notificationService";

export type NotificationIconKey =
  | "order"
  | "order-cancelled"
  | "product"
  | "shop"
  | "withdrawal"
  | "bell";

export function getNotificationIconKey(type: string): NotificationIconKey {
  switch (type) {
    case "OrderPlacedNotification":
      return "order";
    case "OrderCancelledNotification":
      return "order-cancelled";
    case "ProductApprovedNotification":
      return "product";
    case "VendorApprovedNotification":
      return "shop";
    case "WithdrawalApprovedNotification":
      return "withdrawal";
    default:
      return "bell";
  }
}

export function getNotificationHref(notification: AppNotification): string {
  switch (notification.type) {
    case "OrderPlacedNotification":
    case "OrderCancelledNotification":
      return "/orders";
    case "WithdrawalApprovedNotification":
      return "/dashboard/withdrawals";
    case "ProductApprovedNotification":
    case "VendorApprovedNotification":
      return "/dashboard";
    default:
      return "/notifications";
  }
}

export function getNotificationMessage(notification: AppNotification): string {
  return notification.data.message ?? "You have a new notification.";
}

export function formatNotificationTime(isoDate: string): string {
  const created = new Date(isoDate).getTime();
  const now = Date.now();
  const seconds = Math.round((now - created) / 1000);

  if (seconds < 60) {
    return "Just now";
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ago`;
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return `${hours}h ago`;
  }

  const days = Math.round(hours / 24);
  if (days < 7) {
    return `${days}d ago`;
  }

  return new Date(isoDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}
