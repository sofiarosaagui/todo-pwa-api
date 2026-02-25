import { Router } from 'express';
import {auth} from "../middleware/auth.js";
import { create, list, remove, update, bulksync } from '../controllers/task.controller.js';

const router = new Router();

router.use(auth);
router.get('/',list); //obtener todas las tareas
router.post('/',create); //crear una nueva tarea
router.put('/:id',update); //Actualiza una tarea por ID
router.delete('/:id',remove);//Eliminar una tarea por ID
router.post('/bulksync',bulksync); //Sincronizacion masiva de tareas

export default router;