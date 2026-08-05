"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  BellIcon,
  PackageIcon,
  XCircleIcon,
  CheckCircleIcon,
  StorefrontIcon,
  WalletIcon,
  CheckIcon,
} from "@phosphor-icons/react/dist/ssr";
import type { AppNotification } from "@/services/notificationService";
import {
  getNotificationHref,
  getNotificationIconKey,
  getNotificationMessage,
  formatNotificationTime,
  type NotificationIconKey,
} from "@/lib/notification";
import {
  markNotificationReadAction,
  markAllNotificationsReadAction,
} from "@/actions/notificationActions";

interface NotificationBellProps {
  initialNotifications: AppNotification[];
  initialUnreadCount: number;
}

const ICON_MAP: Record<
  NotificationIconKey,
  { icon: React.ReactNode; tone: string }
> = {
  order: {
    icon: <PackageIcon size={18} />,
    tone: "bg-indigo-50 text-indigo-600",
  },
  "order-cancelled": {
    icon: <XCircleIcon size={18} />,
    tone: "bg-red-50 text-red-600",
  },
  product: {
    icon: <CheckCircleIcon size={18} />,
    tone: "bg-green-50 text-green-600",
  },
  shop: {
    icon: <StorefrontIcon size={18} />,
    tone: "bg-purple-50 text-purple-600",
  },
  withdrawal: {
    icon: <WalletIcon size={18} />,
    tone: "bg-amber-50 text-amber-600",
  },
  bell: { icon: <BellIcon size={18} />, tone: "bg-gray-100 text-gray-600" },
};

export function NotificationBell({
  initialNotifications,
  initialUnreadCount,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleItemClick(notification: AppNotification) {
    if (!notification.read_at) {
      setNotifications((current) =>
        current.map((item) =>
          item.id === notification.id
            ? { ...item, read_at: new Date().toISOString() }
            : item,
        ),
      );
      setUnreadCount((count) => Math.max(0, count - 1));
      markNotificationReadAction(notification.id);
    }

    setIsOpen(false);
  }

  function handleMarkAllRead() {
    setNotifications((current) =>
      current.map((item) => ({
        ...item,
        read_at: item.read_at ?? new Date().toISOString(),
      })),
    );
    setUnreadCount(0);
    markAllNotificationsReadAction();
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label="Notifications"
        className="relative cursor-pointer rounded-full p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
      >
        <BellIcon size={24} />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:w-96">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-indigo-600 transition-colors hover:text-indigo-700"
              >
                <CheckIcon size={13} weight="bold" />
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
                <BellIcon size={32} className="text-gray-300" />
                <p className="text-sm text-gray-400">No notifications yet.</p>
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => {
                  const iconKey = getNotificationIconKey(notification.type);
                  const iconMeta = ICON_MAP[iconKey];
                  const isUnread = !notification.read_at;

                  return (
                    <li key={notification.id}>
                      <Link
                        href={getNotificationHref(notification)}
                        onClick={() => handleItemClick(notification)}
                        className={`flex cursor-pointer gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
                          isUnread ? "bg-indigo-50/40" : ""
                        }`}
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${iconMeta.tone}`}
                        >
                          {iconMeta.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm leading-snug text-gray-700">
                            {getNotificationMessage(notification)}
                          </span>
                          <span className="mt-0.5 block text-xs text-gray-400">
                            {formatNotificationTime(notification.created_at)}
                          </span>
                        </span>
                        {isUnread && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-600" />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
