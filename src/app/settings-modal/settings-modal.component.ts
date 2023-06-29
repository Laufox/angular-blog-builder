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
  siteTitle = ''
  authorName = ''

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
    this.metaDataService.metaDataSubject.subscribe(metaData => this.metaData = metaData)
    this.metaDataService.getMetaData()
    this.localBannerImage = this.metaData.bannerImage
  }

  updateSettings(settings: {siteTitle: string, authorName: string}) {
    this.formErrors.siteTitle = !settings.siteTitle
    this.formErrors.authorName = !settings.authorName

    if (this.formErrors.siteTitle || this.formErrors.authorName) {
      return
    }

    if (settings.siteTitle) {
      this.metaDataService.setSiteTitle(settings.siteTitle)
    }

    if (settings.authorName) {
      this.metaDataService.setAuthorName(settings.authorName)
    }

    if (this.localBannerImage) {
      this.metaDataService.setBannerImage(this.localBannerImage)
    }
    this.closeModal.emit()
  }
}
