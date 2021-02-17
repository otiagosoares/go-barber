import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository } from 'typeorm'

/**
 *  Service 
 *  - nao tem acesso direto aos dados da requisicao/resposta
 *  - deve ter apenas uma responsabilidade (ex: criar) 
 *   
 *  SOLID:
 *  
 *  Single Responsability Principle
 *  O
 *  L
 *  I
 *  Dependency Invertion
 * 
 *   Exemplo de DI = Dependency Invertion (soliD)
 *   recebe o mesmo repositorio pro parametro no constructor:
 * 
 *   constructor(appointmentsRepository: AppointmentsRepository ){
        this.appointmentsRepository = appointmentsRepository;
    }

    https://www.notion.so/Repository-service-e-patterns-82419cceb11c4c4fbbc055ade7fb1ac5
 */

interface RequestDTO {
    provider: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ date, provider }: RequestDTO): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);

        //essa é uma rerga de negocio. a hora em que o agendamento vai acontecer
        const appointmentDate = startOfHour(date);

        const findAppintmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate
        );

        if (findAppintmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        // cria instancia do appointment na memoria
        const appointment = appointmentsRepository.create({
            date: appointmentDate,
            provider,
        });

        // salva efetivamente no banco de dados
        await appointmentsRepository.save(appointment);

        return appointment;

    }
}

export default CreateAppointmentService;