FROM php:7.4-fpm

COPY /docker/php/conf.ini /usr/local/etc/php/conf.d/custom.ini

RUN apt-get update

# Install dependencies
RUN apt-get install -y \
    vim \
    git \
    zip \
    unzip \
    curl

# Install Postgre PDO
RUN apt-get install -y libpq-dev \
    && docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
    && docker-php-ext-install pdo pdo_pgsql pgsql

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

ADD composer.json composer.lock ./
RUN composer install --no-scripts --no-interaction --no-autoloader --no-dev --prefer-dist
ADD . ./
RUN composer dump-autoload --optimize
