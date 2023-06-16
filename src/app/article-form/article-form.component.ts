import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: {title: string, body: string, index: number}}>()
  @Input() currentAuthorName = ''
  @Input() selectedArticle: {title: string, body: string, index: number | null} = {title: '', body: '', index: null}

  formErrors = {
    title: false,
    body: false
  }

  constructor(private articleService: ArticleService) {}

  closeForm() {
    this.toggleArticleForm.emit({state: false})
  }

  addArticle(content: {title: string, body: string}): void {
    this.formErrors.title = !content.title
    this.formErrors.body = !content.body
    if (this.formErrors.title || this.formErrors.body) {
      return
    }

    const newArticle: Article = {
      title: content.title,
      date: new Date().toUTCString().slice(5, 16),
      author: this.currentAuthorName,
      body: content.body
    }

    if (this.selectedArticle.index !== null) {
      this.articleService.updateArticle(this.selectedArticle.index, content)
    } else {
      this.articleService.addArticle(newArticle)
    }
    this.closeForm()
  }

}
