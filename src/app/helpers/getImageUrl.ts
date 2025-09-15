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
        const data: any = await response.json();

        if (data.results && data.results.length > 0) {
            // Filtra imagens que ainda não foram usadas
            const availableImages = data.results
                .map((img: any) => img.urls.small) 
                .filter((url: string) => !usedImages.has(url)); //filter matém os item que retorna !true e descartao o !false

            if (availableImages.length === 0) {
                // Se todas já foram usadas, pega uma aleatória
                return data.results[Math.floor(Math.random() * data.results.length)].urls.small;
            }

            // Escolhe uma aleatória das disponíveis e marca como usada
            const selectedImage = availableImages[Math.floor(Math.random() * availableImages.length)];
            usedImages.add(selectedImage);
            return selectedImage;
        }

        return "https://via.placeholder.com/640x480?text=No+Image";

    } catch (err) {
        console.error("Erro ao buscar imagem:", err);
        return "https://via.placeholder.com/640x480?text=No+Image";
    }
}
