import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-blog-builder';
  articleOpen: boolean = true

  toggleArticleForm(state: boolean) {
    this.articleOpen = state
  }

}
