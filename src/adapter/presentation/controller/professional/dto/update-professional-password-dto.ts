export default class UpdateProfessionalPasswordDto {
  constructor(oldPassword: string = '', newPassword: string = '') {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

    public oldPassword: string

    public newPassword: string
}
