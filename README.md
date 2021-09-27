# Laravel Task

## Laravel Version
This repository contains Laravel `8.x`

## How to use?
- Clone the repository.
  - `git clone git@github.com:Mahfuz2811/todo-app.git`
- Go to project root
  - `cd todo-app`
- Copy the docker-compose and env file
  - `cp docker-compose.yml.example docker-compose.yml`
  - `cp .env.example .env`
- By default, the `postgres` database's password is set to `secret` and the database is set to `todo_app` and the user `root`. If you want to
  change the default values, then change them in `services.postgres.environment.POSTGRES_PASSWORD`
  and `services.postgres.environment.POSTGRES_DB` and `services.postgres.environment.POSTGRES_USER` in `docker-compose.yml` file.
- If you changed your database credentials in `docker-compose.yml` file, then you need to change values in your `.env`
    file's `DB_DATABASE`, `DB_PASSWORD` and `POSTGRES_USER` accordingly.
- Run the below command

```bash
docker-compose run -e COMPOSER_MEMORY_LIMIT=-1 php composer install
docker-compose run php php artisan key:generate
docker-compose run php php artisan jwt:secret
docker-compose run php php artisan migrate
docker-compose run php php artisan db:seed
```

- Run `docker-compose up -d --build` to boot up the containers.
- Your application will be running in `http://localhost:8080`.

N.B. The default email and password is
- `email: mahfuz@gmail.com`
- `password: password`

If you want to add more user, then import the postman collection link. You can get all api
- `https://www.getpostman.com/collections/7a2cc3e0b334c3927ec7`

##How to use

- Enter Task name, then press enter or click plus(+) icon. Task will be added in cookie.
- For complete task click checkbox and for delete click cross icon.
- If no action occur for five(5) minutes, then all task will be expired.
- If you restart your browser, then click `load button` to load task again.
- If you want to store task in db, then press save button. Then task will be stored database.
- Before storing task in db, you will be asked for login. The default email and password are given in modal.
- You can fetch user task. The details apis are given in postman collection.

## For test

- run the command `./vendor/bin/phpunit --testdox`
