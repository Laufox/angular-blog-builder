// Blueprint template for article content
export interface Article {
    title: string,
    date: string,
    author: string,
    htmlContent: Event | undefined,
    image?: string | ArrayBuffer | null
}