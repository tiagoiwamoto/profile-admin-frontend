import {Component} from '@angular/core';
import {ConfirmationService, MenuItem} from "primeng/api";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'profile-admin';
  items: MenuItem[];
  constructor(public auth: KeycloakService,
              protected confirmationService: ConfirmationService) {
    this.items = [];
  }

  public async ngOnInit() {
    this.items = [
      {
        label:'Menu',
        icon:'pi pi-fw pi-bars',
        items:[
          {
            label:'Perfil',
            icon:'pi pi-fw pi-user',
            routerLink:'profiles'
          },
          {
            label:'Escolaridade',
            icon:'pi pi-fw pi-video',
            routerLink:'scholarities'
          },
          {
            label:'Curriculuns',
            icon:'pi pi-fw pi-video',
            routerLink:'resumes'
          },
          {
            label:'Experiencias',
            icon:'pi pi-fw pi-video',
            routerLink:'experiences'
          },
          {
            label:'Certificações',
            icon:'pi pi-fw pi-video',
            routerLink:'certifications'
          },
          {
            label:'Habilidades',
            icon:'pi pi-fw pi-video',
            routerLink:'skills'
          },
          {
            label:'Projetos',
            icon:'pi pi-fw pi-video',
            routerLink:'projects'
          },
          {
            label:'Cursos',
            icon:'pi pi-fw pi-video',
            routerLink:'courses_categories'
          },
          {
            label:'Softwares',
            icon:'pi pi-fw pi-video',
            routerLink:'softwares'
          }
        ]
      },
      {
        label:'Quit',
        icon:'pi pi-fw pi-power-off',
        command: () => {
          this.confirmationService.confirm({
            message: 'Deseja realmente sair ?',
            accept: () => {
              this.auth.logout();
            }
          });
        }
      }
    ];
  }

}
