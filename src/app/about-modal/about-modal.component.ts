import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about-modal',
  templateUrl: './about-modal.component.html',
  styleUrls: ['./about-modal.component.scss']
})
export class AboutModalComponent {
  @Output() toggleAboutModal = new EventEmitter<boolean>()

  closeModal() {
    this.toggleAboutModal.emit(false)
  }
}
