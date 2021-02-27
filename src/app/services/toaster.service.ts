import { Injectable, TemplateRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ToasterService {
  constructor(private snackbar: MatSnackBar) {}

  openSnackBar(message: string, action: string) {
    this.snackbar.open(message, action);
  }

  openFromTemplate(template: TemplateRef<any>): void {
    this
  }
}
