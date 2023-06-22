import { Component, Output, EventEmitter } from '@angular/core';
import { Article } from '../article';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: {title: string, htmlContent: Event | undefined, index: number, image: string | ArrayBuffer | null}}>()
  @Output() toggleArticleModal = new EventEmitter<{state: boolean, index: number}>()
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

  updateArticle(index: number): void {
    this.toggleArticleForm.emit({state: true, article: {title: this.articles[index].title, htmlContent: this.articles[index].htmlContent, index, image: this.articles[index].image ?? null}})
  }

  removeArticle(index: number): void {
    this.articleService.removeArticle(index)
  }

  // Open modal for adding new article
  openForm(): void {
    this.toggleArticleForm.emit({state: true})
  }

  openArticle(index: number): void {
    this.toggleArticleModal.emit({state: true, index})
  }

}