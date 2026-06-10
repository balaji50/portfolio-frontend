import {
  Directive, ElementRef, Input, OnInit, OnDestroy
} from '@angular/core';

@Directive({ selector: '[appScrollReveal]' })
export class ScrollRevealDirective implements OnInit, OnDestroy {
  /** Delay in ms before the reveal animation starts */
  @Input() revealDelay = 0;
  /** Animation style: fade-up | fade-in | fade-left | fade-right */
  @Input() revealStyle: 'fade-up' | 'fade-in' | 'fade-left' | 'fade-right' = 'fade-up';

  private observer!: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.setInitialState();

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => this.reveal(), this.revealDelay);
          this.observer.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.12 }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setInitialState(): void {
    const el = this.el.nativeElement;
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
    el.style.opacity = '0';

    const transforms: Record<string, string> = {
      'fade-up':    'translateY(32px)',
      'fade-in':    'translateY(0)',
      'fade-left':  'translateX(-32px)',
      'fade-right': 'translateX(32px)'
    };
    el.style.transform = transforms[this.revealStyle] || 'translateY(32px)';
  }

  private reveal(): void {
    const el = this.el.nativeElement;
    el.style.opacity  = '1';
    el.style.transform = 'translate(0)';
  }
}
