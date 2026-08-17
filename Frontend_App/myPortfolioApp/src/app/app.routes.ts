import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { HomeDashboard } from './dashboard/home-dashboard/home-dashboard';
import { Components } from './components/components';
import { AboutDashboard } from './dashboard/about-dashboard/about-dashboard';
import { ProjectsDashboard } from './dashboard/project-dashboard/project-dashboard';
import { SkillsDashboard } from './dashboard/skills-dashboard/skills-dashboard';
import { EducationDashboard } from './dashboard/education-dashboard/education-dashboard';
import { ContactDashboard } from './dashboard/contact-dashboard/contact-dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Components,
  },
  {
    path: 'admin',
    component: Dashboard,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeDashboard },
      { path: 'about', component: AboutDashboard },
      { path: 'projects', component: ProjectsDashboard },
      { path: 'skills', component: SkillsDashboard },
      { path: 'education', component: EducationDashboard },
      { path: 'contact', component: ContactDashboard },

    ],
  },
];
