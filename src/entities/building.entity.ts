import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  Index,
} from 'typeorm';
import { Location } from './location.entity';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  name!: string;

  @OneToMany(() => Location, (location) => location.building, {
    cascade: ['remove'],
  })
  locations!: Location[];
}
