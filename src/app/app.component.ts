import { Component } from '@angular/core';
import { Article } from './article';
import { ModalOptions } from './modalOptions';
import { SiteMetaDataService } from './site-meta-data.service';
import { MetaData } from './metaData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  activeModal: ModalOptions = ''
  metaData: MetaData = {siteTitle: '', authorName: '', bannerImage: null}

  constructor(private siteMetaDataService: SiteMetaDataService) {}

  ngOnInit() {
    this.siteMetaDataService.metaDataSubject.subscribe(metaData => this.metaData = metaData)
    this.siteMetaDataService.getMetaData()
  }

  setActiveModal(state: ModalOptions) {
    this.activeModal = state
    if (state) {
      const windowScrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${windowScrollY}px`
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }

}
