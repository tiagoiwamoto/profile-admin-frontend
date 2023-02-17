import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ExperienceInterface} from "../../model/experience.interface";
import * as moment from "moment";
import {AbstractService} from "../../service/abstract.service";
import {CourseCategoryInterface} from "../../model/course_category.interface";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent extends AbstractUsecase<ExperienceInterface> implements OnInit {

  override path = '/api/v1/experiences/';
  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
    // @ts-ignore
    this.records.sort((a, b) => (b.endDate > a.endDate) ? 1 : -1)
  }

  override editRecord(courseCategory: CourseCategoryInterface){
    this.record = courseCategory;
    this.record.startDate = moment(this.record.startDate).format('YYYY-MM').toString();
    this.record.endDate = moment(this.record.endDate).format('YYYY-MM').toString();
    this.formDisplaySwitch();
  }

  public saveRecord(){
    this.record.startDate = this.record.startDate.concat('-02')
    console.log(Boolean(this.record.endDate))
    debugger;
    if(Boolean(this.record.endDate)){
      this.record.endDate = this.record.endDate.concat('-02')
    }
    this.save();
  }
}
