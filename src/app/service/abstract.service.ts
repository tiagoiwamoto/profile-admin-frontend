import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ConfirmationService, MessageService} from "primeng/api";
import {Observable} from "rxjs";
import {AbstractInterface} from "../model/abstract.interface";
import {CertificationInterface} from "../model/certification.interface";

@Injectable({
  providedIn: 'root'
})
export class AbstractService {

  public formDisplay = false;
  server = environment.server;

  constructor(private http:  HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) {
  }

  loadReloadRecords(path: string): Observable<AbstractInterface>{
    return this.http.get(this.server.concat(path));
  }

  saveForm(record: FormData, object: any, path: string): Observable<AbstractInterface>{
    if(object.id === undefined){
      return this.http.post(this.server.concat(path), record);
    }else {
      record.append("id", object.id);
      record.append("uuid", object.uuid);
      return this.http.put(this.server.concat(path), record);
    }
  }

  save(record: any, path: string): Observable<AbstractInterface>{
    const appHeaders = new HttpHeaders()
      .append('Content-Type', 'application/json');
    if(record.id === undefined){
      return this.http.post(this.server.concat(path), JSON.stringify(record), {headers: appHeaders});
    }else {
      return this.http.put(this.server.concat(path), record, {headers: appHeaders});
    }
  }

  deleteRecord(record: any, path: string): Observable<AbstractInterface> {
    return this.http.delete(this.server.concat(path).concat(record.uuid));
  }

}
