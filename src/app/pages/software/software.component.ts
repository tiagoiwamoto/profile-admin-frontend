import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {SoftwareInterface} from "../../model/software.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent extends AbstractUsecaseFile<SoftwareInterface> implements OnInit {

  override path = '/softwares/'

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

  saveRecord(){
    const formData = new FormData();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("description", this.record.description);
    formData.append("url", this.record.url);
    formData.append("mirrorUrl", this.record.mirrorUrl);
    this.saveForm(formData, this.record);

  }

}
