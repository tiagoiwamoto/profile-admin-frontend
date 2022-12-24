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

  override path = '/experiences/';
  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

  override editRecord(courseCategory: CourseCategoryInterface){
    this.record = courseCategory;
    this.record.startDate = new Date(this.record.startDate);
    this.record.endDate = new Date(this.record.endDate);
    this.formDisplaySwitch();
  }

  public saveRecord(){
    const startDateMoment = moment(this.record.startDate, 'DD/MM/YYYY');
    const endDateMoment = moment(this.record.endDate, 'DD/MM/YYYY');
    this.record.startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    this.record.endDate = moment(endDateMoment).format('YYYY-MM-DD').toString();
    this.save();
  }
}
