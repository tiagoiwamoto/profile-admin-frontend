import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {SkillInterface} from "../../model/skill.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent extends AbstractUsecase<SkillInterface> implements OnInit {

  override path = '/skills/';
  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

}
