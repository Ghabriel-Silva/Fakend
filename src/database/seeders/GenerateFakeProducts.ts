import { faker } from "@faker-js/faker";
import fs from "fs";
import { IProduct } from "../../app/interfaces/Products/IProducts";
import { getImageUrl } from "../../app/helpers/getImageUrl";

const categories = [
    { name: "Electronics & Home Appliances", keywords: ["TV", "Refrigerator", "Microwave", "Laptop", "Camera"] },
    { name: "Furniture", keywords: ["Sofa", "Chair", "Table", "Bed", "Desk"] },
    { name: "Clothing", keywords: ["Shirt", "Pants", "Jacket", "Dress", "Shoes"] }
];

// Armazena URLs já usadas por keyword
const usedImages: Record<string, Set<string>> = {};
// Armazena nomes já usados globalmente
const usedNames: Set<string> = new Set();

const ProductsGenerate = async (count: number): Promise<IProduct[]> => {
    const productPromises: Promise<IProduct>[] = [];

    for (let i = 0; i < count; i++) {
        const promise = (async (): Promise<IProduct> => {
            const categoryObj = faker.helpers.arrayElement(categories);
            const category = categoryObj.name;
            const keyword = faker.helpers.arrayElement(categoryObj.keywords);

            const price = Number(faker.commerce.price({ min: 50, max: 2000 }));
            const price_min = price - faker.number.int({ min: 5, max: 50 });

            // Gera nome único
            let name: string;
            let attemptsName = 0;
            do {
                name = `${faker.commerce.productAdjective()} ${keyword}`;
                attemptsName++;
            } while (usedNames.has(name) && attemptsName < 10);
            usedNames.add(name); //adciona name gerado para que n seja repetido

            const description: string = faker.commerce.productDescription();
            const sku: string = faker.string.alphanumeric({ length: 10, casing: "upper" });
            const brand: string = faker.company.name();
            const stock: number = faker.number.int({ min: 0, max: 500 });
            const color: string = faker.color.human();
            const size: string = faker.helpers.arrayElement(["Small", "Medium", "Large"]);

            // Inicializa Set para keyword se não existir
            if (!usedImages[keyword]) {
                usedImages[keyword] = new Set();
            }

            let image_url: string;
            let attemptsImage = 0;

            // Tenta pegar uma imagem única até 10 vezes
            do {
                image_url = await getImageUrl(keyword);
                attemptsImage++;
            } while (usedImages[keyword].has(image_url) && attemptsImage < 10);

            usedImages[keyword].add(image_url); // marca a URL como usada

            return {
                name,
                description,
                sku,
                brand,
                category,
                price,
                price_min,
                stock,
                color,
                size,
                image_url,
            };
        })();

        productPromises.push(promise);
    }

    const productDb = await Promise.all(productPromises);

    fs.writeFileSync("ProductsReference.json", JSON.stringify(productDb, null, 2));

    return productDb;
};

export default ProductsGenerate;
