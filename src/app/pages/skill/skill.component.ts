import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {SkillInterface} from "../../model/skill.interface";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  skills: SkillInterface[] | any = [];
  skill: SkillInterface | any = {};
  loading = false;
  formDisplay = false;
  server = environment.server
  path = '/skills/';
  constructor(private http:  HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.skill = {};
    this.formDisplaySwitch();
  }

  editRecord(skill: SkillInterface){
    this.skill = skill;
    this.formDisplaySwitch();
  }

  loadReloadRecords(){
    this.loading = true;
    this.http.get(this.server.concat(this.path)).subscribe(
      (data) => {
        this.skills = data;
        this.loading = false;
      }
    )
  }

  public save(){
    const appHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    if(this.skill.id === undefined){
      this.http.post(this.server.concat(this.path), JSON.stringify(this.skill), {headers: appHeaders}).subscribe(
        (data) => {
          this.loadReloadRecords();
        }
      )
    }else{
      this.http.put(this.server.concat(this.path), JSON.stringify(this.skill), {headers: appHeaders}).subscribe(
        (data) => {
          this.loadReloadRecords();
        }
      )
    }
    this.formDisplaySwitch();
  }

  removeRecord(event: Event, skill: SkillInterface) {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Deseja realmente excluir ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let uuid = skill.uuid === undefined ? '' : skill.uuid;
        this.loading = true;
        this.http.delete(this.server.concat(this.path).concat(uuid)).subscribe(
          (data) => {
            this.loading = false;
            this.loadReloadRecords();
            this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi removida'});
          }
        )
      }
    });
  }

  formDisplaySwitch(){
    if(this.formDisplay){
      this.formDisplay = false;
    }else{
      this.formDisplay = true;
    }
  }

}
