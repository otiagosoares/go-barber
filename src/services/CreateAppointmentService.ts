import {startOfHour} from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository'

/**
 *  Service 
 *  - nao tem acesso direto aos dados da requisicao/resposta
 *  - deve ter apenas uma responsabilidade (ex: criar) 
 *   
 *   Exemplo de DI = Dependence Inversion (soliD)
 *   constructor(appointmentsRepository: AppointmentsRepository ){
        this.appointmentsRepository = appointmentsRepository;
    }
 */

interface RequestDTO{
    provider: string;
    date: Date;
}

class CreateAppointmentService{

    private appointmentsRepository: AppointmentsRepository;

    constructor(appointmentsRepository: AppointmentsRepository ){
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({date, provider}: RequestDTO): Appointment{
        
        //essa é uma rerga de negocio. a hora em que o agendamento vai acontecer
        const appointmentDate = startOfHour(date);

        const findAppintmentInSameDate = this.appointmentsRepository.findByDate(date);

        if(findAppintmentInSameDate){
            throw Error('This appointment is already booked');
        }
        
        const appointment = this.appointmentsRepository.create({
                date: appointmentDate,
                provider,
            });
        
        return appointment;
    
    }
}

export default CreateAppointmentService;