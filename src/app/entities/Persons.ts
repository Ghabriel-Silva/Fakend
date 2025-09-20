
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity("person")
export class Person {

    @PrimaryGeneratedColumn('increment')
    id:number

    @Column('varchar', {length: 30, nullable:false})
    name:string

    @Column('varchar', {length: 50, nullable: false})
    username:string


}
