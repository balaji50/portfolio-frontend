import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService, Project } from '../../services/portfolio.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filtered: Project[] = [];
  activeFilter = 'all';
  loading = true;

  // Project detail modal
  selectedProject: Project | null = null;

  // Add project modal
  showAddModal = false;
  addForm!: FormGroup;
  adding = false;

  techInput = '';
  techList: string[] = [];

  filters = [
    { label: 'All',     value: 'all'     },
    { label: 'Web',     value: 'web'     },
    { label: 'Backend', value: 'backend' },
    { label: 'Mobile',  value: 'mobile'  },
    { label: 'Other',   value: 'other'   }
  ];

  constructor(
    private portfolioService: PortfolioService,
    private toast: ToastService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.portfolioService.projects$.subscribe(projects => {
      this.projects = projects;
      this.applyFilter(this.activeFilter);
      this.loading = false;
    });
    this.portfolioService.getProjects().subscribe({ error: () => { this.loading = false; } });
    this.buildForm();
  }

  private buildForm(): void {
    this.addForm = this.fb.group({
      title:       ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      longDesc:    [''],
      imageUrl:    [''],
      liveUrl:     [''],
      githubUrl:   [''],
      category:    ['web', Validators.required],
      featured:    [false]
    });
  }

  applyFilter(value: string): void {
    this.activeFilter = value;
    this.filtered = value === 'all'
      ? this.projects
      : this.projects.filter(p => p.category === value);
  }

  openProject(p: Project): void { this.selectedProject = p; }
  closeProject(): void           { this.selectedProject = null; }

  openAddModal(): void {
    this.buildForm();
    this.techList = [];
    this.techInput = '';
    this.showAddModal = true;
  }

  closeAddModal(): void { this.showAddModal = false; }

  addTech(): void {
    const t = this.techInput.trim();
    if (t && !this.techList.includes(t)) this.techList.push(t);
    this.techInput = '';
  }

  removeTech(t: string): void {
    this.techList = this.techList.filter(x => x !== t);
  }

  onTechKey(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); this.addTech(); }
  }

  submitProject(): void {
    if (this.addForm.invalid) { this.addForm.markAllAsTouched(); return; }
    this.adding = true;
    const payload = { ...this.addForm.value, tech: this.techList, order: this.projects.length + 1 };

    this.portfolioService.createProject(payload).subscribe({
      next: () => {
        this.toast.success('Project added successfully! 🎉');
        this.closeAddModal();
        this.adding = false;
      },
      error: () => {
        this.toast.error('Failed to add project. Please try again.');
        this.adding = false;
      }
    });
  }

  deleteProject(p: Project, e: Event): void {
    e.stopPropagation();
    if (!p._id || !confirm(`Delete "${p.title}"?`)) return;
    this.portfolioService.deleteProject(p._id).subscribe({
      next: () => this.toast.success('Project deleted.'),
      error: () => this.toast.error('Could not delete project.')
    });
  }

  trackById(_: number, p: Project): string { return p._id || p.title; }
}

