import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppintmentDTO{
    provider: string;
    date: Date;
}

class AppointmentsRepository{
    private appointments : Appointment[];

    constructor(){
        this.appointments = [];
    }
    public all(): Appointment[]{

        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null{
        const findAppintment = this.appointments.find( appointment => 
            isEqual(date, appointment.date)
        );

        return findAppintment || null;
    }

    public create({date, provider}: CreateAppintmentDTO):Appointment{

        const appointment = new Appointment({provider, date});

        this.appointments.push(appointment);
        return appointment;
    }
}

export default AppointmentsRepository;