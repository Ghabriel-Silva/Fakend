import { Router, Request, Response, response } from "express";
import GaleryRepository from "../repository/GaleryRepository";
import ErrorExtension from "../utils/ErrorExtensions";
import { formatSuccess } from "../utils/ReponseSuccess"
import { IGaleryOptions } from "../interfaces/Galery/IGaleryOptions";


class GaleryController {
    router: Router

    constructor() {
        this.router = Router()
        this.inicializeRoutes()
    }

    private async inicializeRoutes() {
        this.router.get('/', this.galeryGetAllImages)
        this.router.get('/filter', this.galeryFilter)
        this.router.get('/options', this.galeryOptions)
    }

    private async galeryGetAllImages(req: Request, res: Response): Promise<void> {

        const page:number = Number(req.query.page) || 1
        const limit:number = Number(req.query.limit) || 50

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
        const category = typeof req.query.category === "string" ? req.query.category.toLowerCase() : undefined
        const subcategory = typeof req.query.subcategory === "string" ? req.query.subcategory.toLowerCase() : undefined

        const categoriesResult = await GaleryRepository.getFilter(category, subcategory)

        if (category && categoriesResult.length === 0) {
            const categoryExist = await GaleryRepository.getFilter(category, undefined)
            if (categoryExist.length === 0)
                throw new ErrorExtension(404, 'Category not found')
        }
        if (subcategory && categoriesResult.length === 0) {
            const subcategoryExists = await GaleryRepository.getFilter(undefined, subcategory);
            if (subcategoryExists.length === 0) {
                throw new ErrorExtension(404, 'Subcategory not found');
            }
        }
        res.status(200).json(
            formatSuccess(categoriesResult, "Filter retrieved successfully")
        )
    }

    
    private async galeryOptions(req: Request, res: Response): Promise<void> {
        const options: IGaleryOptions = await GaleryRepository.getCategoryAndSubcategory()
        res.status(200).json(
            formatSuccess(options, 'Available options in the database')
        )
    }
}

const galeryRoutes = new GaleryController().router


export default galeryRoutes