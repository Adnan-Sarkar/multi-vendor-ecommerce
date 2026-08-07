<?php

namespace Database\Seeders;

use App\Models\Address;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Category;
use App\Models\Coupon;
use App\Models\CouponUsage;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderVendor;
use App\Models\Payment;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use App\Models\Tag;
use App\Models\User;
use App\Models\VendorProfile;
use App\Models\Wishlist;
use App\Models\Withdrawal;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

class DemoDataSeeder extends Seeder
{
    private array $categoryTree = [
        'Electronics' => ['Mobile Phones', 'Laptops', 'Audio', 'Cameras'],
        'Fashion' => ['Men', 'Women', 'Kids', 'Accessories'],
        'Home & Living' => ['Furniture', 'Kitchen', 'Decor'],
        'Beauty & Health' => ['Skincare', 'Makeup', 'Wellness'],
        'Sports & Outdoors' => ['Fitness', 'Cycling', 'Camping'],
        'Books' => ['Fiction', 'Non Fiction', 'Children'],
        'Toys & Games' => ['Board Games', 'Educational'],
        'Groceries' => ['Beverages', 'Snacks'],
    ];

    private array $productImages = [
        'Mobile Phones' => 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
        'Laptops' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600',
        'Audio' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600',
        'Cameras' => 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600',
        'Men' => 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=600',
        'Women' => 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
        'Kids' => 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600',
        'Accessories' => 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600',
        'Furniture' => 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600',
        'Kitchen' => 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600',
        'Decor' => 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600',
        'Skincare' => 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600',
        'Makeup' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600',
        'Wellness' => 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600',
        'Fitness' => 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600',
        'Cycling' => 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=600',
        'Camping' => 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600',
        'Fiction' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
        'Non Fiction' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
        'Children' => 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600',
        'Board Games' => 'https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=600',
        'Educational' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600',
        'Beverages' => 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
        'Snacks' => 'https://images.unsplash.com/photo-1599629954294-14df9ec8bc5a?w=600',
    ];

    private array $shopNames = [
        'Rahman Electronics BD', 'Dhaka Fashion House', 'Green Home Store',
        'Glow Beauty Shop', 'Active Sports Hub', 'Readers Corner',
        'Kids Wonderland', 'Fresh Mart', 'Tech Galaxy', 'Urban Threads',
        'Cozy Living', 'Pure Skin Care', 'Peak Outdoors', 'Page Turner Books',
        'Play Time Toys',
    ];

    public function run(): void
    {
        $childCategories = $this->seedCategories();
        $tags = $this->seedTags();
        $approvedVendors = $this->seedVendors();
        $this->seedPendingAndRejectedVendors();
        $products = $this->seedProducts($approvedVendors, $childCategories, $tags);
        $customers = $this->seedCustomers();
        $this->seedOrdersAndReviews($customers, $products, $approvedVendors);
        $this->seedCoupons($approvedVendors);
        $this->seedWithdrawals($approvedVendors);
        $this->seedWishlistAndCart($customers, $products);
    }

    private function seedCategories(): array
    {
        $childCategories = [];
        $order = 0;

        foreach ($this->categoryTree as $parentName => $children) {
            $parent = Category::create([
                'name' => $parentName,
                'slug' => Str::slug($parentName),
                'description' => "Browse the best {$parentName} on the marketplace.",
                'image' => 'https://picsum.photos/seed/' . Str::slug($parentName) . '/400/300',
                'is_active' => true,
                'order' => $order++,
                'parent_id' => null,
            ]);

            $childOrder = 0;
            foreach ($children as $childName) {
                $childCategories[] = Category::create([
                    'name' => $childName,
                    'slug' => Str::slug($childName),
                    'description' => "Shop {$childName} products.",
                    'image' => 'https://picsum.photos/seed/' . Str::slug($childName) . '/400/300',
                    'is_active' => true,
                    'order' => $childOrder++,
                    'parent_id' => $parent->id,
                ]);
            }
        }

        return $childCategories;
    }

