import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  @Output() toggleArticleModal = new EventEmitter<{state: boolean, article?: {title: string, body: string, index: number}}>()
  @Input() selectedArticle: {title: string, body: string, index: number | null} = {title: '', body: '', index: null}

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    if(this.selectedArticle.index !== null) {
      console.log(this.articleService.articles[this.selectedArticle.index])
    }
  }

  closeModal() {
    this.toggleArticleModal.emit({state: false})
  }
}
