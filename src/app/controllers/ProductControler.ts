import { Router, Response, Request } from "express";
import ProductRepository from "../repository/ProductRepository";
import { IResponseSuccess } from "../interfaces/IReponseSucess"
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
        this.router.get('/category/:category', this.categoryProducts) //Search by category
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
        const { min, max } = req.query

        if (!min) {
            throw new ErrorExtension(400, 'Parameters min is required')
        }
        const minValor: number = Number(min)
        const maxValor: number | undefined = max ? Number(max) : undefined

        if (isNaN(minValor) || (max && isNaN(maxValor!))) {
            throw new ErrorExtension(400, "Parameters must be numbers")
           
        }
        const minStockProducts: IProduct[] =
            await ProductRepository.getMinStockProducts(minValor, maxValor)

        res.status(200).json({
            status: "success",
            message: `Products with stock greater than  loaded successfully`,
            data: minStockProducts
        } as IResponseSuccess<IProduct[]>);
    }

    private async categoryProducts(req: Request, res: Response) {

    }

    private async filterProducts(req: Request, res: Response) {

    }


}

const ProductRouter = new ProductControler().router
export default ProductRouter