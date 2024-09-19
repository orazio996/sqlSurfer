import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  public message: string;
  public isHidden: boolean;

  constructor(private http: HttpClient, private router: Router){
    this.isHidden = true;
  }

  onSubmit(form: NgForm){       //signup service?

    const body = {
      username: form.form.value.username,
      password: form.form.value.password
    }
    this.http.post('http://localhost:3000/signup', body).subscribe({ 
      next: (response: any) => {
        console.log('GET Response:', response)
        this.message = response.message 
        this.router.navigate(['/notify'], {queryParams:{message:response.message}})
      },
      error: (error) => {
        console.error('GET Error:', error)
        this.message = 'Error ' + error.status + ': ' + error.error.message
        this.isHidden = false;  //navigate to error?
      },
      complete: () => {console.log('Signup Request Complete.')}
    });
  }
}