    private function seedTags(): array
    {
        $tagNames = [
            'New Arrival', 'Bestseller', 'Premium', 'Eco Friendly', 'Limited Edition',
            'Trending', 'Budget', 'Imported', 'Handmade', 'Gift Idea',
            'Summer', 'Winter', 'Organic', 'Wireless', 'Portable',
        ];

        $tags = [];
        foreach ($tagNames as $name) {
            $tags[] = Tag::create(['name' => $name, 'slug' => Str::slug($name)]);
        }

        return $tags;
    }

    private function seedVendors(): array
    {
        $vendors = [];

        $demoVendorUser = User::create([
            'name' => 'Abdur Rahman',
            'email' => 'rahman@test.com',
            'password' => 'password123',
            'role' => 'vendor',
            'is_active' => true,
            'phone' => '01710000001',
        ]);
        $demoVendorUser->assignRole('vendor');

        $vendors[] = $this->createVendorProfile($demoVendorUser, $this->shopNames[0]);

        for ($index = 1; $index < count($this->shopNames); $index++) {
            $user = User::factory()->create([
                'role' => 'vendor',
                'name' => fake()->name(),
            ]);
            $user->assignRole('vendor');
            $vendors[] = $this->createVendorProfile($user, $this->shopNames[$index]);
        }

        return $vendors;
    }

    private function createVendorProfile(User $user, string $shopName): VendorProfile
    {
        return VendorProfile::create([
            'user_id' => $user->id,
            'shop_name' => $shopName,
            'slug' => Str::slug($shopName),
            'description' => "{$shopName} sells quality products with fast delivery and friendly support.",
            'logo' => 'https://picsum.photos/seed/' . Str::slug($shopName) . '-logo/200/200',
            'banner' => 'https://picsum.photos/seed/' . Str::slug($shopName) . '-banner/1200/300',
            'address' => fake()->streetAddress(),
            'city' => fake()->randomElement(['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']),
            'state' => 'Bangladesh',
            'zip_code' => fake()->postcode(),
            'status' => 'approved',
            'commission_rate' => 10.00,
            'total_withdrawn' => 0,
            'total_earnings' => 0,
            'balance' => 0,
            'approved_at' => now(),
        ]);
    }

    private function seedPendingAndRejectedVendors(): void
    {
        for ($index = 0; $index < 3; $index++) {
            $user = User::factory()->create(['role' => 'vendor']);
            $user->assignRole('vendor');
            $shopName = fake()->unique()->company();
            VendorProfile::create([
                'user_id' => $user->id,
                'shop_name' => $shopName,
                'slug' => Str::slug($shopName) . '-' . $index,
                'description' => 'Application under review.',
                'address' => fake()->streetAddress(),
                'city' => fake()->city(),
                'state' => 'Bangladesh',
                'zip_code' => fake()->postcode(),
                'status' => 'pending',
                'commission_rate' => 10.00,
            ]);
        }

        $rejectedUser = User::factory()->create(['role' => 'vendor']);
        $rejectedUser->assignRole('vendor');
        VendorProfile::create([
            'user_id' => $rejectedUser->id,
            'shop_name' => 'Unverified Store',
            'slug' => 'unverified-store',
            'description' => 'Did not pass verification.',
            'address' => fake()->streetAddress(),
            'city' => fake()->city(),
            'state' => 'Bangladesh',
            'zip_code' => fake()->postcode(),
            'status' => 'rejected',
            'rejection_reason' => 'Incomplete business documents.',
            'commission_rate' => 10.00,
        ]);
    }

