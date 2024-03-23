import { AppConfig } from './app-config.type';
import { DatabaseConfig } from '../database/config/database-config.type';
import { AuthConfig } from './auth.config';

export type AllConfigType = {
  app: AppConfig;
  database: DatabaseConfig;
  auth: AuthConfig;
};
