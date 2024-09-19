import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modale',
  templateUrl: './modale.component.html',
  styleUrl: './modale.component.css'
})
export class ModaleComponent {

  @Input() content: string;
  
  constructor(public activeModal: NgbActiveModal) {}

  closeModal(){
    this.activeModal.close('Close click');
  }
}
