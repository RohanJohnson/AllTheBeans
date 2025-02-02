import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeBean } from './entities/coffee-bean.entity';
import { CoffeeBeansService } from './coffee-beans.service';
import { CoffeeBeansController } from './coffee-beans.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CoffeeBean])], // Register Entity
  controllers: [CoffeeBeansController], // Add Controller
  providers: [CoffeeBeansService], // Add Service
  exports: [CoffeeBeansService], // Export for use in other modules
})
export class CoffeeBeansModule {}
