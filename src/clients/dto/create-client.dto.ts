export class CreateClientDto {
    lastName: string; 
    firstName: string;
    patronymic: string;
    dob: Date;
  
    constructor (lastName: string, firstName: string, patronymic: string, dob?: Date) {
      this.lastName = lastName;
      this.firstName = firstName;
      this.patronymic = patronymic;
      this.dob = dob;
    }
  }