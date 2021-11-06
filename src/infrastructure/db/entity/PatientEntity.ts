import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({name: "patient"})
export class PatientEntity {

    @PrimaryGeneratedColumn("uuid")
    id: String;

    @Column()
    name: String;

    @Column({unique: true})
    email: String;

    @Column()
    bithdate: Date;
}