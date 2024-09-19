import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'app-cronologia',
  templateUrl: './cronologia.component.html',
  styleUrl: './cronologia.component.css'
})
export class CronologiaComponent implements OnInit, OnChanges{
  @Input() refreshFlag:boolean;
  message:string = '';
  cronologia: [{
    id:number;
    user_id:number;
    query:string;
    corrected_query:string;
    timestamp:string;
  }];

  @Output() selectedQueryEvent = new EventEmitter<any>()
  selectedQuery:any;
  
  constructor(private http:HttpClient){}
   

  ngOnInit(): void {
    const token = UtilityService.parseJwt(localStorage.getItem('token'));
    const user_id = token.payload.id
    this.http.post('http://localhost:3000/cronologia', {'user_id': user_id}).subscribe({ next: (response:any) => {
      this.cronologia = response;
    },
      error: (error) => {
        console.error('GET Error:', error);
        this.message = error.error.message
      },
      complete: () => {console.log('Cronologia caricata')}
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['refreshFlag'] && !changes['refreshFlag'].isFirstChange()) {
      this.ngOnInit();
    }
  }

  querySelection(correction:any){
    if(this.selectedQuery){
      let query = document.getElementById(this.selectedQuery.id);
      query.classList.remove('active');
    }
    this.selectedQuery = correction;
    this.selectedQueryEvent.emit(this.selectedQuery)
    let query = document.getElementById(correction.id);
    query.classList.add('active');
    
  }
}
