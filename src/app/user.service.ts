import { User } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import {
    getDatabase,
    ref,
    get,
    update,
    Database,
} from '@angular/fire/database';
import { AppUser } from './models/app-user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    //
    constructor(private database: Database) {
        // this.get('YzME57Xm6DOqlBuza4hlAH0IYAp2');
    }

    save(user: User) {
        const db = getDatabase();
        const reference = ref(db, 'users/' + user.uid);

        update(reference, {
            name: user.displayName,
            email: user.email,
            phone: user.phoneNumber,
        });
    }

    async get(uid: string): Promise<AppUser> {
        const snapshot = await get(ref(this.database, 'users/' + uid));
        return snapshot.val();
    }
}
