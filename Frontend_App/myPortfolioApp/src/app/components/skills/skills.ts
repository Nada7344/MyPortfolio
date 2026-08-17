import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsService } from '../../core/services/skills';
import { ISkills } from '../../core/models/skills.model';

@Component({
  selector: 'app-skills',
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills implements OnInit {

  private _skillsService = inject(SkillsService);
  private _cdr = inject(ChangeDetectorRef);

  skills: ISkills | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {
    this._skillsService.getSkills().subscribe({
      next: (data) => {
        this.skills = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('SKILLS ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      },
    });
  }
}
