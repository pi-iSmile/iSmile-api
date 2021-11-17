export default class CreateAppointmentDto {
  constructor(professionalEmail: string, patientEmail: string, date: Date) {
    this.professionalEmail = professionalEmail;
    this.patientEmail = patientEmail;
    this.date = date;
  }

    public professionalEmail: string

    public patientEmail: string

    public date: Date
}
