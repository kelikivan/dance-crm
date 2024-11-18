export class ClientDto {
    id: number; 
    lastName: string; 
    firstName: string;
    patronymic: string;
    dob: Date;
  
    constructor (lastName: string, firstName: string, patronymic: string, dob?: Date, id?: number) {
      this.id = id;
      this.lastName = lastName;
      this.firstName = firstName;
      this.patronymic = patronymic;
      this.dob = dob;
    }
  }