import { container } from 'tsyringe';
import IProfessionalRepository from '../../usecase/professional/repository/professional-repository';
import ProfessionalRepository from '../../dataprovider/typeorm/professional/professional-repository';
import IAppointmentRepository from '../../usecase/appointment/repository/appointment-repository';
import AppointmentRepository from '../../dataprovider/typeorm/appointment/appointment-repository';
import IPatientRepository from '../../usecase/patient/repository/patient-repository';
import PatientRepository from '../../dataprovider/typeorm/patient/patient-repository';

container.registerSingleton<IProfessionalRepository>(
  'ProfessionalRepository',
  ProfessionalRepository,
);

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IPatientRepository>(
  'PatientRepository',
  PatientRepository,
);
