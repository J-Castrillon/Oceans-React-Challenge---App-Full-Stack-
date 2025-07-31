import { TipoUsuario } from 'src/users-typeUsers/tipo-usuarios/entities/tipo-usuario.entity';
import { Column, Entity, ManyToOne, PrimaryColumn, Timestamp } from 'typeorm';

@Entity('users_manage')
export class UsersManage {
  @PrimaryColumn()
  document: number;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  password: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'text', nullable: true, default: null })
  dateOfBirth: string;

  @Column({ type: 'int', nullable: false, default: 0 })
  totalSales: number;

  @ManyToOne(() => TipoUsuario, (tipoUsuario) => tipoUsuario.user, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    nullable: false,
  })
  role: TipoUsuario;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive'],
    nullable: false,
    default: 'active',
  })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Timestamp;
}
