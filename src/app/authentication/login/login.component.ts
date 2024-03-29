import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../core/services/token-storage.service';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  credentials: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.create();
  }
  create() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password:['', Validators.required]
    });
  }

  viewPassword = false;

  changeTypePassword(){
    if(this.viewPassword){
      this.viewPassword = false;
    }else{
      this.viewPassword = true;
    }
  }

  login(form:any){
      this.authService
        .login(form)
        .then(
          data=>{
            console.log(data);
           this.credentials = data.user;
           this.tokenStorage.saveToken(this.credentials.accessToken);
           this.tokenStorage.saveUser(this.credentials.providerData);
           this.tokenStorage.saveId(this.credentials.uid);
           if(this.credentials.accessToken){
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Bienvenido',
              showConfirmButton: false,
            })
                  this.router.navigate(['/dashboard']);
             }
          }
        )
        .catch(error=> {
          Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Usuario no encontrado',
            showConfirmButton: false,
          })
        });
  }

}
