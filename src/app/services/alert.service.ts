import { Injectable } from '@angular/core';

import { NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  index = 1
  constructor(private toast: NbToastrService) { }

  showErrorToast(position, status, message) {
    this.toast.show(message +
      '',
      `I'm Sorry :(`,
      // `Error: ${++this.index}`,
      { position, status });
  }

  showSuccessToast(position, status, message) {
    this.toast.show('Welcome back to your dashboard!',
      message,
      { position, status });
  }
}
