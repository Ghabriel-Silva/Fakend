import { Router, Request, Response } from "express";
import { IPerson } from "../interfaces/Person/IPerson";
import PersonRepository from "../repository/PersonsRepository";
import ErrorExtension from "../utils/ErrorExtensions";
import { Gender, MaritalStatus } from "../entities/Persons";
import { IPersonFilterOptions } from "../interfaces/Person/IPersonFilterOptions";

class PersonControler {
    router: Router

    constructor() {
        this.router = Router(),
            this.inicializeRoutes()
    }

    private inicializeRoutes() {
        this.router.get('/', this.getAllPerson)
        this.router.get('/filter', this.getFilterPerson)
        this.router.get('/options', this.getFilterOptions)
    }

    private async getAllPerson(req: Request, res: Response): Promise<void> {
        const allPerson: IPerson[] = await PersonRepository.allPerson()

        res.status(200).json({
            status: 'success',
            mensage: allPerson.length ? 'Persons retrieved successfully' : 'Person not found',
            data: allPerson
        })
    }

    private async getFilterPerson(req: Request, res: Response): Promise<void> {
        const { name, gender, age, maritalStatus, country, state, city, profession } = req.query;


        if (name && typeof name !== 'string') {
            throw new ErrorExtension(400, 'Invalid name format');
        }



        let ageValue: number | undefined = undefined;
        if (age) {
            const parsedAge = parseInt(age as string, 10);
            if (isNaN(parsedAge) || parsedAge <= 0) {
                throw new ErrorExtension(400, 'Invalid age value');
            }
            ageValue = parsedAge;
        }

        let genderValue: Gender | undefined = undefined;
        if (gender) {
            if (Object.values(Gender).includes(gender as Gender)) {
                genderValue = gender as Gender;
            } else {
                throw new ErrorExtension(400, 'Invalid gender value');
            }
        }
        // Inicializa a variável que vai receber o valor validado do enum
        let maritalValue: MaritalStatus | undefined = undefined;
        // Verifica se o parâmetro foi enviado na query
        if (maritalStatus) {
            // Confirma se o valor enviado é um dos valores válidos do enum MaritalStatus
            if (Object.values(MaritalStatus).includes(maritalStatus as MaritalStatus)) {
                // Se for válido, atribui à variável maritalValue
                maritalValue = maritalStatus as MaritalStatus;
            } else {
                // Se não for válido, lança um erro 400
                throw new ErrorExtension(400, 'Invalid marital Status value');
            }
        }
        if (country && !/^[a-zA-ZÀ-ÿ\s]+$/.test(country as string)) {
            throw new ErrorExtension(400, 'Invalid country format');
        }

        if (state && !/^[a-zA-ZÀ-ÿ\s]+$/.test(state as string)) {
            throw new ErrorExtension(400, 'Invalid state format');
        }

        if (city && !/^[a-zA-ZÀ-ÿ\s]+$/.test(city as string)) {
            throw new ErrorExtension(400, 'Invalid city format');
        }

        if (profession && !/^[a-zA-ZÀ-ÿ\s]+$/.test(profession as string)) {
            throw new ErrorExtension(400, 'Invalid profession format');
        }

        const filterPerson = await PersonRepository.filterPerson(
            name as string | undefined,
            genderValue,
            ageValue,
            maritalValue,
            country as string | undefined,
            state as string | undefined,
            city as string | undefined,
            profession as string | undefined
        );
        if (filterPerson.length === 0) {
            const filtersUsed = [];

            if (name) filtersUsed.push(`name=${name}`);
            if (genderValue) filtersUsed.push(`gender=${genderValue}`);
            if (ageValue) filtersUsed.push(`age=${ageValue}`);
            if (maritalValue) filtersUsed.push(`maritalStatus=${maritalValue}`);
            if (country) filtersUsed.push(`country=${country}`);
            if (state) filtersUsed.push(`state=${state}`);
            if (city) filtersUsed.push(`city=${city}`);
            if (profession) filtersUsed.push(`profession=${profession}`);

            const message = `Person not found for filters: ${filtersUsed.join(", ")}`;
            throw new ErrorExtension(404, message);
        }


        res.status(200).json({
            status: 'success',
            message: 'Persons retrieved successfully',
            data: filterPerson
        });
    }
    private async getFilterOptions(req: Request, res: Response): Promise<void> {
        const dataFilterOptions: IPersonFilterOptions = await PersonRepository.getPersonOptions()

        res.status(200).json({
            status: 'success',
            data: dataFilterOptions
        })
    }


}

const PersonRouter = new PersonControler().router

export default PersonRouter