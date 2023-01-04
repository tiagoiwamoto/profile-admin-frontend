import {Component, OnInit} from '@angular/core';
import {ProfileInterface} from "../../model/profile.interface";
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent extends AbstractUsecase<ProfileInterface> implements OnInit {

  override path = '/api/v1/profiles/';

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

}
