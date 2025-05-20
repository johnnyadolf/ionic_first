import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonIcon, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkDoneOutline, informationCircleOutline, mailOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFooter, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonIcon, IonCardTitle, IonCardContent, RouterLink ],
})
export class HomePage {
  constructor() {
    addIcons({  checkmarkDoneOutline , informationCircleOutline, mailOutline });
  }
}
