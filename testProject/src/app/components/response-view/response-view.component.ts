import { Component, OnChanges, SimpleChanges, input } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-response-view',
  templateUrl: './response-view.component.html',
  styleUrl: './response-view.component.css'
})
export class ResponseViewComponent {
  @Input() response: any = null;

   
}
