export default class Message {
  constructor(name, email, message = "") {
    this.name = name;
    this.email = email;
    this.message = message;
  }
}
