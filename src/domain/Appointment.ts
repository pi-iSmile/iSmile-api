export class Appointment {
    id: String;
    patient_name: String;
    patient_email: String;
    patient_phone: String;
    date: Date;
    confirmed: Boolean;
    done: Boolean;
    
    constructor(
        {
            id,
            patient_name,
            patient_email,
            patient_phone,
            date,
            confirmed,
            done
        }: 
        {
          id?: String,
          patient_name?: String,
          patient_email?: String,
          patient_phone?: String,
          date?: Date,
          confirmed?: Boolean,
          done?: Boolean      
        } = {}) {
          this.id = id;
          this.patient_email = patient_email;
          this.patient_name = patient_name;
          this.patient_phone = patient_phone;
          this.confirmed = confirmed;
          this.done = done;      
        }
}