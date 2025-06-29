import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {
  ReactiveFormsModule,
  FormsModule,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, FormsModule],
})
export class ContactPage {
  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submitted = false;
  success = false;

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    this.submitted = true;
    if (this.contactForm.valid) {
      this.success = true;
      // Send data to console log (later replace with actual service call)
      console.log('Form Data:', this.contactForm.value);

      // Reset form after submit
      this.contactForm.reset();
      this.submitted = false;
    }
  }

  get f() {
    return this.contactForm.controls;
  }
}
