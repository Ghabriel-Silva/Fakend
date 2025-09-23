import { IPerson } from "../../app/interfaces/Person/IPerson";
import { faker } from "@faker-js/faker";
import fs from 'fs'
import { getImageUrl } from "../../app/helpers/getImageUrl";
import { Gender, MaritalStatus } from "../../app/entities/Persons";


const geraFakePersons = async (count: number): Promise<IPerson[]> => {
    const usedImagens = new Set<string>()
    const usedEmail = new Set<string>()

    const personPromise: Promise<IPerson>[] = []


    for (let i = 0; i < count; i++) {
        const promise = (async (): Promise<IPerson> => {
            // Sem os parênteses, a função é apenas declarada e não pode ser executada imediatamente. 
            // Ao adicionar os parênteses externos, a função se torna uma expressão, 
            // que o TypeScript avalia e permite executar imediatamente.


            const gender = faker.helpers.arrayElement([Gender.FEMALE, Gender.MALE])

            const maritalStatus = faker.helpers.arrayElement(
                [MaritalStatus.DIVORCED,
                MaritalStatus.MARRIED,
                MaritalStatus.SINGLE,
                MaritalStatus.WIDOWED,
                MaritalStatus.OTHER
                ])



            const name: string = faker.person.fullName({ sex: gender })

            const [firstName, lastName] = name.split(" ")

            const username = faker.internet.username({
                firstName: firstName,
                lastName: lastName || ""
            })

            const age: number = faker.number.int({ min: 18, max: 80 });
            const country: string = faker.location.country()
            const state: string = faker.location.state()
            const city: string = faker.location.city()
            const profession: string = faker.person.jobType()
            const phone: string = faker.phone.number({ style: "international" });

            let email: string
            let attemptsEmail = 0
            do {
                email = faker.internet.email({
                    firstName: firstName,
                    lastName: lastName || "",
                    provider: "gmail.com"
                });
            } while (usedEmail.has(email) && attemptsEmail < 10)

            usedEmail.add(email)

            
            let imageUrl: string
            let attemptsImage = 0

            do {
                imageUrl = await getImageUrl(gender)
                attemptsImage++
            } while (usedImagens.has(imageUrl) && attemptsImage < 10)

            usedImagens.add(imageUrl)

            return {
                name,
                username,
                gender,
                age,
                maritalStatus,
                imageUrl,
                country,
                state,
                city,
                profession,
                phone,
                email
            }
        })()  // Os parênteses no final '()' executam a função imediatamente.
        personPromise.push(promise)
    }

    const personDB = await Promise.all(personPromise)

    fs.writeFileSync('PersonReference.json', JSON.stringify(personDB, null, 2))

    return personDB
}

export default geraFakePersons