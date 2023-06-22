// 
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
  @Output() setBannerImage = new EventEmitter()
  @Input() currentBlogTitle = ''
  @Input() currentAuthorName= ''
  @Input() bannerImage: string | ArrayBuffer | null = null

  formErrors = {
    blogTitle: false,
    authorName: false
  }

  localBannerImage: string | ArrayBuffer | null = null

  onImageChange(e: any) {
    if (e.target && e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.localBannerImage = reader.result
      });
      reader.readAsDataURL(e.target.files[0])
    } else {
      this.localBannerImage = null
    }
  }

  ngOnInit() {
    if (this.bannerImage) {
      this.localBannerImage = this.bannerImage
    }
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

    if (this.localBannerImage) {
      this.setBannerImage.emit(this.localBannerImage)
    }

    this.closeModal()
  }
}
