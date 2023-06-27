import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';
import { ModalOptions } from '../modalOptions';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: Article}>()
  // @Output() toggleArticleForm = new EventEmitter<{state: boolean, article?: {title: string, htmlContent: Event | undefined, index: number, image: string | ArrayBuffer | null}}>()
  @Output() toggleAboutModal = new EventEmitter<boolean>()
  @Output() toggleSettingsModal = new EventEmitter<boolean>()
  @Output() setActiveModal = new EventEmitter<ModalOptions>()
  @Input() currentAuthorName = ''

  openForm() {
    // this.toggleArticleForm.emit({state: true})
    this.setActiveModal.emit('articleForm')
  }

  openAboutModal() {
    // this.toggleAboutModal.emit(true)
    this.setActiveModal.emit('about')
  }

  openSettingsModal() {
    // this.toggleSettingsModal.emit(true)
    this.setActiveModal.emit('settings')
  }

}
