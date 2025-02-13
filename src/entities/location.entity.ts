import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { Building } from './building.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @Index({ unique: true })
  name!: string;

  @Column()
  locationNumber!: string;

  @Column('decimal', { precision: 10, scale: 3 })
  area!: number;

  @Column({ nullable: true })
  parentId?: number;

  @Column({ nullable: false })
  buildingId!: number;

  @ManyToOne(() => Location, (location) => location.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children!: Location[];

  @ManyToOne(() => Building, (building) => building.locations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'buildingId' })
  building!: Building;
}
