import { Component } from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  testPrint(article: Article): void {
    console.log(article)
    localStorage.setItem('articles', JSON.stringify(article))
  }
}
