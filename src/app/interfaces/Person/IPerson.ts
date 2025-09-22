import { Gender } from "../../entities/Persons"
import { MaritalStatus } from "../../entities/Persons"

export interface IPerson {
    name: string
    username: string
    gender: Gender
    age: number
    maritalStatus: MaritalStatus
    imageUrl: string
    country: string
    state: string
    city: string
    profession: string
    phone: string
    email: string
}

