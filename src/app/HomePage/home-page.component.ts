import { from } from 'rxjs';
import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {User} from '../_model/user';
import {HomePageService} from '../_service/home-page.service';
// @ts-ignore
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// @ts-ignore
import {EventEmitter} from 'events';
import {PopupComponent} from '../popup/popup.component';

@Component({
  // tslint:disable-next-line:component-selector
    selector: 'home-page-app',
    styleUrls: ['./home-page.component.css'],
    templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  datas: User[] = [];
  AddUser!: FormGroup ;
  email?: string;
  name?: string;
  modalReference: any;
  updateForm!: FormGroup;
  submitted = false;
  existId = false;
  dataUser!: User;
  public isActive: any;
  closeResult?: string;

  @Output() closeModalEvent = new EventEmitter<boolean>();
  constructor(private homepageService: HomePageService,  private modalService: NgbModal, private formBuilder: FormBuilder) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getAll();

    this.AddUser = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', [Validators.required]],
    });
    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
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
        this.datas = res;
      },
      error =>
        console.log(3453)
    );
  }
  // tslint:disable-next-line:typedef
  getUser(id: number) {
    this.homepageService.getUser(id).subscribe(
      (res: any) => {
        this.dataUser = res;
        console.log(this.dataUser);
        this.updateForm.setValue({
          name: this.dataUser.name,
          email: this.dataUser.email,
          phone: this.dataUser.phone,
          address: this.dataUser.address,
        });
      }
    );
  }
  // tslint:disable-next-line:typedef
  openUpdateUser({updateUser, id}: { updateUser: any, id: number }) {
    this.submitted = false;
    this.getUser(id);
    this.modalService.open(updateUser).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // tslint:disable-next-line:typedef
  // Delete(id: number) {
  //   const confirmResult = confirm('Bạn có muốn xóa người dùng này không?');
  //   if (confirmResult) {
  //     this.homepageService.Delete(id).subscribe(res => {
  //       alert('Delete ok');
  //       this.getAll();
  //     });
  //   }
  // }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  openModal(component, title, content, option) {
    const modalRef = this.modalService.open(component, option);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = content;
    return modalRef.result;
  }
  // tslint:disable-next-line:typedef
  onDeleteEvent(id: number){
    const title = '';
    const message = 'Bạn có chắc chắn muốn xoá ?';
    const option = {size: 'sm'};
    this.openModal(PopupComponent, title, message, option).then(
      result => {
        this.homepageService.Delete(id).subscribe(res => {
          alert('Deleted');
          this.getAll();
        });
      },
      dismiss => {
        console.log('Huỷ xoá');
      }
    );
  }
  // tslint:disable-next-line:typedef
  onSubmitUpdate(id: any) {
    this.submitted = true;
    if (this.updateForm.invalid) {
      return;
    }
    const request = {
      id,
      name: this.updateForm.controls.name.value ? this.updateForm.controls.name.value : this.dataUser.name,
      email: this.updateForm.controls.email.value ? this.updateForm.controls.email.value : this.dataUser.email,
      phone: this.updateForm.controls.phone.value ? this.updateForm.controls.phone.value : this.dataUser.phone,
      address: this.updateForm.controls.address.value ? this.updateForm.controls.address.value : this.dataUser.address,
      // tslint:disable-next-line:max-line-length
      // verifyDatePatient: this.updateForm.controls.verifyDatePatient.value ? this.updateForm.controls.verifyDatePatient.value : this.dataLocation.verifyDatePatient,
    };
    this.homepageService.update(request).subscribe(rs => {
      setTimeout(() => {
        alert('Thay đổi thành công');
      }, 800);
      this.getAll();
      // @ts-ignore
      const btn: HTMLElement = document.getElementById('btnCloseUpdate');
      btn.click();
    });
  }
  // tslint:disable-next-line:typedef
  get f() {// @ts-ignore
    return this.AddUser.controls; }
  // tslint:disable-next-line:typedef
  get checkUpdateForm() { return this.updateForm.controls; }
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

  // tslint:disable-next-line:typedef
  Search() {
    if (this.email !== '') {
      this.datas = this.datas.filter(res => {
        // tslint:disable-next-line:no-non-null-assertion
        return (res.email.toLocaleLowerCase()).match(this.email!.toLocaleLowerCase());
      });
    }
    else if (this.email === '') {
      this.ngOnInit();
    }
  }
  async wait(ms: number): Promise<void> {
    return new Promise<void>( resolve => setTimeout( resolve, ms) );
  }
}
