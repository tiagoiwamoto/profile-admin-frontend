import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";
import {SoftwareInterface} from "../../model/software.interface";
import {AbstractService} from "../../service/abstract.service";
import {CertificationInterface} from "../../model/certification.interface";

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  records: SoftwareInterface[] | any = [];
  record: SoftwareInterface | any = {};
  file: any;
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  path = '/softwares/'
  server = environment.server;
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

  editRecord(software: SoftwareInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.record = software;
    this.formDisplaySwitch();
  }

  async loadReloadRecords(){
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
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("description", this.record.description);
    formData.append("url", this.record.url);
    formData.append("mirrorUrl", this.record.mirrorUrl);

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

  deleteRecord(record: SoftwareInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(record, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Software removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover software'})
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
