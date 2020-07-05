import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MODAL_DATA, ModalRef} from '../../modal/modal.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  private modalRef: ModalRef

  constructor(modalRef: ModalRef,
              @Inject(MODAL_DATA) @Optional() config) {
    this.modalRef = modalRef;
  }

  closeModal() {
    this.modalRef.close(null);
  }

}
