import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../core/services/about';
import { HomeService } from '../../core/services/home';
import { IAbout } from '../../core/models/about.model';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About implements OnInit {

  private _aboutService = inject(AboutService);
  private _homeService = inject(HomeService);
  private _cdr = inject(ChangeDetectorRef);

  about: IAbout | null = null;
  loading = true;
  error = false;

  // About schema has no "name" field — same approach as the dashboard:
  // fetch it from Home just for display (terminal snippet).
  displayName = '';

  ngOnInit(): void {
    this._aboutService.getAbout().subscribe({
      next: (data) => {
        this.about = data;
        this.loading = false;
        this._cdr.detectChanges();
      },
      error: (err) => {
        console.error('ABOUT ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      },
    });

    this._homeService.getHome().subscribe({
      next: (home) => {
        this.displayName = home.name;
        this._cdr.detectChanges();
      },
      error: (err) => console.error('HOME CONTEXT ERROR:', err),
    });
  }
}
