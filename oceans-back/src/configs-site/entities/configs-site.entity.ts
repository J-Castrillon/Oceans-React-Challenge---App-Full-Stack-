import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('configs_site')
export class ConfigsSite {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'text', nullable: false, default: 'Carnitas'})
    businessName: string;

    
}
