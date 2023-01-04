import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import * as moment from "moment/moment";
import {CourseInterface} from "../../model/course.interface";
import {ActivatedRoute} from "@angular/router";
import {CourseCategoryInterface} from "../../model/course_category.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent extends AbstractUsecaseFile<CourseInterface> implements OnInit {

  courseCategory: CourseCategoryInterface | any = {};
  courseCategoryUuid: string | any = '';
  override path = '/api/v1/courses/'

  constructor(confirmationService: ConfirmationService,
              messageService: MessageService,
              service: AbstractService,
              private route: ActivatedRoute) {
  super(confirmationService, messageService, service);
}

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.courseCategoryUuid = params['uuid'];

      // In a real app: dispatch action to load the details here.
      this.loadCourseCategory();
      this.loadReloadRecords();
    });
  }

  override editRecord(course: CourseInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.record = course;
    this.record.startDate = new Date(this.record.startDate);
    this.record.endDate = new Date(this.record.endDate);
    this.formDisplaySwitch();
  }

  override async loadReloadRecords(){
    this.loadingPage = true;
    await this.service.loadReloadRecords(this.path.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.records = data;
        this.loadingPage = false;
      },
      error: (error) => console.log(error)
    });
  }

  async loadCourseCategory(){
    await this.service.loadReloadRecords('/courses_categories/'.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.courseCategory = data;
      },
      error: (error) => console.log(error)
    });
  }

  saveRecord(){
    const formData = new FormData();
    const startDateMoment = moment(this.record.startDate, 'DD/MM/YYYY');
    const endDateMoment = moment(this.record.endDate, 'DD/MM/YYYY');
    const startDate = moment(startDateMoment).format('YYYY-MM-DD').toString();
    const endDate = moment(endDateMoment).format('YYYY-MM-DD').toString();
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("school", this.record.school);
    formData.append("duration", this.record.duration);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("courseCategoryUuid", this.courseCategory.uuid);
    this.saveForm(formData, this.record);

  }

}
