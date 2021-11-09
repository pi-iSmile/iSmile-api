export default class UpdateProfessionalPasswordDTO {
  constructor(oldPassword: string = '', newPassword: string = '') {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

    public oldPassword: string

    public newPassword: string
}
