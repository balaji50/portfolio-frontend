import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  template: `
    <div class="not-found-page d-flex align-items-center justify-content-center min-vh-100">
      <div class="text-center">
        <div class="nf-code">404</div>
        <h2 class="nf-title">Page Not Found</h2>
        <p class="nf-sub">Looks like this page doesn't exist.</p>
        <button class="btn-home" (click)="router.navigate(['/'])">
          <i class="bi bi-house me-2"></i> Back to Portfolio
        </button>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page { background: var(--bg-dark); }

    .nf-code {
      font-family: var(--font-display);
      font-size: clamp(6rem, 18vw, 12rem);
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, var(--accent), rgba(6,182,212,0.2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    .nf-title {
      color: #fff;
      font-family: var(--font-display);
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .nf-sub {
      color: rgba(255,255,255,0.4);
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .btn-home {
      background: var(--accent);
      color: #060d18;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      &:hover { background: var(--accent-hover); transform: translateY(-2px); }
    }
  `]
})
export class NotFoundComponent {
  constructor(public router: Router) {}
}
