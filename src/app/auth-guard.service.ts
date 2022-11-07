import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
} from '@angular/router';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {}

    canActivate(
        router: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        this.auth.user$.subscribe((user) => {
            if (user) return true;

            this.router.navigate(['/login'], {
                queryParams: { returnUrl: state.url },
            });
            return false;
        });

        return false;
    }
}
