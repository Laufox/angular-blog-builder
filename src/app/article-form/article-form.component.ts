import { Component, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Output() toggleArticleForm = new EventEmitter<boolean>()

  constructor(private articleService: ArticleService) {}

  closeForm() {
    this.toggleArticleForm.emit(false)
  }

  addArticle(article: Article): void {
    this.articleService.addArticle(article)
    this.closeForm()
  }

  testPrint(article: Article): void {
    console.log(article)
    localStorage.setItem('articles', JSON.stringify(article))
  }
}
