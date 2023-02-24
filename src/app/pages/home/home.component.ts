import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {HomeInterface} from "../../model/home.interface";
import {environment} from "../../../environments/environment";
import {Message, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public token = '';
  loadingPage = false;
  public server = environment.server;
  path = '/api/v1/open/profile'
  profile: HomeInterface | any = {};
  responsiveOptions;
  showModalImage = false;
  imageToShow = '';
  msgs1: Message[] | any;


  constructor(private readonly keycloak: KeycloakService,
              private messageService: MessageService,
              private service: AbstractService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

    this.loadReloadRecords();

  }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    // if (this.isLoggedIn) {
    //   this.userProfile = await this.keycloak.loadUserProfile();
    // }
    this.userProfile = await this.keycloak.loadUserProfile();
    this.keycloak.getToken().then(result => {
      this.token = result;
    });
  }

  async loadReloadRecords(){
    this.loadingPage = true;
    await this.service.loadReloadRecords(this.path).subscribe({
      next: (data) => {
        this.profile = data;
        this.msgs1 = [
          {severity:'success', summary:'Certificações', detail: this.profile.certifications.length, icon: 'pi-file'},
          {severity:'success', summary:'Cursos realizados', detail: this.getMetrics().totalCursos, icon: 'pi-file'},
          {severity:'success', summary:'Total de horas em cursos', detail: this.getMetrics().totalHoras + 'h em cursos', icon: 'pi-file'},
          {severity:'success', summary:'Projetos', detail: this.profile.projects.length, icon: 'pi-file'},
        ];
        // @ts-ignore
        this.loadingPage = false;
      },
      error: (error) => console.log(error)
    });
  }

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  getMetrics(){

    //Carregar chart tipo pie
    // this.data = {
    //   labels: ['Certificações','Cursos','Projetos'],
    //   datasets: [
    //     {
    //       data: [this.profile.certifications.length, this.getMetrics().totalCursos, this.profile.projects.length],
    //       backgroundColor: [
    //         "#42A5F5",
    //         "#66BB6A",
    //         "#FFA726"
    //       ],
    //       hoverBackgroundColor: [
    //         "#64B5F6",
    //         "#81C784",
    //         "#FFB74D"
    //       ]
    //     }
    //   ]
    // };

    let totalHoras = 0;
    // @ts-ignore
    this.profile.metrics?.forEach(metric => {
      totalHoras = totalHoras + metric.total;
    });

    let totalCursos = 0;
    // @ts-ignore
    this.profile.coursesCategories.forEach(course => {
      totalCursos = totalCursos + course.courses.length;
    });

    return {totalHoras: totalHoras, totalCursos: totalCursos};
  }

  showImage(image: string){
    this.imageToShow = '';
    this.imageToShow = image;
    if(this.showModalImage){
      this.showModalImage = false;
    }else{
      this.showModalImage = true;
    }
  }


}
