import { EntityRepository, Repository } from "typeorm";
import { PatientEntity } from "../entity/PatientEntity";

@EntityRepository(PatientEntity)
export class UserRepository extends Repository<PatientEntity>{

}