import { IUserInput } from "../../app/interfaces/User/IUser";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import fs from "fs";

const generateFakeUsers = async (count: number): Promise<IUserInput[]> => {
    const usersDb: IUserInput[] = [];
    const usersJson: any[] = [];

    for (let i = 0; i < count; i++) {
        const name = faker.person.firstName();
        const last_name = faker.person.lastName();
        const email = faker.internet.email({ firstName: name, lastName: last_name });
        const passwordPlain = faker.internet.password({ length: 8 });
        const passwordHash = await bcrypt.hash(passwordPlain, 10); // hash para o banco
        const sexo = faker.helpers.arrayElement(["M", "F"]);
        const birth_date = faker.date.birthdate({ min: 18, max: 70, mode: "age" });

        const user: IUserInput = {
            name,
            last_name,
            email,
            password: passwordHash,
            sexo,
            birth_date,
            active: true
        };

        usersDb.push(user);

        // json de referência (texto puro)
        usersJson.push({
            name,
            last_name,
            email,
            password: passwordPlain,
            sexo,
            birth_date: birth_date.toISOString().split("T")[0],
            active: true
        });
    }

    // Salva o JSON **uma vez só**, depois do loop
    fs.writeFileSync("usersReference.json", JSON.stringify(usersJson, null, 2));

    return usersDb; // retorna o array completo
};

export default generateFakeUsers;
