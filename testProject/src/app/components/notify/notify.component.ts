import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrl: './notify.component.css'
})
export class NotifyComponent {
  notifyMessage:string;
  signup:boolean;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    // Leggi il messaggio di errore dai query parameters
    this.route.queryParams.subscribe(params => {
      this.notifyMessage = params['message'] || 'Si è verificato un errore';
      if(this.notifyMessage === 'User created successfully') this.signup = true;
    });

  }
  
}
