import { AppointmentEntity } from '../../../entity/appointment/appointment.entity';

export default interface IAppointmentRepository {
    create(request: AppointmentEntity): Promise<AppointmentEntity>;

    update(request: AppointmentEntity): Promise<AppointmentEntity>;

    findById(id: number): Promise<AppointmentEntity | undefined>;

    findByStatus(status: string): Promise<AppointmentEntity | undefined>;

    findByPatientId(patientId: number): Promise<AppointmentEntity | undefined>;

    findByProfessionalId(professionalId: number): Promise<AppointmentEntity | undefined>;

    findByDateBetweenAndProfessionalId(from: Date, to: Date, professinonalId: number): Promise<AppointmentEntity | undefined>;

    findAll(): Promise<AppointmentEntity[]>;
};
