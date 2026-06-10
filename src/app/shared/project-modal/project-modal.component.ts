import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent {
  @Input()  project: Project | null = null;
  @Output() closed = new EventEmitter<void>();

  close(): void { this.closed.emit(); }

  onOverlayClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).classList.contains('modal-overlay')) {
      this.close();
    }
  }
}
