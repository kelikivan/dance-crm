import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    phone: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    name: string | null;

    @Column()
    deleted: boolean;
}