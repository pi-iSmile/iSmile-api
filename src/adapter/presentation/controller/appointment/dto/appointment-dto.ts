import { AppointmentStatus } from '../../../../../entity/appointment/appointment-status';

export default class AppointmentDto {
  constructor(date: Date, status: AppointmentStatus, patientEmail: string, professionalEmail: string) {
    this.date = date;
    this.status = status;
    this.patientEmail = patientEmail;
    this.professionalEmail = professionalEmail;
  }

    public date: Date

    public status: AppointmentStatus

    public patientEmail: string

    public professionalEmail: string
}
