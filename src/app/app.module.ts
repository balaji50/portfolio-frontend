import { NgModule }              from '@angular/core';
import { BrowserModule }         from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule }          from '@angular/common';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent }         from './app.component';

// Layout components
import { NavbarComponent }      from './components/navbar/navbar.component';
import { HeroComponent }        from './components/hero/hero.component';
import { AboutComponent }       from './components/about/about.component';
import { ProjectsComponent }    from './components/projects/projects.component';
import { SkillsComponent }      from './components/skills/skills.component';
import { ContactComponent }     from './components/contact/contact.component';
import { FooterComponent }      from './components/footer/footer.component';

// Shared components
import { ToastComponent }       from './shared/toast/toast.component';
import { ProjectModalComponent } from './shared/project-modal/project-modal.component';
import { NotFoundComponent }    from './pages/not-found/not-found.component';

// Directives
import { ScrollRevealDirective } from './directives/scroll-reveal.directive';

// Interceptors
import { LoadingInterceptor }   from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    ProjectsComponent,
    SkillsComponent,
    ContactComponent,
    FooterComponent,
    ToastComponent,
    ProjectModalComponent,
    NotFoundComponent,
    ScrollRevealDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
