import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTables1636262142609 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create table patient(id bigserial constraint patient_pk primary key, name varchar(255) not null, email varchar(255) not null, birthdate date not null, created_at timestamp not null, updated_at timestamp not null)');
    await queryRunner.query('create unique index patient_email_uindex on patient (email)');

    await queryRunner.query('create table professional(id bigserial constraint professional_pk primary key, name varchar(255) not null, email varchar(255) not null, password varchar(255) not null, status varchar(255) not null, birthdate date not null, created_at timestamp not null, updated_at timestamp not null)');
    await queryRunner.query('create unique index professional_email_uindex on professional (email);');

    await queryRunner.query('create table appointment(id bigserial constraint appointment_pk primary key, professional_id bigint not null constraint appointment_professional_id_fk references professional, patient_id bigint not null constraint appointment_patient_id_fk references patient, date timestamp not null, status varchar(255) not null, created_at timestamp not null, updated_at timestamp not null)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('drop table if exists appointment;');
    await queryRunner.query('drop table if exists patient;');
    await queryRunner.query('drop table if exists professional;');
  }
}
