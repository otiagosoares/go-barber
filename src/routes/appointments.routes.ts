import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
/* 
    persistencia <---> Repositorio <---> Rota

    repositorio:
        responsavel por persistir dados
        um repositorio por model (normalmente);

    SoC: Separation of Concerns (separacao de preocupacoes)
        Cada parte do codigo tem que ter apenas uma preocupacao

    DTO - data transfer object
*/

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {

    const appointments = appointmentsRepository.all();

    return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {

    const {provider, date} = request.body;

    const parsedDate = startOfHour(parseISO(date));

    const findAppintmentInSameDate = appointmentsRepository.findByDate(parsedDate);

    if(findAppintmentInSameDate){
        return response.status(400).json({
            message: 'This appointment is already booked',
        });
    }
    
    const appointment = appointmentsRepository.create({
        provider,
        date: parsedDate,
    });

    return response.json(appointment);
});

export default appointmentsRouter;