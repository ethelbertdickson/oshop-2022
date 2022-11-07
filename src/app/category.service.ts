import { Injectable } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private db: Database) {}

    getAll() {
        return ref(this.db, 'categories/');
    }
}
