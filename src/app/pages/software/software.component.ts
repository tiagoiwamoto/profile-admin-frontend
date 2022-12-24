import {Component, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {FileUpload} from "primeng/fileupload";
import {SoftwareInterface} from "../../model/software.interface";

@Component({
  selector: 'app-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css']
})
export class SoftwareComponent implements OnInit {

  softwares: SoftwareInterface[] | any = [];
  software: SoftwareInterface | any = {};
  file: any;
  loading = false;
  formDisplay = false;
  server = environment.server;
  path = '/softwares/'
  fileUpload: any;

  constructor(private http:  HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  deleteRecord(event: Event, software: SoftwareInterface) {
    this.confirmationService.confirm({
      // @ts-ignore
      target: event.target,
      message: 'Deseja realmente excluir ?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let uuid = software.uuid === undefined ? '' : software.uuid;
        this.loading = true;
        this.http.delete(this.server.concat(this.path).concat(uuid)).subscribe(
          (data) => {
            this.loading = false;
            this.loadReloadRecords();
            this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi removida'});
          }
        )
      }
    });
  }

  ngOnInit(): void {
    this.loadReloadRecords();
  }

  createNewRecord(){
    this.software = {};
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.formDisplaySwitch();
  }

  editRecord(software: SoftwareInterface){
    this.file = [];
    if(this.fileUpload){
      this.fileUpload.clear();
    }
    this.software = software;
    this.formDisplaySwitch();
  }

  loadReloadRecords(){
    this.loading = true;
    this.http.get(this.server.concat(this.path)).subscribe(
      (data) => {
        this.softwares = data;
        this.loading = false;
      }
    )
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
    // Store form name as "file" with file data
    formData.append("file", this.file);
    formData.append("name", this.software.name);
    formData.append("description", this.software.description);
    formData.append("url", this.software.url);
    formData.append("mirrorUrl", this.software.mirrorUrl);

    if(this.software.id === undefined){
      this.http.post(this.server.concat(this.path), formData).subscribe(
        (data) => {
          this.loadReloadRecords();
          this.formDisplaySwitch();
          this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi adicionada com sucesso'});
        }
      )
    }else {
      formData.append("id", this.software.id);
      formData.append("uuid", this.software.uuid);
      this.http.put(this.server.concat(this.path), formData).subscribe(
        (data) => {
          this.loadReloadRecords();
          this.formDisplaySwitch();
          this.messageService.add({severity:'success', summary:'Completed', detail:'Escolaridade foi atualizada com sucesso'});
        }
      )
    }

  }

  setFile(file: any, fileUpload: FileUpload){
    this.fileUpload = fileUpload;
    this.file = file.files[0];
  }

}
