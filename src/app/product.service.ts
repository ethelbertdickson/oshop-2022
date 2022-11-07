import { Injectable } from '@angular/core';
import {
    Database,
    ref,
    get,
    push,
    update,
    remove,
} from '@angular/fire/database';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private db: Database) {}

    create(product: any) {
        return push(ref(this.db, '/products'), product);
    }

    getAll() {
        return get(ref(this.db, 'products/'));
    }

    get(productId: string) {
        return get(ref(this.db, 'products/' + productId));
    }

    update(productId: any, product: any) {
        return update(ref(this.db, 'products/' + productId), product);
    }

    delete(productId: any) {
        return remove(ref(this.db, 'products/' + productId));
    }
}
