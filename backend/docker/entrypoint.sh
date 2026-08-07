#!/bin/bash
set -e

# Render (and most PaaS) inject the listen port via $PORT. Fall back to 8080 locally.
: "${PORT:=8080}"
sed "s|\${PORT}|${PORT}|g" /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

cd /var/www/html

# Ensure writable runtime dirs exist (mounted volumes may start empty)
mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache

# Symlink public/storage -> storage/app/public (ignore if it already exists)
php artisan storage:link || true

# Build framework caches with the runtime environment.
# route:cache is intentionally skipped: routes/api.php defines a closure-based
# route which Laravel cannot serialize.
php artisan config:cache
php artisan view:cache

# Apply database schema
php artisan migrate --force

# Seed only when explicitly requested (set RUN_SEED=true for the first deploy, then remove it)
if [ "${RUN_SEED}" = "true" ]; then
    php artisan db:seed --force
fi

exec "$@"
