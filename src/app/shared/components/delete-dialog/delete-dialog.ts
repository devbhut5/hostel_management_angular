import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-dialog',
  imports: [],
  templateUrl: './delete-dialog.html',
  styleUrl: './delete-dialog.scss',
})
export class DeleteDialog {
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  onCancel() {
    this.close.emit();
  }

  onConfirm() {
    this.confirm.emit();
  }
}
