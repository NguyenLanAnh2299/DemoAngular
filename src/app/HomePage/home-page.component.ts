import { from } from 'rxjs';
import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../_model/user';
import {HomePageService} from '../_service/home-page.service';
// @ts-ignore
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {EventEmitter} from 'events';
@Component({
  // tslint:disable-next-line:component-selector
    selector: 'home-page-app',
    styleUrls: ['./home-page.component.css'],
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  datas: User[] = [];
  AddUser: FormGroup | undefined;
  modalReference: any;
  submitted = false;
  existId = false;
  closeResult?: string;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private homepageService: HomePageService, private modalService: NgbModal, private formBuilder: FormBuilder) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getAll();

    this.AddUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', [Validators.required]],
    });
  }
  // tslint:disable-next-line:typedef
  open(content: any) {
    this.AddUser?.reset();
    this.submitted = false;
    this.existId = false;
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then((result: any) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason: any) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  // tslint:disable-next-line:typedef
  getAll() {
    this.homepageService.getAll().subscribe(
      (res: any) => {
        this.wait(500).then( () =>  {
          this.datas = res;
        });
      },
      error =>
        console.log(3453)
    );
  }
  // tslint:disable-next-line:typedef
  Delete(id: number) {
    const confirmResult = confirm('Bạn có muốn xóa người dùng này không?');
    if (confirmResult) {
      this.homepageService.Delete(id).subscribe(res => {
        alert('Delete ok');
        this.getAll();
      });
    }
  }
  // tslint:disable-next-line:typedef
  get f() {// @ts-ignore
    return this.AddUser.controls; }
  // tslint:disable-next-line:typedef
  onSubmit() {
    this.submitted = true;
    if (this.AddUser?.invalid){
      return;
    }
    const name = this.f.name.value;
    const email = this.f.email.value;
    const address = this.f.address.value;
    const phone = this.f.phone.value;
    this.homepageService.addUser({name, email, address, phone}).subscribe(
      res => {
        this.modalReference.close();
        alert('Thêm  thành công.');
        this.getAll();
      },
      error => {
        this.existId = true;
        alert('Thêm thất bại!');
        console.log(error.message);
      }
    );
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
}
