import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ContactService } from '../../core/services/contact';
import { IContact } from '../../core/models/contact.model';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements OnInit {

  private _contactService = inject(ContactService);
  private _cdr = inject(ChangeDetectorRef);

  contact: IContact | null = null;
  loading = true;
  error = false;

  formData = {
    name: '',
    email: '',
    reason: '',
    message: '',
  };

  sending = false;
  sendSuccess = false;
  sendError = false;

  ngOnInit(): void {
    this._contactService.getContact().subscribe({
      next: (data) => {
        this.contact = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('CONTACT ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      },
    });
  }

onSubmit(form: NgForm): void {
  if (form.invalid) {
    Object.values(form.controls).forEach(control => control.markAsTouched());
    return;
  }

  if (!this.contact?.enableFormSubmission || this.sending) {
    return;
  }

  this.sending = true;
  this.sendSuccess = false;
  this.sendError = false;

  this._contactService.sendMessage(this.formData).subscribe({
    next: () => {
      this.sending = false;
      this.sendSuccess = true;
      this.formData = { name: '', email: '', reason: '', message: '' };
      form.resetForm();
      this._cdr.detectChanges();
    },
    error: (err) => {
      console.error('SEND EMAIL ERROR:', err);
      this.sending = false;
      this.sendError = true;
      this._cdr.detectChanges();
    },
  });
}
}
