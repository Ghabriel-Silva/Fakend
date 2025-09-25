import { IGalery } from "../interfaces/Galery/IGalery"
import { IUnplashResponse, IUnsplashPhoto } from "../interfaces/Galery/IUnsplashReponse"
import dotenv from "dotenv";
dotenv.config();

const setImage = new Set()


const getImageToGalery = async (query: string): Promise<IGalery> => {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=30&client_id=${process.env.UNSPLASH_KEY}`);

        if (!response.ok) throw new Error(`Erro na API Unsplash: ${response.status}`);

        const data = (await response.json()) as IUnplashResponse;
        if (!data || data.results.length === 0) {
            throw new Error('Image not Found')
        }


        const url_full: string[] = data.results
            .map(obj => obj.urls.full)
            .filter(url => !setImage.has(url));



        const imgFullDefault = url_full.length > 0
            ? url_full[Math.floor(Math.random() * url_full.length)]
            : data.results[Math.floor(Math.random() * data.results.length)].urls.full;

        setImage.add(imgFullDefault);

        const filterObjImage: IUnsplashPhoto | undefined = data.results.find(obj => obj.urls.full === imgFullDefault)

        if (!filterObjImage) {
            throw new Error("Imagem escolhida não encontrada no resultado");
        }

        const respImage: IGalery =
        {
            height: filterObjImage!.height,
            width: filterObjImage!.width,
            url_full: filterObjImage!.urls.full,
            url_small: filterObjImage!.urls.small,
            description: filterObjImage!.description,
            alt_description: filterObjImage!.alt_description,
        }



        return respImage

    } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        throw new Error('Error to search images');
    }
}

export default getImageToGalery 