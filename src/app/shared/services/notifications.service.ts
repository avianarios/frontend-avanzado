import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
/* import { MatSnackBar } from '@angular/material'; */

@Injectable()
export class NotificationsService {
  constructor(/* private snackBar: MatSnackBar */) {}

  showNotification(message: string, action: string) {
    /*     this.snackBar.open(message, action, {
      duration: AppSettings.NOTIFICATIONS.DEFAULT_TIME
    }); */
  }
}
