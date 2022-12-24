import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import * as moment from "moment/moment";
import {CourseInterface} from "../../model/course.interface";
import {FileUpload} from "primeng/fileupload";
import {ActivatedRoute} from "@angular/router";
import {CourseCategoryInterface} from "../../model/course_category.interface";
import {AbstractService} from "../../service/abstract.service";
import {CertificationInterface} from "../../model/certification.interface";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {


  records: CourseInterface[] | any = [];
  record: CourseInterface | any = {};
  courseCategory: CourseCategoryInterface | any = {};
  courseCategoryUuid: string | any = '';
  file: any;
  loadingPage = false;
  loadingDialog = false;
  formDisplay = false;
  server = environment.server;
  path = '/courses/'
  fileUpload: any;

  constructor(private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private service: AbstractService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseCategoryUuid = params['uuid'];

      // In a real app: dispatch action to load the details here.
      this.loadCourseCategory();
      this.loadReloadRecords();
    });
  }

  createNewRecord(){
    this.record = {};
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.formDisplaySwitch();
  }

  editRecord(course: CourseInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.record = course;
    this.record.startDate = new Date(this.record.startDate);
    this.record.endDate = new Date(this.record.endDate);
    this.formDisplaySwitch();
  }

  async loadReloadRecords(){
    this.loadingPage = true;
    await this.service.loadReloadRecords(this.path.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.records = data;
        this.loadingPage = false;
      },
      error: (error) => console.log(error)
    });
  }

  loadCourseCategory(){
    this.service.loadReloadRecords('/courses_categories/'.concat(this.courseCategoryUuid)).subscribe({
      next: (data) => {
        this.courseCategory = data;
      },
      error: (error) => console.log(error)
    });
  }

  formDisplaySwitch(){
    if(this.formDisplay){
      this.formDisplay = false;
    }else{
      this.formDisplay = true;
    }
  }

  save(){
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

    this.service.saveForm(formData, this.record, this.path).subscribe({
      next: (data) => {
        this.formDisplaySwitch();
        this.messageService.add({
          severity: 'success',
          summary: 'Aviso',
          detail: 'Solicitação executada com sucesso !'
        });
        this.loadReloadRecords();
        this.loadingDialog = false;
      },
      error: (error) => console.log(error)
    })

  }

  deleteRecord(course: CourseInterface) {
    this.confirmationService.confirm({
      message: 'Deseja realmente excluir ?',
      accept: () => {
        this.loadingPage = true;
        this.service.deleteRecord(course, this.path).subscribe({
            next: (data) => {
              this.loadingPage = false;
              this.messageService.add({severity: 'success', summary: 'Completed', detail: 'Curso removido com sucesso'});
              this.loadReloadRecords();
            },
            error: (error) => this.messageService.add({severity: 'error', summary: 'Aviso', detail: 'Falha ao remover curso'})
          }
        )
      }
    });
  }

  setFile(file: any, fileUpload: FileUpload){
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }

}
