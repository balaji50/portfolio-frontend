import { Component, OnInit } from '@angular/core';
import { PortfolioService } from './services/portfolio.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isLoading$ = this.loading.isLoading$;

  constructor(
    private portfolioService: PortfolioService,
    private loading: LoadingService
  ) {}

  ngOnInit(): void {
    this.portfolioService.getProfile().subscribe({
      error: () => console.warn('Profile not seeded yet — POST /api/profile/seed/demo')
    });
    this.portfolioService.getProjects().subscribe({
      error: () => console.warn('Projects not seeded yet — POST /api/projects/seed/demo')
    });
  }
}
