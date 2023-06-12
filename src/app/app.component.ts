import { Component } from '@angular/core';
import { Article } from './article';
import { ArticleService } from './article-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-blog-builder';
  // articles: Article[] = []

  // constructor(private articleService: ArticleService) {}

  // ngOnInit(): void {
  //   this.articles = this.articleService.getArticles()
  // }
}
