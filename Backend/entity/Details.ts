import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsEmail} from "class-validator";

@Entity('details')
export class Details extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_detail: number;

    @Column()
    id_user: number

    @Column()
    hard_skills: string;

    @Column()
    soft_skills: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    @IsEmail({}, {message: 'Incorrect email'})
    email: string;

    @Column()
    phone_number: number;

    @Column()
    address: string;

    @Column()
    about: string;

    @Column()
    image: string;

    @Column()
    agreement: boolean;

    @Column("text", {array: true})
    language: string;
}
