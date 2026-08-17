import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Home } from './home/home';
import { About } from './about/about';
import { Projects } from './projects/projects';
import { Skills } from './skills/skills';
import { Education } from './education/education';
import { Contact } from './contact/contact';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-components',
  imports: [Navbar, Home, About, Projects, Skills, Education, Contact, Footer],
  templateUrl: './components.html',
  styleUrl: './components.css',
})
export class Components {}
