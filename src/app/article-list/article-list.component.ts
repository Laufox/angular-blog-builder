import { Component } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  articles: Article[] = []

  addArticle(article: Article): void {
    this.articles.push(article)
  }
}
