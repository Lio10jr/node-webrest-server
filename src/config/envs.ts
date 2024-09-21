import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    PATH_PUBLIC: env.get('PATH_PUBLIC').default('public').asString(),

    POSTGRES_URL: env.get("POSTGRES_URL").required().asUrlString(),
    POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
    POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
    POSTGRES_DB: env.get("POSTGRES_DB").required().asString()
}