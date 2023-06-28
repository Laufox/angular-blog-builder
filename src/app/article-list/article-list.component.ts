import { Component, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';
import { ModalOptions } from '../modalOptions';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: Article}>()
  @Output() toggleArticleModal = new EventEmitter<{state: boolean, index: number}>()
  @Output() setActiveModal = new EventEmitter<ModalOptions>()
  articles: Article[] = []
  articleFormOpen: boolean = false

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles = this.articleService.getArticles()
  }

  checkContentHeight(index: number) {
    const elm = document.querySelector(`.article-body-content-${index}`)

    if (!elm?.clientHeight) {
      return false
    }

    return elm.clientHeight > 300
  }

  updateArticle(id: string): void {
    this.articleService.setSelectedArticle(id)
    this.setActiveModal.emit('articleForm')
    // this.toggleArticleForm.emit({state: true, article: this.articleService.articles[index]})
  }

  removeArticle(index: number): void {
    this.articleService.removeArticle(index)
  }

  // Open modal for adding new article
  openForm(): void {
    // this.toggleArticleForm.emit({state: true})
    this.setActiveModal.emit('articleForm')
  }

  openArticle(index: number): void {
    // this.toggleArticleModal.emit({state: true, index})
    this.setActiveModal.emit('article')
  }

}