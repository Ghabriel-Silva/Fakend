import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm"



@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column("varchar", { nullable: false, length: 100 })
    name: string;

    @Column("varchar", { nullable: false, length: 100 })
    last_name: string;

    @Column('date', { nullable: false })
    birth_date: Date;

    @Column('varchar', { nullable: false, length: 100 })
    sexo: string;

    @Column('varchar', { nullable: false, unique: true, length: 100 })
    email: string;

    @Column('varchar', { nullable: false, length: 200 })
    password: string;

    @Column('boolean', { nullable: false, default: true })
    active: boolean;

    // NOVOS CAMPOS
    @Column('boolean', { nullable: false, default: false })
    is_fake: boolean;

    @Column('timestamp', { nullable: true })
    expires_at: Date | null;
    
    @Column('varchar', {nullable: true,  length: 45 })
    ip_address:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User