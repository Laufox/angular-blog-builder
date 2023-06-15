import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleArticleForm = new EventEmitter<boolean>()
  @Output() toggleAboutModal = new EventEmitter<boolean>()
  @Output() toggleSettingsModal = new EventEmitter<boolean>()
  @Input() currentAuthorName = ''

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
