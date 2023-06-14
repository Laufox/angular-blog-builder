import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleArticleForm = new EventEmitter<boolean>()
  @Output() toggleAboutModal = new EventEmitter<boolean>()
  @Output() toggleSettingsModal = new EventEmitter<boolean>()

  openForm() {
    this.toggleArticleForm.emit(true)
  }

  openAboutModal() {
    this.toggleAboutModal.emit(true)
  }

  openSettingsModal() {
    this.toggleSettingsModal.emit(true)
  }

}
