# MultiVendor Ecommerce Frontend

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
</p>

This is the web app for the MultiVendor Ecommerce platform. It is built with Next.js and the App Router. It talks to the Laravel API and renders the storefront, the customer pages, and the vendor and admin dashboards.

Most pages are server rendered. A page becomes a client component only when it needs interaction such as a form, a dropdown, or a chart.

## Live

Not deployed yet. Update this link after publishing.

| Part     | Link                             | URL                   |
| -------- | -------------------------------- | --------------------- |
| Frontend | [Live site](https://example.com) | `https://example.com` |

## Contents

| Section                                 | What it covers               |
| --------------------------------------- | ---------------------------- |
| [Live](#live)                           | Deployed app link            |
| [Tech stack](#tech-stack)               | Libraries and tools          |
| [How it works](#how-it-works)           | Data flow and authentication |
| [Project structure](#project-structure) | Folder layout                |
| [Pages](#pages)                         | Routes grouped by user type  |
| [Components](#components)               | Shared UI pieces             |
| [Requirements](#requirements)           | What you need to run it      |
| [Setup](#setup)                         | Install and run steps        |
| [Environment](#environment)             | Environment variables        |
| [Scripts](#scripts)                     | npm commands                 |

## Tech stack

- Next.js 16 with the App Router
- React 19 and TypeScript
- Tailwind CSS 4 for styling
- Zod for forms and validation
- Recharts for dashboard charts
- Sonner for toast messages
- Phosphor Icons for icons
- Cloudinary for image uploads

## How it works

The app reads data on the server and sends it to the components. Writes go through server actions.

- Server components fetch data from the API using a helper that reads the auth token from an http only cookie
- Server actions handle mutations such as login, add to cart, and profile updates
- The auth token and the user role are stored in cookies after login
- A route guard checks the token and role before letting a user open a protected area

## Project structure

The `app` folder is split into groups by user type.

```text
src/
├── app/
│   ├── (public)/     home, shop, product, categories, vendors, auth pages
│   ├── (customer)/   cart, checkout, payment, orders, wishlist, account
│   ├── (vendor)/     vendor dashboard, products, orders, coupons, withdrawals
│   └── (admin)/      admin dashboard, moderation, catalog management
├── components/       shared and layout components
├── services/         functions that call the API
├── actions/          server actions for mutations
├── lib/              helpers such as the API client and Cloudinary upload
├── data/             static data
└── types/            shared TypeScript types
```

## Pages

Public

- Home
- Shop with search, category filter, price range, sort, and pagination
- Product details with image gallery, variants, and reviews
- Categories and a category landing page
- Vendor directory and a vendor storefront with shop stats
- Login, register, vendor register, forgot password, and reset password

Customer

- Cart and checkout
- Payment result pages
- Order history and order details
- Wishlist
- Account and profile settings

Vendor dashboard

- Sales stats and recent orders
- Product management
- Orders and status updates
- Coupons
- Reviews
- Withdrawals
- Shop settings

Admin dashboard

- Analytics with charts and a date range filter
- Vendor, product, and review moderation
- Categories, tags, and attributes
- Orders, coupons, and withdrawals

## Components

Shared pieces live in `components`. The navbar has a search box, a notifications bell with an unread badge, a cart count, and an account menu. The bell refreshes its unread count on a timer and pauses when the browser tab is hidden. Images are uploaded to Cloudinary through a client helper, and only the returned URL is sent to the API.

## Requirements

- Node.js 20 or newer
- npm
- The backend API running and reachable

## Setup

```bash
npm install
cp .env.example .env
```

Fill in the values in `.env`, then start the dev server.

```bash
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment

| Variable                             | Purpose                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------- |
| API_URL                              | Base URL of the backend API, for example `http://localhost:8000/api/v1` |
| COOKIE_NAME                          | Name of the cookie that stores the auth token                           |
| ROLE_COOKIE_NAME                     | Name of the cookie that stores the user role                            |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME    | Cloudinary cloud name for uploads                                       |
| NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET | Cloudinary unsigned upload preset                                       |

## Scripts

```bash
npm run dev     start the dev server
npm run build   build for production
npm run start   run the production build
npm run lint    run eslint
```
