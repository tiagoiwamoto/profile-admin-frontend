import {Component, OnInit} from '@angular/core';
import {ResumeInterface} from "../../model/resume.interface";
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {ScholarityInterface} from "../../model/scholarity.interface";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  resumes: ResumeInterface[] | any = [];
  resume: ResumeInterface | any = {};
  loading = false;
  formDisplay = false;
  server = environment.server
  path = '/resumes/';
  constructor(private http:  HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.resume = {};
    this.formDisplaySwitch();
  }

  editRecord(resume: ResumeInterface){
    this.resume = resume;
    this.formDisplaySwitch();
  }

  loadReloadRecords(){
    this.loading = true;
    this.http.get(this.server.concat(this.path)).subscribe(
      (data) => {
        this.resumes = data;
        this.loading = false;
      }
    )
  }

  public save(){
    const appHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    if(this.resume.id === undefined){
      this.http.post(this.server.concat(this.path), JSON.stringify(this.resume), {headers: appHeaders}).subscribe(
        (data) => {
          this.loadReloadRecords();
        }
      )
    }else{
      this.http.put(this.server.concat(this.path), JSON.stringify(this.resume), {headers: appHeaders}).subscribe(
        (data) => {
          this.loadReloadRecords();
        }
      )
    }
    this.formDisplaySwitch();
  }

  removeRecord(event: Event, resume: ResumeInterface) {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Deseja realmente excluir ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let uuid = resume.uuid === undefined ? '' : resume.uuid;
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
