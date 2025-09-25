import { Router, Request, Response } from "express";


class GaleryController {
    router: Router

    constructor(){
        this.router = Router()
        this.inicializeRoutes()
    }

    private async inicializeRoutes(){
        this.router.get('/', this.galeryGetAllImages)
    }

    private async galeryGetAllImages(req:Request, res:Response):Promise<void>{
        const resposta:any = res.status(200).json({
            console:'deu certo'
        })
        return resposta
    }
}

const galeryRoutes = new GaleryController().router


export default galeryRoutes