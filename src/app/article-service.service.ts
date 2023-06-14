import { Injectable } from '@angular/core';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  articles: Article[] = []
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

  getArticles(): Article[] {

    return this.articles
    
  }

  // Push new article to array and update localstorage
  addArticle(article: Article): void {
    this.articles.push(article)
    localStorage.setItem("articles",JSON.stringify(this.articles))
  }

  // Delete a specific article from array and update localstorage
  removeArticle(index: number): void {
    this.articles.splice(index, 1)
    localStorage.setItem("articles", JSON.stringify(this.articles))
  }


}