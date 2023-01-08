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
            icon:'fa-solid fa-graduation-cap',
            routerLink:'scholarities'
          },
          {
            label:'Curriculuns',
            icon:'fa-regular fa-file',
            routerLink:'resumes'
          },
          {
            label:'Experiencias',
            icon:'fa-solid fa-building',
            routerLink:'experiences'
          },
          {
            label:'Certificações',
            icon:'fa-solid fa-certificate',
            routerLink:'certifications'
          },
          {
            label:'Habilidades',
            icon:'fa-solid fa-hat-wizard',
            routerLink:'skills'
          },
          {
            label:'Projetos',
            icon:'fa-solid fa-briefcase',
            routerLink:'projects'
          },
          {
            label:'Cursos',
            icon:'fa-regular fa-lightbulb',
            routerLink:'courses_categories'
          },
          {
            label:'Softwares',
            icon:'fa-solid fa-cube',
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
