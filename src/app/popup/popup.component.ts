import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  @Input() title!: string;
  @Input() message!: string ;

  constructor(private activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  onConfirm() {
    this.activeModal.close(true);
  }

  // tslint:disable-next-line:typedef
  onClose() {
    this.activeModal.dismiss('Close click');
  }
}
