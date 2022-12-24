import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {ButtonModule} from "primeng/button";
import {HttpClientModule} from "@angular/common/http";
import {ProgressSpinnerModule} from "primeng/progressspinner";
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import {TagModule} from "primeng/tag";
import {DialogModule} from "primeng/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {ToolbarModule} from "primeng/toolbar";
import { ScholarityComponent } from './pages/scholarity/scholarity.component';
import {BadgeModule} from "primeng/badge";
import {CheckboxModule} from "primeng/checkbox";
import {TableModule} from "primeng/table";
import {InputMaskModule} from "primeng/inputmask";
import {FileUploadModule} from "primeng/fileupload";
import {CalendarModule} from "primeng/calendar";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {ToastModule} from "primeng/toast";
import { ResumeComponent } from './pages/resume/resume.component';
import {MenubarModule} from "primeng/menubar";
import {ConfirmationService, MessageService} from "primeng/api";
import {ChipModule} from "primeng/chip";
import { SafePipe } from './safe.pipe';
import { ExperienceComponent } from './pages/experience/experience.component';
import { CertificationComponent } from './pages/certification/certification.component';
import { SkillComponent } from './pages/skill/skill.component';
import { ProjectComponent } from './pages/project/project.component';
import { CourseCategoryComponent } from './pages/course-category/course-category.component';
import { CourseComponent } from './pages/course/course.component';
import { SoftwareComponent } from './pages/software/software.component';
import {DividerModule} from "primeng/divider";
import {ConfirmDialogModule} from "primeng/confirmdialog";

function initializeKeycloak(keycloak: KeycloakService) {

  return () =>
    keycloak.init({
      config: {
        realm: 'profile-admin',
        url: 'http://localhost:28080',
        clientId: 'web-app',
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ScholarityComponent,
    ResumeComponent,
    SafePipe,
    ExperienceComponent,
    CertificationComponent,
    SkillComponent,
    ProjectComponent,
    CourseCategoryComponent,
    CourseComponent,
    SoftwareComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        KeycloakAngularModule,
        AppRoutingModule,
        AccordionModule,
        CardModule,
        ButtonModule,
        HttpClientModule,
        ProgressSpinnerModule,
        TagModule,
        DialogModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ToolbarModule,
        BadgeModule,
        CheckboxModule,
        TableModule,
        InputMaskModule,
        FileUploadModule,
        CalendarModule,
        ConfirmPopupModule,
        ToastModule,
        MenubarModule,
        ChipModule,
        DividerModule,
        ConfirmDialogModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },
    ConfirmationService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
