import { Router } from "express";
import UserRouter from "../controllers/UserControler";
import AuthRouter from "../controllers/AuthControler";
import ProductRouter from "../controllers/ProductControler";
import PersonRouter from "../controllers/personsController";
import galeryRoutes from "../controllers/GaleryControler";

const routers = Router()

routers.use('/api/v1/auth', AuthRouter)
routers.use('/api/v1/user', UserRouter)
routers.use('/api/v1/products', ProductRouter)
routers.use('/api/v1/person', PersonRouter)
routers.use('/api/v1/galery', galeryRoutes)
export default routers