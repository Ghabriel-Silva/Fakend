export interface IUnsplashPhoto {
    description: string | null
    alt_description: string | null
    width: number
    height: number
    urls: {
        full: string
        small: string
    }
}

export interface IUnplashResponse {
    total: number
    total_page: number
    results: IUnsplashPhoto[]
}