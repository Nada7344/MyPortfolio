import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IEducation } from '../../core/models/education.model';
import { EducationService } from '../../core/services/education';

const TITLE_MAX_LENGTH = 50;
const SUBTITLE_MAX_LENGTH = 200;

@Component({
  selector: 'app-education-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './education-dashboard.html',
  styleUrl: './education-dashboard.css',
})
export class EducationDashboard implements OnInit {

  private _educationService = inject(EducationService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';

  titleMaxLength = TITLE_MAX_LENGTH;
  subtitleMaxLength = SUBTITLE_MAX_LENGTH;

  sectionTitle = new FormControl('Education & Training');

  itemsForm = new FormArray<FormGroup>([]);

  private dragIndex: number | null = null;
  private idsToDelete: string[] = [];

  ngOnInit(): void {
    this.loadEducation();
  }

  get sectionTitleLength(): number {
    return (this.sectionTitle.value || '').length;
  }

  loadEducation(): void {
    this.loading = true;

    this._educationService.getAllEducation().subscribe({
      next: (data) => {
        this.buildForm(data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('EDUCATION ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  private buildForm(items: IEducation[]): void {
    this.itemsForm.clear();
    items.forEach((item) => this.itemsForm.push(this.createItemGroup(item)));
  }

  private createItemGroup(item?: Partial<IEducation>): FormGroup {
    return new FormGroup({
      _id: new FormControl(item?._id || null),
      order: new FormControl(item?.order ?? this.itemsForm.length + 1),
      dateRange: new FormControl(item?.dateRange || ''),
      title: new FormControl(item?.title || ''),
      subtitle: new FormControl(item?.subtitle || ''),
    });
  }

  subtitleLength(group: any): number {
    return (this.asFormGroup(group).get('subtitle')?.value || '').length;
  }

  addItem(): void {
    this.itemsForm.push(this.createItemGroup());
  }

  removeItem(index: number): void {
    const group = this.itemsForm.at(index) as FormGroup;
    const id = group.get('_id')?.value;

    if (id) {
      this.idsToDelete.push(id);
    }

    this.itemsForm.removeAt(index);
    this.reassignOrder();
  }

  private reassignOrder(): void {
    this.itemsForm.controls.forEach((group, i) => {
      group.get('order')?.setValue(i + 1);
    });
  }

  saveAll(): void {
    this.saving = true;
    this.message = '';

    const deletions$ = this.idsToDelete.map((id) => this._educationService.deleteEducation(id));

    const upserts$ = this.itemsForm.controls.map((group) => {
      const value = group.value as IEducation;
      return value._id
        ? this._educationService.updateEducation(value._id, value)
        : this._educationService.createEducation(value);
    });

    Promise.all([...deletions$, ...upserts$].map((obs) => obs.toPromise()))
      .then(() => {
        this.idsToDelete = [];
        this.message = 'Education section updated successfully';
        this.saving = false;
        this.loadEducation();
      })
      .catch((error) => {
        console.error('Failed to save education:', error);
        this.message = 'Failed to save Education section';
        this.saving = false;
        this._cdr.detectChanges();
      });
  }

  // Drag & drop reorder
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

    const control = this.itemsForm.at(this.dragIndex);
    this.itemsForm.removeAt(this.dragIndex);
    this.itemsForm.insert(index, control);
    this.dragIndex = null;
    this.reassignOrder();
  }

  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
}
