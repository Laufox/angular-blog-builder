import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  blogTitle = 'My blog title';
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

  // Update profile

}
