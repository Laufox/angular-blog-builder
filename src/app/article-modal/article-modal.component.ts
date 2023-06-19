import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ArticleService } from '../article-service.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  @Output() toggleArticleModal = new EventEmitter<{state: boolean, article?: {title: string, body: string, index: number}}>()
  @Input() currentArticleIndex: number | null = null
  article: Article = {title: '', author: '', date: '', body: ''}

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    if(this.currentArticleIndex !== null) {
      this.article = this.articleService.articles[this.currentArticleIndex]
    }
  }

  closeModal() {
    this.toggleArticleModal.emit({state: false})
  }
}
