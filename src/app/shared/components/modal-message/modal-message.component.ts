import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.css']
})

export class ModalMessageComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }) {}

  get title(): string {
    return this.data.title;
  }

  get message(): string {
    return this.data.message;
  }

}
