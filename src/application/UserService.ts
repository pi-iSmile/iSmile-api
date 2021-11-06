import { PatientEntity } from "../infrastructure/db/entity/PatientEntity";
import { UserRepository } from "../infrastructure/db/repository/PatientRepository";
import { getConnection } from "typeorm";
import { Patient } from "../domain/Patient";

export class UserService {

    static create = async (patient: Patient) => {

        console.log("entro");
        

        let userRepository: UserRepository = getConnection(process.env.DB_CONNECTION_NAME).getCustomRepository(UserRepository);

        let patientEntity = new PatientEntity(); 

        patientEntity.email = patient.email;
        patientEntity.name = patient.name;
        patient.bithdate = patient.bithdate
        
        return await userRepository.create(patientEntity);
    }

    static find = async (patient: Patient) => {
        return new Patient()
    }

    static findAll = async () => {
        return new Array(new Patient())
    }

    static delete = async (patient: Patient) => {

    }

    static update = async (patient: Patient) => {
        return new Patient()
    }

}