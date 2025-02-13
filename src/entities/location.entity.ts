import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';

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

  @ManyToOne(() => Location, (location) => location.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parentId' })
  parent?: Location;

  @OneToMany(() => Location, (location) => location.parent)
  children!: Location[];
}
