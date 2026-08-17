import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ISkills } from '../../core/models/skills.model';
import { SkillsService } from '../../core/services/skills';

const DESC_MAX_LENGTH = 200;

@Component({
  selector: 'app-skills-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './skills-dashboard.html',
  styleUrl: './skills-dashboard.css',
})
export class SkillsDashboard implements OnInit {

  private _skillsService = inject(SkillsService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';

  descMaxLength = DESC_MAX_LENGTH;

  private dragIndex: number | null = null;

  skillsForm = new FormGroup({
    description: new FormControl(''),
    items: new FormArray<FormGroup>([]),
  });

  ngOnInit(): void {
    this.loadSkills();
  }

  get items(): FormArray {
    return this.skillsForm.get('items') as FormArray;
  }

  get descriptionLength(): number {
    return (this.skillsForm.get('description')?.value || '').length;
  }

  getInitial(name: string): string {
    return (name || '').trim().charAt(0).toUpperCase() || '?';
  }

  hasIcon(item: any): boolean {
    return !!this.asFormGroup(item).get('icon')?.value;
  }

  loadSkills(): void {
    this.loading = true;

    this._skillsService.getSkills().subscribe({
      next: (data) => {
        this.patchForm(data);
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('SKILLS ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  private patchForm(data: ISkills): void {
    this.skillsForm.patchValue({
      description: data.description,
    });

    this.items.clear();
    (data.items || []).forEach((item) => {
      this.items.push(
        new FormGroup({
          name: new FormControl(item.name),
          icon: new FormControl(item.icon),
        })
      );
    });
  }

  addSkill(): void {
    this.items.push(
      new FormGroup({
        name: new FormControl(''),
        icon: new FormControl(''),
      })
    );
  }

  removeSkill(index: number): void {
    this.items.removeAt(index);
  }

  saveSkills(): void {
    if (this.skillsForm.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    this._skillsService.updateSkills(this.skillsForm.value as ISkills).subscribe({
      next: (data) => {
        this.patchForm(data);
        this.message = 'Skills updated successfully';
        this.saving = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to update skills:', error);
        this.message = 'Failed to update Skills';
        this.saving = false;
        this._cdr.detectChanges();
      },
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

    const control = this.items.at(this.dragIndex);
    this.items.removeAt(this.dragIndex);
    this.items.insert(index, control);
    this.dragIndex = null;
  }

  asFormGroup(control: any): FormGroup {
    return control as FormGroup;
  }
}