    private function seedProducts(array $vendors, array $childCategories, array $tags): array
    {
        $products = [];
        $vendorCount = count($vendors);

        foreach ($childCategories as $categoryIndex => $category) {
            $imageUrl = $this->productImages[$category->name] ?? 'https://picsum.photos/seed/product/600/600';
            $productsPerCategory = 3;

            for ($number = 1; $number <= $productsPerCategory; $number++) {
                $vendor = $vendors[($categoryIndex + $number) % $vendorCount];
                $name = $category->name . ' ' . fake()->randomElement(['Pro', 'Classic', 'Deluxe', 'Essential', 'Max', 'Lite']) . ' ' . fake()->numberBetween(100, 999);
                $regularPrice = fake()->numberBetween(500, 90000);

                $productBuilder = Product::factory();

                $position = ($categoryIndex * $productsPerCategory) + $number;
                if ($position % 7 === 0) {
                    $productBuilder = $productBuilder->featured();
                }
                if ($position % 5 === 0) {
                    $productBuilder = $productBuilder->onSale();
                }
                if ($position % 13 === 0) {
                    $productBuilder = $productBuilder->outOfStock();
                } elseif ($position % 11 === 0) {
                    $productBuilder = $productBuilder->lowStock();
                }

                $product = $productBuilder->create([
                    'vendor_id' => $vendor->id,
                    'name' => $name,
                    'slug' => Str::slug($name) . '-' . Str::random(5),
                    'regular_price' => $regularPrice,
                    'short_description' => "High quality {$category->name} product loved by customers.",
                    'description' => fake()->paragraphs(3, true),
                    'thumbnail' => $imageUrl,
                    'created_at' => fake()->dateTimeBetween('-8 months', 'now'),
                ]);

                $product->categories()->attach($category->id);
                $product->tags()->attach(
                    collect($tags)->random(fake()->numberBetween(1, 3))->pluck('id')->all()
                );

                foreach ([true, false, false] as $primaryIndex => $isPrimary) {
                    ProductImage::create([
                        'product_id' => $product->id,
                        'image_url' => $imageUrl,
                        'is_primary' => $isPrimary,
                        'sort_order' => $primaryIndex,
                    ]);
                }

                $products[] = $product;
            }
        }

        return $products;
    }

    private function seedCustomers(): array
    {
        $customers = [];

        $demoCustomer = User::create([
            'name' => 'Aduvai Khan',
            'email' => 'aduvai@gmail.com',
            'password' => 'password123',
            'role' => 'customer',
            'is_active' => true,
            'phone' => '01720000001',
        ]);
        $demoCustomer->assignRole('customer');
        $customers[] = $demoCustomer;

        $factoryCustomers = User::factory(29)->create(['role' => 'customer']);
        foreach ($factoryCustomers as $customer) {
            $customer->assignRole('customer');
            $customers[] = $customer;
        }

        foreach ($customers as $customer) {
            Address::create([
                'user_id' => $customer->id,
                'name' => $customer->name,
                'phone' => $customer->phone,
                'address_line_1' => fake()->streetAddress(),
                'city' => fake()->randomElement(['Dhaka', 'Chittagong', 'Sylhet']),
                'state' => 'Bangladesh',
                'zip_code' => fake()->postcode(),
                'is_default' => true,
                'type' => 'shipping',
            ]);
        }

        return $customers;
    }

