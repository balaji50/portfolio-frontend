import { Component } from '@angular/core';
@Component({
  selector: 'app-footer',
  template: `
    <footer class="site-footer">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">
          <span class="brand">● portfolio</span>
          <p class="mb-0">Built with <span class="text-accent">Angular</span> + <span class="text-accent">Express.js</span> + <span class="text-accent">MongoDB</span></p>
          <p class="mb-0 text-muted small">© {{ year }} All rights reserved.</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
      background: rgba(255,255,255,0.02);
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 1.5rem 0;
      .brand { color: var(--accent); font-weight: 700; font-size: 1rem; }
      p { color: rgba(255,255,255,0.4); font-size: 0.85rem; }
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
