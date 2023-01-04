import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecase} from "../../usecase/abstract-usecase.service";
import {CourseCategoryInterface} from "../../model/course_category.interface";

@Component({
  selector: 'app-course-category',
  templateUrl: './course-category.component.html',
  styleUrls: ['./course-category.component.css']
})
export class CourseCategoryComponent extends AbstractUsecase<CourseCategoryInterface> implements OnInit {

  override path = '/api/v1/courses_categories/'

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService) {
    super(confirmationService, messageService, service);
  }

  async ngOnInit(): Promise<void> {
    await this.loadReloadRecords();
  }

}
