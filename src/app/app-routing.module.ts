import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AppAuthGuard} from "./app.authguard";
import {HomeComponent} from "./pages/home/home.component";
import {ScholarityComponent} from "./pages/scholarity/scholarity.component";
import {ResumeComponent} from "./pages/resume/resume.component";
import {ExperienceComponent} from "./pages/experience/experience.component";
import {CertificationComponent} from "./pages/certification/certification.component";
import {SkillComponent} from "./pages/skill/skill.component";
import {ProjectComponent} from "./pages/project/project.component";
import {CourseCategoryComponent} from "./pages/course-category/course-category.component";
import {CourseComponent} from "./pages/course/course.component";
import {SoftwareComponent} from "./pages/software/software.component";

const routes: Routes = [
  {path: 'profiles', component: ProfileComponent, canActivate: [AppAuthGuard]},
  {path: 'scholarities', component: ScholarityComponent, canActivate: [AppAuthGuard]},
  {path: 'resumes', component: ResumeComponent, canActivate: [AppAuthGuard]},
  {path: 'experiences', component: ExperienceComponent, canActivate: [AppAuthGuard]},
  {path: 'certifications', component: CertificationComponent, canActivate: [AppAuthGuard]},
  {path: 'skills', component: SkillComponent, canActivate: [AppAuthGuard]},
  {path: 'projects', component: ProjectComponent, canActivate: [AppAuthGuard]},
  {path: 'courses_categories', component: CourseCategoryComponent, canActivate: [AppAuthGuard]},
  {path: 'courses/:uuid', component: CourseComponent, canActivate: [AppAuthGuard]},
  {path: 'softwares', component: SoftwareComponent, canActivate: [AppAuthGuard]},
  {path: '', component: HomeComponent, canActivate: [AppAuthGuard]},
  {path: 'home', component: HomeComponent, canActivate: [AppAuthGuard]},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [AppAuthGuard]
})
export class AppRoutingModule { }
