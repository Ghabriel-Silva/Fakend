import { AppDataSource } from "../../database/dataSource";
import { Galery } from "../entities/Galery";
import { IGalery } from "../interfaces/Galery/IGalery";


class GaleryRepository {
    private static galeryRepository = AppDataSource.getRepository(Galery)

    static async getAllImages(skip:number, take:number):Promise<[IGalery[], number]>{
        return this.galeryRepository.findAndCount({
            skip, //offset
            take //limit 
        })
    }

    static async getCategoryAndSubcategory():Promise<string[]> {
        const category = await this.galeryRepository
        .createQueryBuilder('galery')
        .select("DISTINCT galery.category", "category")
        .getRawMany()

        return category.map(c=>c.category)

    }
}

export default GaleryRepository