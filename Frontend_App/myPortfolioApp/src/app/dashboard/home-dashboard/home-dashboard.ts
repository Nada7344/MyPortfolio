import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeService } from '../../core/services/home';
import { IHome } from '../../core/models/home.model';

type DashboardTab = 'content' | 'social' | 'terminal' | 'profile';

const BIO_MAX_LENGTH = 500;

@Component({
  selector: 'app-home-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home-dashboard.html',
  styleUrl: './home-dashboard.css',
})
export class HomeDashboard implements OnInit {

  private _homeService = inject(HomeService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';
  activeTab: DashboardTab = 'content';

  uploadingImage = false;
  uploadingResume = false;
  uploadError = '';

  bioMaxLength = BIO_MAX_LENGTH;

  homeForm = new FormGroup({
    name: new FormControl(''),
    role: new FormControl(''),
    bio: new FormControl(''),
    profileImage: new FormControl(''),
    resume: new FormControl(''),
    roleHighlight: new FormArray<FormControl>([]),
    terminalStack: new FormArray<FormControl>([]),
    availability: new FormGroup({
      isAvailable: new FormControl(true),
      title: new FormControl(''),
      description: new FormControl(''),
    }),
    socialLinks: new FormGroup({
      email: new FormControl(''),
      linkedin: new FormControl(''),
      github: new FormControl(''),
    }),
  });

  ngOnInit(): void {
    this.loadHome();
  }

  get roleHighlight(): FormArray {
    return this.homeForm.get('roleHighlight') as FormArray;
  }

  get terminalStack(): FormArray {
    return this.homeForm.get('terminalStack') as FormArray;
  }

  get bioLength(): number {
    return (this.homeForm.get('bio')?.value || '').length;
  }

  loadHome(): void {
    this.loading = true;

    this._homeService.getHome().subscribe({
      next: (data) => {
        this.patchForm(data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('HOME ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  private patchForm(data: IHome): void {
    this.homeForm.patchValue({
      name: data.name,
      role: data.role,
      bio: data.bio,
      profileImage: data.profileImage,
      resume: data.resume,
      availability: data.availability,
      socialLinks: data.socialLinks,
    });

    this.setFormArray(this.roleHighlight, data.roleHighlight);
    this.setFormArray(this.terminalStack, data.terminalStack);
  }

  private setFormArray(formArray: FormArray, values: string[]): void {
    formArray.clear();
    (values || []).forEach((value) => {
      formArray.push(new FormControl(value));
    });
  }

  saveHome(): void {
    if (this.homeForm.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    this._homeService.updateHome(this.homeForm.value as IHome).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.message = 'Home updated successfully';
        this.saving = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update home:', error);
        this.message = 'Failed to update Home';
        this.saving = false;
        this._cdr.detectChanges();
      },
    });
  }

  setActiveTab(tab: DashboardTab): void {
    this.activeTab = tab;
  }

  addRoleHighlight(): void {
    this.roleHighlight.push(new FormControl(''));
  }

  removeRoleHighlight(index: number): void {
    this.roleHighlight.removeAt(index);
  }

  addStackItem(): void {
    this.terminalStack.push(new FormControl(''));
  }

  removeStackItem(index: number): void {
    this.terminalStack.removeAt(index);
  }

  onProfileImageChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.uploadingImage = true;
    this.uploadError = '';
    this.message = '';

    this._homeService.uploadProfileImage(file).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.uploadingImage = false;
        this.message = 'Profile image uploaded successfully';
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to upload profile image:', error);
        this.uploadError = 'Failed to upload image';
        this.uploadingImage = false;
        this._cdr.detectChanges();
      },
    });
  }

  onResumeChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.uploadingResume = true;
    this.uploadError = '';
    this.message = '';

    this._homeService.uploadResume(file).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.uploadingResume = false;
        this.message = 'Resume uploaded successfully';
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to upload resume:', error);
        this.uploadError = 'Failed to upload resume';
        this.uploadingResume = false;
        this._cdr.detectChanges();
      },
    });
  }

  resolveFileUrl(path: string | null | undefined): string {

    if (!path) {
      return '';
    }

    if (path.startsWith('http')) {
      return path;
    }

    if (path.startsWith('/')) {
      return `http://localhost:3000${path}`;
    }

    return `http://localhost:3000/${path}`;
  }

  clearProfileImage(): void {
    this.homeForm.patchValue({ profileImage: '' });
  }

  clearResume(): void {
    this.homeForm.patchValue({ resume: '' });
  }
}
