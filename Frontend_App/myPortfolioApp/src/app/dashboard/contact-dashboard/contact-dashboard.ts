import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../core/services/home';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact';

const TITLE_MAX_LENGTH = 50;
const SUBTITLE_MAX_LENGTH = 150;
const MESSAGE_PLACEHOLDER_MAX_LENGTH = 200;

interface ContactItemType {
  key: 'email' | 'phone' | 'linkedin' | 'github' | 'location';
  label: string;
  icon: string;
}

const CONTACT_ITEM_TYPES: ContactItemType[] = [
  { key: 'email', label: 'Email', icon: '✉' },
  { key: 'phone', label: 'Phone', icon: '📞' },
  { key: 'linkedin', label: 'LinkedIn', icon: 'in' },
  { key: 'github', label: 'GitHub', icon: '⌥' },
  { key: 'location', label: 'Location', icon: '📍' },
];

@Component({
  selector: 'app-contact-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.css',
})
export class ContactDashboard implements OnInit {

  private _contactService = inject(ContactService);
  private _homeService = inject(HomeService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';

  titleMaxLength = TITLE_MAX_LENGTH;
  subtitleMaxLength = SUBTITLE_MAX_LENGTH;
  messagePlaceholderMaxLength = MESSAGE_PLACEHOLDER_MAX_LENGTH;

  contactItemTypes = CONTACT_ITEM_TYPES;
  showAddMenu = false;

  displayName = '';
  displayRole = '';

  private preservedFields: Partial<IContact> = {};

  private dragIndex: number | null = null;

  contactForm = new FormGroup({
    title: new FormControl(''),
    subtitle: new FormControl(''),
    namePlaceholder: new FormControl(''),
    emailPlaceholder: new FormControl(''),
    messagePlaceholder: new FormControl(''),
    reasonOptions: new FormArray<FormControl>([]),

    email: new FormControl(''),
    phone: new FormControl(''),
    linkedin: new FormControl(''),
    github: new FormControl(''),
    location: new FormControl(''),

    showReasonField: new FormControl(true),
    showEmailField: new FormControl(true),
    showPhoneField: new FormControl(false),
    enableFormSubmission: new FormControl(true),
  });

  ngOnInit(): void {
    this.loadContact();
    this.loadHomeContext();
  }

  get reasonOptions(): FormArray {
    return this.contactForm.get('reasonOptions') as FormArray;
  }

  get titleLength(): number {
    return (this.contactForm.get('title')?.value || '').length;
  }

  get subtitleLength(): number {
    return (this.contactForm.get('subtitle')?.value || '').length;
  }

  get messagePlaceholderLength(): number {
    return (this.contactForm.get('messagePlaceholder')?.value || '').length;
  }

  loadContact(): void {
    this.loading = true;

    this._contactService.getContact().subscribe({
      next: (data) => {
        this.patchForm(data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('CONTACT ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  loadHomeContext(): void {
    this._homeService.getHome().subscribe({
      next: (home) => {
        this.displayName = home.name;
        this.displayRole = home.role;
        this._cdr.detectChanges();
      },
      error: (error) => console.error('HOME CONTEXT ERROR:', error),
    });
  }

  private patchForm(data: IContact): void {
    this.preservedFields = {
      badgeMethod: data.badgeMethod,
      badgeEndpoint: data.badgeEndpoint,
      badgeStatus: data.badgeStatus,
    };

    this.contactForm.patchValue({
      title: `${data.heading} ${data.headingGhost}`.trim(),
      subtitle: data.subtitle,
      namePlaceholder: data.namePlaceholder,
      emailPlaceholder: data.emailPlaceholder,
      messagePlaceholder: data.messagePlaceholder,

      email: data.email,
      phone: data.phone,
      linkedin: data.linkedin,
      github: data.github,
      location: data.location,

      showReasonField: data.showReasonField,
      showEmailField: data.showEmailField,
      showPhoneField: data.showPhoneField,
      enableFormSubmission: data.enableFormSubmission,
    });

    this.reasonOptions.clear();
    (data.reasonOptions || []).forEach((option) => {
      this.reasonOptions.push(new FormControl(option));
    });
  }

  // Reason Options chips
  addReasonOption(): void {
    this.reasonOptions.push(new FormControl(''));
  }

  removeReasonOption(index: number): void {
    this.reasonOptions.removeAt(index);
  }

  onDragStart(index: number): void {
    this.dragIndex = index;
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  onDrop(index: number): void {
    if (this.dragIndex === null || this.dragIndex === index) {
      return;
    }
    const control = this.reasonOptions.at(this.dragIndex);
    this.reasonOptions.removeAt(this.dragIndex);
    this.reasonOptions.insert(index, control);
    this.dragIndex = null;
  }

  // Contact Info items (fixed 5 types)
  isItemActive(key: ContactItemType['key']): boolean {
    return !!this.contactForm.get(key)?.value;
  }

  get activeItems(): ContactItemType[] {
    return this.contactItemTypes.filter((item) => this.isItemActive(item.key));
  }

  get hiddenItems(): ContactItemType[] {
    return this.contactItemTypes.filter((item) => !this.isItemActive(item.key));
  }

  removeItem(key: ContactItemType['key']): void {
    this.contactForm.get(key)?.setValue('');
  }

  addItem(key: ContactItemType['key']): void {
    this.contactForm.get(key)?.setValue(' ');
    this.showAddMenu = false;
  }

  toggleAddMenu(): void {
    this.showAddMenu = !this.showAddMenu;
  }

  saveContact(): void {
    if (this.contactForm.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    const formValue = this.contactForm.value;
    const titleWords = (formValue.title || '').trim().split(' ');
    const headingGhost = titleWords.pop() || '';
    const heading = titleWords.join(' ');

    const payload: Partial<IContact> = {
      ...this.preservedFields,
      heading,
      headingGhost,
      subtitle: formValue.subtitle || '',
      namePlaceholder: formValue.namePlaceholder || '',
      emailPlaceholder: formValue.emailPlaceholder || '',
      messagePlaceholder: formValue.messagePlaceholder || '',
      reasonOptions: (formValue.reasonOptions as string[]) || [],

      email: (formValue.email || '').trim(),
      phone: formValue.phone || '',
      linkedin: formValue.linkedin || '',
      github: formValue.github || '',
      location: formValue.location || '',

      showReasonField: !!formValue.showReasonField,
      showEmailField: !!formValue.showEmailField,
      showPhoneField: !!formValue.showPhoneField,
      enableFormSubmission: !!formValue.enableFormSubmission,
    };

    this._contactService.updateContact(payload).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.message = 'Contact section updated successfully';
        this.saving = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update contact:', error);
        this.message = 'Failed to update Contact section';
        this.saving = false;
        this._cdr.detectChanges();
      },
    });
  }

  itemValue(key: ContactItemType['key']): string {
    return (this.contactForm.get(key)?.value || '').trim();
  }
}
