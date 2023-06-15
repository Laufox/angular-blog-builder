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

  ngOnInit() {
    this.currentBlogTitle = localStorage.getItem("blogTitle") ?? "My blog title"
    this.currentAuthorName = localStorage.getItem("authorName") ?? "John Doe"
  }

  toggleArticleForm(state: boolean) {
    this.articleOpen = state
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
