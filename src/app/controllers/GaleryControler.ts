import { Router, Request, Response, response } from "express";
import { IGalery } from "../interfaces/Galery/IGalery";
import GaleryRepository from "../repository/GaleryRepository";
import ErrorExtension from "../utils/ErrorExtensions";


class GaleryController {
    router: Router

    constructor() {
        this.router = Router()
        this.inicializeRoutes()
    }

    private async inicializeRoutes() {
        this.router.get('/', this.galeryGetAllImages)
    }

    private async galeryGetAllImages(req: Request, res: Response): Promise<void> {


        const responseGalery: IGalery[] = await GaleryRepository.getAllImages()

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        
        const skip = (page - 1) * limit

        if(responseGalery.length === 0){
            throw new ErrorExtension(404, 'Images not Found!')
        }
        const resposta: any = res.status(200).json({
            status: 'success',
            message: 'Galery retrieved successfully',
            data: responseGalery
        })
        return resposta
    }


    private async galeryFilter(req:Request, res:Response):Promise<void>{
        const page = Number(req.query.page) | 1
        const limit = Number(req.query.limit) | 10



    }
}

const galeryRoutes = new GaleryController().router


export default galeryRoutes