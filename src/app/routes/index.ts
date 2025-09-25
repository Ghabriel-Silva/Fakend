import { Router } from "express";
import UserRouter from "../controllers/UserControler";
import AuthRouter from "../controllers/AuthControler";
import ProductRouter from "../controllers/ProductControler";
import PersonRouter from "../controllers/personsController";
import galeryRoutes from "../controllers/GaleryControler";

const routers = Router()

routers.use('/auth', AuthRouter)
routers.use('/user', UserRouter)
routers.use('/products', ProductRouter)
routers.use('/person', PersonRouter)
routers.use('/galery', galeryRoutes)
export default routers