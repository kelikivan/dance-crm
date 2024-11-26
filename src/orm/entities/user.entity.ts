import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ schema:"core", name:"users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    name: string | null;

    @Column({ default: false })
    deleted: boolean;
}