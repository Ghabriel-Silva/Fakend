import { Router, Request, Response, response } from "express";
import { IGalery } from "../interfaces/Galery/IGalery";
import GaleryRepository from "../repository/GaleryRepository";
import ErrorExtension from "../utils/ErrorExtensions";
import { error } from "console";


class GaleryController {
    router: Router

    constructor() {
        this.router = Router()
        this.inicializeRoutes()
    }

    private async inicializeRoutes() {
        this.router.get('/', this.galeryGetAllImages)
        this.router.get('/filter', this.galeryFilter)
    }

    private async galeryGetAllImages(req: Request, res: Response): Promise<void> {

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const skip = (page - 1) * limit //quantos registros você deve pular antes de começar a pegar.

        const [image, total] = await GaleryRepository.getAllImages(skip, limit)


        if (image.length === 0) {
            throw new ErrorExtension(404, 'Images not Found!')
        }

        res.status(200).json({
            status: 'sucess',
            message: 'Galery retrieved  successfully',
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: image
        })

    }


    private async galeryFilter(req: Request, res: Response): Promise<void> {
        // const page = Number(req.query.page) | 1
        // const limit = Number(req.query.limit) | 10
        const { category} = req.params

        const categoryBd: string[] = await GaleryRepository.getCategoryAndSubcategory()
        if (category && !categoryBd.includes(category)) { //mudar por some para aceitar tanto maisucula como mnuscula
            throw new ErrorExtension(404, 'Category not found, try already');
        }







    }
}

const galeryRoutes = new GaleryController().router


export default galeryRoutes