import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('style')
export class Style extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_style: number;

    @Column()
    main_color: string;

    @Column()
    font: string;
}
