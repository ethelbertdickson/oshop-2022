import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
} from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
    constructor(private auth: AuthService, private userService: UserService) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        return this.auth.appUser$.pipe(map((appUser) => appUser!.isAdmin));
    }
}
