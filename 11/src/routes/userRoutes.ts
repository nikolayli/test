import { Router } from 'express';
import * as UserController from '../controllers/UserControllers';

const router = Router();

router.get('/users', UserController.getUsers);
router.post('/users', UserController.createUser);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;