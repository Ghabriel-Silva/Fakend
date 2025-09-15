export interface IProduct {
    name: string;
    description: string;
    sku: string;
    brand: string;
    category: string;
    price: number;
    price_min?: number; 
    stock: number;
    color?: string;      
    size?: string;       
    image_url?: string;  
}
