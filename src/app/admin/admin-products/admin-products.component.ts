import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
    title: string;
    price: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { title: 'Hydrogen', price: 1.0079 },
    { title: 'Helium', price: 4.0026 },
    { title: 'Lithium', price: 6.941 },
];

@Component({
    selector: 'app-admin-products',
    templateUrl: './admin-products.component.html',
    styleUrls: ['./admin-products.component.css'],
})
export class AdminProductsComponent implements OnInit {
    products: any[] = [];
    filterProducts: any[] = [];
    //
    displayedColumns: string[] = ['title', 'price', 'category'];
    dataSource: any[] = [];

    constructor(private productService: ProductService) {
        productService
            .getAll()
            .then((a) =>
                a.forEach((s) => {
                    const data = { product: s.val(), key: s.key };
                    this.products.push(data);
                })
            )
            .catch((err) => err.message);

        this.filterProducts = this.dataSource = this.products;

        console.log(
            'array filteredProduct: ',
            this.filterProducts,
            this.dataSource
        );
    }

    ngOnInit(): void {}

    filter(query: string) {
        this.filterProducts = query
            ? this.products.filter((p) =>
                  p.product.title.toLowerCase().includes(query.toLowerCase())
              )
            : this.products;
    }
}
