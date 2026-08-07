# syntax=docker/dockerfile:1

FROM php:8.4-fpm-alpine

# System packages and PHP extension build dependencies
RUN apk add --no-cache \
        nginx \
        supervisor \
        bash \
        icu-dev \
        libzip-dev \
        libpng-dev \
        oniguruma-dev \
        postgresql-dev \
    && docker-php-ext-configure gd \
    && docker-php-ext-install -j"$(nproc)" \
        pdo_pgsql \
        pgsql \
        bcmath \
        intl \
        zip \
        gd \
        opcache \
        pcntl

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Install PHP dependencies first (better layer caching)
COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --no-scripts \
        --no-autoloader \
        --prefer-dist \
        --no-interaction

# Application source
COPY . .

RUN composer dump-autoload --optimize --no-dev \
    && mkdir -p storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Runtime configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf.template
COPY docker/php.ini /usr/local/etc/php/conf.d/zz-production.ini
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
CMD ["supervisord", "-c", "/etc/supervisord.conf"]
