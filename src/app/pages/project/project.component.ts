import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {ProjectInterface} from "../../model/project.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent extends AbstractUsecase<ProjectInterface> implements OnInit {

  override path = '/projects/'

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

}
