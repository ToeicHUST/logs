import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogModule } from './log/log.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
ConfigModule.forRoot({
  isGlobal: true,
  envFilePath: '.env',
}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Sử dụng process.env trực tiếp, thêm dấu + để ép kiểu số cho port
      host: process.env.DB_HOST || 'localhost',
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME || 'kong',
      password: process.env.DB_PASSWORD || 'kongpass',
      database: process.env.DB_DATABASE || 'kong',
      schema: process.env.DB_SCHEMA || 'logs',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // synchronize: process.env.NODE_ENV !== 'production', 
      synchronize: true, // Lưu ý: Chỉ dùng true khi dev, không dùng cho production
    }),
    LogModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}