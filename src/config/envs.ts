import 'dotenv/config';
import env from 'env-var';

export const envs = {
    PORT: env.get('PORT').required().asPortNumber(),
    PROD: env.get('PROD').required().asString(),
    PATH_PUBLIC: env.get('PATH_PUBLIC').required().asString(),
}