import { Component, OnInit } from '@angular/core';
import { PortfolioService, Skill } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  skillGroups: { category: string; skills: Skill[] }[] = [];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profile$.subscribe(p => {
      if (p?.skills) this.groupSkills(p.skills);
    });
  }

  private groupSkills(skills: Skill[]): void {
    const map = new Map<string, Skill[]>();
    for (const s of skills) {
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category)!.push(s);
    }
    this.skillGroups = [...map.entries()].map(([category, skills]) => ({ category, skills }));
  }
}
