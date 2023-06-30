import { Injectable } from '@angular/core';
import { MetaData } from './metaData';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteMetaDataService {

  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}
  metaDataSubject: Subject<MetaData> = new Subject<MetaData>
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
    this.metaDataSubject.next(this.metaData)
    return {
      siteTitle: this.metaData.siteTitle,
      authorName: this.metaData.authorName,
      bannerImage: this.metaData.bannerImage
    }
  }

  setSiteTitle(title: string) {
    this.metaData.siteTitle = title
    localStorage.setItem("siteTitle", title)
    this.metaDataSubject.next(this.metaData)
  }

  setAuthorName(name: string) {
    this.metaData.authorName = name
    localStorage.setItem("authorName", name)
    this.metaDataSubject.next(this.metaData)
  }

  setBannerImage(image: ArrayBuffer | string | null) {
    this.metaData.bannerImage = image
    localStorage.setItem('bannerImage', JSON.stringify(image))
    this.metaDataSubject.next(this.metaData)
  }
}
