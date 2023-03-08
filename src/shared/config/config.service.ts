import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',

      host: this.getValue('DB_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('DB_PASS'),
      database: this.getValue('POSTGRES_DB'),
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      autoLoadEntities: true,
      ssl: false,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'DB_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'DB_PASS',
  'POSTGRES_DB',
]);

export { configService };
