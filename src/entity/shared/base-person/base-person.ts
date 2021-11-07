import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { Name } from './name';
import { Email } from './email';
import { Birthdate } from './birthdate';

export default abstract class BasePerson {
    @PrimaryGeneratedColumn({ name: 'id' })
    public id: number

    @Column({ name: 'name' })
    public name: Name

    @Column({ name: 'email' })
    public email: Email

    @Column({ name: 'birthdate' })
    public birthdate: Birthdate

    @Column({ name: 'created_at' })
    public createdAt: Date

    @Column({ name: 'updated_at' })
    public updatedAt: Date

    protected constructor(name: Name, email: Email, birthdate: Birthdate) {
      this.name = name;
      this.email = email;
      this.birthdate = birthdate;
      Object.freeze(this);
    }
}
