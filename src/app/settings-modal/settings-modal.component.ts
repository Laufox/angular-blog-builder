// 
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { SiteMetaDataService } from '../site-meta-data.service';
import { MetaData } from '../metaData';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent {
  // @Output() toggleSettingsModal = new EventEmitter<boolean>()
  // @Output() setSiteTitle = new EventEmitter<string>()
  // @Output() setAuthorName = new EventEmitter<string>()
  // @Output() setBannerImage = new EventEmitter()
  siteTitle = ''
  authorName = ''
  test = "abc123"
  // bannerImage: string | ArrayBuffer | null = null

  constructor (private metaDataService: SiteMetaDataService) {}

  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}

  formErrors = {
    siteTitle: false,
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
    this.metaData = this.metaDataService.getMetaData()
    // console.log("first", this.metaDataService.getMetaData().siteTitle)
    // const temp = this.metaDataService.metaData.siteTitle
    // console.log("temp", temp)
    // this.siteTitle = temp
    // console.log("sitetitle", this.siteTitle)
    // this.siteTitle = this.metaDataService.getMetaData().siteTitle
    // this.authorName = this.metaDataService.getMetaData().authorName
    this.localBannerImage = this.metaData.bannerImage
    // if (this.bannerImage) {
    //   this.localBannerImage = this.bannerImage
    // }
  }

  // closeModal() {
  //   this.toggleSettingsModal.emit(false)
  // }

  updateSettings(settings: {siteTitle: string, authorName: string}) {
    this.formErrors.siteTitle = !settings.siteTitle
    this.formErrors.authorName = !settings.authorName

    if (this.formErrors.siteTitle || this.formErrors.authorName) {
      return
    }

    if (settings.siteTitle) {
      this.metaDataService.setSiteTitle(settings.siteTitle)
      // this.setCurrentBlogTitle.emit(settings.blogTitle)
    }

    if (settings.authorName) {
      this.metaDataService.setAuthorName(settings.authorName)
      // this.setCurrentAuthorName.emit(settings.authorName)
    }

    if (this.localBannerImage) {
      this.metaDataService.setBannerImage(this.localBannerImage)
      // this.setBannerImage.emit(this.localBannerImage)
    }

    // this.closeModal()
  }
}
