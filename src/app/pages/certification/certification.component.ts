import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import * as moment from "moment";
import {FileUpload} from "primeng/fileupload";
import {CertificationInterface} from "../../model/certification.interface";
import {AbstractService} from "../../service/abstract.service";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent implements OnInit {

  records: CertificationInterface[] | any = [];
  record: CertificationInterface | any = {};
  file: any;
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  server = environment.server;
  path = '/certifications/'
  fileUpload: any;

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private service: AbstractService) {
  }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord() {
    this.record = {};
    this.file = [];
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.formDisplaySwitch();
  }

  editRecord(certification: CertificationInterface) {
    this.file = [];
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.record = certification;
    this.record.earnDate = new Date(this.record.earnDate);
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

  formDisplaySwitch() {
    if (this.formDisplay) {
      this.formDisplay = false;
    } else {
      this.formDisplay = true;
    }
  }

  save() {
    this.loadingDialog = true;
    const formData = new FormData();
    const earnDateMoment = moment(this.record.earnDate, 'DD/MM/YYYY');
    const earnDate = moment(earnDateMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("validateUrl", this.record.validateUrl);
    formData.append("earnDate", earnDate);
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

  deleteRecord(certification: CertificationInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(certification, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Certificado removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover certificado'})
          }
        )
      }
    });
  }

  setFile(file: any, fileUpload: FileUpload) {
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }

}
