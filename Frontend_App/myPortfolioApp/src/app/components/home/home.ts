import {
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';
import { environment } from '../../environments/environment.ts';

import { CommonModule } from '@angular/common';
import { HomeService } from '../../core/services/home';
import { IHome } from '../../core/models/home.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  private _homeService = inject(HomeService);
  private _cdr = inject(ChangeDetectorRef);

  home: IHome | null = null;
  loading = true;
  error = false;

  ngOnInit(): void {

    this._homeService.getHome().subscribe({

      next: (data) => {
        this.home = data;
        this.loading = false;
        this._cdr.detectChanges();
      },

      error: (err) => {
        console.error('HOME ERROR:', err);
        this.loading = false;
        this.error = true;
        this._cdr.detectChanges();
      }

    });
  }

resolveFileUrl(path: string | null | undefined): string {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const base = environment.apiUrl.replace('/api', '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

downloadResumeUrl(): string {
  return `${environment.apiUrl}/home/download/resume`;
}


}
