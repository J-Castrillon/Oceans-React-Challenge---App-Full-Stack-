import { Menu } from 'src/menu/entities/menu.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Timestamp,
} from 'typeorm';

@Entity('resources_manage')
export class ResourcesManage {
  @PrimaryGeneratedColumn()
  resourceId: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  resourceName: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  extension: string;

  @Column({ type: 'float', nullable: false })
  size: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  lastModified: Timestamp;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'archived'],
  })
  status: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: string;

  @OneToMany(() => Menu, (menu) => menu.image, {
    cascade: true,
  })
  menu: Menu[];
}
