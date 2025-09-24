import { Router, Response, Request } from "express";
import ProductRepository from "../repository/ProductRepository";
import { IResponseSuccess } from "../interfaces/User/IReponseSucess"
import { IProduct } from "../interfaces/Products/IProducts"
import ErrorExtension from "../utils/ErrorExtensions";



class ProductControler {
    public router: Router

    constructor() {
        this.router = Router(),
            this.inicialezeRouter()
    }

    private inicialezeRouter() {
        this.router.get('/', this.allProducts)//search all products
        this.router.get('/stock', this.stockProducts) //search stock
        this.router.get('/filter', this.filterProducts) //Search by min and max price, for exemplo: GET /products/filter?minPrice=500&maxPrice=1500
    
    }

    private async allProducts(req: Request, res: Response): Promise<void> {
        const allproducts: IProduct[] = await ProductRepository.getAllProducts()

        res.status(200).json({
            status: "success",
            message: "Products loaded successfully",
            data: allproducts
        } as IResponseSuccess<IProduct[]>);
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

        res.status(200).json({
            status: "success",
            message: `Products with stock greater than  loaded successfully`,
            data: minStockProducts
        } as IResponseSuccess<IProduct[]>);
    }


    private async filterProducts(req: Request, res: Response) {
        const { min, max, category } = req.query

        const minValue: number | undefined = min ? Number(min) : undefined
        const maxValue: number | undefined = max ? Number(max) : undefined

        //validando se são numeros
        if ((min !== undefined && isNaN(minValue!)) || (max !== undefined && isNaN(maxValue!))) {
            throw new ErrorExtension(400, "Min and Max must be valid numbers!")
        }
        if (minValue !== undefined && maxValue !== undefined && minValue >= maxValue) {
            throw new ErrorExtension(400, "Min value must be less than Max value!")
        }
        if (category && typeof category !== "string") {
            throw new Error("Category mustF be a string")
        }
        const validatCategory: string[] = await ProductRepository.getCategorysProducts()

        if (category && !validatCategory.map(c => c.toLowerCase()).includes(category.toLowerCase())) {
            throw new ErrorExtension(400, "Invalid category!");
        }

        const products: IProduct[] = await ProductRepository.getMinMaxPriceProducts(minValue, maxValue, category as string | undefined)

        res.status(200).json({
            status: "success",
            message: maxValue ? `Products with price between ${minValue} and ${maxValue} loaded successfully` : `Products with price greater than ${minValue} loaded successfully`,
            data: products
        } as IResponseSuccess<IProduct[]>)

    }
}

const ProductRouter = new ProductControler().router
export default ProductRouter