import { EntityRepository, Repository } from "typeorm";
import { AppointmentEntity } from "../entity/AppointmentEntity";

@EntityRepository(AppointmentEntity)
export class AppointmentRepository extends Repository<AppointmentEntity> {

}
