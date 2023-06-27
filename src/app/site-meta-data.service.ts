import { Injectable } from '@angular/core';
import { MetaData } from './metaData';

@Injectable({
  providedIn: 'root'
})
export class SiteMetaDataService {

  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}
  constructor() {
    this.metaData = this.getInitialMetaData()
  }

  private getInitialMetaData(): MetaData {
    const storageBanner = localStorage.getItem('bannerImage')
    return {
      siteTitle: localStorage.getItem("siteTitle") ?? "My page title",
      authorName: localStorage.getItem("authorName") ?? "John Doe",
      bannerImage: storageBanner ? JSON.parse(storageBanner) : null
    }
  }

  getMetaData(): MetaData {
    return {
      siteTitle: this.metaData.siteTitle,
      authorName: this.metaData.authorName,
      bannerImage: this.metaData.bannerImage
    }
  }

  setSiteTitle(title: string) {
    this.metaData.siteTitle = title
    localStorage.setItem("siteTitle", title)
  }

  setAuthorName(name: string) {
    this.metaData.authorName = name
    localStorage.setItem("authorName", name)
  }

  setBannerImage(image: ArrayBuffer) {
    this.metaData.bannerImage = image
    localStorage.setItem('bannerImage', JSON.stringify(image))
  }
}
