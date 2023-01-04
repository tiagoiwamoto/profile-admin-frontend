import {Component, OnInit} from '@angular/core';
import {ScholarityInterface} from "../../model/scholarity.interface";
import * as moment from "moment/moment";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-scholarity',
  templateUrl: './scholarity.component.html',
  styleUrls: ['./scholarity.component.css']
})
export class ScholarityComponent extends AbstractUsecaseFile<ScholarityInterface> implements OnInit {

  override path = '/api/v1/scholarities/';

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService,
              private formBuilder: FormBuilder) {
    super(confirmationService, messageService, service);
    this.form = this.formBuilder.group({
      schoolName: [null, [Validators.required, Validators.minLength(3)]],
      courseName: [null, [Validators.required, Validators.minLength(3)]],
      titleReceivedCourse: [null, [Validators.required, Validators.minLength(3)]],
      duration: [null, [Validators.required, Validators.min(0)]],
    });
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
    this.record.startDate = new Date(this.record.startDate);
    this.record.dateOfConclusion = new Date(this.record.dateOfConclusion);
    this.formDisplaySwitch();
  }

  saveRecord(){
    const formData = new FormData();
    const startDateMoment = moment(this.record.startDate, 'DD/MM/YYYY');
    const dateOfConclusionMoment = moment(this.record.dateOfConclusion, 'DD/MM/YYYY');
    const startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    const dateOfConclusion = moment(dateOfConclusionMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("schoolName", this.record.schoolName ? this.record.schoolName : '');
    formData.append("courseName", this.record.courseName ? this.record.courseName : '');
    formData.append("titleReceivedCourse", this.record.titleReceivedCourse ? this.record.titleReceivedCourse : '');
    formData.append("duration", this.record.duration ? 0 : this.record.duration);
    formData.append("startDate", startDate);
    formData.append("dateOfConclusion", dateOfConclusion);

    this.saveForm(formData, this.record);

  }

}
