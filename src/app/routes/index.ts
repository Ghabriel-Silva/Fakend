import { Router } from "express";
import UserRouter from "../controllers/UserControler";

const routers = Router()

routers.use('/auth', UserRouter)

export default routers