import {Injectable} from '@angular/core';
import {AbstractUsecase} from "./abstract-usecase.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../service/abstract.service";
import {environment} from "../../environments/environment";
import {FileUpload} from "primeng/fileupload";

@Injectable({
  providedIn: 'root'
})
export class AbstractUsecaseFile<T> extends AbstractUsecase<T>{

  file: any;
  server = environment.server;
  fileUpload: any;

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  override createNewRecord() {
    this.loadingDialog = false;
    this.record = {};
    this.file = [];
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.formDisplaySwitch();
  }

  override editRecord(record: T) {
    this.file = [];
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.record = record;
    this.formDisplaySwitch();
  }

  saveForm(formData: FormData, record: any) {
    this.loadingDialog = true;
    this.service.saveForm(formData, record, this.path).subscribe({
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
      error: (response) => {
        this.loadingDialog = false;
        this.responseError = response.error;
        this.responseError.messages.forEach((message: any) => {
          this.messageService.add({severity: 'error', summary: 'Aviso', detail: message, life: 10000, closable: true})
        })
      }
    })
  }

  setFile(file: any, fileUpload: FileUpload) {
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }
}
