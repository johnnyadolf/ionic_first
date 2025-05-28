import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonFooter,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [
    IonFooter,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonApp,
    IonRouterOutlet,
  ],
})
export class AppComponent {
  constructor() {}
}
