import { Appointment } from "../domain/Appointment"

export class AppointmentService {

    static create = async (appointment: Appointment) => {
        return new Appointment()
    }

    static find = async (appointment: Appointment) => {
        return new Appointment()
    }

    static findAll = async () => {
        return new Array(new Appointment())
    }

    static delete = async (appointment: Appointment) => {

    }

    static update = async (appointment: Appointment) => {
        return new Appointment()
    }

}