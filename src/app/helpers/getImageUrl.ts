import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Para guardar URLs já usadas e evitar repetição
const usedImages = new Set<string>();

export async function getImageUrl(query: string): Promise<string> {
    try {
        const response = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20&client_id=${process.env.UNSPLASH_KEY}`
        );
        const data: any = await response.json(); // {...,  results[{}, {}]} json retornado

        if (data.results && data.results.length > 0) { // {results: [{..},{..}]}
            // Filtra imagens que ainda não foram usadas
            const availableImages = data.results
                .map((img: any) => img.urls.small) //result[..., {urls{emall:"urlaquidentro"}}  ] => [url1, url2, url3]
                .filter((url: string) => !usedImages.has(url)); //filter matém os item que retorna !true e descartao o !false
                //depois de filtrado resta apenas [url2, url5, ur10], urls que n foram usadas
            if (availableImages.length === 0) {
                // Se todas já foram usadas, pega uma aleatória
                return data.results[Math.floor(Math.random() * data.results.length)].urls.small; // [url1, url2, ul3] vai ser sorteado
            }

            // Escolhe uma aleatória das disponíveis e marca como usada
            const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)]; //Ex math.randon(): 0.27, 0.89, 0.01… * o index total do array e converto para o inteiro mais proximo
            usedImages.add(selectedImage);
            return selectedImage;
        }

        return "https://via.placeholder.com/640x480?text=No+Image";

    } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        return "https://via.placeholder.com/640x480?text=No+Image";
    }
}
