import { Injectable } from '@angular/core';
import { Observable, switchMap, of } from 'rxjs';
import {
    Auth,
    GoogleAuthProvider,
    signInWithRedirect,
    User,
    user,
} from '@angular/fire/auth';
import { ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    user$: Observable<User | null>;

    constructor(
        private auth: Auth,
        private router: ActivatedRoute,
        private userService: UserService
    ) {
        this.user$ = user(auth);
    }

    async login() {
        const returnUrl =
            this.router.snapshot.queryParamMap.get('returnUrl') || '/';
        localStorage.setItem(returnUrl, 'returnUrl ');

        const provider = new GoogleAuthProvider();
        const result = signInWithRedirect(this.auth, provider);
        console.log('result auth: ', result);
    }

    logout() {
        this.auth.signOut();
        console.log('signed out.');
    }

    get appUser$(): Observable<AppUser | null> {
        return this.user$.pipe(
            switchMap((user) => {
                if (user) return this.userService.get(user!.uid);

                return of(null);
            })
        );
    }
}
