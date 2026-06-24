# Multi-Vendor E-Commerce REST API
![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?style=flat&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-13.8-FF2D20?style=flat&logo=laravel&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.3-4169E1?style=flat&logo=postgresql&logoColor=white)
![Sanctum](https://img.shields.io/badge/Sanctum-Auth-FF2D20?style=flat&logo=laravel&logoColor=white)

A multi-vendor e-commerce backend REST API built with Laravel 13 and PostgreSQL.

---

## Tech Stack

| Technology                   | Purpose |
|------------------------------|---|
| PHP 8.3 / Laravel 13         | Core framework |
| PostgreSQL                   | Database |
| Laravel Sanctum              | API authentication |
| Spatie Laravel-Permission v6 | Role & permission management |
| Mailtrap                     | Email testing (development) |
| barryvdh/laravel-ide-helper  | IDE model suggestions |

---

## User Roles

| Role | Description |
|---|---|
| `super_admin` | Full platform control including admin management |
| `admin` | Full platform control |
| `vendor` | Manage own shop, products, orders, coupons, withdrawals |
| `customer` | Browse, purchase, wishlist, review |

---

## Local Setup

### Requirements

- PHP >= 8.3
- Composer
- PostgreSQL

### Steps

```bash
git clone https://github.com/Adnan-Sarkar/multi-vendor-ecommerce.git
cd multi-vendor-ecommerce/backend

composer install

cp .env.example .env
php artisan key:generate
```

Configure `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=multi_vendor_ecommerce
DB_USERNAME=your_username
DB_PASSWORD=your_password

MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_FROM_ADDRESS="noreply@multivendor.com"
MAIL_FROM_NAME="Multi Vendor Shop"
```

```bash
php artisan migrate
php artisan db:seed
php artisan serve
```

### Default Super Admin

```
Email:    admin@gmail.com
Password: password123
```

---

## API Base URL

```
http://localhost:8000/api/v1
```

---

## Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/auth/register` | Customer registration | Public |
| POST | `/auth/register-vendor` | Vendor registration | Public |
| POST | `/auth/login` | Login | Public |
| POST | `/auth/forgot-password` | Send OTP to email | Public |
| POST | `/auth/reset-password` | Reset password with OTP | Public |
| POST | `/auth/logout` | Logout | Auth |
| GET | `/auth/profile` | Get profile | Auth |
| PATCH | `/auth/profile/customer` | Update customer profile | Auth |
| PATCH | `/auth/profile/vendor` | Update vendor profile | Auth |
| POST | `/auth/change-password` | Change password | Auth |

### Categories

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/category` | List categories | Public |
| GET | `/category/{id}` | Category details | Public |
| POST | `/category` | Create category | Admin |
| PATCH | `/category/{id}` | Update category | Admin |
| DELETE | `/category/{id}` | Delete category | Admin |

### Products

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/product` | List approved products | Public |
| GET | `/product/{id}` | Product details | Public |
| GET | `/product/{id}/reviews` | Product reviews | Public |
| GET | `/product/me/products` | Vendor's own products | Vendor |
| POST | `/product` | Create product | Vendor |
| PATCH | `/product/{id}` | Update product | Vendor |
| DELETE | `/product/{id}` | Delete product | Vendor |
| POST | `/product/{id}/images` | Add images | Vendor |
| POST | `/product/{id}/variants` | Add variant | Vendor |

Product filters: `?search=&min_price=&max_price=&in_stock=&is_featured=&vendor_id=&sort=price_asc|price_desc|newest|oldest|popular`

### Cart

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/cart` | View cart | Auth |
| POST | `/cart` | Add to cart | Auth |
| PATCH | `/cart/{cartItem}` | Update quantity | Auth |
| DELETE | `/cart/{cartItem}` | Remove item | Auth |
| DELETE | `/cart` | Clear cart | Auth |

### Addresses

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/address` | List addresses | Auth |
| POST | `/address` | Create address | Auth |
| PATCH | `/address/{id}` | Update address | Auth |
| DELETE | `/address/{id}` | Delete address | Auth |
| PATCH | `/address/{id}/set-default` | Set default | Auth |

### Orders

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/order` | Customer orders | Auth |
| GET | `/order/{id}` | Order details | Auth |
| POST | `/order` | Place order | Auth |
| PATCH | `/order/{id}/cancel` | Cancel order | Auth |

### Wishlist

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/wishlist` | View wishlist | Customer |
| POST | `/wishlist` | Add to wishlist | Customer |
| DELETE | `/wishlist/{product}` | Remove from wishlist | Customer |

### Reviews

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/review` | Create review | Customer |

### Coupons

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/coupon/apply` | Apply coupon | Auth |

### Vendor

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/vendor/orders` | Vendor orders | Vendor |
| PATCH | `/vendor/orders/{id}` | Update order status | Vendor |
| PATCH | `/vendor/orders/{id}/tracking-number` | Add tracking number | Vendor |
| GET | `/vendor/coupon` | Vendor coupons | Vendor |
| POST | `/vendor/coupon` | Create coupon | Vendor |
| DELETE | `/vendor/coupon/{id}` | Delete coupon | Vendor |
| GET | `/vendor/withdrawals` | Vendor withdrawals | Vendor |
| POST | `/vendor/withdrawals` | Request withdrawal | Vendor |

### Admin

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/admin/vendor/pending` | Pending vendors | Admin |
| POST | `/admin/vendor/{id}/approve` | Approve vendor | Admin |
| POST | `/admin/vendor/{id}/reject` | Reject vendor | Admin |
| GET | `/admin/products` | Pending products | Admin |
| POST | `/admin/products/{id}/approve` | Approve product | Admin |
| POST | `/admin/products/{id}/reject` | Reject product | Admin |
| GET | `/admin/orders` | All orders | Admin |
| GET | `/admin/review` | Pending reviews | Admin |
| POST | `/admin/review/{id}/approve` | Approve review | Admin |
| GET | `/admin/coupon` | All coupons | Admin |
| DELETE | `/admin/coupon/{id}` | Delete coupon | Admin |
| GET | `/admin/withdrawals` | Pending withdrawals | Admin |
| POST | `/admin/withdrawals/{id}/approve` | Approve withdrawal | Admin |
| POST | `/admin/withdrawals/{id}/reject` | Reject withdrawal | Admin |

---

## API Response Format

```json
{
    "success": true,
    "message": "...",
    "data": {}
}
```

Paginated responses include `meta` and `links`:

```json
{
    "success": true,
    "message": "...",
    "data": [],
    "meta": {
        "current_page": 1,
        "per_page": 15,
        "total": 50,
        "last_page": 4,
        "from": 1,
        "to": 15
    },
    "links": {
        "first": "...",
        "last": "...",
        "next": "...",
        "prev": null
    }
}
```

Error responses:

```json
{
    "success": false,
    "message": "...",
    "errors": null
}
```

---

## Architecture

```
Request -> Controller -> Service -> Repository -> Model -> Database
```

- Controller: receives request, calls service, returns response
- Service: business logic
- Repository: database queries
- Model: Eloquent relationships

---

## Author

Adnan Sarkar
- GitHub: https://github.com/Adnan-Sarkar
- LinkedIn: https://www.linkedin.com/in/adnan-sarkar/
