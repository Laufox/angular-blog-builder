import { Injectable } from '@angular/core';
import { Article } from './article';
import { ArticleFormContent } from './articleFormContent';
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: Article[] = []
  activeArticle: Article | null = null
  // activeArticleSubject: Subject<Article> = new Subject<Article>
  constructor() { 
    this.articles = this.getInitialArticles()
  }

  private getInitialArticles() {
    // Try to get values from localstorgae
    const storageArticles = localStorage.getItem('articles')

    // If no values found from localstorage, return early
    if (!storageArticles) {
      return []
    }
    
    // Turn storage value into a proper array and return it
    return JSON.parse(storageArticles)
  }

  setSelectedArticle(id: string) {
    const article = this.articles.find(art => art.id === id)
    this.activeArticle = article ?? null
    // if (!article) {
    //   return
    // }
    // this.activeArticleSubject.next(article)
  }

  resetActiveArticle() {
    this.activeArticle = null
  }

  getActiveArticle() {
    return this.activeArticle
  }

  getArticles(): Article[] {

    return this.articles
    
  }

  // Push new article to array and update localstorage
  addArticle(articleContent: ArticleFormContent, author: string): void {
    const newArticle: Article = {
      id: uuid(),
      author,
      date: new Date().toUTCString().slice(5, 16),
      ...articleContent
    }
    this.articles.push(newArticle)
    localStorage.setItem("articles",JSON.stringify(this.articles))
  }

  updateArticle(id: string, articleContent: ArticleFormContent) {
    let articleToUpdate = this.articles.find(art => art.id === id)
    if (!articleToUpdate) {
      return
    }
    console.log(articleToUpdate)
    console.log(articleContent)
    articleToUpdate = {
      ...articleToUpdate,
      ...articleContent,
      lastUpdated: new Date().toUTCString().slice(5, 16)
    }
    console.log(articleToUpdate)
    this.articles[this.articles.findIndex(art => art.id === id)] = articleToUpdate
    localStorage.setItem("articles",JSON.stringify(this.articles))
  }

  // Delete a specific article from array and update localstorage
  removeArticle(index: number): void {
    this.articles.splice(index, 1)
    localStorage.setItem("articles", JSON.stringify(this.articles))
  }


}
