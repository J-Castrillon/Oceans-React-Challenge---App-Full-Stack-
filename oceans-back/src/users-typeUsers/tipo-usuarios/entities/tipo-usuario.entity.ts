import { Role } from 'src/auth/enums/role.enum';
import { UsersManage } from 'src/users-typeUsers/users-manage/entities/users-manage.entity';
import {
  Column,
  Entity, OneToMany, PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm';

@Entity()
export class TipoUsuario {
  @PrimaryGeneratedColumn()
  roleId: number;

  @Column({
    type: 'text',
    nullable: false,
  })
  roleName: string;

  @Column({ type: 'text', nullable: false, default: Role.USER }) // Cambiar el texto por defecto para usuarios generales.
  description: string;

  @Column({ type: 'text', array: true, nullable: false, default: '{}' })
  accesLevel: string[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Timestamp;

  @OneToMany((type) => UsersManage, (user) => user.role, { cascade: true })
  user: UsersManage[];
}
