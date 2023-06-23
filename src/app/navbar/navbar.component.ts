import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Article } from '../article';

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
  @Input() currentAuthorName = ''

  openForm() {
    this.toggleArticleForm.emit({state: true})
  }

  openAboutModal() {
    this.toggleAboutModal.emit(true)
  }

  openSettingsModal() {
    this.toggleSettingsModal.emit(true)
  }

}
