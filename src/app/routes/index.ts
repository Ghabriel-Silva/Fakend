import { Router } from "express";
import UserRouter from "../controllers/UserControler";
import AuthRouter from "../controllers/AuthControler";

const routers = Router()

routers.use('/auth', AuthRouter)
routers.use('/user', UserRouter)

export default routers