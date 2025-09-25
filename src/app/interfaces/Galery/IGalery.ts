export interface IGalery {
    category?: string
    subcategory?: string
    description: string | null
    alt_description: string | null
    width: number
    height: number
    url_full: string;
    url_small: string;
}