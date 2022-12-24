import {Component, OnInit} from '@angular/core';
import {ScholarityInterface} from "../../model/scholarity.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as moment from "moment/moment";
import {FileUpload} from "primeng/fileupload";
import {ConfirmationService, MessageService} from "primeng/api";


@Component({
  selector: 'app-scholarity',
  templateUrl: './scholarity.component.html',
  styleUrls: ['./scholarity.component.css']
})
export class ScholarityComponent implements OnInit {

  scholarities: ScholarityInterface[] | any = [];
  scholarity: ScholarityInterface | any = {};
  file: any;
  loading = false;
  formDisplay = false;
  server = environment.server
  path = '/scholarities/';
  fileUpload: any;

  constructor(private http:  HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  confirm(event: Event) {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Deseja realmente excluir ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let uuid = this.scholarity.uuid === undefined ? '' : this.scholarity.uuid;
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

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.scholarity = {};
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.formDisplaySwitch();
  }

  editRecord(scholarity: ScholarityInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.scholarity = scholarity;
    this.scholarity.startDate = new Date(this.scholarity.startDate);
    this.scholarity.dateOfConclusion = new Date(this.scholarity.dateOfConclusion);
    this.formDisplaySwitch();
  }

  loadReloadRecords(){
    this.loading = true;
    this.http.get(this.server.concat(this.path)).subscribe(
      (data) => {
        this.scholarities = data;
        this.loading = false;
      }
    )
  }

  formDisplaySwitch(){
    if(this.formDisplay){
      this.formDisplay = false;
    }else{
      this.formDisplay = true;
    }
  }

  save(){
    const formData = new FormData();
    const startDateMoment = moment(this.scholarity.startDate, 'DD/MM/YYYY');
    const dateOfConclusionMoment = moment(this.scholarity.dateOfConclusion, 'DD/MM/YYYY');
    const startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    const dateOfConclusion = moment(dateOfConclusionMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("schoolName", this.scholarity.schoolName);
    formData.append("courseName", this.scholarity.courseName);
    formData.append("titleReceivedCourse", this.scholarity.titleReceivedCourse);
    formData.append("duration", this.scholarity.duration);
    formData.append("startDate", startDate);
    formData.append("dateOfConclusion", dateOfConclusion);

    if(this.scholarity.id === undefined){
      this.http.post(this.server.concat(this.path), formData).subscribe(
        (data) => {
          this.loadReloadRecords();
          this.formDisplaySwitch();
          this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi adicionada com sucesso'});
        }
      )
    }else {
      formData.append("id", this.scholarity.id);
      formData.append("uuid", this.scholarity.uuid);
      this.http.put(this.server.concat(this.path), formData).subscribe(
        (data) => {
          this.loadReloadRecords();
          this.formDisplaySwitch();
          this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi atualizada com sucesso'});
        }
      )
    }

  }

  setFile(file: any, fileUpload: FileUpload){
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }

  setScholarity(scholarity: ScholarityInterface){
    this.scholarity = scholarity;
  }

}
