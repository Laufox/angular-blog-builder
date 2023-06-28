import { Component, Output, Input, EventEmitter } from '@angular/core';
import { ArticleService } from '../article-service.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-modal',
  templateUrl: './article-modal.component.html',
  styleUrls: ['./article-modal.component.scss']
})
export class ArticleModalComponent {
  activeArticle: Article | null = null

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.activeArticle = this.articleService.getActiveArticle()
  }

}
