import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentsRouter = Router();

interface Appoitment{
    id: string;
    provider: string;
    date: Date;
}

const appointments:Appoitment[] = [];

appointmentsRouter.get('/', (request, response) => {

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    const {provider, date} = request.body;

    const parserdDate = startOfHour(parseISO(date));

    const findAppintmentInSameDate = appointments.find( appointment => 
        isEqual(parserdDate, appointment.date)
    );

    console.log(findAppintmentInSameDate);

    if(findAppintmentInSameDate){
        return response.status(400).json({
            message: 'This appointment is already booked',
        });
    }
    
    const appointment = {
        id: uuid(),
        provider,
        date: parserdDate
    };
    
    appointments.push(appointment);

    return response.json(appointment);
});

export default appointmentsRouter;