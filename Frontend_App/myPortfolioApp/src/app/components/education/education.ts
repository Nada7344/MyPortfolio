import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EducationService } from '../../core/services/education';
import { IEducation } from '../../core/models/education.model';

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education implements OnInit {

  private _educationService = inject(EducationService);
  private _cdr = inject(ChangeDetectorRef);

  items: IEducation[] = [];
  loading = true;
  error = false;

  ngOnInit(): void {
    this._educationService.getAllEducation().subscribe({
      next: (data) => {
        this.items = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('EDUCATION ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      },
    });
  }
}
