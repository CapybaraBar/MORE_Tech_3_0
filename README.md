## Как запустить на своём оборудовании

Для работы веб-приложения, потребуется база данных Postgres 10.x. Скачать её можно на сайте разработчика https://www.postgresql.org/download/.

Чтобы запустить сервер с локальной базой данных, воспользуйтесь командой:

```bash
npm run dev
# или
yarn dev
```

И откройте веб-приложение в браузере по адресу [http://localhost:3000](http://localhost:3000).

Для настройки соединения с базой данных установите следующие переменные окружения:

| Переменная окружения | Значение по умолчанию |
| -------------------- | --------------------- |
| PGUSER               | postgres              |
| PGHOST               | localhost             |
| PGDATABASE           | postgres              |
| PGPASSWORD           | 12345                 |
| PGPORT               | 5432                  |

## Как запустить на своём оборудовании с облачной базой данных в AWS

Чтобы запустить сервер с локальной базой данных, воспользуйтесь командой:

```bash
npm run dev:
# или
yarn dev
```

Для настройки соединения с базой данных установите следующие переменные окружения:

| Переменная окружения           |
| ------------------------------ |
| CAPYBARA_AWS_ACCESS_KEY_ID     |
| CAPYBARA_AWS_SECRET_ACCESS_KEY |
| CAPYBARA_AWS_POSTGRES_REGION   |
| CAPYBARA_AWS_POSTGRES_HOSTNAME |
| CAPYBARA_AWS_POSTGRES_PORT     |
| CAPYBARA_AWS_POSTGRES_USERNAME |
| CAPYBARA_AWS_POSTGRES_DATABASE |

## Ссылки на сторонние источники

- [Next.js Documentation](https://nextjs.org/docs) - Next.js и API.
- [Passport](https://github.com/jaredhanson/passport) и [Passport Local](https://github.com/jaredhanson/passport-local) -  Аутентификация
- [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken) - открытый стандарт, реализующий [RFC 7519](https://tools.ietf.org/html/rfc7519), для безопасного взаимодействия между двумя сторонами.

