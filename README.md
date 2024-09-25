# Dev

node version = 20.11.1

1. Install all dependencies:
    ````
    npm install
    ````
2. Clone .env.template file and rename it to .env

3. Run next command to create the database in Docker:
    ````
    docker compose up -d
    ````
4. Synchronizes Prisma misgrations:
    ````
    npm run prisma:migrate:prod
    ````
    o
    ````
    npx prisma migrate deploy
    ````