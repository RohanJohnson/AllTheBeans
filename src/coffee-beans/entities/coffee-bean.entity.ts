import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
