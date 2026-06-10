import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  name  = 'Your Name';
  title = 'Full-Stack Developer';
  bio   = 'Building exceptional digital experiences.';
  github   = '';
  linkedin = '';

  roles = ['Full-Stack Developer', 'Angular Developer', 'UI Developer', 'Frontend Specialist'];
  currentRole = '';
  private roleIndex = 0;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profile$.subscribe(p => {
      if (p) {
        this.name     = p.name;
        this.title    = p.title;
        this.bio      = p.bio;
        this.github   = p.github   || '';
        this.linkedin = p.linkedin || '';
      }
    });
    this.typeRole();
  }

  private typeRole(): void {
    const role = this.roles[this.roleIndex % this.roles.length];
    let i = 0;
    this.currentRole = '';
    const typing = setInterval(() => {
      this.currentRole += role[i++];
      if (i === role.length) {
        clearInterval(typing);
        setTimeout(() => {
          this.roleIndex++;
          this.typeRole();
        }, 2200);
      }
    }, 65);
  }

  scrollTo(id: string): void {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}
