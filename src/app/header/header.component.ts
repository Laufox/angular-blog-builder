// @ts-nocheck
import { Component, Input } from '@angular/core';
import { SiteMetaDataService } from '../site-meta-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() siteTitle = ''
  @Input() bannerImage: string | ArrayBuffer | null = null

  constructor(private metaDataService: SiteMetaDataService) {}

  ngOnInit() {
    this.metaDataService.metaDataSubject.subscribe(metaData => {
      const element = document.querySelector('.header-container')
      element.style.backgroundImage = `url(${metaData.bannerImage ?? '../../assets/image-placeholder.png'})`
    })
    this.metaDataService.getMetaData()
  }
}
