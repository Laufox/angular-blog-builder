import { Component, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: {title: string, body: string}}>()
  articles: Article[] = []
  articleFormOpen: boolean = false

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles = this.articleService.getArticles()
  }

  updateArticle(index: number): void {
    console.log("to update article ", index)
    this.toggleArticleForm.emit({state: true, article: {title: this.articles[index].title, body: this.articles[index].body}})
  }

  removeArticle(index: number): void {
    this.articleService.removeArticle(index)
  }

  // Open modal for adding new article
  openForm(): void {
    this.toggleArticleForm.emit({state: true})
  }

}