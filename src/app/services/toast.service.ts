import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id:      number;
  message: string;
  type:    ToastType;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private idSeq = 0;
  private toasts$ = new BehaviorSubject<Toast[]>([]);
  toasts = this.toasts$.asObservable();

  show(message: string, type: ToastType = 'info', duration = 4000): void {
    const toast: Toast = { id: ++this.idSeq, message, type };
    this.toasts$.next([...this.toasts$.value, toast]);
    setTimeout(() => this.dismiss(toast.id), duration);
  }

  success(msg: string) { this.show(msg, 'success'); }
  error(msg: string)   { this.show(msg, 'error', 6000); }
  info(msg: string)    { this.show(msg, 'info'); }
  warning(msg: string) { this.show(msg, 'warning'); }

  dismiss(id: number): void {
    this.toasts$.next(this.toasts$.value.filter(t => t.id !== id));
  }
}
