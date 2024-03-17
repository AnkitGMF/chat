// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

   async canActivate ():Promise<boolean> {
    try{
        const val =  await this.authService.getUser().toPromise()
        return val!.success;
    }catch(err){
        this.router.navigate(['/auth/login']);
        return false;
    }
  }
}
