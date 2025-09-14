import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("varchar", { length: 100, nullable: false })
    name: string;

    @Column("varchar", { length: 300, nullable: false })
    description: string;

    @Column("varchar", { length: 30, unique: true, nullable: false })
    sku: string; // código único do produto

    @Column("varchar", { length: 50, nullable: false })
    brand: string;

    @Column("varchar", { length: 50, nullable: false })
    category: string;

    @Column("decimal", { precision: 10, scale: 2, nullable: false })
    price: number;

    @Column("decimal", { precision: 10, scale: 2, nullable: true })
    price_min: number; 

    @Column("int", { nullable: false })
    stock: number; 

    @Column("varchar", { length: 30, nullable: true })
    color: string;

    @Column("varchar", { length: 20, nullable: true })
    size: string;

    @Column("varchar", { length: 300, nullable: true })
    image_url: string;

    @CreateDateColumn({type:"timestamp"})
    created_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    updadet_at: Date;
}
