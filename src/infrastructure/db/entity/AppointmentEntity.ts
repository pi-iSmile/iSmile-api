import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('appointiments')
export class AppointmentEntity {

    @PrimaryGeneratedColumn()
    id: String;

    @Column()
    patient_name: String;

    @Column()
    patient_email: String;

    @Column()
    patient_phone: String;

    @Column()
    date: Date;

    @Column()
    confirmed: Boolean;

    @Column()
    done: Boolean;
}