    private function seedOrdersAndReviews(array $customers, array $products, array $vendors): void
    {
        $statuses = [
            'delivered', 'delivered', 'delivered', 'delivered',
            'shipped', 'shipped', 'processing', 'processing',
            'confirmed', 'pending', 'cancelled',
        ];

        $vendorEarnings = [];

        for ($index = 0; $index < 60; $index++) {
            $customer = fake()->randomElement($customers);
            $address = Address::where('user_id', $customer->id)->first();
            $status = fake()->randomElement($statuses);
            $createdAt = Carbon::instance(fake()->dateTimeBetween('-7 months', 'now'));

            $chosenProducts = collect($products)->random(fake()->numberBetween(1, 3));
            $subtotal = 0;
            $itemsByVendor = [];

            foreach ($chosenProducts as $product) {
                $quantity = fake()->numberBetween(1, 3);
                $unitPrice = $product->sale_price ?? $product->regular_price;
                $lineTotal = $unitPrice * $quantity;
                $subtotal += $lineTotal;
                $itemsByVendor[$product->vendor_id][] = [
                    'product' => $product,
                    'quantity' => $quantity,
                    'unit_price' => $unitPrice,
                    'total' => $lineTotal,
                ];
            }

            $shipping = 60 * count($itemsByVendor);
            $tax = 0;
            $grandTotal = $subtotal + $shipping + $tax;
            $paymentMethod = fake()->randomElement(['sslcommerz', 'bkash', 'cod']);
            $isPaid = $status !== 'pending' && $status !== 'cancelled';

            $order = Order::create([
                'user_id' => $customer->id,
                'shipping_address_id' => $address->id,
                'billing_address_id' => $address->id,
                'order_number' => 'ORD-' . strtoupper(Str::random(8)),
                'coupon_discount' => 0,
                'subtotal' => $subtotal,
                'grand_total' => $grandTotal,
                'shipping_cost' => $shipping,
                'tax' => $tax,
                'payment_method' => $paymentMethod,
                'payment_status' => $isPaid ? 'paid' : ($status === 'cancelled' ? 'refunded' : 'pending'),
                'status' => $status,
                'cancelled_at' => $status === 'cancelled' ? $createdAt->copy()->addDays(1) : null,
                'cancellation_reason' => $status === 'cancelled' ? 'Customer changed mind.' : null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            Payment::create([
                'order_id' => $order->id,
                'payment_method' => $paymentMethod,
                'transaction_id' => $isPaid ? strtoupper(Str::random(12)) : null,
                'amount' => $grandTotal,
                'currency' => 'BDT',
                'status' => $isPaid ? 'paid' : ($status === 'cancelled' ? 'refunded' : 'pending'),
                'paid_at' => $isPaid ? $createdAt : null,
                'created_at' => $createdAt,
                'updated_at' => $createdAt,
            ]);

            foreach ($itemsByVendor as $vendorId => $items) {
                $vendorSubtotal = array_sum(array_column($items, 'total'));
                $commission = round($vendorSubtotal * 0.10, 2);
                $vendorEarning = $vendorSubtotal - $commission;

                $orderVendor = OrderVendor::create([
                    'order_id' => $order->id,
                    'vendor_id' => $vendorId,
                    'subtotal' => $vendorSubtotal,
                    'shipping_cost' => 60,
                    'commission' => $commission,
                    'vendor_earning' => $vendorEarning,
                    'status' => $status,
                    'tracking_number' => in_array($status, ['shipped', 'delivered'], true) ? strtoupper(Str::random(10)) : null,
                    'shipped_at' => in_array($status, ['shipped', 'delivered'], true) ? $createdAt->copy()->addDays(1) : null,
                    'delivered_at' => $status === 'delivered' ? $createdAt->copy()->addDays(3) : null,
                    'created_at' => $createdAt,
                    'updated_at' => $createdAt,
                ]);

                if ($status === 'delivered') {
                    $vendorEarnings[$vendorId] = ($vendorEarnings[$vendorId] ?? 0) + $vendorEarning;
                }

                foreach ($items as $item) {
                    OrderItem::create([
                        'order_id' => $order->id,
                        'order_vendor_id' => $orderVendor->id,
                        'product_id' => $item['product']->id,
                        'product_name' => $item['product']->name,
                        'product_sku' => $item['product']->sku,
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total' => $item['total'],
                        'created_at' => $createdAt,
                        'updated_at' => $createdAt,
                    ]);

                    if ($status === 'delivered' && fake()->boolean(70)) {
                        $this->createReview($item['product'], $customer, $order, $createdAt);
                    }
                }
            }
        }

        foreach ($vendorEarnings as $vendorId => $earning) {
            $vendor = VendorProfile::find($vendorId);
            if ($vendor) {
                $vendor->update([
                    'total_earnings' => $earning,
                    'balance' => $earning,
                ]);
            }
        }
    }

    private function createReview(Product $product, User $customer, Order $order, Carbon $createdAt): void
    {
        $rating = fake()->randomElement([5, 5, 5, 4, 4, 4, 3, 2, 1]);
        $hasReply = fake()->boolean(25);

        Review::create([
            'product_id' => $product->id,
            'user_id' => $customer->id,
            'order_id' => $order->id,
            'rating' => $rating,
            'title' => fake()->randomElement(['Great product', 'Good value', 'As described', 'Happy with it', 'Could be better']),
            'body' => fake()->sentence(12),
            'is_approved' => fake()->boolean(80),
            'vendor_reply' => $hasReply ? 'Thank you for your feedback.' : null,
            'vendor_replied_at' => $hasReply ? $createdAt->copy()->addDays(4) : null,
            'created_at' => $createdAt->copy()->addDays(4),
            'updated_at' => $createdAt->copy()->addDays(4),
        ]);
    }

    private function seedCoupons(array $vendors): void
    {
        foreach ($vendors as $index => $vendor) {
            Coupon::create([
                'vendor_id' => $vendor->id,
                'code' => 'SAVE' . (10 + $index),
                'type' => 'percentage',
                'value' => fake()->randomElement([5, 10, 15, 20]),
                'min_order_amount' => 1000,
                'max_discount_amount' => 2000,
                'max_uses' => 100,
                'used_count' => fake()->numberBetween(0, 40),
                'max_uses_per_user' => 1,
                'is_active' => true,
                'starts_at' => now()->subMonth(),
                'expires_at' => now()->addMonths(2),
            ]);

            if ($index % 3 === 0) {
                Coupon::create([
                    'vendor_id' => $vendor->id,
                    'code' => 'FLAT' . (100 + $index),
                    'type' => 'flat',
                    'value' => 200,
                    'min_order_amount' => 1500,
                    'max_uses' => 50,
                    'used_count' => 50,
                    'max_uses_per_user' => 1,
                    'is_active' => true,
                    'starts_at' => now()->subMonths(3),
                    'expires_at' => now()->subWeek(),
                ]);
            }
        }
    }

    private function seedWithdrawals(array $vendors): void
    {
        $statuses = ['pending', 'approved', 'approved', 'rejected'];

        foreach ($vendors as $vendor) {
            $count = fake()->numberBetween(0, 3);
            for ($index = 0; $index < $count; $index++) {
                $status = fake()->randomElement($statuses);
                $method = fake()->randomElement(['bank', 'bkash']);
                Withdrawal::create([
                    'vendor_id' => $vendor->id,
                    'amount' => fake()->numberBetween(1000, 20000),
                    'account_details' => $method === 'bank'
                        ? ['bank_name' => 'BRAC Bank', 'account_number' => fake()->bankAccountNumber()]
                        : ['bkash_number' => fake()->numerify('017########')],
                    'admin_note' => $status === 'rejected' ? 'Insufficient balance.' : null,
                    'method' => $method,
                    'status' => $status,
                    'processed_at' => $status === 'pending' ? null : now()->subDays(fake()->numberBetween(1, 30)),
                ]);
            }
        }
    }

    private function seedWishlistAndCart(array $customers, array $products): void
    {
        $demoCustomer = $customers[0];

        $wishlistProducts = collect($products)->random(6);
        foreach ($wishlistProducts as $product) {
            Wishlist::create([
                'user_id' => $demoCustomer->id,
                'product_id' => $product->id,
            ]);
        }

        $cart = Cart::create(['user_id' => $demoCustomer->id]);
        $cartProducts = collect($products)->random(3);
        foreach ($cartProducts as $product) {
            CartItem::create([
                'cart_id' => $cart->id,
                'product_id' => $product->id,
                'quantity' => fake()->numberBetween(1, 2),
                'unit_price' => $product->sale_price ?? $product->regular_price,
            ]);
        }

        foreach (collect($customers)->slice(1, 10) as $customer) {
            $product = collect($products)->random();
            Wishlist::create([
                'user_id' => $customer->id,
                'product_id' => $product->id,
            ]);
        }
    }
}
