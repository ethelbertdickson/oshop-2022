import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../category.service';
import { onValue, get } from '@angular/fire/database';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
    //
    products: any[] = [];
    filteredProducts: any[] = [];
    categories: any[] = [];
    category: string | null = '';

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private categoryService: CategoryService
    ) {
        //compare to product-form component
        productService.getAll().then((snapshot) =>
            snapshot.forEach((a) => {
                const data = { data: a.val(), key: a.key };
                this.products.push(data);

                console.log('fil Products-comp-ts: ', this.filteredProducts);
            })
        );

        onValue(categoryService.getAll(), (snapshot) =>
            snapshot.forEach((a) => {
                const data = { data: a.val(), key: a.key };
                this.categories.push(data);
            })
        );

        route.queryParamMap.subscribe((params) => {
            this.category = params.get('category');

            console.log('category: ', this.category);

            this.filteredProducts = this.category
                ? this.products.filter((p) => p.data.category === this.category)
                : this.products;
        });
    }

    ngOnInit(): void {}
}
