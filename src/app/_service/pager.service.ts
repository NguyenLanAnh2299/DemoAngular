import {Injectable} from '@angular/core';

@Injectable()
export class PagerService {
  // tslint:disable-next-line:typedef
  getPager(
    totalItems: number,
    currentPage: number = 1,
    googlePager: boolean = false,
    pageSize: number = 10
  ) {
    const totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number;
    let endPage: number;
    const pages: any[] = [];

    // google-like paging
    if (totalPages <= 5 || !googlePager) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        startPage = 1;
        endPage = 5;
      } else if (currentPage + 1 >= totalPages) {
        startPage = totalPages - 4;
        endPage = totalPages;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }
    // set number of pages
    for (let i = 1; i <= endPage; i++) {
      pages.push(i);
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // return object with all pager properties required by the view
    return {
      totalItems,
      currentPage,
      pageSize,
      totalPages,
      startPage,
      endPage,
      startIndex,
      endIndex,
      pages
    };
  }
}
