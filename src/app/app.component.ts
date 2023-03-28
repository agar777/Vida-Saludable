import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public readonly VAPID_PUBLIC_KEY = 'BJ4jcc5FEKwNV1L9GYJyGAAcsJN6egtvd_NW5pXdMY1qRbQKUw2Um85-0--oLaj7-SWcB08bQ5fxxx8dM1ttM2c'

  /**
   *
   */
  constructor(private swPush:SwPush ) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications():any{
    this.swPush.requestSubscription({
      serverPublicKey:this.VAPID_PUBLIC_KEY
    }).then(data=>{
      const token = JSON.parse(JSON.stringify(data))
      console.log('OJO',token);
      
    })
  }

}
