import { Between, LessThanOrEqual, MoreThan, MoreThanOrEqual } from "typeorm"
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

    static async getCategorysProducts(): Promise<string[]> {
        const categories = await this.productRepository
            .createQueryBuilder("product") // alias tem que ser "product"
            .select("DISTINCT product.category", "category")
            .getRawMany();

        return categories.map(c => c.category);
    }
    static async getMinMaxPriceProducts(min?: number, max?: number, category?: string): Promise<IProduct[]> {
        let productFilter: IProduct[]
        const where: any = {}

        if (min !== undefined && max !== undefined) {
            where.price = Between(min, max)
        } else if (min !== undefined) {
            where.price = MoreThanOrEqual(min)
        } else if (max !== undefined) {
            where.price = LessThanOrEqual(max)
        }

        if (category) {
            where.category = category
        }

        productFilter = await this.productRepository.find({ where })

        if (productFilter.length === 0) {
            throw new ErrorExtension(404, "No products found with the given filters");
        }
        return productFilter

    }
}

export default ProductRepository