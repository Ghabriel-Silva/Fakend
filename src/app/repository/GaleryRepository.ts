import { AppDataSource } from "../../database/dataSource";
import { Galery } from "../entities/Galery";
import { IGalery } from "../interfaces/Galery/IGalery";


class GaleryRepository {
    private static galeryRepository = AppDataSource.getRepository(Galery)

    static async getAllImages():Promise<IGalery[]>{
        return this.galeryRepository.find()
    }
}

export default GaleryRepository