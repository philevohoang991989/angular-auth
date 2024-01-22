import { AuthService } from '@/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor( private router: Router, private auth: AuthService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin'])
    }
    
  }
  onSubmit(): void {
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (result)=>{
          this.router.navigate(['admin'])
        },
        (err: Error)=>{
          alert(err.message)
        }
      )
    }
    
  }
}
