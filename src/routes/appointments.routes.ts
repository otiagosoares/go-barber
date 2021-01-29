import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments:Appointment[] = [];

appointmentsRouter.get('/', (request, response) => {

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    const {provider, date} = request.body;

    const parserdDate = startOfHour(parseISO(date));

    const findAppintmentInSameDate = appointments.find( appointment => 
        isEqual(parserdDate, appointment.date)
    );

    if(findAppintmentInSameDate){
        return response.status(400).json({
            message: 'This appointment is already booked',
        });
    }
    
    const appointment = new Appointment(provider, parserdDate);
    
    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;