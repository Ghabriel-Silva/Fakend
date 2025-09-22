
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"


export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export enum MaritalStatus {
    SINGLE = "single",
    MARRIED = "married",
    DIVORCED = "divorced",
    WIDOWED = "widowed",
    OTHER = "other"
}

@Entity("person")
export class Person {

    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { length: 30, nullable: false })
    name: string

    @Column('varchar', { length: 30, nullable: false })
    username: string

    @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
    gender: Gender  // O tipo de dados que espero nessa coluna é do tipo Gender com dados pre setados

    @Column('int', { nullable: false })
    age: number

    @Column({ type: 'enum', enum: MaritalStatus, nullable: false })
    maritalStatus: MaritalStatus

    @Column('varchar', { nullable: false, length: 300 })
    imageUrl: string

    @Column('varchar', { length: 100, nullable: false })
    country: string

    @Column('varchar', { nullable: false, length: 50 })
    state: string

    @Column('varchar', { nullable: false, length: 100 })
    city: string

    @Column('varchar', { nullable: false, length: 150 })
    profession: string

    @Column('varchar', { length: 30, nullable: true })
    phone: string;


    @Column('varchar', { nullable: false, length: 150, unique:true })
    email: string

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date


}
