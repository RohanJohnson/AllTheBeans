import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { CoffeeBeansService } from './src/coffee-beans/coffee-beans.service';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const coffeeBeansService = app.get(CoffeeBeansService);

  // Load JSON file
  const filePath = path.join(__dirname, 'AllTheBeans.json');
  const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const bean of jsonData) {
    await coffeeBeansService.create({
        id: bean.id,
        name: bean.Name,
        description: bean.Description,
        country: bean.Country,
        colour: bean.colour,
        cost: parseFloat(bean.Cost.replace('£', '')), // Convert "£39.26" to 39.26
        image: bean.Image,
      });
  }

  console.log('✅ Seed data inserted successfully');
  await app.close();
}

seed().catch((error) => {
  console.error('❌ Error seeding data:', error);
});
