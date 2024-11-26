import { registerAs } from "@nestjs/config";
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from "typeorm";

dotenvConfig({ path: '.env' });

const config = {
    type: 'postgres',
    host: `${process.env.DATABASE_HOST}`,
    port: `${process.env.DATABASE_PORT}`,
    username: `${process.env.DATABASE_USERNAME}`,
    password: `${process.env.DATABASE_PASSWORD}`,
    database: `${process.env.DATABASE_NAME}`,
    entities: [join(__dirname, '..', '**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, '..', 'migrations/*{.ts,.js}')],
    logging: true,
    autoLoadEntities: true,
}

export const typeormConfig = registerAs('typeorm', () => config)
export default new DataSource(config as DataSourceOptions);