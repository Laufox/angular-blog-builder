import { Component, Output, EventEmitter, Input } from '@angular/core'
import { ModalOptions } from '../modalOptions'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Output() setActiveModal = new EventEmitter<ModalOptions>()
  @Input() currentAuthorName = ''

  openForm() {
    this.setActiveModal.emit('articleForm')
  }

  openAboutModal() {
    this.setActiveModal.emit('about')
  }

  openSettingsModal() {
    this.setActiveModal.emit('settings')
  }

}
