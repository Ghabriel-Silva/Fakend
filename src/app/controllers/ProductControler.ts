import { Router, Response, Request } from "express";
import ProductRepository from "../repository/ProductRepository";
import { IProduct } from "../interfaces/Products/IProducts"
import ErrorExtension from "../utils/ErrorExtensions";
import { formatSuccess } from "../utils/ReponseSuccess";



class ProductControler {
    public router: Router

    constructor() {
        this.router = Router(),
            this.inicialezeRouter()
    }

    private inicialezeRouter() {
        this.router.get('/', this.allProducts)
        this.router.get('/stock', this.stockProducts)
        this.router.get('/filter', this.filterProducts)
        this.router.get('/options', this.productOptions)
    }

    private async allProducts(req: Request, res: Response): Promise<void> {

        const page: number = Number(req.query.page) || 1
        const limit: number = Number(req.query.limit) || 100

        const skip: number = (page - 1) * limit

        const [products, total] = await ProductRepository.getAllProducts(skip, limit)


        res.status(200).json({
            status: "success",
            message: "Products loaded successfully",
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            data: products
        });
    }


    private async stockProducts(req: Request, res: Response): Promise<void> {
        const { min } = req.query

        if (!min) {
            throw new ErrorExtension(400, 'Parameters min is required')
        }

        const minValor: number = Number(min)

        if (isNaN(minValor)) {
            throw new ErrorExtension(400, "Parameters must be numbers")
        }
        const minStockProducts: IProduct[] =
            await ProductRepository.getMinStockProducts(minValor)

        res.status(200).json(
            formatSuccess(minStockProducts, `Products with stock greater than  loaded successfully`)
        );
    }


    private async filterProducts(req: Request, res: Response): Promise<void> {
        const { min, max, category } = req.query

        const minValue: number | undefined = min ? Number(min) : undefined
        const maxValue: number | undefined = max ? Number(max) : undefined


        if ((min !== undefined && isNaN(minValue!)) || (max !== undefined && isNaN(maxValue!))) {
            throw new ErrorExtension(400, "Min and Max must be valid numbers!")
        }
        if (minValue !== undefined && maxValue !== undefined && minValue >= maxValue) {
            throw new ErrorExtension(400, "Min value must be less than Max value!")
        }
        if (category && typeof category !== "string") {
            throw new Error("Category must be a string")
        }
        const validatCategory: string[] = await ProductRepository.getCategorysProducts()

        if (category && !validatCategory.map(c => c.toLowerCase()).includes(category.toLowerCase())) {
            throw new ErrorExtension(400, "Invalid category!");
        }

        const products: IProduct[] = await ProductRepository.getMinMaxPriceProducts(minValue, maxValue, category as string | undefined)

        res.status(200).json(
            formatSuccess(products, maxValue ? `Products with price between ${minValue} and ${maxValue} loaded successfully` : `Products with price greater than ${minValue} loaded successfully`)
        )
    }

    private async productOptions(req: Request, res: Response): Promise<void> {
        const options: string[] = await ProductRepository.getCategorysProducts()

        res.status(400).json(
            formatSuccess(options, 'Available options in the database')
        )
    }
}

const ProductRouter = new ProductControler().router
export default ProductRouter