import {Component, OnInit} from '@angular/core';
import {ResumeInterface} from "../../model/resume.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent extends AbstractUsecase<ResumeInterface> implements OnInit {

  override path = '/api/v1/resumes/';

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

}
