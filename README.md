# Технологии
Material UI + Next.js + React + Redux + Passport + JWT

[<img src="https://cloud.githubusercontent.com/assets/13041/19686250/971bf7f8-9ac0-11e6-975c-188defd82df1.png" height="100">](https://github.com/zeit/next.js)
&nbsp;&nbsp;&nbsp;&nbsp;[<img src="https://cdn.worldvectorlogo.com/logos/material-ui-1.svg" height="100">](http://www.material-ui.com)
[<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" height="100">](https://github.com/facebook/react)
[<img src="https://raw.githubusercontent.com/reactjs/redux/master/logo/logo.png" height="100">](https://github.com/reactjs/redux)

## Как запустить на своём оборудовании

Для работы веб-приложения потребуется база данных Postgres 10.x, скачать её можно на сайте разработчика https://www.postgresql.org/download/.

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
npm run dev:aws
# или
yarn dev:aws
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

- [Next.js Documentation](https://nextjs.org/docs) - Next.js и API
- [Passport](https://github.com/jaredhanson/passport) и [Passport Local](https://github.com/jaredhanson/passport-local) - Аутентификация
- [JSON Web Tokens](https://github.com/auth0/node-jsonwebtoken) - открытый стандарт, реализующий [RFC 7519](https://tools.ietf.org/html/rfc7519), для безопасного взаимодействия между двумя сторонами
