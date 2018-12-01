import { Injectable } from '@angular/core';
import { Person } from '../../interfaces/person';

@Injectable()
export class PersonServiceProvider {
  static readonly KEY_STORAGE = '_persons';
  constructor() {
  }

  addPerson(person: Person) { 
    let data = localStorage.getItem(PersonServiceProvider.KEY_STORAGE);
    let data_parse = (data) ? (JSON.parse(data)) : [];
    
    data_parse.push(person);
    localStorage.setItem(PersonServiceProvider.KEY_STORAGE, JSON.stringify(data_parse));
  }

  getPersons(): Person[] { 
    let data = localStorage.getItem(PersonServiceProvider.KEY_STORAGE);
    return (data) ? JSON.parse(data) : [];
  }

  findPerson(code): Person {
    const persons = this.getPersons();
    return persons.find(person => person.code == code);
  }

}
