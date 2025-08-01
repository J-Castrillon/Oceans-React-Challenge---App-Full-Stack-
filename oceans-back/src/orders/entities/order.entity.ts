import { UsersManage } from 'src/users-typeUsers/users-manage/entities/users-manage.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne, PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';
import { Menu } from 'src/menu/entities/menu.entity';
import { CreateMenusObjectDto } from '../dto/create-menus.dto';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;

  @Column({ type: 'float', nullable: false })
  tip: number;

  @Column({ type: 'float', nullable: false })
  totalPrice: number;

  @ManyToMany(() => Menu, { cascade: true, eager: true })
  @JoinTable({
    name: 'order_menu',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'orderId',
    },
    inverseJoinColumn: {
      name: 'menuId',
      referencedColumnName: 'menuId',
    },
  })
  readonly menus: CreateMenusObjectDto[];

  @Column({
    type: 'enum',
    enum: ['CREDIT CARD', 'DEBIT CARD', 'CASH', 'BANK TRANSFER'],
    nullable: false,
  })
  paymentMethod: string;

  @ManyToOne(() => UsersManage, (user) => user.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
    eager: true,
  })
  user: UsersManage;

  @Column({
    type: 'enum',
    enum: ['PENDING', 'COMPLETED', 'CANCELLED', 'IN_PROGRESS'],
    default: 'PENDING',
    nullable: false,
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp;
}
