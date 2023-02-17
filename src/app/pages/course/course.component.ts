import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import * as moment from "moment/moment";
import {CourseInterface} from "../../model/course.interface";
import {ActivatedRoute} from "@angular/router";
import {CourseCategoryInterface} from "../../model/course_category.interface";
import {AbstractService} from "../../service/abstract.service";
import {AbstractUsecaseFile} from "../../usecase/abstract-usecase-file.service";
import {Table} from "primeng/table";

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
    this.record.startDate = moment(this.record.startDate).format('YYYY-MM').toString();
    this.record.endDate = moment(this.record.endDate).format('YYYY-MM').toString();
    this.formDisplaySwitch();
  }

  override async loadReloadRecords(){
    this.loadingPage = true;
    await this.service.loadReloadRecords(this.path.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.records = data;
        this.records.reverse();
        // @ts-ignore
        this.records.sort((a, b) => (b.endDate > a.endDate) ? 1 : -1)
        this.loadingPage = false;
      },
      error: (error) => console.log(error)
    });
  }

  async loadCourseCategory(){
    await this.service.loadReloadRecords('/api/v1/courses_categories/'.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.courseCategory = data;
      },
      error: (error) => console.log(error)
    });
  }

  saveRecord(){
    const formData = new FormData();
    this.record.startDate = this.record.startDate.concat('-02')
    this.record.endDate = this.record.endDate.concat('-02')
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.record.name);
    formData.append("school", this.record.school);
    formData.append("duration", this.record.duration);
    formData.append("startDate", this.record.startDate);
    formData.append("endDate", this.record.endDate);
    formData.append("courseCategoryUuid", this.courseCategory.uuid);
    this.saveForm(formData, this.record);

  }

}
