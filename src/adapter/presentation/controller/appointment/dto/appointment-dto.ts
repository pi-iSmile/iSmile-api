import { AppointmentStatus } from '../../../../../entity/appointment/appointment-status';

export default class AppointmentDto {
  constructor(date: Date, status: AppointmentStatus, patientId: number, professionalId: number) {
    this.date = date;
    this.status = status;
    this.patientId = patientId;
    this.professionalId = professionalId;
  }

    public date: Date

    public status: AppointmentStatus

    public patientId: number

    public professionalId: number
}
