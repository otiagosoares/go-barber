import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
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

   try{

    const {provider, date} = request.body;

    const parsedDate = parseISO(date) ;
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const appointment = createAppointment.execute({
        date: parsedDate,
        provider,
    })

    return response.json(appointment);
   }catch(err){
       console.error('err', err.message);
       return response.status(400).json({
           error: err.message
       });
   }
});

export default appointmentsRouter;