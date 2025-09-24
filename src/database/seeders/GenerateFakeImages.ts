import getImageToGalery from "../../app/helpers/getImgToGalery";
import { IGalery } from "../../app/interfaces/Galery/IGalery";
import { faker } from "@faker-js/faker";
import { IUnsplashPhoto } from "../../app/interfaces/Galery/IUnsplashReponse";

const categoriesImages = [
    { name: 'People', keywords: ['elderly', 'man', 'woman', 'child', 'portrait', 'friends', 'family'] },
    { name: 'Animals', keywords: ['dog', 'cat', 'bird', 'fish', 'wildlife', 'lion', 'elephant'] },
    { name: 'Architecture', keywords: ['buildings', 'monuments', 'bridges', 'cityscape', 'skyscraper'] },
    { name: 'Nature', keywords: ['forest', 'mountain', 'river', 'beach', 'desert', 'sunset', 'waterfall'] },
    { name: 'Wallpapers', keywords: ['anime', 'drawings', 'landscape', 'minimal', 'abstract', 'galaxy'] },
    { name: 'Architecture and Interiors', keywords: ['modern design', 'interior', 'furniture', 'decor', 'office', 'bedroom'] },
    { name: 'Textures', keywords: ['wood', 'metal', 'stone', 'fabric', 'glass', 'paper', 'abstract patterns'] },
    { name: 'Technology', keywords: ['computer', 'smartphone', 'AI', 'robot', 'programming', 'server'] },
    { name: 'Food and Drinks', keywords: ['fruit', 'coffee', 'cake', 'pizza', 'wine', 'healthy food'] },
    { name: 'Sports and Fitness', keywords: ['soccer', 'basketball', 'running', 'yoga', 'gym', 'surf'] },
    { name: 'Travel', keywords: ['landmarks', 'adventure', 'beach', 'mountains', 'city tours'] },
    { name: 'Business and Finance', keywords: ['office', 'meeting', 'startup', 'money', 'investment'] },
    { name: 'Fashion and Style', keywords: ['clothes', 'makeup', 'shoes', 'runway', 'accessories'] },
    { name: 'Health and Medicine', keywords: ['doctor', 'hospital', 'nurse', 'medicine', 'laboratory'] },
    { name: 'Education', keywords: ['books', 'students', 'teacher', 'classroom', 'university'] },
    { name: 'Music and Art', keywords: ['instruments', 'concert', 'painting', 'graffiti', 'sculpture'] },
    { name: 'Vehicles', keywords: ['car', 'motorcycle', 'airplane', 'ship', 'train', 'bicycle'] },
    { name: 'Fantasy and Sci-Fi', keywords: ['dragons', 'space', 'galaxy', 'cyberpunk', 'magic'] }
];

const setImages: Record<string, Set<IUnsplashPhoto>> = {}

const generateFakeImages = async (count: number): Promise<IGalery[]> => {

    const ImagePromise: Promise<IGalery>[] = []

    for (let i = 0; i < count; i++) {
        const promise = (async (): Promise<IGalery> => {
            const categoryObj = faker.helpers.arrayElement(categoriesImages)
            const categoryName = categoryObj.name
            const keyword = faker.helpers.arrayElement(categoryObj.keywords)

            if (!setImages[keyword]) {
                setImages[keyword] = new Set() // (Url1, Url2, Url3)
            }

            let imageData: IUnsplashPhoto[]
            let attemptsImage = 0

            do {
                imageData = await getImageToGalery(keyword)
                attemptsImage++;
            } while (!setImages[keyword].has(imageData.urls) && attemptsImage < 30)


        })()

        ImagePromise.push(promise)
    }



}