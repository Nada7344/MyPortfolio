import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../core/services/about';
import { HomeService } from '../../core/services/home';
import { IAbout } from '../../core/models/about.model';

type AboutView = 'content' | 'focus' | 'preview';

const BIO_MAX_LENGTH = 200;
const DESC_MAX_LENGTH = 300;

@Component({
  selector: 'app-about-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './about-dashboard.html',
  styleUrl: './about-dashboard.css',
})
export class AboutDashboard implements OnInit {

  private _aboutService = inject(AboutService);
  private _homeService = inject(HomeService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';
  activeView: AboutView = 'content';

  bioMaxLength = BIO_MAX_LENGTH;
  descMaxLength = DESC_MAX_LENGTH;

  displayName = '';

  aboutForm = new FormGroup({
    role: new FormControl(''),
    roleHighlight: new FormArray<FormControl>([]),
    leadText: new FormControl(''),
    description: new FormControl(''),
    location: new FormControl(''),
    focusAreas: new FormArray<FormControl>([]),
    badges: new FormArray<FormGroup>([]),
    focusCards: new FormArray<FormGroup>([]),
  });

  ngOnInit(): void {
    this.loadAbout();
    this.loadHomeContext();
  }

  get roleHighlight(): FormArray {
    return this.aboutForm.get('roleHighlight') as FormArray;
  }

  get focusAreas(): FormArray {
    return this.aboutForm.get('focusAreas') as FormArray;
  }

  get badges(): FormArray {
    return this.aboutForm.get('badges') as FormArray;
  }

  get focusCards(): FormArray {
    return this.aboutForm.get('focusCards') as FormArray;
  }

  get leadTextLength(): number {
    return (this.aboutForm.get('leadText')?.value || '').length;
  }

  get descriptionLength(): number {
    return (this.aboutForm.get('description')?.value || '').length;
  }

  setActiveView(view: AboutView): void {
    this.activeView = view;
  }

  loadAbout(): void {
    this.loading = true;

    this._aboutService.getAbout().subscribe({
      next: (data) => {
        this.patchForm(data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('ABOUT ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  // بنجيب الاسم بس للعرض، مش بيتحفظ من هنا
  loadHomeContext(): void {
    this._homeService.getHome().subscribe({
      next: (home) => {
        this.displayName = home.name;
        this._cdr.detectChanges();
      },
      error: (error) => console.error('HOME CONTEXT ERROR:', error),
    });
  }

  private patchForm(data: IAbout): void {
    this.aboutForm.patchValue({
      role: data.role,
      leadText: data.leadText,
      description: data.description,
      location: data.location,
    });

    this.setStringArray(this.roleHighlight, data.roleHighlight);
    this.setStringArray(this.focusAreas, data.focusAreas);

    this.badges.clear();
    (data.badges || []).forEach((badge) => {
      this.badges.push(
        new FormGroup({
          name: new FormControl(badge.name),
          icon: new FormControl(badge.icon),
        })
      );
    });

    this.focusCards.clear();
    (data.focusCards || []).forEach((card) => {
      this.focusCards.push(
        new FormGroup({
          icon: new FormControl(card.icon),
          title: new FormControl(card.title),
          description: new FormControl(card.description),
        })
      );
    });
  }

  private setStringArray(formArray: FormArray, values: string[]): void {
    formArray.clear();
    (values || []).forEach((value) => {
      formArray.push(new FormControl(value));
    });
  }

  saveAbout(): void {
    if (this.aboutForm.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    this._aboutService.updateAbout(this.aboutForm.value as IAbout).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.message = 'About section updated successfully';
        this.saving = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update about:', error);
        this.message = 'Failed to update About section';
        this.saving = false;
        this._cdr.detectChanges();
      },
    });
  }

  // Role Highlight chips
  addRoleHighlight(): void {
    this.roleHighlight.push(new FormControl(''));
  }

  removeRoleHighlight(index: number): void {
    this.roleHighlight.removeAt(index);
  }

  // Focus Areas chips
  addFocusArea(): void {
    this.focusAreas.push(new FormControl(''));
  }

  removeFocusArea(index: number): void {
    this.focusAreas.removeAt(index);
  }

  // Badges chips
  addBadge(): void {
    this.badges.push(
      new FormGroup({
        name: new FormControl(''),
        icon: new FormControl(''),
      })
    );
  }

  removeBadge(index: number): void {
    this.badges.removeAt(index);
  }

  // Focus Cards
  addFocusCard(): void {
    this.focusCards.push(
      new FormGroup({
        icon: new FormControl(''),
        title: new FormControl(''),
        description: new FormControl(''),
      })
    );
  }

  removeFocusCard(index: number): void {
    this.focusCards.removeAt(index);
  }

  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
}
