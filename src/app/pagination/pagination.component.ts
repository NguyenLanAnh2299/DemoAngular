import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
// @ts-ignore
import * as Http from 'http';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {


  constructor() { }
  @Output() mudouPagina = new EventEmitter();
  // tslint:disable-next-line:no-input-rename
  @Input('page') page?: number;
  totalPages?: number;
  qtdPaginacao = 3;
  arrayPages?: number[];

  ngOnInit(): void {
  }
  // tslint:disable-next-line:typedef
  listaPaginas() {
    this.arrayPages = [];
    // @ts-ignore
    for (let i = 1; i <= this.totalPages; i++) {
      this.arrayPages.push(i);
    }
  }
  @Input('totalPages')
  set updateTotalPagesValue(totalPages: number) {
    this.totalPages = totalPages;
    this.listaPaginas();
  }
  // tslint:disable-next-line:typedef
  mudaPag(pag: number) {
    this.mudouPagina.emit({valor: pag});
  }
  // tslint:disable-next-line:typedef
  priPage() {
    this.mudaPag(1);
  }

  // tslint:disable-next-line:typedef
  paginaAnt() {
    // @ts-ignore
    if (this.page > 1) {
      // @ts-ignore
      this.mudaPag(this.page - 1);
    }
  }

  // tslint:disable-next-line:typedef
  proxPagina() {
    // @ts-ignore
    if (this.page < this.totalPages) {
      // @ts-ignore
      this.mudaPag(this.page + 1);
    }
  }
  // tslint:disable-next-line:typedef
  ultimaPag() {
    // @ts-ignore
    this.mudaPag(this.totalPages);
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  diminuiPaginacao(pags) {
    const metadePgs = Math.ceil(this.qtdPaginacao / 2);
    // @ts-ignore
    let i = this.page - metadePgs;
    if (i < 0) {
      i = 0;
    }
    let f = i + this.qtdPaginacao;
    if (f > pags.length) {
      f = pags.length;
      i = f - this.qtdPaginacao;
      if (i < 0) {
        i = 0;
      }
    }
    return pags.slice(i, f);
  }
}
