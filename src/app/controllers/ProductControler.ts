import { Router, Response, Request } from "express";

class ProductControler {
    public router:Router

    constructor(){
        this.router = Router(),
        this.inicialezeRouter()
    }

    private inicialezeRouter(){
         this.router.get('/', this.allProducts)//search all products
         this.router.get('/stock/:min', this.stockProducts) //search stock
         this.router.get('/category/:category', this.categoryProducts) //Search by category
         this.router.get('/filter', this.filterProducts) //Search by min and max price, for exemplo: GET /products/filter?minPrice=500&maxPrice=1500
    }

    private async allProducts(req:Request, res:Response){
        res.status(200).json('oi')
    }

    private async stockProducts(req:Request, res:Response){

    }

    private async categoryProducts(req:Request, res:Response){

    }

    private async filterProducts(req:Request, res:Response){

    }


}

const ProductRouter = new ProductControler().router
export default ProductRouter