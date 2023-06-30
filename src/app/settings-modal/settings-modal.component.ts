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

  deleteBannerImage: boolean = false

  onImageChange(e: any) {
    if (e.target && e.target.files?.length) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        this.localBannerImage = reader.result
        //@ts-ignore
        document.querySelector('.banner-preview').style.backgroundImage = `url(${this.localBannerImage})`
        this.deleteBannerImage = false
        console.log("on change", this.localBannerImage)
      });
      reader.readAsDataURL(e.target.files[0])
    } else {
      console.log("Helloo")
      this.localBannerImage = null
    }
  }

  ngOnInit() {
    this.metaDataService.metaDataSubject.subscribe((metaData) => {
      this.metaData = metaData
      this.localBannerImage = metaData.bannerImage
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
    this.deleteBannerImage = true
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

    if (this.deleteBannerImage) {
      this.metaDataService.setBannerImage(null)
    } else {
      this.test()
      console.log("first", this.localBannerImage)
      this.metaDataService.setBannerImage(this.localBannerImage)
    }
    this.closeModal.emit()
  }

  test() {
    console.log("test", this.localBannerImage)
  }
}
