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
  }

  setCurrentAuthorName(name: string) {
    this.currentAuthorName = name
  }

}
