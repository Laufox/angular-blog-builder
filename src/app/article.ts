// Blueprint template for article content
export interface Article {
    id: string,
    title: string,
    date: string,
    lastUpdated?: string,
    author: string,
    htmlContent: Event | undefined,
    image?: string | ArrayBuffer | null
}