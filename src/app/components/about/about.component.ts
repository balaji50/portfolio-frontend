import { Component, OnInit } from '@angular/core';
import { PortfolioService, Profile } from '../../services/portfolio.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  profile: Profile | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profile$.subscribe(p => this.profile = p);
  }
}
