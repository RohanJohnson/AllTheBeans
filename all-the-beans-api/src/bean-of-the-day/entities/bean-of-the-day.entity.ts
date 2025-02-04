import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { CoffeeBean } from '../../coffee-beans/entities/coffee-bean.entity';

@Entity()
export class BeanOfTheDay {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => CoffeeBean, (coffeeBean) => coffeeBean.beanOfTheDay, {
    onDelete: 'CASCADE', 
  })
  coffeeBean: CoffeeBean;

  @CreateDateColumn()
  selectedAt: Date;
}
