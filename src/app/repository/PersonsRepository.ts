import { IpcNetConnectOpts } from "net";
import { AppDataSource } from "../../database/dataSource";
import { Gender, MaritalStatus, Person } from "../entities/Persons";
import { IPerson } from "../interfaces/Person/IPerson";
import { IPersonFilterOptions } from "../interfaces/Person/IPersonFilterOptions";

class PersonRepository {
    private static personRepository = AppDataSource.getRepository(Person)

    static async allPerson(skip:number, take:number): Promise<[IPerson[], number]> {
        return await this.personRepository.findAndCount({
            skip, 
            take,
        })
    }

    static async filterPerson(
        name?: string,
        genderValue?: Gender,
        ageValue?: number,
        maritalValue?: MaritalStatus,
        country?: string,
        state?: string,
        city?: string,
        profession?: string
    ): Promise<IPerson[]> {

        let query = this.personRepository.createQueryBuilder("person")

        if (name) {
            query = query.andWhere("person.name LIKE :name", { name: `%${name}%` })
        }
        if (genderValue) {
            query = query.andWhere("person.gender = :gender", { gender: genderValue });
        }
        if (ageValue) {
            query = query.andWhere("person.age = :age", { age: ageValue });
        }
        if (maritalValue) {
            query = query.andWhere("person.maritalStatus = :maritalStatus", { maritalStatus: maritalValue });
        }
        if (country) {
            query = query.andWhere("person.country = :country", { country });
        }
        if (state) {
            query = query.andWhere("person.state = :state", { state });
        }
        if (city) {
            query = query.andWhere("person.city = :city", { city });
        }
        if (profession) {
            query = query.andWhere("person.profession = :profession", { profession });
        }


        const personFilter = await query.getMany() //retorna todos os registros que batem com os filtros
        return personFilter
    }

    static async getPersonOptions():Promise<IPersonFilterOptions>{
        const [names, countries, states, cities] = await Promise.all([ //O destructuring com Promise.all funciona pela ordem das promessas no array:
            this.personRepository.createQueryBuilder('person')
                .select("DISTINCT person.name", "name") // aqui vai selecionar somente os nomes únicos (DISTINCT)
                .getRawMany(), //[ { name: 'Dr. Austin Boyle' }, ... ]  retorna um array de objetos crus
            this.personRepository.createQueryBuilder('person')
                .select("DISTINCT person.country", "country")
                .getRawMany(),
            this.personRepository.createQueryBuilder('person')
                .select('DISTINCT person.state', 'state')
                .getRawMany(),
            this.personRepository.createQueryBuilder("person")
                .select("DISTINCT person.city", "city")
                .getRawMany()
        ])


        return {
            names: names.map(n => n.name), // names = [{name:'gabriel}, {name:'Ketlin'}], aqui o map percorre o objeto "n" e pega apenas o valor da chave name 
            countries: countries.map(c => c.country),
            states: states.map(s => s.state),
            cities: cities.map(c => c.city),
            gender: Object.values(Gender),           // pega os valores do enum
            maritalStatus: Object.values(MaritalStatus) 
        }
    }

}

export default PersonRepository