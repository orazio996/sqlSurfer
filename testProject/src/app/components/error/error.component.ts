import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent {
    errorMessage: string;
  
    constructor(private route: ActivatedRoute) { }
  
    ngOnInit(): void {
      // Leggi il messaggio di errore dai query parameters
      this.route.queryParams.subscribe(params => {
        this.errorMessage = params['message'] || 'Si è verificato un errore';
      });
    }
}
