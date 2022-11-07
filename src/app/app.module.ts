import { USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { USE_EMULATOR as USE_DATABASE_EMULATOR } from '@angular/fire/compat/database';

import { MatTableModule } from '@angular/material/table';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { Storage, getStorage, provideStorage } from '@angular/fire/storage';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoryService } from './category.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { environment } from './../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';

const routes: Routes = [
    { path: '', component: ProductsComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'shopping-cart', component: ShoppingCartComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'check-out',
        component: CheckOutComponent,
        canActivate: [],
    },
    {
        path: 'order-success',
        component: OrderSuccessComponent,
        canActivate: [],
    },
    {
        path: 'my/orders',
        component: MyOrdersComponent,
        canActivate: [],
    },

    {
        path: 'admin/products/new',
        component: ProductFormComponent,
        canActivate: [],
    },
    {
        path: 'admin/products/:id',
        component: ProductFormComponent,
        canActivate: [],
    },
    {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [],
    },

    {
        path: 'admin/orders',
        component: AdminOrdersComponent,
        canActivate: [],
    },
];

@NgModule({
    declarations: [
        AppComponent,
        BsNavbarComponent,
        HomeComponent,
        ProductsComponent,
        ShoppingCartComponent,
        CheckOutComponent,
        OrderSuccessComponent,
        MyOrdersComponent,
        AdminProductsComponent,
        AdminOrdersComponent,
        LoginComponent,
        ProductFormComponent,
        ProductFilterComponent,
        ProductCardComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        CustomFormsModule,
        MatTableModule,
        NgbModule,
        AppRoutingModule,
        RouterModule.forRoot(routes),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideDatabase(() => getDatabase()),
        provideAuth(() => getAuth()),
        provideStorage(() => getStorage()),
        BrowserAnimationsModule,
    ],
    providers: [
        AuthService,
        AuthGuard,
        AdminAuthGuard,
        UserService,
        CategoryService,
        ProductService,
        // {
        //     provide: USE_AUTH_EMULATOR,
        //     useValue: environment.useEmulators
        //         ? ['localhost', 9099]
        //         : undefined,
        // },
        // {
        //     provide: USE_DATABASE_EMULATOR,
        //     useValue: environment.useEmulators
        //         ? ['localhost', 9000]
        //         : undefined,
        // },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
