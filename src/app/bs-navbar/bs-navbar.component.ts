import { AppUser } from './../models/app-user';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
    selector: 'bs-navbar',
    templateUrl: './bs-navbar.component.html',
    styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
    appUser: any;
    //
    constructor(private auth: AuthService) {
        auth.appUser$.subscribe((appuser) => (this.appUser = appuser));
    }

    logout() {
        this.auth.logout();
        console.log('signed out.');
    }
}
