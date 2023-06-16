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
  selectedArticle: {title: string, body: string, index: number | null} = {title: '', body: '', index: null}

  ngOnInit() {
    this.currentBlogTitle = localStorage.getItem("blogTitle") ?? "My blog title"
    this.currentAuthorName = localStorage.getItem("authorName") ?? "John Doe"
  }

  toggleArticleForm(arg: {state: boolean, article ?: {title: string, body: string, index: number}} ) {
    console.log("art", arg.article)
    if (arg.article) {
      this.selectedArticle.title = arg.article.title
      this.selectedArticle.body = arg.article.body
      this.selectedArticle.index = arg.article.index
      this.articleOpen = arg.state
      return
    }

    this.selectedArticle.title = ''
    this.selectedArticle.body = ''
    this.selectedArticle.index = null
    this.articleOpen = arg.state
  }

  toggleAboutModal(state: boolean) {
    this.aboutModalOpen = state
  }

  toggleSettingsModal(state: boolean) {
    this.settingsModalOpen = state
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
