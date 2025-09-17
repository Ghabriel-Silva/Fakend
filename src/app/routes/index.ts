import { Router } from "express";
import UserRouter from "../controllers/UserControler";
import AuthRouter from "../controllers/AuthControler";
import ProductRouter from "../controllers/ProductControler";

const routers = Router()

routers.use('/auth', AuthRouter)
routers.use('/user', UserRouter)
routers.use('/products', ProductRouter)
export default routers