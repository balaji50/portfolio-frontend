import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  form: FormGroup;
  loading  = false;
  success  = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }

    this.loading  = true;
    this.errorMsg = '';

    this.contactService.sendMessage(this.form.value).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        this.form.reset();
      },
      error: (err) => {
        this.loading  = false;
        this.errorMsg = err?.error?.errors?.[0]?.msg || 'Something went wrong. Please try again.';
      }
    });
  }
}
