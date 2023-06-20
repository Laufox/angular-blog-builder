import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentBlogTitle = 'My blog title'
  currentAuthorName = "John Doe"
  articleOpen: boolean = false
  aboutModalOpen: boolean = false
  settingsModalOpen: boolean = false
  articleModalOpen: boolean = false
  selectedArticle: {title: string, htmlContent: Event | undefined, index: number | null} = {title: '', htmlContent: undefined, index: null}
  currentArticleIndex: number | null = null

  ngOnInit() {
    this.currentBlogTitle = localStorage.getItem("blogTitle") ?? "My blog title"
    this.currentAuthorName = localStorage.getItem("authorName") ?? "John Doe"
  }

  toggleArticleForm(arg: {state: boolean, article ?: {title: string, htmlContent: Event | undefined, index: number}} ) {
    if (arg.article) {
      this.selectedArticle.title = arg.article.title
      this.selectedArticle.index = arg.article.index
      this.selectedArticle.htmlContent = arg.article.htmlContent
      this.articleOpen = arg.state
      return
    }

    this.selectedArticle.title = ''
    this.selectedArticle.htmlContent = undefined
    this.selectedArticle.index = null
    this.articleOpen = arg.state
  }

  toggleAboutModal(state: boolean) {
    this.aboutModalOpen = state
  }

  toggleSettingsModal(state: boolean) {
    this.settingsModalOpen = state
  }

  toggleArticleModal(arg: {state: boolean, index?: number}) {
    this.articleModalOpen = arg.state
    this.currentArticleIndex = (arg.index || arg.index === 0) ? arg.index : null
  }

  setCurrentBlogTitle(title: string) {
    this.currentBlogTitle = title
    localStorage.setItem("blogTitle", this.currentBlogTitle)
  }

  setCurrentAuthorName(name: string) {
    this.currentAuthorName = name
    localStorage.setItem("authorName", this.currentAuthorName)
  }

}
