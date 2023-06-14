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

  formErrors = {
    title: false,
    body: false
  }

  constructor(private articleService: ArticleService) {}

  closeForm() {
    this.toggleArticleForm.emit(false)
  }

  addArticle(article: Article): void {
    this.formErrors.title = !article.title
    this.formErrors.body = !article.body
    if (this.formErrors.title || this.formErrors.body) {
      return
    }
    this.articleService.addArticle(article)
    this.closeForm()
  }

}
