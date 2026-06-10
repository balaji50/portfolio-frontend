import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Project {
  _id?:        string;
  title:       string;
  description: string;
  longDesc?:   string;
  tech:        string[];
  imageUrl?:   string;
  liveUrl?:    string;
  githubUrl?:  string;
  featured:    boolean;
  order:       number;
  category:    'web' | 'mobile' | 'backend' | 'other';
  createdAt?:  string;
}

export interface Skill {
  name:     string;
  level:    number;
  category: string;
  icon?:    string;
}

export interface Experience {
  company:     string;
  role:        string;
  period:      string;
  description: string;
  current?:    boolean;
}

export interface Profile {
  _id?:       string;
  name:       string;
  title:      string;
  bio:        string;
  avatarUrl?: string;
  email?:     string;
  location?:  string;
  github?:    string;
  linkedin?:  string;
  twitter?:   string;
  resumeUrl?: string;
  skills:     Skill[];
  experience: Experience[];
  education:  { institution: string; degree: string; year: string }[];
}

@Injectable({ providedIn: 'root' })
export class PortfolioService {
  private api = environment.apiUrl;

  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private profileSubject  = new BehaviorSubject<Profile | null>(null);

  projects$ = this.projectsSubject.asObservable();
  profile$  = this.profileSubject.asObservable();

  constructor(private http: HttpClient) {}

  // ── Profile ──────────────────────────────────────────────────────────────
  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${this.api}/profile`).pipe(
      tap(p => this.profileSubject.next(p)),
      catchError(err => throwError(() => err))
    );
  }

  updateProfile(data: Partial<Profile>): Observable<Profile> {
    return this.http.put<Profile>(`${this.api}/profile`, data).pipe(
      tap(p => this.profileSubject.next(p))
    );
  }

  seedProfile(): Observable<Profile> {
    return this.http.post<Profile>(`${this.api}/profile/seed/demo`, {}).pipe(
      tap(p => this.profileSubject.next(p))
    );
  }

  // ── Projects ─────────────────────────────────────────────────────────────
  getProjects(category?: string, featured?: boolean): Observable<Project[]> {
    let params = new HttpParams();
    if (category) params = params.set('category', category);
    if (featured !== undefined) params = params.set('featured', String(featured));

    return this.http.get<Project[]>(`${this.api}/projects`, { params }).pipe(
      tap(p => this.projectsSubject.next(p)),
      catchError(err => throwError(() => err))
    );
  }

  getProject(id: string): Observable<Project> {
    return this.http.get<Project>(`${this.api}/projects/${id}`);
  }

  createProject(data: Omit<Project, '_id'>): Observable<Project> {
    return this.http.post<Project>(`${this.api}/projects`, data).pipe(
      tap(() => this.getProjects().subscribe())
    );
  }

  updateProject(id: string, data: Partial<Project>): Observable<Project> {
    return this.http.put<Project>(`${this.api}/projects/${id}`, data);
  }

  deleteProject(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/projects/${id}`).pipe(
      tap(() => this.getProjects().subscribe())
    );
  }

  seedProjects(): Observable<{ message: string; projects: Project[] }> {
    return this.http.post<{ message: string; projects: Project[] }>(
      `${this.api}/projects/seed/demo`, {}
    ).pipe(tap(r => this.projectsSubject.next(r.projects)));
  }
}
