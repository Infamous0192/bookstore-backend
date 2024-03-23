import { Module } from '@nestjs/common';
import databaseConfig from './database/config/database.config';
import appConfig from './config/app.config';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import { DatabaseConfigService } from './database/database-config.service';
import {
  AuthModule,
  BookModule,
  FileModule,
  TagModule,
  UserModule,
} from './modules';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import authConfig from './config/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, authConfig],
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfigService,
      dataSourceFactory: async (options: DataSourceOptions) => {
        return new DataSource(options).initialize();
      },
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      exclude: ['/api/(.*)'],
    }),
    BookModule,
    TagModule,
    FileModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
