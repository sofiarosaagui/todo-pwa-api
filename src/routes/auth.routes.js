import { Router } from 'express';
import {register,login,profile} from "../controllers/auth.controller.js";
import {auth} from "../middleware/auth.js";

const routes = new Router();

routes.post('/register', register);
routes.post('/login', login);
routes.get('/profile', auth,profile);


export default routes;