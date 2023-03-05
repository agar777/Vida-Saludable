import { Injectable } from '@angular/core';
import { Auth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, signOut } from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) { }

  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth, email, password)
  }

  loginWithGoogle(){
      return signInWithPopup(this.auth, new GoogleAuthProvider())
  }

  logOut(){
    return signOut(this.auth)
  }
}
