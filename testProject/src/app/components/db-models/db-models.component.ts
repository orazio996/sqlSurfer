import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UtilityService } from '../../Services/utility.service';

@Component({
  selector: 'app-db-models',
  templateUrl: './db-models.component.html',
  styleUrl: './db-models.component.css'
})
export class DbModelsComponent implements OnInit{
  selectedModel:any;
  fileContent: string | ArrayBuffer | null = '';
  showModal:boolean = false;
  models:[{

    id:number,
    name:string,
    def:string,
    user_id:number,
    timestamp:string
  }];
  message:string = '';
  
  constructor(private http:HttpClient, private utility:UtilityService){}

  ngOnInit(): void {
    const token = UtilityService.parseJwt(localStorage.getItem('token'));
    const user_id = token.payload.id
    this.http.post('http://localhost:3000/models', {'user_id':user_id}).subscribe({ next: (response:any) => {
      this.models = response;
    },
      error: (error) => {
        console.error('GET Error:', error);
        this.message = error.error.message
      },
      complete: () => {console.log('Models caricati')}
      });
  }
  
  modelSelection(model:any){
    if(this.selectedModel){
      let selectedModel = document.getElementById(this.selectedModel.id);
      selectedModel.classList.remove('active');
    }
    this.selectedModel = model;
    let newSelectedModel = document.getElementById(model.id);
    newSelectedModel.classList.add('active');
  }
  
  importModel(event:Event){
    event.preventDefault();
    this.showModal = UtilityService.flagSwitch(this.showModal);
    if(document.body.classList.contains('modal-open')){
      document.body.classList.remove('modal-open');
    }else{
      document.body.classList.add('modal-open');
    }
  }

  newModel(modelName:string, modelDef:string, event: Event){
    event.preventDefault();
    //if(!modelDef)
    const token = localStorage.getItem('token');
    const decodedToken = UtilityService.parseJwt(token);

    const body = {
      name: modelName?modelName:'',
      def: modelDef,
      user_id:decodedToken.payload.id
    };

    this.http.post('http://localhost:3000/newModel', body).subscribe({ next: (response:any) => {
      console.log('Model creato con successo:', response);
      this.ngOnInit();
    },
      error: (error) => {
        console.error('GET Error:', error);
        this.message = error.error.message
      },
      complete: () => {console.log('NewModel Request Complete.')}
      });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      // Legge il contenuto del file come testo
      reader.onload = () =>  {
        this.showModal = false;
        this.fileContent = reader.result;
      };

      reader.readAsText(file); // Puoi anche usare readAsDataURL o readAsArrayBuffer a seconda del tipo di file
    }
  }


}
