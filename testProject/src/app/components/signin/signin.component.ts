import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {

  public message:string;

  constructor(private http: HttpClient, private router: Router){
  }

  onSubmit(form: NgForm){ 
  
    const body = {
      username: form.form.value.username,
      password: form.form.value.password
    }
  
    this.http.post('http://localhost:3000/signin', body).subscribe({ next: (response:any) => {
      localStorage.setItem("token", response.token);
      this.router.navigate(['/workspace']);
    },
      error: (error) => {
        console.error('GET Error:', error);
        this.message = error.error.message
      },
      complete: () => {console.log('Signin Request Complete.')}
      });
  }
}
