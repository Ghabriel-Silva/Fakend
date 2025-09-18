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

    static async getMinStockProducts(min: number, max: number | undefined): Promise<IProduct[]> {
        if (min == null) {
            throw new ErrorExtension(404, "Min value is requirid")
        }

        let products: IProduct[]
        if (max != null) {
            // Se houver max, usa BETWEEN
            products = await this.productRepository.find({
                where: {
                    stock: Between(min, max),
                },
            });
        } else {
            // Se não houver max, pega tudo acima do min
            products = await this.productRepository.find({
                where: {
                    stock: MoreThan(min),
                },
            });
        }
        return products
    }
}

export default ProductRepository