import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ModalOptions } from '../modalOptions';

@Component({
  selector: 'app-modal-outline',
  templateUrl: './modal-outline.component.html',
  styleUrls: ['./modal-outline.component.scss']
})
export class ModalOutlineComponent {

  @Input() activeModal: '' | 'article' | 'articleForm' | 'settings' | 'about' = ''
  @Output() setActiveModal = new EventEmitter<ModalOptions>()

  closeModal() {
    this.setActiveModal.emit('')
  }
}
