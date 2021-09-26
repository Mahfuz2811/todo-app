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
docker-compose run php php artisan migrate
```

- Run `docker-compose up -d --build` to boot up the containers.
- Your application will be running in `http://localhost:8080`.
