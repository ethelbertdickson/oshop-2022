import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../product.service';
import { Component, OnInit } from '@angular/core';
import { onValue } from '@angular/fire/database';
import { CategoryService } from './../../category.service';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
    categories$: any[] = [];
    product: any = {};
    id: any;

    //
    constructor(
        private categoryServce: CategoryService,
        private productService: ProductService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        onValue(categoryServce.getAll(), (snapshot) => {
            snapshot.forEach((a) => {
                const categories = { data: a.val(), id: a.key };
                //
                this.categories$.push(categories);
                console.log('categories: ', this.categories$);
            });
        });

        this.id = route.snapshot.paramMap.get('id');
        if (this.id)
            this.productService
                .get(this.id) //get a single id
                .then((p) => {
                    this.product = p.val();
                    console.log('prod serv: ', this.product); //product-form comp. Not displaying
                })
                .catch((error) => error.message);
    }

    ngOnInit(): void {}

    save(product: any) {
        if (this.id) this.productService.update(this.id, product);

        this.productService.create(product);

        this.router.navigate(['/admin/products']);
    }

    delete() {
        if (!confirm('delete ?')) return;
        this.productService.delete(this.id);

        this.router.navigate(['/admin/products']);
    }
}
