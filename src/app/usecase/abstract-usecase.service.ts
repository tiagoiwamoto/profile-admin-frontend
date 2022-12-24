import {Injectable} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../service/abstract.service";

@Injectable({
  providedIn: 'root'
})
export class AbstractUsecase<T> {

  records: T | any = [];
  record: T | any = {};
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  path: string | any;

  constructor(protected confirmationService: ConfirmationService,
              protected messageService: MessageService,
              protected service: AbstractService) { }



  createNewRecord(){
    this.record = {};
    this.formDisplaySwitch();
  }

  editRecord(record: any){
    this.record = record;
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

  public save(){
    this.service.save(this.record, this.path).subscribe({
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

  deleteRecord(record: T) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(record, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Registro removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover registro'})
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
