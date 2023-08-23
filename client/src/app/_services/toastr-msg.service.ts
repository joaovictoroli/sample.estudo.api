import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastrMsgService {
  pending?: string | undefined;

  constructor(private toastr: ToastrService) {}

  getPending() {
    if (this.pending) {
      console.log('hello');
      this.toastr.success(this.pending);
      this.pending = undefined;
    }
  }

  setPending(value: string) {
    this.pending = value;
  }
}
