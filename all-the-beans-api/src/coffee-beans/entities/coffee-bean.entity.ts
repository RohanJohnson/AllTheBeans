import { BeanOfTheDay } from '../../bean-of-the-day/entities/bean-of-the-day.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class CoffeeBean {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column()
  country: string;

  @Column()
  colour: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  cost: number;

  @Column()
  image: string;

  @OneToMany(() => BeanOfTheDay, (beanOfTheDay) => beanOfTheDay.coffeeBean)
  beanOfTheDay?: BeanOfTheDay[];

}
