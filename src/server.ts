import express from 'express'
import { AppDataSource } from "./database/dataSource";
import 'reflect-metadata'
import cors from 'cors'
import 'express-async-errors'
import routers from './app/routes';
import httpErrorMiddleware from './app/middlewares/ErroMiddleware';


const app = express()
app.use(express.json())


app.use(cors()) // usado assim permite que qualquer um acesse a api e faça CRUD 

app.use(routers)
app.use(httpErrorMiddleware)


AppDataSource.initialize().then(() => {
    console.log('Data base started!')

    app.listen(3000, () => {
        console.log("Server Started!")
    })

}).catch((err) => {
    console.error("Error during Data Source initialization:", err)
})