import { Component } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  articles: Article[] = []

  ngOnInit(): void {
    const storageArticles = localStorage.getItem('articles')

    if (!storageArticles) {
      return
    }
    
    const parsedArticles = JSON.parse(storageArticles)
    this.articles = parsedArticles
  }

  addArticle(article: Article): void {
    this.articles.push(article)
    localStorage.setItem("articles",JSON.stringify(this.articles))
  }

  removeArticle(index: number): void {
    this.articles.splice(index, 1)
    localStorage.setItem("articles", JSON.stringify(this.articles))
  }
}
