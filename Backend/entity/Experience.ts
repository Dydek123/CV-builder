import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('experiences')
export class Experience extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_experience: number;

    @Column()
    id_details: number

    @Column()
    place: string;

    @Column()
    start_date: Date;

    @Column()
    end_date: Date;

    @Column()
    is_actual: boolean;

    @Column()
    description: string;
}
