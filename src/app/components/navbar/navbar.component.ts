import { Component, OnInit, HostListener } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  name = 'Portfolio';
  scrolled = false;
  menuOpen = false;

  navLinks = [
    { label: 'Home',     href: '#hero'     },
    { label: 'About',    href: '#about'    },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills',   href: '#skills'   },
    { label: 'Contact',  href: '#contact'  }
  ];

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.profile$.subscribe(p => {
      if (p) this.name = p.name.split(' ')[0] + '.dev';
    });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 50;
  }

  scrollTo(href: string): void {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    this.menuOpen = false;
  }
}
