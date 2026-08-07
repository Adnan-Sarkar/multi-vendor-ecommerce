# MultiVendor Ecommerce API

<p align="left">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/PHP-8.3-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Sanctum-Auth-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Sanctum" />
</p>

This is the REST API for the MultiVendor Ecommerce platform. It handles authentication, the product catalog, carts, orders, payments, reviews, vendor payouts, and admin moderation. The API returns JSON and is consumed by a separate Next.js frontend.

## Live

Not deployed yet. Update this link after publishing.

| Part         | Link                           | URL                       |
| ------------ | ------------------------------ | ------------------------- |
| API base URL | [API](https://api.example.com) | `https://api.example.com` |

## Contents

| Section                         | What it covers                      |
| ------------------------------- | ----------------------------------- |
| [Live](#live)                   | Deployed API link                   |
| [Tech stack](#tech-stack)       | Framework, language, and tools      |
| [Architecture](#architecture)   | Layered structure and folder layout |
| [Roles](#roles)                 | User roles and what they can do     |
| [Features](#features)           | What the API can do                 |
| [Requirements](#requirements)   | What you need to run it             |
| [Setup](#setup)                 | Install and run steps               |
| [Environment](#environment)     | Environment variables               |
| [Testing](#testing)             | How to run the tests                |
| [API endpoints](#api-endpoints) | Full endpoint reference by domain   |

## Tech stack

- Laravel 13 on PHP 8.3
- PostgreSQL for the database
- Laravel Sanctum for token authentication
- Spatie Permission for roles and permissions
- SSLCommerz for online payments
- Database queue for background jobs such as notifications and email

## Architecture

The code follows a layered structure so each part has one job. A request moves through these layers.

```text
Route -> Controller -> Form Request -> Service -> Repository -> Model
                                          |
                                       Resource (JSON response)
```

- Controllers receive the request and return a response
- Form Requests validate the input
- Services hold the business rules
- Repositories run the database queries
- Resources shape the JSON that goes back to the client
- An `ApiResponse` trait keeps the response format the same everywhere

Folders inside `app`:

```text
app/
├── Http/
│   ├── Controllers/Api/V1/   Public, Vendor, and Admin controllers
│   ├── Requests/             Validation rules
│   └── Resources/            JSON response shapes
├── Services/                 Business logic
├── Repositories/             Database access
├── Models/                   Eloquent models
├── Notifications/            Database notifications
├── Mail/                     Mailables
└── Traits/                   Shared helpers such as ApiResponse
```

## Roles

Users are assigned a role that controls what they can do.

- Customer: shopping, orders, reviews, and wishlist
- Vendor: shop management, products, orders, coupons, and withdrawals
- Admin and Super Admin: moderation, catalog management, and analytics

## Features

Authentication

- Register, log in, and log out with Sanctum tokens
- Forgot password and reset password with an OTP
- Change password
- Separate profile update for customers and vendors
- Vendor registration that waits for admin approval

Catalog

- Nested categories with parent and child levels
- Tags and product attributes with values
- Products with variants, images, and stock control
- Product listing with search, category, price range, vendor, and sort filters
- Public vendor storefront endpoints with shop stats

Shopping and orders

- Cart and cart items
- Coupons with usage tracking
- Orders that split into per vendor parts so each vendor sees their own items
- Order status flow with a tracking number
- Online payment through SSLCommerz and a cash on delivery option

Reviews and wishlist

- Product reviews with admin approval
- Vendor replies to reviews
- Wishlist

Vendor tools

- Dashboard with sales stats and recent orders
- Order management and status updates
- Coupon management for the vendor's own shop
- Withdrawal requests from the shop balance

Admin tools

- Approve or reject vendors and products
- Moderate reviews
- Manage categories, tags, and attributes
- Manage all orders and withdrawal requests
- Dashboard with revenue, orders, customers, ratings, and other metrics over a selected date range

Notifications

- Database notifications for events such as order placed, order cancelled, product approved, vendor approved, and withdrawal approved

## Requirements

- PHP 8.3 or newer
- Composer
- PostgreSQL 14 or newer

## Setup

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Set the database and payment values in `.env`, then run the migrations and seeders.

```bash
php artisan migrate
php artisan db:seed
```

Start the server.

```bash
php artisan serve
```

The queue runs jobs like notifications and email. Start a worker in a second terminal.

```bash
php artisan queue:work
```

## Environment

Key values in `.env`:

| Variable                 | Purpose                                        |
| ------------------------ | ---------------------------------------------- |
| DB_CONNECTION            | Set to `pgsql`                                 |
| DB_HOST, DB_PORT         | Database host and port                         |
| DB_DATABASE              | Database name                                  |
| DB_USERNAME, DB_PASSWORD | Database credentials                           |
| QUEUE_CONNECTION         | Set to `database`                              |
| CACHE_STORE              | Set to `database`                              |
| MAIL_MAILER              | Mail transport for password reset and receipts |
| SSLC_STORE_ID            | SSLCommerz store id                            |
| SSLC_STORE_PASSWORD      | SSLCommerz store password                      |
| SSLC_SANDBOX             | Set to `true` for testing                      |
| SSLC_STORE_CURRENCY      | Store currency, for example BDT                |

## Testing

```bash
php artisan test
```

## API endpoints

All endpoints are prefixed with `/api/v1`. The access column shows who can call each endpoint. Protected calls need a Bearer token from the login response, and the role is checked where noted.

Authentication

| Method | Endpoint               | Description                    | Access        |
| ------ | ---------------------- | ------------------------------ | ------------- |
| POST   | /auth/register         | Register a customer            | Public        |
| POST   | /auth/login            | Log in and get a token         | Public        |
| POST   | /auth/register-vendor  | Apply as a vendor              | Public        |
| POST   | /auth/forgot-password  | Send a reset OTP               | Public        |
| POST   | /auth/reset-password   | Reset the password with an OTP | Public        |
| POST   | /auth/logout           | Log out                        | Authenticated |
| POST   | /auth/change-password  | Change the password            | Authenticated |
| GET    | /auth/profile          | Get the current profile        | Authenticated |
| PATCH  | /auth/profile/customer | Update the customer profile    | Customer      |
| PATCH  | /auth/profile/vendor   | Update the vendor profile      | Vendor        |

Categories

| Method | Endpoint             | Description       | Access |
| ------ | -------------------- | ----------------- | ------ |
| GET    | /category            | List categories   | Public |
| GET    | /category/{category} | Get one category  | Public |
| POST   | /category            | Create a category | Admin  |
| PATCH  | /category/{category} | Update a category | Admin  |
| DELETE | /category/{category} | Delete a category | Admin  |

Tags

| Method | Endpoint   | Description  | Access |
| ------ | ---------- | ------------ | ------ |
| GET    | /tag       | List tags    | Public |
| POST   | /tag       | Create a tag | Admin  |
| DELETE | /tag/{tag} | Delete a tag | Admin  |

Attributes

| Method | Endpoint                      | Description                 | Access |
| ------ | ----------------------------- | --------------------------- | ------ |
| GET    | /attribute                    | List attributes             | Public |
| POST   | /attribute                    | Create an attribute         | Admin  |
| POST   | /attribute/{attribute}/values | Add a value to an attribute | Admin  |
| DELETE | /attribute/{attribute}        | Delete an attribute         | Admin  |
| DELETE | /attribute/values/{value}     | Delete an attribute value   | Admin  |

Products

| Method | Endpoint                              | Description                      | Access |
| ------ | ------------------------------------- | -------------------------------- | ------ |
| GET    | /product                              | List products with filters       | Public |
| GET    | /product/{slug}                       | Get product details              | Public |
| GET    | /product/{slug}/reviews               | Get product reviews              | Public |
| GET    | /product/{slug}/variants              | Get product variants             | Public |
| GET    | /product/me/products                  | List the vendor's own products   | Vendor |
| GET    | /product/me/products/{product}        | Get one of the vendor's products | Vendor |
| POST   | /product                              | Create a product                 | Vendor |
| PATCH  | /product/{product}                    | Update a product                 | Vendor |
| DELETE | /product/{product}                    | Delete a product                 | Vendor |
| POST   | /product/{product}/images             | Add product images               | Vendor |
| POST   | /product/{product}/variants           | Add a product variant            | Vendor |
| PATCH  | /product/{product}/variants/{variant} | Update a variant                 | Vendor |
| DELETE | /product/{product}/variants/{variant} | Delete a variant                 | Vendor |

Vendor storefront

| Method | Endpoint                 | Description                  | Access |
| ------ | ------------------------ | ---------------------------- | ------ |
| GET    | /vendors                 | List approved vendors        | Public |
| GET    | /vendors/{slug}          | Get a vendor with shop stats | Public |
| GET    | /vendors/{slug}/products | List a vendor's products     | Public |

Cart

| Method | Endpoint         | Description             | Access   |
| ------ | ---------------- | ----------------------- | -------- |
| GET    | /cart            | Get the cart            | Customer |
| POST   | /cart            | Add an item to the cart | Customer |
| PATCH  | /cart/{cartItem} | Update a cart item      | Customer |
| DELETE | /cart/{cartItem} | Remove a cart item      | Customer |
| DELETE | /cart            | Clear the cart          | Customer |

Wishlist

| Method | Endpoint            | Description                        | Access   |
| ------ | ------------------- | ---------------------------------- | -------- |
| GET    | /wishlist           | Get the wishlist                   | Customer |
| GET    | /wishlist/ids       | Get wishlisted product ids         | Customer |
| POST   | /wishlist           | Add a product to the wishlist      | Customer |
| DELETE | /wishlist/{product} | Remove a product from the wishlist | Customer |

Addresses

| Method | Endpoint                       | Description             | Access   |
| ------ | ------------------------------ | ----------------------- | -------- |
| GET    | /address                       | List addresses          | Customer |
| POST   | /address                       | Create an address       | Customer |
| PATCH  | /address/{address}             | Update an address       | Customer |
| DELETE | /address/{address}             | Delete an address       | Customer |
| PATCH  | /address/{address}/set-default | Set the default address | Customer |

Coupons

| Method | Endpoint                | Description               | Access   |
| ------ | ----------------------- | ------------------------- | -------- |
| POST   | /coupon/apply           | Apply a coupon            | Customer |
| GET    | /vendor/coupon          | List the vendor's coupons | Vendor   |
| POST   | /vendor/coupon          | Create a coupon           | Vendor   |
| DELETE | /vendor/coupon/{coupon} | Delete a coupon           | Vendor   |
| GET    | /admin/coupon           | List all coupons          | Admin    |
| DELETE | /admin/coupon/{coupon}  | Delete any coupon         | Admin    |

Orders

| Method | Endpoint                                     | Description                | Access   |
| ------ | -------------------------------------------- | -------------------------- | -------- |
| GET    | /order                                       | List the customer's orders | Customer |
| POST   | /order                                       | Place an order             | Customer |
| GET    | /order/{order}                               | Get an order               | Customer |
| PATCH  | /order/{order}/cancel                        | Cancel an order            | Customer |
| GET    | /vendor/orders                               | List the vendor's orders   | Vendor   |
| PATCH  | /vendor/orders/{orderVendor}                 | Update an order status     | Vendor   |
| PATCH  | /vendor/orders/{orderVendor}/tracking-number | Set a tracking number      | Vendor   |
| GET    | /admin/orders                                | List all orders            | Admin    |

Payment

| Method | Endpoint                  | Description                 | Access   |
| ------ | ------------------------- | --------------------------- | -------- |
| POST   | /payment/{order}/initiate | Start an SSLCommerz payment | Customer |

Reviews

| Method | Endpoint                          | Description                       | Access   |
| ------ | --------------------------------- | --------------------------------- | -------- |
| POST   | /review                           | Create a review                   | Customer |
| GET    | /vendor/reviews/product/{product} | List reviews for a vendor product | Vendor   |
| PATCH  | /vendor/reviews/{review}/reply    | Reply to a review                 | Vendor   |
| GET    | /admin/review                     | List reviews to moderate          | Admin    |
| POST   | /admin/review/{review}/approve    | Approve a review                  | Admin    |

Withdrawals

| Method | Endpoint                                | Description                   | Access |
| ------ | --------------------------------------- | ----------------------------- | ------ |
| GET    | /vendor/withdrawals                     | List the vendor's withdrawals | Vendor |
| POST   | /vendor/withdrawals                     | Request a withdrawal          | Vendor |
| GET    | /admin/withdrawals                      | List withdrawal requests      | Admin  |
| POST   | /admin/withdrawals/{withdrawal}/approve | Approve a withdrawal          | Admin  |
| POST   | /admin/withdrawals/{withdrawal}/reject  | Reject a withdrawal           | Admin  |

Notifications

| Method | Endpoint                    | Description          | Access        |
| ------ | --------------------------- | -------------------- | ------------- |
| GET    | /notifications              | List notifications   | Authenticated |
| GET    | /notifications/unread-count | Get the unread count | Authenticated |
| PATCH  | /notifications/read-all     | Mark all as read     | Authenticated |
| PATCH  | /notifications/{id}/read    | Mark one as read     | Authenticated |

Dashboard

| Method | Endpoint          | Description                            | Access |
| ------ | ----------------- | -------------------------------------- | ------ |
| GET    | /vendor/dashboard | Vendor dashboard data                  | Vendor |
| GET    | /admin/dashboard  | Admin dashboard data with a date range | Admin  |

Admin moderation

| Method | Endpoint                              | Description                      | Access |
| ------ | ------------------------------------- | -------------------------------- | ------ |
| GET    | /admin/vendor                         | List vendors filtered by status  | Admin  |
| GET    | /admin/vendor/pending                 | List pending vendor applications | Admin  |
| POST   | /admin/vendor/{vendorProfile}/approve | Approve a vendor                 | Admin  |
| POST   | /admin/vendor/{vendorProfile}/reject  | Reject a vendor                  | Admin  |
| GET    | /admin/products                       | List products to moderate        | Admin  |
| POST   | /admin/products/{product}/approve     | Approve a product                | Admin  |
| POST   | /admin/products/{product}/reject      | Reject a product                 | Admin  |
