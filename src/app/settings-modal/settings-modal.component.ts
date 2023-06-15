import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent {
  @Output() toggleSettingsModal = new EventEmitter<boolean>()
  @Output() setCurrentBlogTitle = new EventEmitter<string>()
  @Output() setCurrentAuthorName = new EventEmitter<string>()
  @Input() currentBlogTitle = ''
  @Input() currentAuthorName= ''

  formErrors = {
    blogTitle: false,
    authorName: false
  }

  closeModal() {
    this.toggleSettingsModal.emit(false)
  }

  updateSettings(settings: {blogTitle: string, authorName: string}) {
    this.formErrors.blogTitle = !settings.blogTitle
    this.formErrors.authorName = !settings.authorName

    if (this.formErrors.blogTitle || this.formErrors.authorName) {
      return
    }

    if (settings.blogTitle) {
      this.setCurrentBlogTitle.emit(settings.blogTitle)
    }

    if (settings.authorName) {
      this.setCurrentAuthorName.emit(settings.authorName)
    }
  }
}
