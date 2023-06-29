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
  }

  removeArticle(index: number): void {
    this.articleService.removeArticle(index)
  }

  // Open modal for adding new article
  openForm(): void {
    this.setActiveModal.emit('articleForm')
  }

  openArticle(id: string): void {
    this.articleService.setSelectedArticle(id)
    this.setActiveModal.emit('article')
  }

}