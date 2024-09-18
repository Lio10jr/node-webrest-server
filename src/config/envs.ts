import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    PROD: env.get('PROD').required().asBool(),
    PATH_PUBLIC: env.get('PATH_PUBLIC').default('public').asString(),
}