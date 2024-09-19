
import { Component, EventEmitter, Input, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CodeEditorComponent, CodeModel } from '@ngstack/code-editor';
import { UtilityService } from '../../Services/utility.service';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModaleComponent } from '../modale/modale.component';
import { FormControl } from '@angular/forms';
import { env } from '../../../environments/environment';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  theme = 'vs-light';
  response: any;
  prova:CodeEditorComponent;
  processedResponse: string = '';
  @Input() selectedQuery:any;
  @Output() refreshEvent = new EventEmitter<any>();

  model: CodeModel = {      //modelli dell'editor
    language: 'sql',
    uri: 'main.sql',
    value: env.valueEditor1
  };

  model1: CodeModel = {
    language: 'sql',
    uri: 'main1.sql',
    value: env.valueEditor2
  };

  options = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    tabSize: 2,  
    insertSpaces: true,
    automaticLayout: true  
  };

  options1 = {
    contextmenu: true,
    minimap: {
      enabled: true
    },
    readOnly: true,
    tabSize: 2,  
    insertSpaces: true,
    automaticLayout: true  
  };

  models:[{     //DB Models

    id:number,
    name:string,
    def:string,
    user_id:number,
    timestamp:string
  }];

  message:string = '';

  searchControl = new FormControl();
  searchOptions: any[];
  filteredOptions: string[];
  isOpen:boolean = false;

  constructor(private http:HttpClient, private modalService: NgbModal, private cdr: ChangeDetectorRef){}

  ngOnInit(){

    this.http.get('http://localhost:3000/models').subscribe({ next: (response:any) => {
      this.models = response;
      this.models.map((x)=>{if(!x.name) x.name = x.timestamp.split('T')[0] + ' ' + x.timestamp.split('T')[1].split('.')[0]});
      this.searchOptions = this.models.map(x=>x.name);
    },
      error: (error) => {
        console.error('GET Error:', error);
        this.message = error.error.message
      },
      complete: () => {console.log('Models caricati')}
      });

    this.searchControl.valueChanges.subscribe(value => {
      this.filteredOptions = this._filter(value);
      this.isOpen = !!this.filteredOptions.length;
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  selectOption(option:string, event:Event){
    this.searchControl.setValue(option)
    this.isOpen = false;
  }

  closeDropdown(){
    setTimeout(() => { 
      if (!this.isOpen) return;
      this.isOpen = false; 
  }, 200);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedQuery'] && !changes['selectedQuery'].isFirstChange()) {
      this.updateQuerySelection();
    }
  }

  updateQuerySelection(){
    this.model = {
      ...this.model,
      value: this.selectedQuery.query
    };
    this.model1 = {
      ...this.model1,
      value: this.selectedQuery.corrected_query
    };
  }

  updateEditorValue() {
    this.model1 = {
      ...this.model1,
      value: this.response
    };
  }

  async aiCheck(query: string){
    const token = localStorage.getItem('token');
    const decodedToken = UtilityService.parseJwt(token);
    const dbModel = this.models.find(model => model.name === this.searchControl.value);
    console.log('editor.component.ts\n')
    console.log(query);
    this.http.post('http://localhost:3000/correct', {"query": query, "id":decodedToken.payload.id, "model":dbModel}).subscribe({ 
      next: (response: any) => {
        this.response = response.correctedQuery;
        this.updateEditorValue();
        this.refreshEvent.emit()
      },
      error: (error) => {
        console.error('GET Error:', error)
      },
      complete: () => {console.log('Correction Request Complete.')}
    });
  }

  diff(sql1:string, sql2: string){
    const highlightedDiff = UtilityService.diff(sql1, sql2);
    let modal = this.modalService.open(ModaleComponent);
    modal.componentInstance.content = highlightedDiff
  }

}
