import { Router } from 'express';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.get('/', (req, res) =>{
    res.json({
        message: "Olá Dev"
    })
});
routes.use('/appointments', appointmentsRouter);

export default routes;