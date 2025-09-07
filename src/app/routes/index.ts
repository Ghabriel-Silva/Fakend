import { Router } from "express";
import UserRouter from "../controllers/UserControler";

const routers = Router()

routers.use('/users', UserRouter)

export default routers