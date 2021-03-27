import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, Unique} from "typeorm";
import {IsEmail, Length} from "class-validator";

@Entity('user')
@Unique(['email'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id_user: number;

    @Column({default:1})
    id_details:number

    @Column()
    @Length(6, 100, { message: 'The password must be at least 6 but not longer than 100 characters' })
    password: string;

    @Column({unique:true})
    @IsEmail({}, { message: 'Incorrect email' })
    email: string;

}
