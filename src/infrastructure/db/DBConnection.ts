import { createConnection } from "typeorm"
import { AppointmentEntity } from "./entity/AppointmentEntity";
import { PatientEntity } from "./entity/PatientEntity";

export class DBConnection {

    public create = async() => {
        await createConnection({
            url: process.env.DB_URL,
            type: "postgres",
            entities: [PatientEntity, AppointmentEntity],
            synchronize: false,
            name: process.env.DB_CONNECTION_NAME,
            ssl: {
                rejectUnauthorized: false
            }
        });
    }

}