import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {HomeInterface} from "../../model/home.interface";
import {environment} from "../../../environments/environment";
import {MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";

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

}
