import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.create();
  }

  create() {
    this.form = this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    });
  }

  googleLogin(){
    this.authService.loginWithGoogle().then(data=>
      {
        console.log(data);

          this.router.navigate(['/dashboard']);
      }
    )
    .catch( error=>{
        console.log(error);
        
    })
  }

  logIn(form){
    this.authService.login(form).then(data=>{
      console.log(data);
      
      this.router.navigate(['/dashboard']);

    }).catch(error=>{
      console.log(error);

    })
  }

  ngOnDestroy() {
  }

}
