# MultiVendor Ecommerce

<p align="left">
  <img src="https://img.shields.io/badge/Laravel-13-FF2D20?style=for-the-badge&logo=laravel&logoColor=white" alt="Laravel" />
  <img src="https://img.shields.io/badge/PHP-8.3-777BB4?style=for-the-badge&logo=php&logoColor=white" alt="PHP" />
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-18-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

A multi vendor ecommerce platform where many sellers can run their own shop under one marketplace. The project is split into two parts. A Laravel REST API handles the data and business rules, and a Next.js app renders the storefront and the dashboards.

There are three types of users. Customers browse and buy products. Vendors manage their shop, products, and orders. Admins moderate the whole marketplace and view analytics.

## Live

| Part     | Link                                                                   | URL                                                         |
| -------- | ---------------------------------------------------------------------- | ----------------------------------------------------------- |
| Frontend | [Live site](https://multi-vendor-ecommerce-by-adnan-sarkar.vercel.app) | `https://multi-vendor-ecommerce-by-adnan-sarkar.vercel.app` |
| API      | [API Base URL](https://multivendor-api-6k5d.onrender.com/api/health)   | `https://multivendor-api-6k5d.onrender.com/api/v1`          |

> The API runs on a free Render instance and sleeps after inactivity, so the first request may take up to a minute to wake.

## Repository layout

```text
MultiVendor_Ecommerce/
├── backend/    Laravel API (PHP, PostgreSQL)
└── frontend/   Next.js app (React, TypeScript)
```

Each folder has its own README with details for that side.

- [Backend README](backend/README.md)
- [Frontend README](frontend/README.md)

## Main features

Customer

- Register, log in, reset password, and manage a profile
- Browse products with search, category filter, price range, and sorting
- View product details with images, variants, and reviews
- Visit a vendor storefront and see all of that vendor's products
- Add items to a cart and a wishlist
- Apply coupons at checkout
- Pay online through SSLCommerz or choose cash on delivery
- Track orders and leave reviews

Vendor

- Apply to become a vendor and get approved by an admin
- Manage products, variants, images, and stock
- Handle orders and update their status
- Create coupons for their own shop
- Reply to customer reviews
- Request withdrawals from the shop balance
- See shop stats and recent orders on a dashboard

Admin

- Review and approve or reject vendor applications and products
- Moderate reviews
- Manage categories, tags, and product attributes
- Handle all orders and withdrawal requests
- View a dashboard with revenue, orders, customers, and other marketplace metrics

## Tech stack

| Area       | Technology                         |
| ---------- | ---------------------------------- |
| API        | Laravel 13, PHP 8.3                |
| Auth       | Laravel Sanctum, Spatie Permission |
| Database   | PostgreSQL                         |
| Payments   | SSLCommerz (Sandbox)               |
| Frontend   | Next.js 16, React 19, TypeScript   |
| Styling    | Tailwind CSS 4                     |
| Validation | Zod                                |
| Charts     | Recharts                           |
| Media      | Cloudinary                         |

## Requirements

- PHP 8.3 or newer with Composer
- PostgreSQL 14 or newer
- Node.js 20 or newer with npm

## Getting started

Clone the repository and set up each side.

```bash
git clone https://github.com/Adnan-Sarkar/multi-vendor-ecommerce
cd multi-vendor-ecommerce
```

Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

The API runs on port 8000.

Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app runs on port 3000.

Open both terminals at the same time so the frontend can reach the API.

## Environment

The backend needs database credentials and the SSLCommerz keys in `backend/.env`. The frontend needs the API URL and Cloudinary keys in `frontend/.env`. See each README for the full list.

## Demo accounts

After seeding, you can log in with these accounts. The password for all of them is `password123`.

| Role     | Email              |
| -------- | ------------------ |
| Customer | `aduvai@gmail.com` |
| Vendor   | `rahman@test.com`  |
| Admin    | `admin@gmail.com`  |

## Deployment

The project is hosted for free across three services.

| Service                      | Hosts       | Notes                                                                                            |
| ---------------------------- | ----------- | ------------------------------------------------------------------------------------------------ |
| [Render](https://render.com) | Laravel API | Built from `backend/Dockerfile` via the `render.yaml` blueprint. Free instance sleeps when idle. |
| [Neon](https://neon.tech)    | PostgreSQL  | Serverless Postgres. Use the pooled connection host.                                             |
| [Vercel](https://vercel.com) | Next.js app | Root directory set to `frontend`.                                                                |

Backend deployment (Render blueprint):

- The `render.yaml` at the repo root defines the `multivendor-api` web service.
- The Docker image installs PHP dependencies with `--no-dev`, builds framework caches, and runs `php artisan migrate --force` on every boot.
- Set `RUN_SEED=true` for the first deploy to seed demo data, then set it back to `false`.
- Secrets (`APP_KEY`, database, SSLCommerz) are provided as environment variables in the Render dashboard, not committed.

Frontend deployment (Vercel):

- Import the repo and set the **Root Directory** to `frontend`.
- Set `API_URL` to the Render API base (`.../api/v1`) and `COOKIE_NAME` to match the auth cookie.

Because images are uploaded to Cloudinary, the API needs no persistent disk, so the free ephemeral filesystem is fine.

## Notes

The backend and frontend are two separate apps. The frontend never talks to the database directly. It calls the API and passes the auth token from an http only cookie on every request.
