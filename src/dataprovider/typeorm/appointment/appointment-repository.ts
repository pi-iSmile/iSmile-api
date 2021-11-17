import {
  Between, EntityRepository, getRepository, Repository,
} from 'typeorm';
import IAppointmentRepository from '../../../usecase/appointment/repository/appointment-repository';
import { AppointmentEntity } from '../../../entity/appointment/appointment.entity';

@EntityRepository(AppointmentEntity)
class AppointmentRepository implements IAppointmentRepository {
    private repository: Repository<AppointmentEntity>

    constructor() {
      this.repository = getRepository(AppointmentEntity);
    }

    public async create(request: AppointmentEntity): Promise<AppointmentEntity> {
      const appointment = await this.repository.create(request);

      await this.repository.save(appointment);

      return appointment;
    }

    public async findAll(): Promise<AppointmentEntity[]> {
      return Promise.resolve([]);
    }

    public async findById(id: number): Promise<AppointmentEntity | undefined> {
      const appointment = await this.repository.findOne(id);

      return appointment;
    }

    public async update(request: AppointmentEntity): Promise<AppointmentEntity> {
      return this.repository.save(request);
    }

    public async findByPatientId(patientId: number): Promise<AppointmentEntity | undefined> {
      const appointment = await this.repository.findOne({
        where: { patient_id: patientId },
      });

      return appointment;
    }

    public async findByProfessionalId(professionalId: number): Promise<AppointmentEntity | undefined> {
      const appointment = await this.repository.findOne({
        where: { professional_id: professionalId },
      });

      return appointment;
    }

    public async findByStatus(status: string): Promise<AppointmentEntity | undefined> {
      const appointment = await this.repository.findOne({
        where: { status },
      });

      return appointment;
    }

    public async findByDateAndProfessionalEmail(date: Date, professionalEmail: string): Promise<AppointmentEntity | undefined> {
      return await this.repository.findOne({
        relations: ['professional'],
        where: {
          professional: {
            email: professionalEmail,
          },
          date,
        },
      });
    }

    public async findByDateAndPatientEmail(date: Date, patientEmail: string): Promise<AppointmentEntity | undefined> {
      return await this.repository.findOne({
        relations: ['patient'],
        where: {
          patient: {
            email: patientEmail,
          },
          date,
        },
      });
    }
}

export default AppointmentRepository;
