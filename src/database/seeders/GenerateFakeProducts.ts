import { faker } from "@faker-js/faker";
import fs from "fs";
import { IProduct } from "../../app/interfaces/Products/IProducts";
import { getImageUrl } from "../../app/helpers/getImageUrl";

const categories = [
  { name: "Electronics & Home Appliances", keywords: ["TV", "Refrigerator", "Microwave", "Laptop", "Camera"] },
  { name: "Furniture", keywords: ["Sofa", "Chair", "Table", "Bed", "Desk"] },
  { name: "Clothing", keywords: ["Shirt", "Pants", "Jacket", "Dress", "Shoes"] },
  { name: "Books & Stationery", keywords: ["Novel", "Notebook", "Pen", "Magazine", "Dictionary"] },
  { name: "Beauty & Personal Care", keywords: ["Shampoo", "Soap", "Perfume", "Makeup", "Lotion"] },
  { name: "Sports & Outdoors", keywords: ["Bicycle", "Tennis Racket", "Tent", "Backpack", "Shoes"] },
  { name: "Toys & Games", keywords: ["Puzzle", "Action Figure", "Board Game", "Lego", "Doll"] },
  { name: "Automotive", keywords: ["Car Accessories", "Tire", "Motor Oil", "GPS", "Helmet"] },
  { name: "Groceries & Food", keywords: ["Rice", "Pasta", "Snacks", "Fruit", "Vegetables"] },
  { name: "Pets & Accessories", keywords: ["Dog Food", "Cat Toy", "Aquarium", "Leash", "Collar"] },
  { name: "Music & Instruments", keywords: ["Guitar", "Piano", "Microphone", "Drums", "Sheet Music"] },
  { name: "Tech Accessories", keywords: ["Phone Case", "Charger", "Headphones", "USB Cable", "Power Bank"] }
];

// Armazena URLs já usadas por keyword
const usedImages: Record<string, Set<string>> = {};
// Armazena nomes já usados globalmente
const usedNames: Set<string> = new Set();

const ProductsGenerate = async (count: number): Promise<IProduct[]> => { //uma Promise que, quando resolvida, retorna um array de produtos (IProduct[])
    const productPromises: Promise<IProduct>[] = []; // aray de promesa onde cada promessa resolve para o Iproduct

    for (let i = 0; i < count; i++) {
        const promise = (async (): Promise<IProduct> => {
            const categoryObj = faker.helpers.arrayElement(categories); //pega um elemento aleatorio do array
            const category = categoryObj.name;
            const keyword = faker.helpers.arrayElement(categoryObj.keywords); //Pegando uma keywords aleatorio do array

            const price = Number(faker.commerce.price({ min: 50, max: 2000 }));
            const price_min = price - faker.number.int({ min: 5, max: 50 });

            // Gera nome único
            let name: string;
            let attemptsName = 0;
            do {
                name = `${faker.commerce.productAdjective()} ${keyword}`; // gera um adjetivo de produto aleatório, por exemplo:"Prático", "Incrível", "Inteligente", "Durável"
                attemptsName++;
            } while (usedNames.has(name) && attemptsName < 10); //repete apenas se os dois forem true
            usedNames.add(name); //adciona name gerado para que n seja repetido

            const description: string = faker.commerce.productDescription();
            const sku: string = faker.string.alphanumeric({ length: 10, casing: "upper" });
            const brand: string = faker.company.name();
            const stock: number = faker.number.int({ min: 0, max: 500 });
            const color: string = faker.color.human();
            const size: string = faker.helpers.arrayElement(["Small", "Medium", "Large"]);

            // Inicializa Set para keyword se não existir
            if (!usedImages[keyword]) { //se n existir essa chave cria uma keyword
                usedImages[keyword] = new Set();
            }

            let image_url: string
            let attemptsImage = 0

            do {
                image_url = await getImageUrl(keyword);
                attemptsImage++;
            } while (usedImages[keyword].has(image_url) && attemptsImage < 10); //repete apenas se os dois forem true

            usedImages[keyword].add(image_url); 
            
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
