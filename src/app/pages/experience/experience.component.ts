import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {ExperienceInterface} from "../../model/experience.interface";
import * as moment from "moment";
import {AbstractService} from "../../service/abstract.service";
import {CourseCategoryInterface} from "../../model/course_category.interface";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  records: ExperienceInterface[] | any = [];
  record: ExperienceInterface | any = {};
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  path = '/experiences/';
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

  editRecord(courseCategory: CourseCategoryInterface){
    this.record = courseCategory;
    this.record.startDate = new Date(this.record.startDate);
    this.record.endDate = new Date(this.record.endDate);
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
    const startDateMoment = moment(this.record.startDate, 'DD/MM/YYYY');
    const endDateMoment = moment(this.record.endDate, 'DD/MM/YYYY');
    this.record.startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    this.record.endDate = moment(endDateMoment).format('YYYY-MM-DD').toString();
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

  deleteRecord(experience: ExperienceInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(experience, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Experiencia removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover experiencia'})
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
