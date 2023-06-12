import { Component } from '@angular/core';
import { Article } from '../article';
import { Input } from '@angular/core';
import { ArticleService } from '../article-service.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent {
  
  // @Input() articles?: Article[]
  // @Input() addArticle: (article: Article) => void
  articles: Article[] = []
  articleFormOpen: boolean = false

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.articles = this.articleService.getArticles()
  }

  // // Push new article to array and update localstorage
  addArticle(article: Article): void {
    this.articleService.addArticle(article)
  }

  // Open modal for adding new article
  openArticleForm(): void {
    this.articleFormOpen = true
  }

  // Close modal for adding new article
  closeArticleForm(): void {
    this.articleFormOpen = false
  }
}

/**
 * addArticle({
                title: 'My new blog post',
                date: '23-06-08',
                author: 'John Doe',
                body: 'Lorem ipsum dolor sit amet'
            })
 */
