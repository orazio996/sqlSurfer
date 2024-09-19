import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router:Router){}

  isLogged(){
    if(this.router.url == '/' || this.router.url == '/signin' ||this.router.url == '/signup') return true;
    return false
  }

  logOut(){
    //cancella il token e redirect home
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

