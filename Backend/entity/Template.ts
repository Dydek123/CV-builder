import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('template')
export class Template extends BaseEntity {

    @PrimaryGeneratedColumn()
    id_template: number;

    @Column()
    type: string;

    @Column()
    preview: string;

    @Column()
    file: string;
}
