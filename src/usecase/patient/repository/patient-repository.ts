import { PatientEntity } from '../../../entity/patient/patient.entity';

export default interface IPatientRepository {
    create(request: PatientEntity): Promise<PatientEntity>;

    update(request: PatientEntity): Promise<PatientEntity>;

    findById(id: number): Promise<PatientEntity | undefined>;

    findByEmail(email: string): Promise<PatientEntity | undefined>;

    findAll(): Promise<PatientEntity[]>;
};
