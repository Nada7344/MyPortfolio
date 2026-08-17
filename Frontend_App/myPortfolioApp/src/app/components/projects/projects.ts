import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDashboardService } from '../../core/services/project';
import { IProject } from '../../core/models/project.model';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {

  private _projectService = inject(ProjectDashboardService);
  private _cdr = inject(ChangeDetectorRef);

  projects: IProject[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this._projectService.getAllProjects().subscribe({
      next: (data) => {
        this.projects = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('PROJECTS ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      },
    });
  }
}
