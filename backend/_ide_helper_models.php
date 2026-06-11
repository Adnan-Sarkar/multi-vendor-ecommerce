<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $phone
 * @property string $address_line_1
 * @property string|null $address_line_2
 * @property string $city
 * @property string $state
 * @property string|null $zip_code
 * @property bool $is_default
 * @property string $type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereAddressLine1($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereAddressLine2($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereIsDefault($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Address whereZipCode($value)
 */
	class Address extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string|null $session_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int|null $coupon_id
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CartItem> $cartItems
 * @property-read int|null $cart_items_count
 * @property-read \App\Models\Coupon|null $coupon
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereCouponId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereSessionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Cart whereUserId($value)
 */
	class Cart extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $cart_id
 * @property int $product_id
 * @property int|null $variant_id
 * @property int $quantity
 * @property numeric $unit_price
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Cart $cart
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\ProductVariant|null $variant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereCartId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CartItem whereVariantId($value)
 */
	class CartItem extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $parent_id
 * @property string $name
 * @property string $slug
 * @property string $description
 * @property string|null $image
 * @property bool $is_active
 * @property int $order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, Category> $children
 * @property-read int|null $children_count
 * @property-read Category|null $parent
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereParentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Category withoutTrashed()
 */
	class Category extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int|null $vendor_id
 * @property string $code
 * @property string $type
 * @property numeric $value
 * @property numeric $min_order_amount
 * @property numeric|null $max_discount_amount
 * @property int|null $max_uses
 * @property int $used_count
 * @property int $max_uses_per_user
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $starts_at
 * @property \Illuminate\Support\Carbon|null $expires_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CouponUsage> $couponUsages
 * @property-read int|null $coupon_usages_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * @property-read int|null $orders_count
 * @property-read \App\Models\VendorProfile|null $vendor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereExpiresAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereMaxDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereMaxUses($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereMaxUsesPerUser($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereMinOrderAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereStartsAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereUsedCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereValue($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Coupon whereVendorId($value)
 */
	class Coupon extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $coupon_id
 * @property int $user_id
 * @property int $order_id
 * @property numeric $discount_amount
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Coupon $coupon
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereCouponId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereDiscountAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CouponUsage whereUserId($value)
 */
	class CouponUsage extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon|null $date_of_birth
 * @property string|null $gender
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CustomerProfile whereUserId($value)
 */
	class CustomerProfile extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $shipping_address_id
 * @property int|null $billing_address_id
 * @property string $order_number
 * @property numeric $coupon_discount
 * @property numeric $subtotal
 * @property numeric $grand_total
 * @property numeric $shipping_cost
 * @property numeric|null $tax
 * @property string $payment_method
 * @property string $payment_status
 * @property string $status
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $cancelled_at
 * @property string|null $cancellation_reason
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property int|null $coupon_id
 * @property int|null $shipping_method_id
 * @property-read \App\Models\Address|null $billingAddress
 * @property-read \App\Models\Coupon|null $coupon
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderItem> $orderItems
 * @property-read int|null $order_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderVendor> $orderVendors
 * @property-read int|null $order_vendors_count
 * @property-read \App\Models\Payment|null $payment
 * @property-read \App\Models\Address $shippingAddress
 * @property-read \App\Models\ShippingMethod|null $shippingMethod
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereBillingAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereCancellationReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereCancelledAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereCouponDiscount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereCouponId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereGrandTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereOrderNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order wherePaymentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereShippingAddressId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereShippingCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereShippingMethodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereTax($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Order withoutTrashed()
 */
	class Order extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $order_id
 * @property int $order_vendor_id
 * @property int $product_id
 * @property int|null $variant_id
 * @property string $product_name
 * @property string $product_sku
 * @property array<array-key, mixed>|null $variant_details
 * @property int $quantity
 * @property numeric $unit_price
 * @property numeric $total
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\OrderVendor $orderVendor
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\ProductVariant|null $variant
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereOrderVendorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereProductName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereProductSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereQuantity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereUnitPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereVariantDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderItem whereVariantId($value)
 */
	class OrderItem extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $order_id
 * @property int $vendor_id
 * @property numeric $subtotal
 * @property numeric|null $shipping_cost
 * @property numeric $commission
 * @property numeric $vendor_earning
 * @property string $status
 * @property string|null $tracking_number
 * @property \Illuminate\Support\Carbon|null $shipped_at
 * @property \Illuminate\Support\Carbon|null $delivered_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order|null $order
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderItem> $orderItems
 * @property-read int|null $order_items_count
 * @property-read \App\Models\VendorProfile $vendor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereCommission($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereDeliveredAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereShippedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereShippingCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereSubtotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereTrackingNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereVendorEarning($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|OrderVendor whereVendorId($value)
 */
	class OrderVendor extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $order_id
 * @property string $payment_method
 * @property string|null $transaction_id
 * @property array<array-key, mixed>|null $gateway_response
 * @property numeric $amount
 * @property string $currency
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $paid_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Order|null $order
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereCurrency($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereGatewayResponse($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment wherePaidAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment wherePaymentMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereTransactionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Payment whereUpdatedAt($value)
 */
	class Payment extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $vendor_id
 * @property string $name
 * @property string $slug
 * @property string $sku
 * @property string $short_description
 * @property string|null $description
 * @property string|null $thumbnail
 * @property numeric $regular_price
 * @property numeric|null $sale_price
 * @property \Illuminate\Support\Carbon|null $sale_start_date
 * @property \Illuminate\Support\Carbon|null $sale_end_date
 * @property int|null $stock_qty
 * @property int|null $low_stock_threshold
 * @property bool $manage_stock
 * @property bool $in_stock
 * @property numeric $weight
 * @property numeric|null $length
 * @property numeric|null $width
 * @property numeric|null $height
 * @property string $status
 * @property bool $is_featured
 * @property int $views
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Category> $categories
 * @property-read int|null $categories_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderItem> $orderItems
 * @property-read int|null $order_items_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $reviews
 * @property-read int|null $reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Tag> $tags
 * @property-read int|null $tags_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductVariant> $variants
 * @property-read int|null $variants_count
 * @property-read \App\Models\VendorProfile $vendor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereInStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereIsFeatured($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereLength($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereLowStockThreshold($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereManageStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereRegularPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSaleEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSalePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSaleStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereShortDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereStockQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereThumbnail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereVendorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereViews($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereWidth($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product withoutTrashed()
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductAttributeValue> $values
 * @property-read int|null $values_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttribute whereUpdatedAt($value)
 */
	class ProductAttribute extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $attribute_id
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ProductAttribute $attribute
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductVariant> $variants
 * @property-read int|null $variants_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue whereAttributeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductAttributeValue whereValue($value)
 */
	class ProductAttributeValue extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $product_id
 * @property string $image_url
 * @property bool $is_primary
 * @property int $sort_order
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereImageUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereIsPrimary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereSortOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductImage whereUpdatedAt($value)
 */
	class ProductImage extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $product_id
 * @property string $sku
 * @property numeric $price
 * @property int $stock_qty
 * @property bool $in_stock
 * @property string|null $image
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\ProductAttributeValue> $attributeValues
 * @property-read int|null $attribute_values_count
 * @property-read \App\Models\Product|null $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereInStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereSku($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereStockQty($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ProductVariant whereUpdatedAt($value)
 */
	class ProductVariant extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $product_id
 * @property int $user_id
 * @property int $order_id
 * @property int $rating
 * @property string|null $title
 * @property string|null $body
 * @property bool $is_approved
 * @property string|null $vendor_reply
 * @property \Illuminate\Support\Carbon|null $vendor_replied_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property-read \App\Models\Order|null $order
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereIsApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereOrderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereVendorRepliedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review whereVendorReply($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review withTrashed(bool $withTrashed = true)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Review withoutTrashed()
 */
	class Review extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $key
 * @property string $value
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Setting whereValue($value)
 */
	class Setting extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string|null $description
 * @property numeric $cost
 * @property int|null $min_delivery_days
 * @property int|null $max_delivery_days
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendorShippingRate> $vendorShippingRates
 * @property-read int|null $vendor_shipping_rates_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereCost($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereMaxDeliveryDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereMinDeliveryDays($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ShippingMethod whereUpdatedAt($value)
 */
	class ShippingMethod extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Tag whereUpdatedAt($value)
 */
	class Tag extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string $phone
 * @property string|null $avatar
 * @property bool $is_active
 * @property string $role
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Address> $addresses
 * @property-read int|null $addresses_count
 * @property-read \App\Models\Cart|null $cart
 * @property-read \App\Models\CustomerProfile|null $customerProfile
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Order> $orders
 * @property-read int|null $orders_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $permissions
 * @property-read int|null $permissions_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Review> $reviews
 * @property-read int|null $reviews_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Role> $roles
 * @property-read int|null $roles_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Spatie\Permission\Models\Permission> $teams
 * @property-read int|null $teams_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \Laravel\Sanctum\PersonalAccessToken> $tokens
 * @property-read int|null $tokens_count
 * @property-read \App\Models\VendorProfile|null $vendorProfile
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Wishlist> $wishlists
 * @property-read int|null $wishlists_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User permission($permissions, bool $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User role($roles, ?string $guard = null, bool $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User team($teams, bool $without = false)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutPermission($permissions)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutRole($roles, ?string $guard = null)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User withoutTeam($teams)
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property string $shop_name
 * @property string $slug
 * @property string $description
 * @property string|null $logo
 * @property string|null $banner
 * @property string $address
 * @property string $city
 * @property string $state
 * @property string|null $zip_code
 * @property string $status
 * @property numeric|null $commission_rate
 * @property numeric $total_withdrawn
 * @property numeric $total_earnings
 * @property numeric $balance
 * @property string|null $rejection_reason
 * @property \Illuminate\Support\Carbon|null $approved_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\OrderVendor> $orderVendors
 * @property-read int|null $order_vendors_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\VendorShippingRate> $vendorShippingRates
 * @property-read int|null $vendor_shipping_rates_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Withdrawal> $withdrawals
 * @property-read int|null $withdrawals_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereApprovedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereBalance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereBanner($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereCity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereCommissionRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereLogo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereRejectionReason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereShopName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereState($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereTotalEarnings($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereTotalWithdrawn($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorProfile whereZipCode($value)
 */
	class VendorProfile extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $vendor_id
 * @property int $shipping_method_id
 * @property numeric $rate
 * @property numeric|null $free_shipping_above
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\ShippingMethod $shippingMethod
 * @property-read \App\Models\VendorProfile $vendor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereFreeShippingAbove($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereShippingMethodId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|VendorShippingRate whereVendorId($value)
 */
	class VendorShippingRate extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $user_id
 * @property int $product_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Product|null $product
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Wishlist whereUserId($value)
 */
	class Wishlist extends \Eloquent {}
}

namespace App\Models{
/**
 * @property int $id
 * @property int $vendor_id
 * @property numeric $amount
 * @property array<array-key, mixed> $account_details
 * @property string|null $admin_note
 * @property string $method
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $processed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\VendorProfile $vendor
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereAccountDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereAdminNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereAmount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereMethod($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereProcessedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Withdrawal whereVendorId($value)
 */
	class Withdrawal extends \Eloquent {}
}

