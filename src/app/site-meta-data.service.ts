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

  setMetaData(newMetaData: MetaData) {
    this.metaData.siteTitle = newMetaData.siteTitle
    localStorage.setItem("siteTitle", newMetaData.siteTitle)
    this.metaData.authorName = newMetaData.authorName
    localStorage.setItem("authorName", newMetaData.authorName)
    this.metaData.bannerImage = newMetaData.bannerImage
    localStorage.setItem('bannerImage', JSON.stringify(newMetaData.bannerImage))
    this.metaDataSubject.next(this.metaData)
  }
}
