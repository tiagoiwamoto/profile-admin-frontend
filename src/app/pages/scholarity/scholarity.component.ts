import {Component, OnInit} from '@angular/core';
import {ScholarityInterface} from "../../model/scholarity.interface";
import * as moment from "moment/moment";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";


@Component({
  selector: 'app-scholarity',
  templateUrl: './scholarity.component.html',
  styleUrls: ['./scholarity.component.css']
})
export class ScholarityComponent extends AbstractUsecaseFile<ScholarityInterface> implements OnInit {

  override path = '/api/v1/scholarities/';

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

  override editRecord(scholarity: ScholarityInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.record = scholarity;
    this.record.startDate = moment(this.record.startDate).format('YYYY-MM').toString();
    this.record.dateOfConclusion = moment(this.record.dateOfConclusion).format('YYYY-MM').toString();
    this.formDisplaySwitch();
  }

  saveRecord(){
    const formData = new FormData();
    this.record.startDate = this.record.startDate.concat('-02')
    this.record.dateOfConclusion = this.record.dateOfConclusion.concat('-02')
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("schoolName", this.record.schoolName ? this.record.schoolName : '');
    formData.append("courseName", this.record.courseName ? this.record.courseName : '');
    formData.append("titleReceivedCourse", this.record.titleReceivedCourse ? this.record.titleReceivedCourse : '');
    formData.append("duration", this.record.duration);
    formData.append("startDate", this.record.startDate);
    formData.append("dateOfConclusion", this.record.dateOfConclusion);

    this.saveForm(formData, this.record);

  }

  logStartDate(event: Event){
    // @ts-ignore
    console.log(event.target.value);
  }

}
