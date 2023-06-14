import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss']
})
export class SettingsModalComponent {
  @Output() toggleSettingsModal = new EventEmitter<boolean>()

  closeModal() {
    this.toggleSettingsModal.emit(false)
  }
}
