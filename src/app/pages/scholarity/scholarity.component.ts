import {Component, OnInit} from '@angular/core';
import {ScholarityInterface} from "../../model/scholarity.interface";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import * as moment from "moment/moment";
import {FileUpload} from "primeng/fileupload";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {CertificationInterface} from "../../model/certification.interface";


@Component({
  selector: 'app-scholarity',
  templateUrl: './scholarity.component.html',
  styleUrls: ['./scholarity.component.css']
})
export class ScholarityComponent implements OnInit {

  records: ScholarityInterface[] | any = [];
  record: ScholarityInterface | any = {};
  file: any;
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  server = environment.server
  path = '/scholarities/';
  fileUpload: any;

  constructor(private service: AbstractService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.record = {};
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
    this.record = scholarity;
    this.record.startDate = new Date(this.record.startDate);
    this.record.dateOfConclusion = new Date(this.record.dateOfConclusion);
    this.formDisplaySwitch();
  }

  async loadReloadRecords() {
    this.loadingPage = true;
    await this.service.loadReloadRecords(this.path).subscribe({
      next: (data) => {
        this.records = data;
        this.loadingPage = false;
      },
      error: (error) => console.log(error)
    });
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
    const startDateMoment = moment(this.record.startDate, 'DD/MM/YYYY');
    const dateOfConclusionMoment = moment(this.record.dateOfConclusion, 'DD/MM/YYYY');
    const startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    const dateOfConclusion = moment(dateOfConclusionMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("schoolName", this.record.schoolName);
    formData.append("courseName", this.record.courseName);
    formData.append("titleReceivedCourse", this.record.titleReceivedCourse);
    formData.append("duration", this.record.duration);
    formData.append("startDate", startDate);
    formData.append("dateOfConclusion", dateOfConclusion);

    this.service.saveForm(formData, this.record, this.path).subscribe({
      next: (data) => {
        this.formDisplaySwitch();
        this.messageService.add({
          severity: 'success',
          summary: 'Aviso',
          detail: 'Solicitação executada com sucesso !'
        });
        this.loadReloadRecords();
        this.loadingDialog = false;
      },
      error: (error) => console.log(error)
    })

  }

  deleteRecord(record: ScholarityInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(record, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Escolaridade removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover escolaridade'})
          }
        )
      }
    });
  }

  setFile(file: any, fileUpload: FileUpload){
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }

}
