import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'


@Entity('galery')
export class Galery {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('varchar', { nullable: false, length: 50 })
    category: string

    @Column('varchar', { nullable: false, length: 100 })
    description: string

    @Column('varchar', { nullable: false, length: 100 })
    alt_description: string 

    @Column('int', { nullable: false })
    width: number

    @Column('int', { nullable: false })
    height: number

    @Column('varchar', { nullable: false })
    url_full: string

    @Column('varchar', { nullable: false })
    url_small:string;

    @CreateDateColumn({type:'timestamp'})
    created_at:Date

    @UpdateDateColumn({type:'timestamp'})
    updated_at:Date
}
