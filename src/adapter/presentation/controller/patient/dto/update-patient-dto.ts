export default class UpdatePatientDTO {
  constructor(name: string = '', email: string = '', birthdate: Date = new Date()) {
    this.name = name;
    this.email = email;
    this.birthdate = birthdate;
  }

    public name: string

    public email: string

    public birthdate: Date
}
