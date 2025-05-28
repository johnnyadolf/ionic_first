import { Component } from '@angular/core';
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
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  checkmarkDoneOutline,
  informationCircleOutline,
  logoGithub,
  mailOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
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
  ],
})
export class HomePage {
  constructor() {
    addIcons({
      checkmarkDoneOutline,
      informationCircleOutline,
      mailOutline,
      logoGithub,
    });
  }
}
