import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {SkillInterface} from "../../model/skill.interface";
import {AbstractService} from "../../service/abstract.service";
import {CourseCategoryInterface} from "../../model/course_category.interface";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  records: SkillInterface[] | any = [];
  record: SkillInterface | any = {};
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  path = '/skills/';
  constructor(private service: AbstractService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.record = {};
    this.formDisplaySwitch();
  }

  editRecord(skill: SkillInterface){
    this.record = skill;
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

  deleteRecord(record: SkillInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(record, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Habilidade removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover habilidade'})
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
