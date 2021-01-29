import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
/* 
    persistencia <---> Repositorio <---> Rota

    repositorio:
        responsavel por persistir dados
        um repositorio por model (normalmente);
*/

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {

    return response.json({});
});

appointmentsRouter.post('/', (request, response) => {

    const {provider, date} = request.body;

    const parserdDate = startOfHour(parseISO(date));

    const findAppintmentInSameDate = appointmentsRepository.findByDate(parserdDate);

    if(findAppintmentInSameDate){
        return response.status(400).json({
            message: 'This appointment is already booked',
        });
    }
    
    const appointment = appointmentsRepository.create(provider, parserdDate);

    return response.json(appointment);
});

export default appointmentsRouter;