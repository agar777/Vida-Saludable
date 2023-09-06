import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const ID_KEY='id_user'
const TOKEN_NOT = 'notificacion-token';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  saveTokenNot(token:any):void{
    window.sessionStorage.removeItem(TOKEN_NOT);
    window.sessionStorage.setItem(TOKEN_NOT, token);
  }

  getTokenNot(): any {
    const not = window.sessionStorage.getItem(TOKEN_NOT);
    if (not) {
      return JSON.parse(not);
    }
    return {};
  }


  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public saveId(id:any){
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, JSON.stringify(id));
  }

  public getId(): any {
    const id = window.sessionStorage.getItem(ID_KEY);
    if (id) {
      return JSON.parse(id);
    }
    return {};
  }

}
