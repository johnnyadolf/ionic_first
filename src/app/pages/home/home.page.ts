import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFooter,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonToggle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkDoneOutline,
  informationCircleOutline,
  logoGithub,
  mailOutline,
} from 'ionicons/icons';
import { AppComponent } from 'src/app/app.component';
import { FormsModule } from '@angular/forms';
import { DarkModeService } from 'src/app/services/darkMode/dark-mode.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonToggle,
    IonButtons,
    IonButton,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonIcon,
    IonCardTitle,
    IonCardContent,
    RouterLink,
    FormsModule,
  ],
})
export class HomePage {
  darkModeService = inject(DarkModeService);
  constructor() {
    addIcons({
      checkmarkDoneOutline,
      informationCircleOutline,
      mailOutline,
      logoGithub,
    });
  }
}
