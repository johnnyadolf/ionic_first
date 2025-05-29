import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  darkMode = false;

  constructor() {}

  toggleDarkMode(event: any) {
    document.body.classList.toggle('dark', event.detail.checked);
  }
}
