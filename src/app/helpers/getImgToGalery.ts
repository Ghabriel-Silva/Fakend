import { IUnplashResponse, IUnsplashPhoto } from "../interfaces/Galery/IUnsplashReponse"

const perPage: number = 30
const page: number = 2

const setImage = new Set()


const getImageToGalery = async (query: string): Promise<IUnsplashPhoto[]> => {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}&client_id=${process.env.UNSPLASH_KEY}`);
        if (!response.ok) throw new Error(`Erro na API Unsplash: ${response.status}`);

        const data = (await response.json()) as IUnplashResponse;
        if (!data || data.results.length === 0) return [];

        // Filtrar urls não repetidas
        const url_full: string[] = data.results
            .map(obj => obj.urls.full)
            .filter(url => !setImage.has(url));



        const imgFullDefault = url_full.length > 0
            ? url_full[Math.floor(Math.random() * url_full.length)]
            : data.results[Math.floor(Math.random() * data.results.length)].urls.full;

        setImage.add(imgFullDefault);


        const respostaImage: IUnsplashPhoto[] = data.results
            .filter(obj => !setImage.has(obj.urls.full)) //Filtra apenas os falso e os que forem true voce deixa para o map proeguir 
            .map(obj => ({
                description: obj.description,
                alt_description: obj.alt_description,
                width: obj.width,
                height: obj.height,
                urls: {
                    full: obj.urls.full,
                    small: obj.urls.small
                }
            }));

        return respostaImage;

    } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        return [];
    }
}

export default getImageToGalery 