import { AppDataSource } from "../../database/dataSource";
import { Galery } from "../entities/Galery";
import { IGalery } from "../interfaces/Galery/IGalery";
import { IGaleryOptions } from "../interfaces/Galery/IGaleryOptions";


class GaleryRepository {
    private static galeryRepository = AppDataSource.getRepository(Galery)

    static async getAllImages(skip: number, take: number): Promise<[IGalery[], number]> {
        return this.galeryRepository.findAndCount({
            skip, //offset
            take //limit 
        })
    }

    static async getCategoryAndSubcategory(): Promise<IGaleryOptions> {

        const [categoryDB, subcategoryDB] = await Promise.all([
            this.galeryRepository.createQueryBuilder('galery')
                .select('DISTINCT galery.category ', 'category')
                .getRawMany(),

            this.galeryRepository.createQueryBuilder('galery')
                .select('DISTINCT galery.subcategory', 'subcategory')
                .getRawMany()
        ])


        return {
            category: categoryDB.map(cat => cat.category.toLowerCase()),
            subcategory: subcategoryDB.map(cat => cat.subcategory.toLowerCase())
        }
    }

    static async getFilter(category?:string, subcategory?:string):Promise<IGalery[]>{
        let query = this.galeryRepository.createQueryBuilder('galery')
 
        if(category){
            query = query.andWhere("galery.category LIKE :category",{ category:`%${category}%`})
        }
        if(subcategory){
            query = query.andWhere("galery.subcategory LIKE :subcategory", {subcategory: `%${subcategory}%`})
        }

        const galeryFilter = await query.getMany()
        return galeryFilter
    }
}

export default GaleryRepository