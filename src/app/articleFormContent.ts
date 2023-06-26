// Blueprint template for article content
export interface ArticleFormContent {
    title: string,
    htmlContent: Event | undefined,
    image?: string | ArrayBuffer | null
}