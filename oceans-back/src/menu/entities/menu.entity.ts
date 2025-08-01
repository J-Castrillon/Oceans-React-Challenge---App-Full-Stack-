import { ResourcesManage } from 'src/resources-manage/entities/resources-manage.entity';
import {
  Column,
  Entity, ManyToOne, PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  menuId: number;

  @Column({
    type: 'enum',
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'],
    nullable: false,
  })
  tipoMenu: string;

  @Column({ type: 'text', nullable: false, unique: true })
  menuName: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  price: number;

  @ManyToOne(() => ResourcesManage, (resource) => resource.menu, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: true,
  })
  image: ResourcesManage;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp;
}
