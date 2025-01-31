import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CoffeeBean } from './coffee-beans/entities/coffee-bean.entity';
import { CoffeeBeansModule } from './coffee-beans/coffee-beans.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Turn off in production
    }),
    TypeOrmModule.forFeature([CoffeeBean]),
    CoffeeBeansModule,
  ],
})
export class AppModule {}
