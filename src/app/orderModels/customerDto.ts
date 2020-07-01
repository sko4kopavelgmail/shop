import { PersonDto } from './personDto';

export class CustomerDto {
    id: number;
    person: PersonDto;

    constructor(id: number, personDto: PersonDto) {
        this.id = id;
        this.person = personDto;
    }
}