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

  @Output() closeModal = new EventEmitter()

  constructor (private metaDataService: SiteMetaDataService) {}

  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}

  formErrors = {
    siteTitle: false,
    authorName: false
  }

  localSiteTitle: string = ''
  localAuthorName: string = ''
  localBannerImage: string | ArrayBuffer | null = null

  onImageChange(e: any) {
    if (e.target && e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.localBannerImage = reader.result
        //@ts-ignore
        document.querySelector('.banner-preview').style.backgroundImage = `url(${this.localBannerImage})`
      });
      reader.readAsDataURL(e.target.files[0])
    } else {
      this.localBannerImage = null
    }
  }

  ngOnInit() {
    this.metaDataService.metaDataSubject.subscribe((metaData) => {
      this.metaData = metaData
      this.localBannerImage = metaData.bannerImage
      this.localSiteTitle = metaData.siteTitle
      this.localAuthorName = metaData.authorName
    })
    this.metaDataService.getMetaData()
  }

  ngAfterViewInit() {
    if (this.metaData.bannerImage) {
      //@ts-ignore
      document.querySelector('.banner-preview').style.backgroundImage = `url(${this.localBannerImage})`
    }
  }

  removeLocalBannerImage() {
    this.localBannerImage = null
    //@ts-ignore
    document.querySelector('.banner-preview').style.backgroundImage = `none`
  }

  updateSettings() {
    this.formErrors.siteTitle = !this.localSiteTitle
    this.formErrors.authorName = !this.localAuthorName

    if (this.formErrors.siteTitle || this.formErrors.authorName) {
      return
    }

    this.metaDataService.setMetaData({
      siteTitle: this.localSiteTitle,
      authorName: this.localAuthorName,
      bannerImage: this.localBannerImage
    })

    this.closeModal.emit()
  }
}
