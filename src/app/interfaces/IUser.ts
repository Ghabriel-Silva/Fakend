interface IUserInput {
    name: string,
    last_name: string,
    birth_date: Date,
    sexo: string,
    email: string,
    password: string,
    active?: boolean
}


interface IUserOutput extends IUserInput {
    id: number,
    created_at: Date,
    updated_at: Date
}

export  {IUserInput, IUserOutput}