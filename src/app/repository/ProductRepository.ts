import { Between, MoreThan } from "typeorm"
import { AppDataSource } from "../../database/dataSource"
import Product from "../entities/Products"
import { IProduct } from "../interfaces/Products/IProducts"
import ErrorExtension from "../utils/ErrorExtensions"

class ProductRepository {
    private static productRepository = AppDataSource.getRepository(Product)


    static async getAllProducts(): Promise<IProduct[]> {
        return await this.productRepository.find()
    }

    static async getMinStockProducts(min: number): Promise<IProduct[]> {
        if (min == null) {
            throw new ErrorExtension(404, "Min value is requirid")
        }

        let products: IProduct[]
        products = await this.productRepository.find({
            where: {
                stock: MoreThan(min),
            },
        });

        if (products.length == 0) {
            throw new ErrorExtension(400, `No products found with stock greater than ${min}`)
        }
        return products
    }


    static async getMinMaxPriceProducts(min: number, max: number): Promise<IProduct[]> {
        let productMinMax: IProduct[]
        if (max !== undefined) {
            productMinMax = await this.productRepository.find({
                where: {
                    price: Between(min, max)
                }
            })
        } else {
            productMinMax = await this.productRepository.find({
                where: {
                    price: MoreThan(min)
                }
            })
        }
        if (productMinMax.length === 0) {
            throw new ErrorExtension(404, "No products found within the given price range");
        }

        return productMinMax

    }
}

export default ProductRepository