import getImageToGalery from "../../app/helpers/getImgToGalery"
import { IGalery } from "../../app/interfaces/Galery/IGalery"
import { faker } from "@faker-js/faker"
import fs from "fs"

const categoriesImages = [
    { name: "People", keywords: ["elderly", "man", "woman", "child", "portrait", "friends", "family"] },
    { name: "Animals", keywords: ["dog", "cat", "bird", "fish", "wildlife", "lion", "elephant"] },
    { name: "Architecture", keywords: ["buildings", "monuments", "bridges", "cityscape", "skyscraper"] },
    { name: "Nature", keywords: ["forest", "mountain", "river", "beach", "desert", "sunset", "waterfall"] },
    { name: "Wallpapers", keywords: ["anime", "drawings", "landscape", "minimal", "abstract", "galaxy"] },
    { name: "Architecture and Interiors", keywords: ["modern design", "interior", "furniture", "decor", "office", "bedroom"] },
    { name: "Textures", keywords: ["wood", "metal", "stone", "fabric", "glass", "paper", "abstract patterns"] },
    { name: "Technology", keywords: ["computer", "smartphone", "AI", "robot", "programming", "server"] },
    { name: "Food and Drinks", keywords: ["fruit", "coffee", "cake", "pizza", "wine", "healthy food"] },
    { name: "Sports and Fitness", keywords: ["soccer", "basketball", "running", "yoga", "gym", "surf"] },
    { name: "Travel", keywords: ["landmarks", "adventure", "beach", "mountains", "city tours"] },
    { name: "Business and Finance", keywords: ["office", "meeting", "startup", "money", "investment"] },
    { name: "Fashion and Style", keywords: ["clothes", "makeup", "shoes", "runway", "accessories"] },
    { name: "Health and Medicine", keywords: ["doctor", "hospital", "nurse", "medicine", "laboratory"] },
    { name: "Education", keywords: ["books", "students", "teacher", "classroom", "university"] },
    { name: "Music and Art", keywords: ["instruments", "concert", "painting", "graffiti", "sculpture"] },
    { name: "Vehicles", keywords: ["car", "motorcycle", "airplane", "ship", "train", "bicycle"] },
    { name: "Fantasy and Sci-Fi", keywords: ["dragons", "space", "galaxy", "cyberpunk", "magic"] }
]

const setImages: Record<string, Set<string>> = {}

const generateFakeImages = async (count: number): Promise<IGalery[]> => {
    const imagePromises: Promise<IGalery>[] = []  // aray de promesa onde cada promessa resolve para o IGalery

    for (let i = 0; i < count; i++) {
        const promise = (async (): Promise<IGalery> => {
            const categoryObj = faker.helpers.arrayElement(categoriesImages)
            const categoryName = categoryObj.name
            const keyword = faker.helpers.arrayElement(categoryObj.keywords)

            if (!setImages[keyword]) {
                setImages[keyword] = new Set()
            }

            let imageData: IGalery
            let attemptsImage = 0

            do {
                imageData = await getImageToGalery(keyword)
                attemptsImage++
            } while (setImages[keyword].has(imageData.url_full) && attemptsImage < 30)

            setImages[keyword].add(imageData.url_full)

            const galeryItem: IGalery = {
                category: categoryName,
                subcategory: keyword,
                description: imageData.description,
                alt_description: imageData.alt_description,
                width: imageData.width,
                height: imageData.height,
                url_full: imageData.url_full,
                url_small: imageData.url_small
            }

            return galeryItem
        })()

        imagePromises.push(promise)
    }

    const allPromise = await Promise.allSettled(imagePromises)

    const successful = allPromise
        .filter(p => p.status === 'fulfilled')
        .map(p => (p as PromiseFulfilledResult<IGalery>).value)
    await fs.promises.writeFile("GaleryReference.json", JSON.stringify(successful, null, 2))

    return successful
}

export default generateFakeImages