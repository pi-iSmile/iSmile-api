import express from 'express';
import { UserController } from './port/UserController';

const router = express.Router();

const userRouter = "/users/";

    router
        .get(userRouter, UserController.getUsers)
        .post(userRouter, UserController.createUser)
        .put(userRouter.concat("/:id"), UserController.updateUser)
        .delete(userRouter.concat("/:id"), UserController.deleteUser)
        .get(userRouter.concat("/:id"), UserController.getUser);

export default router;