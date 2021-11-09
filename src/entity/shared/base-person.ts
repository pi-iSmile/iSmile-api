import { Column } from 'typeorm';
import BaseEntity from './base-entity';

export default abstract class BasePerson extends BaseEntity {
    @Column({ name: 'name' })
    public name: string

    @Column({ name: 'email' })
    public email: string

    @Column({ name: 'birthdate' })
    public birthdate: Date

    protected constructor(name: string, email: string, birthdate: Date) {
      super();
      this.name = name;
      this.email = email;
      this.birthdate = birthdate;
    }
}
