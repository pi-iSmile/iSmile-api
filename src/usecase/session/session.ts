export default class Session {
  constructor(token: string) {
    this.token = token;
  }

  private token: string;
}
