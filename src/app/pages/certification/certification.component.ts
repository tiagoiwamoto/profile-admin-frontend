import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import * as moment from "moment";
import {CertificationInterface} from "../../model/certification.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.css']
})
export class CertificationComponent extends AbstractUsecaseFile<CertificationInterface> implements OnInit {

  override path = '/api/v1/certifications/'

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

  saveRecord() {
    const formData = new FormData();
    const earnDateMoment = moment(this.record.earnDate, 'DD/MM/YYYY');
    const earnDate = moment(earnDateMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("validateUrl", this.record.validateUrl);
    formData.append("earnDate", earnDate);
    this.saveForm(formData, this.record);

  }

  override editRecord(certification: CertificationInterface) {
    this.file = [];
    if (this.fileUpload) {
      this.fileUpload.clear();
    }
    this.record = certification;
    this.record.earnDate = new Date(this.record.earnDate);
    this.formDisplaySwitch();
  }

}
