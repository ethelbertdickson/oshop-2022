import { CategoryService } from './../../category.service';
import { Component, OnInit, Input } from '@angular/core';
import { onValue, get } from '@angular/fire/database';

@Component({
    selector: 'product-filter',
    templateUrl: './product-filter.component.html',
    styleUrls: ['./product-filter.component.css'],
})
export class ProductFilterComponent implements OnInit {
    categories: any[] = [];

    @Input('category') category: any;

    constructor(private categoryService: CategoryService) {
        onValue(categoryService.getAll(), (snapshot) =>
            snapshot.forEach((a) => {
                const data = { data: a.val(), key: a.key };
                this.categories.push(data);
            })
        );
    }

    ngOnInit(): void {}
}
