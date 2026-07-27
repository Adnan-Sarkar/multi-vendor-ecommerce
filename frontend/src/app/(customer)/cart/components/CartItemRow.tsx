"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  PackageIcon,
} from "@phosphor-icons/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { formatMoney, toNumber } from "@/lib/productPricing";
import {
  updateCartItemAction,
  removeCartItemAction,
} from "@/actions/cartActions";
import type { CartItem } from "@/services/cartService";

interface CartItemRowProps {
  item: CartItem;
}

const COMMIT_DELAY_IN_MILLISECONDS = 500;

export function CartItemRow({ item }: CartItemRowProps) {
  const router = useRouter();
  const [isRemoving, startRemoving] = useTransition();

  const [quantity, setQuantity] = useState(item.quantity);
  const [inputValue, setInputValue] = useState(String(item.quantity));
  const [isSyncing, setIsSyncing] = useState(false);

  const committedQuantityRef = useRef(item.quantity);
  const commitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (commitTimerRef.current) {
        clearTimeout(commitTimerRef.current);
      }
    };
  }, []);

  const maxStock = item.available_stock ?? Number.POSITIVE_INFINITY;
  const isAtMaxStock = quantity >= maxStock;

  const commitQuantity = (nextQuantity: number) => {
    if (nextQuantity === committedQuantityRef.current) {
      return;
    }

    setIsSyncing(true);
    updateCartItemAction(item.id, nextQuantity).then((result) => {
      setIsSyncing(false);

      if (result.success) {
        committedQuantityRef.current = nextQuantity;
        router.refresh();
      } else {
        toast.error(result.message);
        setQuantity(committedQuantityRef.current);
        setInputValue(String(committedQuantityRef.current));
      }
    });
  };

  const scheduleCommit = (nextQuantity: number) => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current);
    }

    commitTimerRef.current = setTimeout(
      () => commitQuantity(nextQuantity),
      COMMIT_DELAY_IN_MILLISECONDS,
    );
  };

  const applyQuantity = (nextQuantity: number) => {
    setQuantity(nextQuantity);
    setInputValue(String(nextQuantity));
    scheduleCommit(nextQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      applyQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < maxStock) {
      applyQuantity(quantity + 1);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    setInputValue(rawValue);

    const parsedValue = parseInt(rawValue, 10);
    if (Number.isNaN(parsedValue) || parsedValue < 1) {
      return;
    }

    if (parsedValue > maxStock) {
      toast.error(`Only ${item.available_stock} in stock.`);
      applyQuantity(maxStock);
      return;
    }

    applyQuantity(parsedValue);
  };

  const handleInputBlur = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (Number.isNaN(parsedValue) || parsedValue < 1) {
      setInputValue(String(quantity));
    }
  };

  const removeItem = () => {
    if (commitTimerRef.current) {
      clearTimeout(commitTimerRef.current);
    }

    startRemoving(async () => {
      const result = await removeCartItemAction(item.id);

      if (result.success) {
        toast.success(result.message);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    });
  };

  const imageUrl = item.product.thumbnail ?? item.product.primary_image;
  const attributeValues = item.variant?.attribute_values ?? [];
  const optimisticSubtotal = toNumber(item.unit_price) * quantity;

  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md sm:gap-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={item.product.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-300">
            <PackageIcon size={24} />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3
            title={item.product.name}
            className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900"
          >
            {item.product.name}
          </h3>
          {attributeValues.length > 0 && (
            <span className="max-w-[40%] shrink-0 truncate text-xs text-indigo-600">
              {attributeValues.map((value) => value.value).join(" · ")}
            </span>
          )}
        </div>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-600">
            {formatMoney(item.unit_price)}
          </span>

          {item.available_stock !== null && (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[11px] font-medium ${
                isAtMaxStock
                  ? "bg-amber-50 text-amber-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              <span
                className={`h-1 w-1 rounded-full ${
                  isAtMaxStock ? "bg-amber-500" : "bg-green-500"
                }`}
              />
              {isAtMaxStock
                ? "Max quantity"
                : `${item.available_stock} in stock`}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center rounded-lg border border-gray-200">
        <button
          onClick={decreaseQuantity}
          disabled={quantity <= 1}
          title="Decrease quantity"
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-l-lg text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <MinusIcon size={14} weight="bold" />
        </button>

        <input
          type="number"
          min={1}
          inputMode="numeric"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          aria-label="Quantity"
          className="w-10 border-x border-gray-200 bg-transparent py-1.5 text-center text-sm font-semibold text-gray-900 outline-none [appearance:textfield] focus:bg-indigo-50/40 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />

        <button
          onClick={increaseQuantity}
          disabled={isAtMaxStock}
          title={isAtMaxStock ? "Reached available stock" : "Increase quantity"}
          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-r-lg text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <PlusIcon size={14} weight="bold" />
        </button>
      </div>

      <span
        className={`w-24 shrink-0 text-right text-sm font-bold text-gray-900 transition-opacity ${
          isSyncing ? "opacity-50" : "opacity-100"
        }`}
      >
        {formatMoney(optimisticSubtotal)}
      </span>

      <button
        onClick={removeItem}
        disabled={isRemoving}
        title="Remove item"
        className="shrink-0 cursor-pointer rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <TrashIcon size={18} />
      </button>
    </div>
  );
}
