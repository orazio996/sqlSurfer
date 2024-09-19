import { Component } from '@angular/core';
import { __values } from 'tslib';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrl: './workspace.component.css'
})
export class WorkspaceComponent {
  refreshFlag:boolean = false;
  public responseObj: any = '';
  selectedQuery:any;
  constructor(private http: HttpClient){
  }

  querySelection(event: any){
    this.selectedQuery=event;
  }

  switchFlag(){
    this.refreshFlag = UtilityService.flagSwitch(this.refreshFlag);
  }
  
}
 





