import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProject } from '../../core/models/project.model';
import { ProjectDashboardService } from '../../core/services/project';

@Component({
  selector: 'app-projects-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './project-dashboard.html',
  styleUrl: './project-dashboard.css',
})
export class ProjectsDashboard implements OnInit {

  private _projectService = inject(ProjectDashboardService);
  private _cdr = inject(ChangeDetectorRef);

  loading = true;
  saving = false;
  message = '';

  projects: IProject[] = [];
  selectedProjectId: string | null = null;
  isNew = false;

  titleMaxLength = 100;
  descMaxLength = 300;

  private dragIndex: number | null = null;

  detailsForm = new FormGroup({
    order: new FormControl(1),
    method: new FormControl('GET'),
    endpoint: new FormControl(''),
    title: new FormControl(''),
    description: new FormControl(''),
    points: new FormArray<FormControl>([]),
    tags: new FormArray<FormControl>([]),
    sourceUrl: new FormControl(''),
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  get points(): FormArray {
    return this.detailsForm.get('points') as FormArray;
  }

  get tags(): FormArray {
    return this.detailsForm.get('tags') as FormArray;
  }

  get titleLength(): number {
    return (this.detailsForm.get('title')?.value || '').length;
  }

  get descriptionLength(): number {
    return (this.detailsForm.get('description')?.value || '').length;
  }

  loadProjects(): void {
    this.loading = true;

    this._projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('PROJECTS ERROR:', error);
        this.loading = false;
        this._cdr.detectChanges();
      },
    });
  }

  selectProject(project: IProject): void {
    this.isNew = false;
    this.selectedProjectId = project._id || null;
    this.message = '';

    this.detailsForm.patchValue({
      order: project.order,
      method: project.method,
      endpoint: project.endpoint,
      title: project.title,
      description: project.description,
      sourceUrl: project.sourceUrl,
    });

    this.setStringArray(this.points, project.points);
    this.setStringArray(this.tags, project.tags);
  }

  startNewProject(): void {
    this.isNew = true;
    this.selectedProjectId = null;
    this.message = '';

    this.detailsForm.reset({
      order: this.projects.length + 1,
      method: 'GET',
      endpoint: '',
      title: '',
      description: '',
      sourceUrl: '',
    });

    this.points.clear();
    this.tags.clear();
  }

  private setStringArray(formArray: FormArray, values: string[]): void {
    formArray.clear();
    (values || []).forEach((value) => formArray.push(new FormControl(value)));
  }

  addPoint(): void {
    this.points.push(new FormControl(''));
  }

  removePoint(index: number): void {
    this.points.removeAt(index);
  }

  addTag(): void {
    this.tags.push(new FormControl(''));
  }

  removeTag(index: number): void {
    this.tags.removeAt(index);
  }

  saveProject(): void {
    if (this.detailsForm.invalid) {
      return;
    }

    this.saving = true;
    this.message = '';

    const payload = this.detailsForm.value as IProject;

    const request$ = this.isNew
      ? this._projectService.createProject(payload)
      : this._projectService.updateProject(this.selectedProjectId as string, payload);

    request$.subscribe({
      next: () => {
        this.message = this.isNew ? 'Project created successfully' : 'Project updated successfully';
        this.saving = false;
        this.isNew = false;
        this.loadProjects();
        this._cdr.detectChanges();
      },
      error: (error) => {
        console.error('Failed to save project:', error);
        this.message = 'Failed to save project';
        this.saving = false;
        this._cdr.detectChanges();
      },
    });
  }

  duplicateProject(project: IProject, event: Event): void {
    event.stopPropagation();

    const copy: Partial<IProject> = {
      order: this.projects.length + 1,
      method: project.method,
      endpoint: project.endpoint,
      title: project.title + ' (Copy)',
      description: project.description,
      points: project.points,
      tags: project.tags,
      sourceUrl: project.sourceUrl,
    };

    this._projectService.createProject(copy).subscribe({
      next: () => this.loadProjects(),
      error: (error) => console.error('Failed to duplicate project:', error),
    });
  }

  removeProject(project: IProject, event: Event): void {
    event.stopPropagation();

    if (!confirm(`Delete "${project.title}"?`)) {
      return;
    }

    this._projectService.deleteProject(project._id as string).subscribe({
      next: () => {
        if (this.selectedProjectId === project._id) {
          this.startNewProject();
        }
        this.loadProjects();
      },
      error: (error) => console.error('Failed to delete project:', error),
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

    const moved = this.projects.splice(this.dragIndex, 1)[0];
    this.projects.splice(index, 0, moved);
    this.dragIndex = null;

    this.projects.forEach((project, i) => (project.order = i + 1));
    this.persistOrder();
  }

  private persistOrder(): void {
    this.projects.forEach((project) => {
      this._projectService
        .updateProject(project._id as string, { order: project.order })
        .subscribe({
          error: (error) => console.error('Failed to persist order:', error),
        });
    });
  }
}
