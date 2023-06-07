import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import { UsersModule } from './users/users.module';
import { SessionModule } from 'nestjs-session';
import { ToolsModule } from './tools/tools.module';

// noinspection TypeScriptValidateTypes
@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'mssql',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
        },
      },
    }),
    SessionModule.forRoot({
      session: {
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      },
    }),
    UsersModule,
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
